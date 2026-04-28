import { MetadataRoute } from "next";

const BASE = "https://partnerlivingku.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, freq: "daily" as const },
    { path: "/privacy-policy", priority: 0.3, freq: "monthly" as const },
    { path: "/terms-of-service", priority: 0.3, freq: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, freq } of pages) {
    entries.push(
      { url: `${BASE}${path}`, lastModified: new Date(), changeFrequency: freq, priority },
      { url: `${BASE}/en${path}`, lastModified: new Date(), changeFrequency: freq, priority: priority * 0.9 }
    );
  }

  return entries;
}
