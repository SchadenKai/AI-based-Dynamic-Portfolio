// ============================================================================
// RATE LIMITING CONFIGURATION
// ============================================================================
export const RATE_LIMIT = {
    REQUESTS_PER_MINUTE: 5,
    REQUESTS_PER_DAY: 20,
    MINUTE_WINDOW_MS: 60 * 1000,        // 1 minute in milliseconds
    DAY_WINDOW_MS: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
};

// ============================================================================
// HUMOROUS MESSAGES
// ============================================================================

// Humorous error messages for when the AI has a bad day
export const ERROR_MESSAGES = [
    "Oops! My digital hamsters took an unscheduled coffee break. ☕ Showing you the classic layout instead!",
    "Plot twist: The AI decided to take a nap. Don't worry, the portfolio still works great!",
    "My brain cells are currently on vacation. 🏖️ Here's the standard view while they sunbathe.",
    "*elevator music plays* Technical difficulties, but your journey continues!",
    "The magic 8-ball says 'Ask again later.' In the meantime, enjoy the default layout!",
    "Houston, we have a... tiny hiccup. Nothing a classic portfolio view can't fix!",
    "My crystal ball is foggy today. 🔮 Falling back to the tried-and-true layout.",
    "The AI gremlins are acting up again. Classic view to the rescue!",
    "Beep boop... *sparks fly* ...ahem, please enjoy this lovely default layout.",
    "The cosmic rays disrupted my circuits! Here's the portfolio in its natural form.",
    "I tried to think too hard and got a brain freeze. 🧊 Default mode activated!",
    "My neurons are playing hide and seek. While I find them, here's the standard layout!"
];

// Humorous messages for per-minute rate limit
export const MINUTE_RATE_LIMIT_MESSAGES = [
    "Whoa there, speedster! 🏃‍♂️ You're chatting faster than my circuits can handle. Take a breather!",
    "Easy there, turbo! My hamsters need a quick water break. Try again in a minute!",
    "You're on fire today! 🔥 But I need a sec to cool down. Give me a minute?",
    "Hold up! You're typing faster than a caffeinated developer. Let's slow down a bit!",
    "My brain is still processing your enthusiasm! 🧠 Gimme a minute to catch up.",
    "Wow, such excitement! But even AIs need micro-breaks. Chat with me again in a moment!",
    "Rate limit reached! Translation: You're awesome, but I need a tiny timeout. ⏰",
    "Achievement unlocked: Speed Chatter! 🎮 Now let's unlock: Patient Conversationalist.",
];

// Humorous messages for daily rate limit
export const DAILY_RATE_LIMIT_MESSAGES = [
    "You've been my favorite visitor today! 🌟 But I need my beauty sleep. See you tomorrow!",
    "Daily chat limit reached! I've loved our conversations, but even AIs need their 8 hours of rest. 😴",
    "Congratulations! You've maxed out the fun meter for today! 🎉 Reset happens at midnight.",
    "You've officially won the 'Most Engaged Visitor' award! 🏆 Come back tomorrow for more chats.",
    "The AI union says I need to clock out now. 📋 Let's continue this tomorrow!",
    "Daily limit hit! Don't worry, I'll miss you too. See you after I recharge! 🔋",
    "You broke the chat-o-meter! 📊 It'll be fixed by tomorrow. Same bat-time, same bat-channel!",
    "I've enjoyed every message, but my daily quota is spent! The portfolio speaks for itself until tomorrow. ✨",
];

// ============================================================================
// SYSTEM PROMPT / INSTRUCTIONS
// ============================================================================

export const getSystemInstructions = (context: string) => `
You are an AI Portfolio Architect. Your goal is to customize the presentation of Kairus's portfolio based on the visitor's intent.

Context:
${context}

Instructions:
1. Analyze the conversation history and the latest user message.
2. Reorder the 3 sections ('experience', 'projects', 'skills') based on what is most relevant to them.
   - For technical recruiters, prioritize Experience then Skills.
   - For hiring managers, prioritize Projects or Experience depending on context.
   - For developers, prioritize Projects or Skills.
3. Select 1-3 specific items (IDs) that are highly relevant to highlight.
4. Generate a brief, professional response (max 2 sentences) addressing the user directly.

Output Schema (JSON):
{
  "layout_order": ["experience", "projects", "skills"],
  "highlight_ids": ["work-0", "project-1", "skill-2"],
  "message": "string"
}
`;

// AI Model Configuration
export const AI_MODEL = "gemini-2.5-flash";
