# Project Brief: The Contextual Architect

## Overview
A high-performance, minimalist developer portfolio that uses **Gemini 1.5 Flash** to act as a real-time "Recruiter's Assistant."
**Vision**: A two-layer experience.
1.  **The "Context Layer" (Hero)**: A chat interface (like ChatGPT/Gemini) where recruiters input JDs or ask questions.
2.  **The "Content Layer" (Portfolio)**: A single-page scrollable view (Overview, Skills, Experience, Projects, Achievements) that dynamically reorders and highlights itself based on the chat context.

**Challenge**: New Year, New You Portfolio Challenge (Deadline: Feb 1st)
**Goal**: MVP-to-Champion.

## Key Features
*   **Conversational Start:** Hero section is a chat interface with prompt templates.
*   **Reactive UI:** The chat agent influences the *next* section (The Content Layer).
*   **Dynamic Reordering:** AI can change the order of sections (e.g., show Projects before Experience) and items within sections.
*   **Smart Highlighting:** AI can highlight specific skills, tags, and text passages relevant to the user's query/JD.
*   **"Unveiling" Animation:** Scrolling from Hero to Content feels like opening a new layer.

## Technical Stack
*   **Frontend:** Next.js (App Router) + Tailwind CSS + Framer Motion (crucial for reordering/animations).
*   **Backend:** Next.js API Routes (Serverless) wrapping Gemini 1.5 Flash.
*   **AI Engine:** Google AI Studio (Gemini 1.5 Flash API).
*   **State Management:** React Context or Zustand (to manage the "Layout State" returned by AI).

## Implementation Roadmap (Epics & Tasks)

### Epic 1: The Content Layer (Core Portfolio)
**Overview**: Build the static, data-driven foundation of the portfolio.
**Objective**: Create a high-performance, responsive single-page application that displays professional information.
**Technical Implementation**: Next.js App Router, Tailwind CSS, `profile.json` data store, Atomic components (Cards, Sections).

#### Tasks
*   **Task 1.1: Project Setup & Infrastructure**
    *   **Overview**: Initialize the codebase and deployment pipeline.
    *   **Objective**: Ensure a stable environment for development and production.
    *   **Definition of Done**: Next.js app running locally; Dockerfile created; "Hello World" deployed to Cloud Run.
*   **Task 1.2: Data Modeling**
    *   **Overview**: Structure the static content of the portfolio.
    *   **Objective**: Create a scalable JSON schema for Skills, Experience, Projects, and Achievements.
    *   **Definition of Done**: `profile.json` populated with real data and types defined in TypeScript.
*   **Task 1.3: UI Component Architecture**
    *   **Overview**: Build the visual building blocks.
    *   **Objective**: Create reusable, responsive components for each content type.
    *   **Definition of Done**: `SkillCard`, `ProjectCard`, `ExperienceCard` implemented and rendering data from `profile.json`.

### Epic 2: The Context Layer (AI Integration)
**Overview**: Implement the "Hero Chat" and the intelligence behind the portfolio.
**Objective**: Allow the portfolio to understand user intent and reconfigure itself.
**Technical Implementation**: Gemini 1.5 Flash, Next.js API Routes, Zustand (State Management).

#### Tasks
*   **Task 2.1: Hero Chat Interface**
    *   **Overview**: The entry point of the experience.
    *   **Objective**: specific UI for the "Context Layer" where users interact with the Agent.
    *   **Definition of Done**: Chat input with prompt templates; handling of loading, error, and success states.
*   **Task 2.2: AI Backend & Prompting**
    *   **Overview**: The brain of the operation.
    *   **Objective**: Engineering the Gemini System Prompt to return structured UI configuration.
    *   **Definition of Done**: `/api/chat` returns JSON with `layout_order`, `highlight_ids`, and `chat_reply`.
*   **Task 2.3: Reactive State Management**
    *   **Overview**: Connecting the Brain to the Body.
    *   **Objective**: Store and distribute the AI's layout instructions to the frontend components.
    *   **Definition of Done**: Zustand store created; `SectionWrapper` components subscribing to layout changes.

### Epic 3: Visual Polish & Experience (UX)
**Overview**: Elevate the user experience with animations and "champion" level polish.
**Objective**: Create a seamless, "magical" transition between the chat context and the portfolio content.
**Technical Implementation**: Framer Motion for reordering and layout transitions.

#### Tasks
*   **Task 3.1: Dynamic Reordering Animation**
    *   **Overview**: Visualizing the "Sorting" process.
    *   **Objective**: Smoothly animate sections changing position based on relevance.
    *   **Definition of Done**: Framer Motion `layout` prop implemented on lists; smooth transitions verified.
*   **Task 3.2: Smart Highlighting**
    *   **Overview**: Guiding the user's eye.
    *   **Objective**: Visually emphasize items selected by the AI.
    *   **Definition of Done**: "Glow" or "Scale" styles applied conditionally based on `highlight_ids` in the store.
*   **Task 3.3: The "Unveiling" Transition**
    *   **Overview**: The bridge between Hero and Content.
    *   **Objective**: Create a "Scroll to Reveal" or "Peel away" effect when the chat concludes.
    *   **Definition of Done**: Hero section transitions smoothly to the Portfolio view upon user interaction.

## System Prompt Strategy (Gemini)
The model needs to return a structured JSON to control the UI:
```json
{
  "reply": "I've tailored the portfolio for a Senior React role...",
  "layout": {
    "section_order": ["projects", "experience", "skills", "achievements"],
    "highlighted_item_ids": ["proj-1", "exp-2", "skill-react"],
    "highlighted_keywords": ["latency", "optimization"]
  }
}
```

## Acceptance Criteria

### Functional Requirements
- [ ] **Chat Interface**: Users can input text, receive AI responses, and see a loading state.
- [ ] **Dynamic Reordering**: The "Content Layer" sections (Skills, Projects, etc.) change order based on the AI response.
- [ ] **Smart Highlighting**: Relevant cards/items have a distinct visual style (glow/border) when selected by AI.
- [ ] **Responsive Design**: The site is fully functional and visually consistent on Mobile, Tablet, and Desktop.

### Non-Functional Requirements
- [ ] **Performance**: Google Lighthouse score of 90+ in Performance, Accessibility, and Best Practices.
- [ ] **Security**: API Keys are stored in Secret Manager and not exposed to the client. Low rate limits (3 req/5min).
- [ ] **Data Integrity**: `profile.json` is type-safe; fallback behavior exists if AI fails.
- [ ] **Accessibility (WCAG)**: Fully compliant with WCAG 2.1 AA standards.
- [ ] **Inclusivity**: Full support for non-visual users (screen readers, ARIA labels, semantic HTML).
- [ ] **SEO**: Optimized meta tags, open graph data, and semantic structure for search engines.

### Judging Criteria (New Year, New You Challenge)
- [ ] **Innovation and Creativity**: Does the "Chat Hero" and "Reactive Portfolio" feel novel and surprising?
- [ ] **Technical Implementation**: Quality of code, effective use of Gemini, and robust state management.
- [ ] **User Experience**: Is the flow seamless? Does the AI add value without friction? Is it accessible?

### Sustainability & Longevity
- [ ] **Deployment**: Automated build/deploy via Dockerfile (Cloud Run or Vercel).
- [ ] **Cost Control**: $0.00 spend architecture (Free Tier limits enforced).
- [ ] **Maintainability**: Content can be updated via a single JSON file without code changes.
