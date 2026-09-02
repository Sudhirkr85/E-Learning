import { MetadataRoute } from "next";
import { seoLocations } from "@/data/seo-locations";
import { seoTopics } from "@/data/seo-topics";

const siteUrl = "https://sssamacademy.tech";
const lastModified = new Date();

export const dynamic = "force-static";
export const revalidate = 604800; // 7-day Vercel Edge CDN Cache

// ── 1. Static core & trust routes ────────────────────────────────────────────────
const coreRoutes: MetadataRoute.Sitemap = [
  { url: `${siteUrl}/`,                   lastModified, changeFrequency: "daily",   priority: 1.0 },
  { url: `${siteUrl}/courses`,            lastModified, changeFrequency: "daily",   priority: 0.95 },
  { url: `${siteUrl}/privacy-policy`,     lastModified, changeFrequency: "monthly", priority: 0.4 },
  { url: `${siteUrl}/terms`,              lastModified, changeFrequency: "monthly", priority: 0.4 },
];

// ── 2. Course detail pages ───────────────────────────────────────────────────
const uniqueCourseSlugs = Array.from(new Set(seoTopics.map((t) => t.courseSlug)));
const courseRoutes: MetadataRoute.Sitemap = uniqueCourseSlugs.map((slug) => ({
  url: `${siteUrl}/courses/${slug}`,
  lastModified,
  changeFrequency: "weekly" as const,
  priority: 0.9,
}));

// ── 3. High-Priority Curated Gurugram & Delhi NCR Hub x Core Topic pages ──────
const coreTopics = seoTopics.slice(0, 6);
const cityTopicRoutes: MetadataRoute.Sitemap = seoLocations.flatMap((loc) =>
  coreTopics.map((top) => ({
    url: `${siteUrl}/courses/${loc.city}/${top.topic}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...coreRoutes,
    ...courseRoutes,
    ...cityTopicRoutes,
  ];
}