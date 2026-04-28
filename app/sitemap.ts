import { MetadataRoute } from "next";

const BASE = "https://partnerlivingku.id";

const LAUNCH_DATE = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "", priority: 1, freq: "daily" as const, lastMod: now },
    { path: "/privacy-policy", priority: 0.3, freq: "monthly" as const, lastMod: LAUNCH_DATE },
    { path: "/terms-of-service", priority: 0.3, freq: "monthly" as const, lastMod: LAUNCH_DATE },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, freq, lastMod } of pages) {
    entries.push(
      { url: `${BASE}${path}`, lastModified: lastMod, changeFrequency: freq, priority },
      { url: `${BASE}/en${path}`, lastModified: lastMod, changeFrequency: freq, priority: priority * 0.9 }
    );
  }

  return entries;
}
