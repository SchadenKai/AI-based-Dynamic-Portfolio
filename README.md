# AI-based Dynamic Portfolio

A modern, dynamic portfolio built with [Next.js](https://nextjs.org), designed to uniquely tailor content presentation using AI.

## Features

- **Dynamic Layout:** Uses Google Vertex AI (Gemini) to categorize and prioritize sections based on visitor interaction.
- **Data-Driven:** All content is powered by a central `profile.json` (similar to JSON Resume format).
- **SEO & Metadata Control:** All SEO configurations (Titles, Descriptions, Keywords, OpenGraph data) are centralized in a single configuration file.
- **Responsive & Accessible:** Built with modern CSS techniques for seamless experiences on all devices.
- **Dev.to Integration:** Fetches your latest posts from Dev.to automatically.

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd new-year-new-you-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn / pnpm / bun install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Required for fetching dev.to articles
   DEV_TO_API_KEY=your_dev_to_api_key

   # Required for the AI chat logic
   GOOGLE_CLOUD_PROJECT_ID=your_gcp_project_id
   GOOGLE_CLOUD_LOCATION=us-central1
   ```
   *For details on the environment variables, see [Environment Variables Guide](./docs/env-vars.md).*

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📝 How to Update the Content (The Easy Way)

The content of this portfolio is entirely separated from the code, making it extremely easy to update without touching any React components.

All of your personal information (experience, projects, skills, education) lives in a single JSON file:
👉 **`src/data/profile.json`**

### Quick Steps:

1. Open `src/data/profile.json` in your editor.
2. Edit the text fields (e.g., `"name"`, `"summary"`, `"company"`, etc.) with your own information.
3. Save the file. The site will instantly reflect your new content!

For a more comprehensive, step-by-step tutorial on customizing the AI and advanced data updates, please read the **[Comprehensive Content Update Guide](./docs/content-update-guide.md)**.
