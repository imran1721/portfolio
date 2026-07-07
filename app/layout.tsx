import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imran.ansari.vibin.click"),
  title: {
    default: "Imran Ansari — Senior Full-Stack Engineer",
    template: "%s · Imran Ansari",
  },
  description:
    "Senior Full-Stack Engineer building agentic AI assistants and geospatial platforms. React 19, TypeScript, Python (FastAPI), Deck.gl, GCP.",
  keywords: [
    "Imran Ansari",
    "Senior Full-Stack Engineer",
    "Agentic AI",
    "Geospatial",
    "React",
    "TypeScript",
    "FastAPI",
    "Deck.gl",
    "BigQuery",
    "PostGIS",
  ],
  authors: [{ name: "Imran Ansari" }],
  openGraph: {
    title: "Imran Ansari — Senior Full-Stack Engineer",
    description:
      "Agentic AI & Geospatial Platforms. SmartMarket Platform, Google RMI, and more.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
