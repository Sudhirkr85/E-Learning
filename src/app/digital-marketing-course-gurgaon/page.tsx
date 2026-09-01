import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button } from '@/components/ui';

const siteUrl = 'https://sssamacademy.tech';

export const revalidate = 604800;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Digital Marketing Course Gurgaon | SSSAM Academy',
  description: 'Join our Digital Marketing course in Gurgaon with SEO, Google Ads, social media, and placement support for Delhi NCR digital careers.',
  alternates: {
    canonical: `${siteUrl}/digital-marketing-course-gurgaon`,
  },
  openGraph: {
    title: 'Digital Marketing Course Gurgaon | SSSAM Academy',
    description: 'Join our Digital Marketing course in Gurgaon with SEO, Google Ads, social media, and placement support for Delhi NCR digital careers.',
    type: 'website',
    url: `${siteUrl}/digital-marketing-course-gurgaon`,
    siteName: 'SSSAM Academy',
    locale: 'en_IN',
    images: [
      {
        url: `${siteUrl}/images/courses/digital-marketing.webp`,
        width: 1200,
        height: 630,
        alt: 'Digital Marketing Course Gurgaon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Course Gurgaon | SSSAM Academy',
    description: 'Join our Digital Marketing course in Gurgaon with SEO, Google Ads, social media, and placement support for Delhi NCR digital careers.',
    images: [`${siteUrl}/images/courses/digital-marketing.webp`],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Digital Marketing institute',
      description: 'Digital Marketing institute program in Gurgaon with SEO, Google Ads, social media, analytics, and campaign projects.',
      provider: {
        '@type': 'Organization',
        name: 'SSSAM Academy',
        sameAs: siteUrl,
      },
      url: `${siteUrl}/digital-marketing-course-gurgaon`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does the Digital Marketing course focus on?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The course focuses on SEO, Google Ads, social media marketing, analytics, and performance campaigns for Delhi NCR businesses.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does this course include placement support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer placement guidance and job readiness support for digital marketing roles in Gurgaon and Delhi NCR.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I start the course from outside Gurugram?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the Digital Marketing course supports online learners across Delhi NCR, with Gurugram institute mentorship and live sessions.',
          },
        },
      ],
    },
  ],
};

export default function DigitalMarketingCoursePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-5xl mx-auto rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <Heading level={1} className="mb-6">Digital Marketing Course Gurgaon</Heading>
              <Text size="lg" className="mb-6 text-slate-300 leading-relaxed">
                Master digital marketing for Gurgaon businesses with our practical course. Learn SEO, Google Ads, social media, analytics, and placement support for Delhi NCR careers.
              </Text>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <Heading level={3} className="text-white">Course Overview</Heading>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>SEO, Google Ads and social media strategies</li>
                    <li>Live campaign creation and analytics</li>
                    <li>Placement-ready digital marketing skills</li>
                  </ul>
                </div>
                <div className="space-y-5">
                  <Heading level={3} className="text-white">Why Enroll</Heading>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>Practical Gurgaon digital marketing training</li>
                    <li>Industry-relevant campaigns and case studies</li>
                    <li>Local placement coaching for Delhi NCR roles</li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href="/courses" variant="primary" size="lg">View Course Details</Button>
                <Button href="https://maps.google.com/?q=M24+Ground+Floor+Near+SBI+Bank+Old+DLF+Colony+Sector+14+Gurugram+122001" variant="outline" size="lg">Visit Gurugram Center</Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 bg-slate-950">
          <Container>
            <div className="max-w-5xl mx-auto space-y-8">
              <Heading level={2}>Course Benefits</Heading>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  'SEO and Google Ads expertise',
                  'Live marketing campaign projects',
                  'Analytics-based decision making',
                  'Gurgaon placement support',
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-300 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-5xl mx-auto rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <Heading level={2}>Placement Support</Heading>
              <Text className="text-slate-300 leading-relaxed mb-6">Our digital marketing course includes placement coaching, resume support, and local job guidance for Delhi NCR digital roles.</Text>
              <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li>Digital marketing resume optimization</li>
                <li>Portfolio review with campaign case studies</li>
                <li>Interview preparation for Gurugram agencies</li>
              </ul>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 bg-slate-950">
          <Container>
            <div className="max-w-5xl mx-auto rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <Heading level={2} className="mb-6">Frequently Asked Questions</Heading>
              <div className="space-y-4">
                {[
                  {
                    question: 'Does the Digital Marketing course include real campaign work?',
                    answer: 'Yes, the course includes live campaign projects, SEO, and analytics practice for Delhi NCR businesses.',
                  },
                  {
                    question: 'Can I join from outside Gurgaon?',
                    answer: 'Yes, online batches are available for students across Delhi NCR with local Gurugram support.',
                  },
                  {
                    question: 'Will I receive placement assistance?',
                    answer: 'Yes, placement support includes interview preparation, employer referrals, and portfolio review.',
                  },
                ].map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6">
                    <Heading level={3} className="text-white mb-3">{faq.question}</Heading>
                    <Text className="text-slate-300">{faq.answer}</Text>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
