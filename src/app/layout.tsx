import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/components/providers/ThemeProvider";
import { SCHEMA_ORG } from "@/lib/client-constants";

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

import { SITE_CONFIG } from "@/lib/client-constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: SITE_CONFIG.title,
    template: SITE_CONFIG.titleTemplate,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.authorUrl }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.author,
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
    type: SITE_CONFIG.ogType as "website",
    locale: "en_US",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.author,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: SITE_CONFIG.twitterUsername,
  },

  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_CONFIG.siteUrl,
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
            __html: JSON.stringify(SCHEMA_ORG),
          }}
        />
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
