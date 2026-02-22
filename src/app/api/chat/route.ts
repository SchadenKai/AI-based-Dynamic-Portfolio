import { VertexAI, HarmCategory, HarmBlockThreshold } from "@google-cloud/vertexai";
import { profile } from "@/lib/profile";
import { getAvailableSections } from "@/lib/sections";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {
  RATE_LIMIT,
  ERROR_MESSAGES,
  MINUTE_RATE_LIMIT_MESSAGES,
  DAILY_RATE_LIMIT_MESSAGES,
  getSystemInstructions,
  AI_MODEL
} from "@/lib/constants";

// Initialize Vertex AI
// Note: Requires GOOGLE_APPLICATION_CREDENTIALS to be set in environment
// or running in an environment with default credentials (like Cloud Run)
const project = process.env.GOOGLE_CLOUD_PROJECT_ID;
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

const vertexAI = project ? new VertexAI({ project, location }) : null;

// In-memory rate limit store (works for single-instance deployments)
// For production with multiple instances, consider Redis or similar
interface RateLimitEntry {
  minuteRequests: number[];  // Timestamps of requests in the last minute
  dayRequests: number[];     // Timestamps of requests in the last day
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, key) => {
    // Remove entries that haven't been used in 24 hours
    if (entry.dayRequests.length === 0 ||
      now - Math.max(...entry.dayRequests) > RATE_LIMIT.DAY_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  });
}, 5 * 60 * 1000);

// Get random message from an array
const getRandomMessage = (messages: string[]) => {
  return messages[Math.floor(Math.random() * messages.length)];
};

const getRandomErrorMessage = () => getRandomMessage(ERROR_MESSAGES);
const getMinuteRateLimitMessage = () => getRandomMessage(MINUTE_RATE_LIMIT_MESSAGES);
const getDailyRateLimitMessage = () => getRandomMessage(DAILY_RATE_LIMIT_MESSAGES);

// ============================================================================
// RATE LIMITING LOGIC
// ============================================================================

interface RateLimitResult {
  allowed: boolean;
  type?: 'minute' | 'day';
  remaining?: { minute: number; day: number };
  resetIn?: number; // milliseconds until reset
}

function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now();

  // Get or create entry for this identifier
  let entry = rateLimitStore.get(identifier);
  if (!entry) {
    entry = { minuteRequests: [], dayRequests: [] };
    rateLimitStore.set(identifier, entry);
  }

  // Clean up old requests
  entry.minuteRequests = entry.minuteRequests.filter(
    (ts) => now - ts < RATE_LIMIT.MINUTE_WINDOW_MS
  );
  entry.dayRequests = entry.dayRequests.filter(
    (ts) => now - ts < RATE_LIMIT.DAY_WINDOW_MS
  );

  // Check daily limit first (more restrictive)
  if (entry.dayRequests.length >= RATE_LIMIT.REQUESTS_PER_DAY) {
    const oldestDayRequest = Math.min(...entry.dayRequests);
    return {
      allowed: false,
      type: 'day',
      remaining: { minute: 0, day: 0 },
      resetIn: RATE_LIMIT.DAY_WINDOW_MS - (now - oldestDayRequest),
    };
  }

  // Check per-minute limit
  if (entry.minuteRequests.length >= RATE_LIMIT.REQUESTS_PER_MINUTE) {
    const oldestMinuteRequest = Math.min(...entry.minuteRequests);
    return {
      allowed: false,
      type: 'minute',
      remaining: {
        minute: 0,
        day: RATE_LIMIT.REQUESTS_PER_DAY - entry.dayRequests.length
      },
      resetIn: RATE_LIMIT.MINUTE_WINDOW_MS - (now - oldestMinuteRequest),
    };
  }

  // Request allowed - record it
  entry.minuteRequests.push(now);
  entry.dayRequests.push(now);

  return {
    allowed: true,
    remaining: {
      minute: RATE_LIMIT.REQUESTS_PER_MINUTE - entry.minuteRequests.length,
      day: RATE_LIMIT.REQUESTS_PER_DAY - entry.dayRequests.length,
    },
  };
}

// Get client identifier (IP address or fallback)
async function getClientIdentifier(): Promise<string> {
  const headersList = await headers();

  // Try various headers for the real IP (behind proxies/load balancers)
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback for development
  return "anonymous-user";
}


const availableSections = getAvailableSections(profile);

let context = `
Candidate: ${profile.basics.name}
Role: ${profile.basics.label}
`;

if (availableSections.includes('experience')) {
  context += `\nExperience:\n${profile.work.map((w, i) => `ID: work-${i} | ${w.name} - ${w.position} (${w.summary})`).join('\n')}\n`;
}

if (availableSections.includes('projects')) {
  context += `\nProjects:\n${profile.projects.map((p, i) => `ID: project-${i} | ${p.name} - ${p.description}`).join('\n')}\n`;
}

