import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const BASE = "https://portfolio-imran-ansari.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, priority: 1 },
    { url: `${BASE}/resume`, lastModified: now, priority: 0.8 },
    ...PROJECTS.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
