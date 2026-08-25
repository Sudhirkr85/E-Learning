import { MetadataRoute } from "next";
import { seoLocations } from "@/data/seo-locations";
import { seoTopics } from "@/data/seo-topics";
import { seoModifiers } from "@/data/seo-modifiers";

const siteUrl = "https://sssamacademy.tech";
const lastModified = new Date();

// Google limits sitemaps to 50,000 URLs max per file.
// We split our 102,580 URLs into 3 sitemaps (id: 0, 1, 2)
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }];
}

// ── Static core routes ─────────────────────────────────────────────────────────
const coreRoutes: MetadataRoute.Sitemap = [
  { url: `${siteUrl}/`,                                        lastModified, changeFrequency: "weekly",  priority: 1.0 },
  { url: `${siteUrl}/courses`,                                 lastModified, changeFrequency: "weekly",  priority: 0.9 },
  { url: `${siteUrl}/full-stack-development-course-gurgaon`,   lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${siteUrl}/data-science-training-gurgaon`,          lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${siteUrl}/cyber-security-course-gurgaon`,          lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${siteUrl}/digital-marketing-course-gurgaon`,       lastModified, changeFrequency: "monthly", priority: 0.8 },
];

// ── High-priority Gurgaon & Delhi keyword pages ────────────────────────────────
const keywordRoutes: MetadataRoute.Sitemap = [
  { url: `${siteUrl}/it-training-institute-gurgaon`,        lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/computer-courses-gurgaon`,             lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/web-development-course-gurgaon`,       lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/python-course-gurgaon`,                lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/java-course-gurgaon`,                  lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/data-analyst-course-gurgaon`,          lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/machine-learning-course-gurgaon`,      lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/it-training-institute-delhi`,          lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/computer-courses-delhi`,               lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/web-development-course-delhi`,         lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/python-course-delhi`,                  lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/data-science-course-delhi`,            lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/digital-marketing-course-delhi`,       lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/full-stack-development-course-delhi`,  lastModified, changeFrequency: "monthly", priority: 0.9 },
];

// ── Course detail pages ────────────────────────────────────────────────────────
const courseRoutes: MetadataRoute.Sitemap = seoTopics.map((topic) => ({
  url: `${siteUrl}/courses/${topic.courseSlug}`,
  lastModified,
  changeFrequency: "monthly" as const,
  priority: 0.8,
}));

// ── City x Topic pages (178 cities x 32 topics = 5,696 pages) ──────────────────
const cityTopicRoutes: MetadataRoute.Sitemap = seoLocations.flatMap((loc) =>
  seoTopics.map((top) => ({
    url: `${siteUrl}/courses/${loc.city}/${top.topic}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
);

// ── City x Modifier x Topic pages (178 x 17 x 32 = 96,832 pages) ───────────────
const modifierRoutes: MetadataRoute.Sitemap = seoLocations.flatMap((loc) =>
  seoModifiers.flatMap((mod) =>
    seoTopics.map((top) => ({
      url: `${siteUrl}/courses/${loc.city}/${mod.modifier}/${top.topic}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  )
);

// Combine all URLs
const allRoutes: MetadataRoute.Sitemap = [
  ...coreRoutes,
  ...keywordRoutes,
  ...courseRoutes,
  ...cityTopicRoutes,
  ...modifierRoutes,
];

const CHUNK_SIZE = 40000;

export default async function sitemap(props: { id: Promise<{ id: string }> } | { id: number } | { id: string }): Promise<MetadataRoute.Sitemap> {
  const resolved = await Promise.resolve(props);
  const rawId = (resolved as any)?.id;
  const sitemapId = typeof rawId === 'object' && rawId !== null ? Number((await rawId).id) : Number(rawId || 0);

  const start = sitemapId * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;

  return allRoutes.slice(start, end);
}