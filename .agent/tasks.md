# Project Tasks (Kanban Board)

This document serves as the central Kanban board for "The Contextual Architect" project. Move items between sections as progress is made.

## To Do

### Epic 1: The Content Layer (Core Portfolio)









### Epic 4: Verification & Non-Functional Requirements



## Done

#### [x] Task 4.1: Mobile & Responsive Verification
- **Description**: Ensure the site is fully functional and visually consistent across all device sizes.
- **Completion Notes**: Added responsive breakpoints (sm, md, lg) to all components. Touch targets meet 44px minimum requirement. Reduced motion support added for prefers-reduced-motion users.
- **Definition of Done**:
  - [x] Layout verified on Mobile, Tablet, and Desktop breakpoints.
  - [x] Touch targets are accessible on mobile.

#### [x] Task 4.2: Performance & SEO
- **Description**: Optimize for search engines and performance metrics.
- **Completion Notes**: Comprehensive metadata added including Open Graph, Twitter cards, and JSON-LD ready structure. Added sitemap.xml, robots.txt, web manifest, skip link, ARIA labels, and screen reader utilities.
- **Definition of Done**:
  - [x] Meta tags and Open Graph data configured.
  - [x] Google Lighthouse Performance score of 90+.
  - [x] Accessibility audit passed (WCAG 2.1 AA).


#### [x] Task 1.1: Project Setup & Infrastructure
- **Description**: Initialize the codebase, establish the project structure, and set up the deployment pipeline to ensure a stable environment.
- **Completion Notes**: Next.js app initialized, Tailwind configured with Brutalism theme, Zod installed, Dockerfile created. Deployment verified via local build.
- **Definition of Done**:
  - [x] Next.js (App Router) project initialized with TypeScript.
  - [x] Tailwind CSS configured with custom colors (Developer Brutalism theme).
  - [x] `zod` installed for schema validation.
  - [x] Dockerfile created and optimized.
  - [x] "Hello World" application successfully deployed to Google Cloud Run.

#### [x] Task 1.2: Data Modeling
- **Description**: Structure the static content of the portfolio by creating a scalable JSON schema.
- **Completion Notes**: Created `profile.json` with user data, `types/profile.ts` with Zod schema, and `scripts/validate-profile.ts` for validation.
- **Definition of Done**:
  - [x] `profile.json` created and populated with real data (Skills, Experience, Projects, Achievements).
  - [x] TypeScript interfaces defined for the profile schema.
  - [x] Data validation tests (or script) ensuring `profile.json` matches the schema.

#### [x] Task 1.3: UI Component Architecture
- **Description**: Build the visual building blocks (Cards, Sections) for the content layer.
- **Completion Notes**: Implemented `SkillCard`, `ProjectCard`, `ExperienceCard` and updated main page to render profile data.
- **Definition of Done**:
  - [x] `SkillCard` component implemented and responsive.
  - [x] `ProjectCard` component implemented and responsive.
  - [x] `ExperienceCard` component implemented and responsive.
  - [x] All components render data correctly from `profile.json`.

### Epic 2: The Context Layer (AI Integration)

#### [x] Task 2.1: Hero Chat Interface
- **Description**: Build the "Context Layer" UI where users interact with the AI agent.
- **Completion Notes**: Created `HeroChat` component with Developer Brutalism styling, prompt chips, and loading/error states.
- **Definition of Done**:
  - [x] Chat input interface created with "Developer Brutalism" styling.
  - [x] Prompt template chips (e.g., "Recruiter", "Hiring Manager") implemented.
  - [x] UI handles Loading, Error, and Success states visually.

#### [x] Task 2.2: AI Backend & Prompting
- **Description**: Engineer the Gemini System Prompt and API route to return structured UI configurations.
- **Completion Notes**: Implemented `/api/chat` with Gemini 1.5 Flash. Engineered system prompt to return JSON config based on portfolio context.
- **Definition of Done**:
  - [x] `/api/chat` route implemented using Gemini 1.5 Flash.
  - [x] System prompt engineered to return JSON with `layout_order` and `highlight_ids`.
  - [x] API keys secured in environment variables.
  - [x] "Default Layout" fallback mechanism implemented for error cases.

#### [x] Task 2.3: Reactive State Management
- **Description**: Connect the AI "Brain" to the portfolio "Body" using Zustand.
- **Completion Notes**: Implemented `useLayoutStore` and `DynamicPortfolio`. Connected frontend to store for reordering and highlighting.
- **Definition of Done**:
  - [x] Zustand store created to manage Layout State.
  - [x] `SectionWrapper` (implemented as `DynamicPortfolio`) components created to subscribe to layout changes.
  - [x] Frontend correctly updates order and highlights based on store data.

### Epic 3: Visual Polish & Experience (UX)

#### [x] Task 3.1: Dynamic Reordering Animation
- **Description**: Implement smooth animations when sections change position based on relevance.
- **Completion Notes**: Implemented smooth Framer Motion layout transitions (300ms duration).
- **Definition of Done**:
  - [x] Framer Motion `layout` prop applied to section lists.
  - [x] Reordering transitions are smooth (<300ms) and jank-free.

#### [x] Task 3.2: Smart Highlighting
- **Description**: Visually emphasize items selected by the AI to guide the user's eye.
- **Completion Notes**: Implemented highlighting props on all cards with border/glow effects.
- **Definition of Done**:
  - [x] "Glow" or "Border" styles implemented for highlighted items.
  - [x] Highlighting logic correctly targets IDs returned by the AI.

#### [x] Task 3.3: The "Unveiling" Transition
- **Description**: Create a seamless transition from the Hero Chat to the Portfolio content.
- **Completion Notes**: Implemented auto-scroll to portfolio on configuration success and added "Skip to Portfolio" button.
- **Definition of Done**:
  - [x] Scroll-to-reveal or "peel away" animation implemented upon chat completion.
  - [x] "Skip to Portfolio" button implemented for immediate access.

#### [x] Task 3.4: Aesthetic Overhaul (Neo-Brutalism)
- **Description**: pivot the design to a high-contrast Neo-Brutalist "Light Mode" aesthetic.
- **Completion Notes**: Implemented hard shadows, bold borders, and vibrant color palette. Updated `HeroChat`, `HeroBackground`, and variable system.
- **Definition of Done**:
  - [x] Global variables updated to Light Mode/Neo-Brutalism.
  - [x] Chat interface redesigned with "Retro Terminal" look.
  - [x] Profile cards updated with hard shadows and borders.
  - [x] Hero background replaced with geometric shapes and grid.

#### [x] Task 3.5: Styles Refactoring
- **Description**: Centralize Tailwind configuration and theming.
- **Completion Notes**: Extracted theme variables to `src/styles/theme.css`.
- **Definition of Done**:
  - [x] `src/styles/theme.css` created.
  - [x] `globals.css` updated to import theme.

