import { seoLocations } from "@/data/seo-locations";
import { seoTopics } from "@/data/seo-topics";
import { seoModifiers } from "@/data/seo-modifiers";

const siteUrl = "https://sssamacademy.tech";
const lastModified = new Date().toISOString();

export const dynamic = "force-static";
export const revalidate = 86400;

export async function GET() {
  const part3Locations = seoLocations.slice(120);

  const urls: string[] = [];
  for (const loc of part3Locations) {
    for (const mod of seoModifiers) {
      for (const top of seoTopics) {
        urls.push(`${siteUrl}/courses/${loc.city}/${mod.modifier}/${top.topic}`);
      }
    }
  }

  const xmlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}