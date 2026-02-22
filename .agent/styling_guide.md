# Styling Guide: The Contextual Architect

## 1. Design Philosophy
**"Neo-Brutalist Light / The Modern Workshop"**
The design embraces a high-contrast, bold, and energetic aesthetic. It moves away from the subtle "Dark Mode" of the past into a vibrant, clean, and structured interface that feels like a modern creative tool.

*   **Mode**: Light Mode Default (Maximum Contrast).
*   **Vibe**: "Tangible & Bold". Thick borders, hard shadows, vibrant color pops, geometric shapes.
*   **Core Metaphor**: The "Interface" (Chat) commanding the "Workshop" (Portfolio).
*   **Key Behavior**: Tactile. Buttons press down (shadow reduction), cards lift, interactions feel physical.

---

## 2. Color System (Tailwind CSS)

### Base
*   **Background**: `#ffffff` (White) - Clean canvas.
*   **Foreground**: `#000000` (Black) - Primary text and borders.
*   **Surface**: `#ffffff` (White) - Cards and panels.
*   **Border**: `#000000` (Black) - 2px standard width.

### Brand & Accents
*   **Primary (Purple)**: `#8B5CF6` - Used for key actions, user highlights, and "Assistant" presence.
*   **Secondary (Yellow)**: `#FFD600` - High-energy accent, used for headers and attention-grabbing tags.
*   **Accent (Pink)**: `#FF6B6B` - Used for "User" presence or warnings.

### Design Tokens (CSS Variables)
Defined in `src/styles/theme.css`:
*   `--shadow-neo`: `4px 4px 0px 0px #000000` (Hard, offset shadow).
*   `--border-width-neo`: `2px` (Thick, confident lines).
*   `--radius-neo`: `0.5rem` (Slightly rounded, keeping it friendly but structured).

---

## 3. Typography

*   **Font Family**: `Geist Sans` (Modern, geometric sans-serif) for UI, `Geist Mono` for code/tags.
*   **Usage**:
    *   **Headings**: Bold, Uppercase, often accompanied by icons.
    *   **Body**: Medium weight, high readability/contrast (`text-gray-800`).
    *   **Mono**: Used for "System" text, tags, and data values.

---

## 4. Component Architecture & Styling

### 4.1 The Context Layer (Chat)
*   **Container**: Retro-futuristic terminal window.
    *   `border-2 border-black`, `shadow-neo`, `rounded-lg`.
    *   **Header**: Vibrant Yellow (`bg-secondary`), bold text, window controls.
*   **Bubbles**:
    *   **Assistant**: White bubble, Black border, hard shadow.
    *   **User**: Purple bubble (`bg-primary`), White text, Black border.
*   **Interaction**: Inputs and buttons feature specific hover/active states that "press" the element (translating it to cover its shadow).

### 4.2 The Content Layer (Portfolio Cards)
*   **Common Card Style**:
    *   `bg-white`
    *   `border-2 border-black`
    *   `shadow-none` (default) -> `shadow-neo` (hover)
    *   `transition-all duration-300`
*   **Highlighting**:
    *   Instead of a glow, highlights use a **Background Tint** (e.g., `bg-secondary/10`) and a permanent **Hard Shadow** to stand out.

---

## 5. Animation & Motion
*   **Liquid Hero**: A fluid, organic shape connecting the Chat to the Portfolio, juxtaposing the rigid boxes of the content.
*   **Transitions**: Snappy. Elements pop in.
*   **Hover**: Physical displacement (move up/down) rather than just color fade.

---

## 6. Implementation Notes
*   **Theme File**: All core variables and `@theme` definitions are centralized in `src/styles/theme.css`.
*   **Tailwind Config**: We use Tailwind v4 CSS-first configuration.
*   **Icons**: React Icons (Fa6) used with bold, contrasting colors.
