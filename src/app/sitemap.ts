import { MetadataRoute } from 'next';

const siteUrl = 'https://sssamacademy.tech';

const lastModified = new Date();

const routes = [
  {
    url: '/',
    changeFrequency: 'weekly' as const,
    priority: 1,
  },
  {
    url: '/courses',
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  },
  {
    url: '/full-stack-development-course-gurgaon',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: '/data-science-training-gurgaon',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
  {
    url: '/cyber-security-course-gurgaon',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ url, changeFrequency, priority }) => ({
    url: `${siteUrl}${url}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
