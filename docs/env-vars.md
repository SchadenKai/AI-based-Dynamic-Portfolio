# Environment Variables

The following environment variables are used in the AI-based Dynamic Portfolio project.

## Required Variables

*No environmental variables are strictly required to run the static portfolio.*

## Optional Variables

- `AI_PROVIDER`
  - **Description**: The AI provider you want to use for the chat feature. Can be one of: `openai`, `anthropic`, `gemini`, `nebius`, `openrouter`, or `vertexai`.
  - **Used In**: `src/lib/ai.ts`

- `AI_API_KEY`
  - **Description**: The API key for your chosen AI provider.
  - **Used In**: `src/lib/ai.ts`

- `AI_MODEL_OVERRIDE`
  - **Description**: Allows you to override the default model used by the provider (e.g. `gpt-4o`, `claude-3-5-sonnet-latest`).
  - **Used In**: `src/lib/ai.ts`

- `GOOGLE_CLOUD_PROJECT_ID`
  - **Description**: Your Google Cloud Project ID. Required if using `vertexai` as the provider or if maintaining legacy settings. If no provider or config is set, the AI chat will be entirely disabled.
  - **Used In**: `src/app/api/chat/route.ts`, `src/lib/ai.ts`

- `DEV_TO_API_KEY`
  - **Description**: API key for dev.to to fetch your published articles. If not provided, the posts section will gracefully fallback to an empty state.
  - **Used In**: `src/app/api/posts/route.ts`

- `GOOGLE_CLOUD_LOCATION`
  - **Description**: The Google Cloud region for Vertex AI.
  - **Default**: `us-central1`

- `GOOGLE_APPLICATION_CREDENTIALS`
  - **Description**: Absolute path to your Google Cloud service account JSON key file. Required if you are running the project locally with vertexai.

- `GOOGLE_CLIENT_EMAIL`
  - **Description**: The email of your Google Cloud service account. Required for `vertexai` on platforms like Vercel where file-based credentials are not available.

- `GOOGLE_PRIVATE_KEY`
  - **Description**: The private key of your Google Cloud service account. Required alongside `GOOGLE_CLIENT_EMAIL` for `vertexai` on serverless platforms.
