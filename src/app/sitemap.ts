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
  { url: `${siteUrl}/`,                                        lastModified, changeFrequency: "daily",   priority: 1.0 },
  { url: `${siteUrl}/courses`,                                 lastModified, changeFrequency: "daily",   priority: 0.9 },
  { url: `${siteUrl}/full-stack-development-course-gurgaon`,   lastModified, changeFrequency: "weekly",  priority: 0.8 },
  { url: `${siteUrl}/data-science-training-gurgaon`,          lastModified, changeFrequency: "weekly",  priority: 0.8 },
  { url: `${siteUrl}/cyber-security-course-gurgaon`,          lastModified, changeFrequency: "weekly",  priority: 0.8 },
  { url: `${siteUrl}/digital-marketing-course-gurgaon`,       lastModified, changeFrequency: "weekly",  priority: 0.8 },
];

// ── 2. High-priority keyword landing routes ────────────────────────────────────
const keywordRoutes: MetadataRoute.Sitemap = [
  { url: `${siteUrl}/it-training-institute-gurgaon`,        lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/computer-courses-gurgaon`,             lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/web-development-course-gurgaon`,       lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/python-course-gurgaon`,                lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/java-course-gurgaon`,                  lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/data-analyst-course-gurgaon`,          lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/machine-learning-course-gurgaon`,      lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/it-training-institute-delhi`,          lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/computer-courses-delhi`,               lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/web-development-course-delhi`,         lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/python-course-delhi`,                  lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/data-science-course-delhi`,            lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/digital-marketing-course-delhi`,       lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/full-stack-development-course-delhi`,  lastModified, changeFrequency: "weekly",  priority: 0.9 },
];

// ── 3. Course detail pages ───────────────────────────────────────────────────
const uniqueCourseSlugs = Array.from(new Set(seoTopics.map((t) => t.courseSlug)));
const courseRoutes: MetadataRoute.Sitemap = uniqueCourseSlugs.map((slug) => ({
  url: `${siteUrl}/courses/${slug}`,
  lastModified,
  changeFrequency: "weekly" as const,
  priority: 0.85,
}));

// ── 4. City x Topic pages (50 locations x 20 topics = 1,000 URLs) ─────────────
const cityTopicRoutes: MetadataRoute.Sitemap = seoLocations.flatMap((loc) =>
  seoTopics.map((top) => ({
    url: `${siteUrl}/courses/${loc.city}/${top.topic}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }))
);

// ── 5. City x Modifier x Topic pages (Targeted up to Google's 50,000 URL limit) ─
const MAX_SITEMAP_URLS = 50000;
const reservedSlots = coreRoutes.length + keywordRoutes.length + courseRoutes.length + cityTopicRoutes.length;
const maxModifierSlots = MAX_SITEMAP_URLS - reservedSlots;

// Generate all modifier permutations (50 locations x 50 modifiers x 20 topics = 50,000 combinations)
const allModifierRoutes: MetadataRoute.Sitemap = [];

for (const loc of seoLocations) {
  for (const mod of seoModifiers) {
    for (const top of seoTopics) {
      if (allModifierRoutes.length >= maxModifierSlots) break;
      allModifierRoutes.push({
        url: `${siteUrl}/courses/${loc.city}/${mod.modifier}/${top.topic}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.65,
      });
    }
    if (allModifierRoutes.length >= maxModifierSlots) break;
  }
  if (allModifierRoutes.length >= maxModifierSlots) break;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...coreRoutes,
    ...keywordRoutes,
    ...courseRoutes,
    ...cityTopicRoutes,
    ...allModifierRoutes,
  ];
}