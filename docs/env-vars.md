# Environment Variables

The following environment variables are used in the AI-based Dynamic Portfolio project.

## Required Variables

- `DEV_TO_API_KEY`
  - **Description**: API key for dev.to to fetch your published articles.
  - **Used In**: `src/app/api/posts/route.ts`

- `GOOGLE_CLOUD_PROJECT_ID`
  - **Description**: Your Google Cloud Project ID. Required to initialize Vertex AI for the AI chat feature.
  - **Used In**: `src/app/api/chat/route.ts`

## Optional Variables

- `GOOGLE_CLOUD_LOCATION`
  - **Description**: The Google Cloud region for Vertex AI.
  - **Default**: `us-central1`
  - **Used In**: `src/app/api/chat/route.ts`

- `GOOGLE_APPLICATION_CREDENTIALS`
  - **Description**: Absolute path to your Google Cloud service account JSON key file. Required if you are running the project locally or outside of a Google Cloud environment that provides default application credentials.
  - **Used In**: `@google-cloud/vertexai` (Implicitly used)
