import { MetadataRoute } from "next";
import { seoLocations } from "@/data/seo-locations";
import { seoTopics } from "@/data/seo-topics";
import { seoModifiers } from "@/data/seo-modifiers";

const siteUrl = "https://sssamacademy.tech";
const lastModified = new Date();

export const dynamic = "force-static";
export const revalidate = 604800; // 7-day Vercel Edge CDN Cache

// ── 1. Static core routes ───────────────────────────────────────────────────────
const coreRoutes: MetadataRoute.Sitemap = [
  { url: `${siteUrl}/`,                   lastModified, changeFrequency: "daily",   priority: 1.0 },
  { url: `${siteUrl}/courses`,            lastModified, changeFrequency: "daily",   priority: 0.95 },
  { url: `${siteUrl}/verify-certificate`, lastModified, changeFrequency: "monthly", priority: 0.6 },
];

// ── 2. Course detail pages ───────────────────────────────────────────────────
const uniqueCourseSlugs = Array.from(new Set(seoTopics.map((t) => t.courseSlug)));
const courseRoutes: MetadataRoute.Sitemap = uniqueCourseSlugs.map((slug) => ({
  url: `${siteUrl}/courses/${slug}`,
  lastModified,
  changeFrequency: "weekly" as const,
  priority: 0.9,
}));

// ── 3. High-Priority Gurugram & Delhi NCR City x Topic pages ─────────────────
const cityTopicRoutes: MetadataRoute.Sitemap = seoLocations.flatMap((loc) =>
  seoTopics.map((top) => ({
    url: `${siteUrl}/courses/${loc.city}/${top.topic}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))
);

// ── 4. City x Modifier x Topic pages (Targeted up to Google's 50,000 URL limit) ─
const MAX_SITEMAP_URLS = 50000;
const reservedSlots = coreRoutes.length + courseRoutes.length + cityTopicRoutes.length;
const maxModifierSlots = MAX_SITEMAP_URLS - reservedSlots;

// Generate all modifier permutations (50 locations x 50 modifiers x 40+ topics)
const allModifierRoutes: MetadataRoute.Sitemap = [];

for (const loc of seoLocations) {
  for (const mod of seoModifiers) {
    for (const top of seoTopics) {
      if (allModifierRoutes.length >= maxModifierSlots) break;
      allModifierRoutes.push({
        url: `${siteUrl}/courses/${loc.city}/${mod.modifier}/${top.topic}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      });
    }
    if (allModifierRoutes.length >= maxModifierSlots) break;
  }
  if (allModifierRoutes.length >= maxModifierSlots) break;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...coreRoutes,
    ...courseRoutes,
    ...cityTopicRoutes,
    ...allModifierRoutes,
  ];
}