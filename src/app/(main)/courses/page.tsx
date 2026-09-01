import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { CoursesGrid } from '@/components/sections';
import { getPublishedCourses, getComingSoonCourses } from '@/lib/courses';

const siteUrl = 'https://sssamacademy.tech';
const pageTitle = 'All IT & AI Training Courses in Gurugram | SSSAM Academy';
const pageDescription = 'Browse all professional IT courses at SSSAM Academy Gurugram including Full Stack Development, Data Science, Python, Power BI, Cyber Security & Digital Marketing with 100% placement support.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${siteUrl}/courses`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    url: `${siteUrl}/courses`,
    siteName: 'SSSAM Academy',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
  },
};

export const revalidate = 86400; // 24-Hour ISR Cache

export default async function CoursesPage() {
  // Fetch courses dynamically with fallback
  const { courses: publishedCourses } = await getPublishedCourses();
  const { courses: comingSoonCourses } = await getComingSoonCourses();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'All Courses', item: `${siteUrl}/courses` },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Professional IT Training Courses in Gurugram',
        itemListElement: publishedCourses.map((c, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: c.title,
          url: `${siteUrl}/courses/${c.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Published Courses */}
      {publishedCourses.length > 0 && (
        <CoursesGrid
          courses={publishedCourses}
          title="All Career Training Programs"
          description="Industry-aligned training with live practical classes in Sector 14 Gurugram and 100% placement coaching."
        />
      )}

      {/* Coming Soon Courses */}
      {comingSoonCourses.length > 0 && (
        <CoursesGrid
          courses={comingSoonCourses}
          title="Upcoming Advanced Batches"
          description="Upcoming high-demand AI and Cloud computing programs."
        />
      )}

      <Footer />
    </div>
  );
}
