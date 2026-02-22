# Comprehensive Content & Customization Guide

This guide explains how to fully customize the AI-based Dynamic Portfolio to make it your own. The primary philosophy behind this project is **Content-Code Separation**: your personal data lives in JSON, and the application simply renders it.

## 1. Updating Your Profile Data

The centralized brain of your static content is located at:
**`src/data/profile.json`**

This file generally follows the schema of [JSON Resume](https://jsonresume.org/), with some custom additions if necessary.

### How to modify sections:

- **`basics`**: Update your name, title, email, phone, website, and the short "About Me" summary.
- **`work`**: Add or remove objects in this array for your work experience. Ensure you provide `"name"`, `"position"`, `"startDate"`, `"endDate"`, and a `"summary"`.
- **`education`**: Update your schooling details.
- **`projects`**: Add your personal or professional projects here. 
- **`skills`**: Update technical skills. Note that these are arrays of strings under a specific `"name"` category (e.g., "Languages", "Frameworks").

*Tip: If you already have a JSON Resume `resume.json` file, you can likely copy-paste the majority of it directly into `profile.json`.*

## 2. Managing Environment Variables

Ensure you have your APIs set up. Please reference the [Environment Variables Guide](./env-vars.md) for detailed instructions on what each variable does and where to get the API keys.

## 3. Customizing the AI Behavior

The standout feature of this portfolio is the subjective re-ordering and highlighting of sections based on user interaction, powered by Google Vertex AI.

The prompt that instructs the AI how to behave is located in:
**`src/app/api/chat/route.ts`**

### Modifying the AI prompt & System Messages:

If you want the AI to emphasize different things (for example, if you are a Designer instead of a Developer, you might want the AI to prioritize "Projects" instead of "Skills" for certain queries), or if you want to alter the default error/rate-limit messages, you can now locate all of these settings in:
**`src/lib/constants.ts`**

```typescript
// Look for this block in src/lib/constants.ts
export const getSystemInstructions = (context: string) => `
You are an AI Portfolio Architect...
...
`;
```

You can change the logic here to match your specific career goals or the persona you want your AI assistant to take on. You can also edit the arrays like `ERROR_MESSAGES` or adjust the `RATE_LIMIT` configuration at the top of the file.

## 4. Customizing Styles (Tailwind CSS)

The project utilizes Tailwind CSS. Global styles and CSS variables (such as brand colors) are located in:
**`src/app/globals.css`** (or similar global CSS file).

You can modify the primary/secondary colors there, or configure your theme directly inside `tailwind.config.ts`.

## 5. Adding New Sections

If you want to add an entirely new section (e.g., "Volunteering"):
1. Add the data array to `src/data/profile.json`.
2. Update the TypeScript interface in `src/types/profile.ts` so the application recognizes the new data.
3. Create a new React component under `src/components/` to render this data.
4. Import and render the component in `src/app/page.tsx`.
5. Finally, update the `layout_order` array instructions in `src/app/api/chat/route.ts` so the AI knows it can dynamically move your new section!
