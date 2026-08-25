import { MetadataRoute } from "next";
import { seoLocations } from "@/data/seo-locations";
import { seoTopics } from "@/data/seo-topics";
import { seoModifiers } from "@/data/seo-modifiers";

const siteUrl = "https://sssamacademy.tech";
const lastModified = new Date();

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
  // 🔴 Gurgaon — Most searched keywords
  { url: `${siteUrl}/it-training-institute-gurgaon`,        lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/computer-courses-gurgaon`,             lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/web-development-course-gurgaon`,       lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/python-course-gurgaon`,                lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/java-course-gurgaon`,                  lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/data-analyst-course-gurgaon`,          lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${siteUrl}/machine-learning-course-gurgaon`,      lastModified, changeFrequency: "monthly", priority: 0.9 },
  // 🔵 Delhi — Most searched keywords
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

// ── City x Topic pages (30 cities x 8 topics = 240 pages) ─────────────────────
const cityTopicRoutes: MetadataRoute.Sitemap = seoLocations.flatMap((loc) =>
  seoTopics.map((top) => ({
    url: `${siteUrl}/courses/${loc.city}/${top.topic}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))
);

// ── City x Modifier x Topic pages (30 x 6 x 8 = 1,440 pages) ─────────────────
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

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...coreRoutes,
    ...keywordRoutes,
    ...courseRoutes,
    ...cityTopicRoutes,
    ...modifierRoutes,
  ];
}