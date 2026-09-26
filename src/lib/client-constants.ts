/**
 * Client-Side Constants & SEO Configuration
 * 
 * This file contains constants that are safe to be used on the client-side
 * and are used to configure the SEO and other metadata of the site.
 */

export const SITE_CONFIG = {
    // Basic SEO
    title: "Kairus Noah Tecson | Founder & Lead AI Engineer",
    titleTemplate: "%s | Kairus Noah Tecson",
    description: "Founder & Lead AI Engineer at Real Solutions PH. Builds production RAG systems, multi-agent orchestration, and real-time voice AI products. Former Head of Engineering at ArnoldAI.",
    siteUrl: "https://schadenkai.space",

    // Author Info
    author: "Kairus Noah Tecson",
    authorUrl: "https://github.com/SchadenKai",
    githubUsername: "SchadenKai", // Used for GitHub stats/contributions
    twitterUsername: "@SchadenKai",

    // Theme & Appearance
    themeColorLight: "#ffffff",
    themeColorDark: "#000000",

    // Open Graph
    ogImage: "/og-image.png",
    ogType: "website",

    // Keywords
    keywords: [
        "AI Software Engineer",
        "RAG Systems",
        "Multi-Agent Orchestration",
        "LangChain",
        "LangGraph",
        "Full Stack Developer",
        "React",
        "Next.js",
        "Python",
        "FastAPI",
        "Machine Learning",
        "Healthcare AI",
        "DevOps",
        "Cloud Engineering",
        "Kairus Noah Tecson",
    ]
};

// Schema.org structure 
export const SCHEMA_ORG = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.author,
    url: SITE_CONFIG.siteUrl,
    alternateName: ["Kairus Noah Tecson Portfolio", "KNT Portfolio"],
};
