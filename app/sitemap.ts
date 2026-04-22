import type { MetadataRoute } from "next";

const BASE = "https://www.bmkstudio.be";

const slugs = [
  "le-restaurant",
  "qamees-place",
  "nutfully",
  "frange",
  "restaurant-2",
  "travaux-personnels",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── FR ──
    { url: `${BASE}`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/travail`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...slugs.map((slug) => ({
      url: `${BASE}/travail/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${BASE}/formations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },

    // ── EN ──
    { url: `${BASE}/en`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE}/en/travail`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    ...slugs.map((slug) => ({
      url: `${BASE}/en/travail/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
    { url: `${BASE}/en/formations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/en/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.55 },
  ];
}
