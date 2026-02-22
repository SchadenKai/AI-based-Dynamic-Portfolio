# Coding Standards & Guidelines

This document serves as the authoritative source of truth for coding styles, conventions, and best practices for the "The Contextual Architect" project. All AI agents and developers must adhere to these standards to ensure codebase consistency, maintainability, and scalability.

## 1. General Principles
- **DRY (Don't Repeat Yourself)**: Extract reusable logic into hooks, utilities, or components.
- **KISS (Keep It Simple, Stupid)**: Prefer simple, readable solutions over complex abstractions.
- **Single Responsibility**: Each component, function, or module should have one clear purpose.
- **Type Safety**: Leverage TypeScript's full power. Avoid `any` whenever possible.

## 2. Technology Stack & Specifics
- **Framework**: Next.js (App Router). Use Server Components by default.
- **Language**: TypeScript (`.ts`, `.tsx`).
- **Styling**: Tailwind CSS.
- **State Management**: Zustand (Global), React Context (Compound Components).
- **Animation**: Framer Motion.

## 3. Naming Conventions
| Item | Convention | Example |
|------|------------|---------|
| **Directories** | kebab-case | `components/ui`, `lib/utils` |
| **Files (Components)**| PascalCase | `Button.tsx`, `HeroSection.tsx` |
| **Files (Utilities)** | kebab-case | `date-formatter.ts`, `api-client.ts` |
| **Components** | PascalCase | `AppHeader`, `ProjectCard` |
| **Functions** | camelCase | `fetchUserData`, `handleClick` |
| **Variables** | camelCase | `userProfile`, `isLoading` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_ENDPOINT` |
| **Types/Interfaces** | PascalCase | `UserProfile`, `ButtonProps` |

**Note**: Do not use `I` prefix for interfaces (e.g., use `User` not `IUser`). Use `Props` suffix for component props (e.g., `ButtonProps`).

## 4. Project Structure (Next.js App Router)
```text
/
├── app/                  # App Router pages and layouts
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── api/              # API routes
├── components/           # React components
│   ├── ui/               # Generic/Atomic UI components (Buttons, Inputs)
│   ├── features/         # Feature-specific components (Chat, Portfolio)
│   └── shared/           # Components shared across features (Layout wrappers)
├── lib/                  # Utility functions, helpers, constants (No JSX)
├── hooks/                # Custom React hooks
├── types/                # Global type definitions
└── store/                # Zustand stores
```

## 5. React & Next.js Guidelines
- **Server vs Client**: Default to Server Components. Add `'use client'` at the top strictly when using hooks (`useState`, `useEffect`) or event listeners.
- **Functional Components**: Use `export function ComponentName() {}` for top-level definitions to aid stack traces. Arrow functions are acceptable for simple or inline components.
- **Prop Destructuring**: Always destructure props in the function signature.
  ```tsx
  // ✅ Good
  export function Card({ title, children }: CardProps) { ... }
  
  // ❌ Avoid
  export function Card(props: CardProps) { const title = props.title; ... }
  ```
- **Hooks**: Place standard hooks first, then custom hooks. Keep effects simple.

## 6. TypeScript Rules
- **Explicit Return Types**: Explicitly type return values for complex functions/API handlers.
- **No Enums**: Prefer Union Types or `as const` objects over TypeScript Enums (better optimization).
  ```ts
  // ✅ Good
  type Status = 'loading' | 'success' | 'error';
  
  // ❌ Avoid
  enum Status { Loading, Success, Error }
  ```

## 7. Tailwind CSS Styling
- **Utility First**: Use utility classes for almost everything.
- **No Arbitrary Values**: Avoid brackets `w-[245px]` if possible. Update `tailwind.config.ts` theme if a value is reused.
- **Class Sorting**: Logical ordering (Layout -> Box Model -> Typography -> Visuals -> Misc). 
- **Conditions**: Use `clsx` or `cn` (shadcn-like utility) for conditional class names.
  ```tsx
  <div className={cn("flex items-center", isActive && "text-blue-500")} />
  ```

## 8. Code Comments & Documentation
- **Why, Not What**: Comments should explain the reasoning behind complex logic, not describe strictly what the code is doing.
- **JSDoc**: Use JSDoc `/** ... */` for utility functions and complex component props to provide IntelliSense hints.

## 9. Error Handling
- **API Routes**: Wrap logic in `try/catch` blocks. Return structured error responses (status code + message).
- **UI**: Use Error Boundaries for critical sections. Handle `loading` and `error` states explicitly in the UI.

## 10. AI Assistant Protocol
When the AI generates code:
1.  **Context**: Always check existing file headers and imports.
2.  **Consistency**: Follow the patterns present in adjacent files.
3.  **Validation**: Verify no broken imports after refactoring.
