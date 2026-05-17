import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button } from '@/components/ui';

const siteUrl = 'https://sssamacademy.tech';

export const metadata: Metadata = {
  title: 'Full Stack Development Course Gurgaon | SSSAM Academy',
  description: 'Join our Full Stack Development course in Gurgaon with AI-first training, live projects, and placement support for Delhi NCR careers.',
  alternates: {
    canonical: `${siteUrl}/full-stack-development-course-gurgaon`,
  },
  openGraph: {
    title: 'Full Stack Development Course Gurgaon | SSSAM Academy',
    description: 'Join our Full Stack Development course in Gurgaon with AI-first training, live projects, and placement support for Delhi NCR careers.',
    type: 'website',
    url: `${siteUrl}/full-stack-development-course-gurgaon`,
    siteName: 'SSSAM Academy',
    locale: 'en_IN',
    images: [
      {
        url: `${siteUrl}/images/courses/fullstack-6month.webp`,
        width: 1200,
        height: 630,
        alt: 'Full Stack Development Course Gurgaon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Stack Development Course Gurgaon | SSSAM Academy',
    description: 'Join our Full Stack Development course in Gurgaon with AI-first training, live projects, and placement support for Delhi NCR careers.',
    images: [`${siteUrl}/images/courses/fullstack-6month.webp`],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Full Stack Development course',
      description: 'AI-first Full Stack Development course in Gurgaon with live projects, portfolio development, and placement mentoring.',
      provider: {
        '@type': 'Organization',
        name: 'SSSAM Academy',
        sameAs: siteUrl,
      },
      url: `${siteUrl}/full-stack-development-course-gurgaon`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does the Full Stack Development course in Gurgaon cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The course covers React, Node.js, MongoDB, AI-powered tooling, and deployment skills with live projects and placement coaching.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this Full Stack course suitable for beginners?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the course is designed for beginners, freshers, and working professionals who want a career-ready AI-first Full Stack Development course.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the course include placement support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, students receive placement assistance with resume support, mock interviews, and Delhi NCR employer referrals.',
          },
        },
      ],
    },
  ],
};

export default function FullStackDevelopmentCoursePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="bg-slate-950">
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-5xl mx-auto rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <Heading level={1} className="mb-6">Full Stack Development Course Gurgaon</Heading>
              <Text size="lg" className="mb-6 text-slate-300 leading-relaxed">
                Learn Full Stack Development with AI-first training in Gurgaon. Build real applications, master React, Node.js, MongoDB, and get placement support for Delhi NCR jobs.
              </Text>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <Heading level={3} className="text-white">Course Overview</Heading>
                  <Text className="text-slate-300">This Full Stack Development course combines front-end, back-end, database, and deployment skills with AI productivity tools and live project guidance.</Text>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>AI-first web development workflows</li>
                    <li>React, Node.js, Express, MongoDB</li>
                    <li>Deployment, GitHub portfolio, and career support</li>
                  </ul>
                </div>
                <div className="space-y-5">
                  <Heading level={3} className="text-white">Why Choose This Course</Heading>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>Live project-based learning from a Gurugram institute</li>
                    <li>Delhi NCR placement assistance</li>
                    <li>AI-enabled course delivery and resume coaching</li>
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
                  'Live GitHub portfolio projects',
                  'AI-first development skills',
                  'Hands-on full stack mentoring',
                  'Gurugram placement preparation',
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
              <Text className="text-slate-300 leading-relaxed mb-6">Our Full Stack Development course includes resume review, interview coaching, employer referrals, and Delhi NCR placement guidance so you can launch your career faster.</Text>
              <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li>Mock interviews and resume optimization</li>
                <li>Portfolio reviews and live project showcases</li>
                <li>Job-ready preparation for IT roles in Gurugram</li>
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
                    question: 'What makes this Full Stack Development course Gurgaon-focused?',
                    answer: 'The course includes Delhi NCR placement coaching, local industry insights, and live project examples tailored for Gurgaon hiring markets.',
                  },
                  {
                    question: 'How long is the Full Stack Development course?',
                    answer: 'The program is designed for fast skill building with live labs, typically delivered over a flexible multi-week schedule.',
                  },
                  {
                    question: 'Can I join if I am new to programming?',
                    answer: 'Yes, the course is beginner-friendly and includes foundation modules for learners with little or no coding experience.',
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
