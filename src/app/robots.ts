import { MetadataRoute } from "next";

const siteUrl = "https://sssamacademy.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/dashboard/", "/api/", "/checkout/", "/_next/"],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-2.xml`,
      `${siteUrl}/sitemap-3.xml`,
    ],
    host: siteUrl,
  };
}