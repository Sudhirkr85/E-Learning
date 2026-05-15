import { MetadataRoute } from 'next';

const siteUrl = 'https://sssamacademy.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/full-stack-development-course-gurgaon`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/data-science-training-gurgaon`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/cyber-security-course-gurgaon`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/digital-marketing-course-gurgaon`,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/courses`,
      lastModified: new Date(),
    },
  ];
}