if (availableSections.includes('skills')) {
  context += `\nSkills:\n${profile.skills.map((s, i) => `ID: skill-${i} | ${s.name}: ${s.keywords.join(', ')}`).join('\n')}\n`;
}

if (availableSections.includes('achievements')) {
  context += `\nAchievements:\n${(profile.achievements || []).map((a, i) => `ID: achievement-${i} | ${a.title} @ ${a.event}`).join('\n')}\n`;
}

const instructions = getSystemInstructions(context);

export async function POST(req: Request) {
  try {
    // ========================================================================
    // RATE LIMITING CHECK
    // ========================================================================
    const clientId = await getClientIdentifier();
    const rateLimitResult = checkRateLimit(clientId);

    if (!rateLimitResult.allowed) {
      const isMinuteLimit = rateLimitResult.type === 'minute';
      const message = isMinuteLimit
        ? getMinuteRateLimitMessage()
        : getDailyRateLimitMessage();

      // Calculate reset time in seconds
      const resetInSeconds = Math.ceil((rateLimitResult.resetIn || 0) / 1000);

      // Return 429 Too Many Requests with a humorous message
      return NextResponse.json(
        {
          layout_order: availableSections,
          highlight_ids: [],
          message,
          isRateLimited: true,
          rateLimitType: rateLimitResult.type,
          resetInSeconds,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit-Minute': RATE_LIMIT.REQUESTS_PER_MINUTE.toString(),
            'X-RateLimit-Limit-Day': RATE_LIMIT.REQUESTS_PER_DAY.toString(),
            'X-RateLimit-Remaining-Minute': '0',
            'X-RateLimit-Remaining-Day': rateLimitResult.remaining?.day.toString() || '0',
            'X-RateLimit-Reset': resetInSeconds.toString(),
            'Retry-After': resetInSeconds.toString(),
          }
        }
      );
    }

    // ========================================================================
    // MAIN LOGIC
    // ========================================================================
    const { message, history } = await req.json();

    if (!vertexAI) {
      // Fallback for demo/no-key environment
      console.warn("GOOGLE_CLOUD_PROJECT_ID not set. Using default layout.");
      return NextResponse.json({
        layout_order: availableSections,
        highlight_ids: [],
        message: ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)],
        rateLimit: rateLimitResult.remaining,
      });
    }

    const model = vertexAI.getGenerativeModel({
      model: AI_MODEL,
      systemInstruction: {
        role: 'system',
        parts: [{ text: instructions }]
      },
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const chatHistory = history ? history.map((h: any) => `${h.role}: ${h.content}`).join('\n') : '';
    const fullPrompt = `${chatHistory}\nUser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    // Vertex AI SDK response structure might slightly differ, safe access
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No content generated from Vertex AI");
    }

    // Include rate limit info in successful response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);

      // Force achievements and writings to be at the end, and about to be at the start if not present
      if (parsedResponse.layout_order) {
        const fixedAtEnd = availableSections.filter(s => ['achievements', 'writings'].includes(s));
        const fixedAtStart = ['about'];

        // Filter out fixed sections if AI included them (to avoid duplicates)
        const dynamicSections = parsedResponse.layout_order.filter((s: string) => !fixedAtEnd.includes(s as any) && !fixedAtStart.includes(s) && availableSections.includes(s as any));

        // Construct final order: About -> Dynamic (Experience/Projects/Skills) -> Fixed End (Achievements/Writings)
        parsedResponse.layout_order = [...fixedAtStart, ...dynamicSections, ...fixedAtEnd];
      }
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      // Fallback if model doesn't return valid JSON
      parsedResponse = {
        layout_order: availableSections,
        highlight_ids: [],
        message: text // Return the raw text as message if it's not JSON
      };
    }

    return NextResponse.json({
      ...parsedResponse,
      rateLimit: rateLimitResult.remaining,
    }, {
      headers: {
        'X-RateLimit-Limit-Minute': RATE_LIMIT.REQUESTS_PER_MINUTE.toString(),
        'X-RateLimit-Limit-Day': RATE_LIMIT.REQUESTS_PER_DAY.toString(),
        'X-RateLimit-Remaining-Minute': rateLimitResult.remaining?.minute.toString() || '0',
        'X-RateLimit-Remaining-Day': rateLimitResult.remaining?.day.toString() || '0',
      }
    });
  } catch (error) {
    // Log the actual error for debugging (server-side only)
    console.error("AI Generation Error:", error);

    // Return a humorous, user-friendly error message
    return NextResponse.json({
      layout_order: availableSections,
      highlight_ids: [],
      message: getRandomErrorMessage(),
      isError: true  // Flag to let frontend know this was an error
    });
  }
}
