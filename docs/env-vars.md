# Environment Variables

The following environment variables are used in the AI-based Dynamic Portfolio project.

## Required Variables

*No environmental variables are strictly required to run the static portfolio.*

## Optional Variables

- `GOOGLE_CLOUD_PROJECT_ID`
  - **Description**: Your Google Cloud Project ID. Required to initialize Vertex AI for the AI chat feature. If not set, the AI chat (Hero Section) will be entirely disabled and only the static portfolio will be shown.
  - **Used In**: `src/app/page.tsx`, `src/app/api/chat/route.ts`

- `DEV_TO_API_KEY`
  - **Description**: API key for dev.to to fetch your published articles. If not provided, the posts section will gracefully fallback to an empty state.
  - **Used In**: `src/app/api/posts/route.ts`

- `GOOGLE_CLOUD_LOCATION`
  - **Description**: The Google Cloud region for Vertex AI.
  - **Default**: `us-central1`
  - **Used In**: `src/app/api/chat/route.ts`

- `GOOGLE_APPLICATION_CREDENTIALS`
  - **Description**: Absolute path to your Google Cloud service account JSON key file. Required if you are running the project locally or outside of a Google Cloud environment that provides default application credentials.
  - **Used In**: `@google-cloud/vertexai` (Implicitly used)
