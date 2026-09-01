import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button } from '@/components/ui';

const siteUrl = 'https://sssamacademy.tech';

export const revalidate = 604800;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Data Science Training Gurgaon | SSSAM Academy',
  description: 'Join Data Science training in Gurgaon with Python, machine learning, and placement support for Delhi NCR analytics careers.',
  alternates: {
    canonical: `${siteUrl}/data-science-training-gurgaon`,
  },
  openGraph: {
    title: 'Data Science Training Gurgaon | SSSAM Academy',
    description: 'Join Data Science training in Gurgaon with Python, machine learning, and placement support for Delhi NCR analytics careers.',
    type: 'website',
    url: `${siteUrl}/data-science-training-gurgaon`,
    siteName: 'SSSAM Academy',
    locale: 'en_IN',
    images: [
      {
        url: `${siteUrl}/images/courses/data-science.webp`,
        width: 1200,
        height: 630,
        alt: 'Data Science Training Gurgaon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Science Training Gurgaon | SSSAM Academy',
    description: 'Join Data Science training in Gurgaon with Python, machine learning, and placement support for Delhi NCR analytics careers.',
    images: [`${siteUrl}/images/courses/data-science.webp`],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Data Science training',
      description: 'Data Science training in Gurgaon with Python, machine learning, analytics, and portfolio projects for Delhi NCR job seekers.',
      provider: {
        '@type': 'Organization',
        name: 'SSSAM Academy',
        sameAs: siteUrl,
      },
      url: `${siteUrl}/data-science-training-gurgaon`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What topics does the Data Science training cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The training covers Python, Pandas, machine learning, model deployment, analytics, and dashboard reporting.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is placement assistance part of the course?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, placement assistance includes resume review, mock interviews, and employer introductions targeted for Delhi NCR analytics roles.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I enroll from outside Gurugram?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, our Data Science training is available online for Delhi NCR students and includes support from the Gurugram institute team.',
          },
        },
      ],
    },
  ],
};

export default function DataScienceTrainingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-5xl mx-auto rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <Heading level={1} className="mb-6">Data Science Training Gurgaon</Heading>
              <Text size="lg" className="mb-6 text-slate-300 leading-relaxed">
                Accelerate your analytics career with Data Science training in Gurgaon. Learn Python, machine learning, and business intelligence with real-world projects and placement support.
              </Text>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <Heading level={3} className="text-white">What You Learn</Heading>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>Python, data processing, and machine learning models</li>
                    <li>Power BI, visualization, and analytics dashboards</li>
                    <li>Placement-ready projects aligned with Delhi NCR hiring</li>
                  </ul>
                </div>
                <div className="space-y-5">
                  <Heading level={3} className="text-white">Why Enroll</Heading>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>Live project-based Data Science training</li>
                    <li>Guidance for Gurugram and Gurgaon analytics roles</li>
                    <li>AI-first curriculum with placement support</li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button href="/courses" variant="primary" size="lg">View Course Schedule</Button>
                <Button href="https://maps.google.com/?q=M24+Ground+Floor+Near+SBI+Bank+Old+DLF+Colony+Sector+14+Gurugram+122001" variant="outline" size="lg">Visit Our Gurugram Team</Button>
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
                  'Real data science case studies',
                  'Python and ML model deployment',
                  'Portfolio-ready analytics projects',
                  'Gurugram placement coaching',
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
              <Text className="text-slate-300 leading-relaxed mb-6">Our Data Science training includes interview preparation, resume support, and Delhi NCR employer guidance so you can graduate with confidence.</Text>
              <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li>Resume and portfolio refinement</li>
                <li>Mock analytical case study interviews</li>
                <li>Employer-ready document preparation</li>
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
                    question: 'What makes this Data Science training Gurgaon-based?',
                    answer: 'The course is taught with local hiring insights, Delhi NCR placement coaching, and live projects matched to Gurugram analytics roles.',
                  },
                  {
                    question: 'Is this training suitable for beginners?',
                    answer: 'Yes, the program is beginner-friendly and includes foundational Python and data analytics modules.',
                  },
                  {
                    question: 'Do I get help with analytics portfolios?',
                    answer: 'Yes, our training includes live portfolio projects and project review sessions for job applications.',
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
