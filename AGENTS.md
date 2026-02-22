# AGENTS.md

## 🤖 Agent Protocol: The Contextual Architect

This document serves as the **primary instruction manual for any AI agent** working on this codebase. It consolidates critical information from `.agent/` to ensure consistency, quality, and alignment with the project vision.

> **CRITICAL**: Before starting any task, verify you are adhering to the "Developer Brutalism" design language and the "MVP-to-Champion" goal.

---

## 1. Project Overview
**The Contextual Architect** is a high-performance developer portfolio featuring a "Context Layer" (Chat) and a "Content Layer" (Portfolio).
-   **Core Mechanic**: A recruiter/user chats with the AI (Gemini 1.5 Flash), which dynamically **reorders** and **highlights** the static portfolio content (Skills, Projects, Experience) based on user intent.
-   **Goal**: "New Year, New You" Challenge. MVP-to-Champion quality.
-   **Source**: `.agent/project_brief.md`

## 2. Tech Stack & Architecture
-   **Framework**: Next.js (App Router) - Default to **Server Components**.
-   **Language**: TypeScript (Strict). **No `any`**.
-   **Styling**: Tailwind CSS.
-   **State Management**: Zustand (Global Layout State).
-   **Motion**: Framer Motion (Reordering animations).
-   **AI**: Google Gemini 1.5 Flash (via `google-generativeai`).
-   **Validation**: `zod` for all API responses (Strict Schema Validation).
-   **Infrastructure**: Docker -> Google Cloud Run.

## 3. Coding Standards (Non-Negotiable)
*   **DRY & KISS**: Extract logic, keep solutions simple.
*   **Naming**:
    *   Files: `kebab-case.ts`, `PascalCase.tsx` (Components).
    *   Variables/Functions: `camelCase`.
    *   Constants: `UPPER_SNAKE_CASE`.
*   **TypeScript**: Explicit return types for complex functions. **No Enums** (use Union Types).
*   **Imports**: Check existing patterns. Avoid circular dependencies.
*   **Source**: `.agent/CODING_STANDARDS.md`

## 4. Design System: "Developer Brutalism"
We are aiming for a **dev.to** inspired aesthetic.
*   **Theme**: Dark Mode Default.
*   **Colors**:
    *   Bg: `#000000` (Absolute Black) or `#090909`.
    *   Surface: `#171717` (Neutral-900).
    *   Primary: `#3B49DF` (Dev Blue) or `#6949FF` (Retro Purple).
    *   Border: `#404040` (Neutral-700) - **High visibility borders**.
*   **UI Components**:
    *   **Chat**: Looks like a "Comment Thread" / Markdown Editor.
    *   **Cards**: "Feed Card" style. Boxed, distinct borders, snappy interactions.
    *   **Highlighting**: "Featured Post" style (thick colored borders, badges).
*   **Source**: `.agent/styling_guide.md`

## 5. Risk Management & Safety
*   **AI Reliability**: Always assume the AI response might be malformed. Use `zod` to validate.
*   **Fallback**: Implement a "Default Layout" if the AI fails or times out.
*   **Performance**: Rate limits (3 req/5 mins). Optimistic UI for chat.
*   **Source**: `.agent/risk_management.md`

## 6. Development Workflow
1.  **Check `.agent/tasks.md`**: Update the Kanban board status.
2.  **Atomic Components**: Build small, focused components to save context window.
3.  **Strict Typing**: Define interfaces in `types/` or adjacent to usage.
4.  **Verification**: Ensure strict adherence to the **Design Philosophy** (Brutalism, not Glassmorphism).
