import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://schadenkai.space"),
  title: {
    default: "Kairus Noah Tecson | Senior AI Software Engineer",
    template: "%s | Kairus Noah Tecson",
  },
  description:
    "Senior AI Software Engineer specializing in Production RAG Systems and Multi-Agent Orchestration for Healthcare and Defense. Expert in LangChain, LangGraph, and full AI lifecycle development.",
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
  ],
  authors: [{ name: "Kairus Noah Tecson", url: "https://github.com/SchadenKai" }],
  creator: "Kairus Noah Tecson",
  publisher: "Kairus Noah Tecson",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schadenkai.space/",
    siteName: "Kairus Noah Tecson",
    title: "Kairus Noah Tecson | Senior AI Software Engineer",
    description:
      "Senior AI Software Engineer specializing in Production RAG Systems and Multi-Agent Orchestration. Building intelligent systems for Healthcare and Defense.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kairus Noah Tecson - Senior AI Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kairus Noah Tecson | Senior AI Software Engineer",
    description:
      "Senior AI Software Engineer specializing in Production RAG Systems and Multi-Agent Orchestration.",
    images: ["/og-image.png"],
    creator: "@SchadenKai",
  },

  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://schadenkai.space/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for third-party origins */}
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Kairus Noah Tecson",
              url: "https://schadenkai.space",
              alternateName: ["Kairus Noah Tecson Portfolio", "KNT Portfolio"],
            }),
          }}
        />
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
