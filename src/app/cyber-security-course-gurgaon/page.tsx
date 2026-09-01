import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button } from '@/components/ui';

const siteUrl = 'https://sssamacademy.tech';

export const revalidate = 604800;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Cyber Security Course Gurgaon | SSSAM Academy',
  description: 'Enroll in the Cyber Security course in Gurgaon with live ethical hacking labs, security training, and placement support for Delhi NCR jobs.',
  alternates: {
    canonical: `${siteUrl}/cyber-security-course-gurgaon`,
  },
  openGraph: {
    title: 'Cyber Security Course Gurgaon | SSSAM Academy',
    description: 'Enroll in the Cyber Security course in Gurgaon with live ethical hacking labs, security training, and placement support for Delhi NCR jobs.',
    type: 'website',
    url: `${siteUrl}/cyber-security-course-gurgaon`,
    siteName: 'SSSAM Academy',
    locale: 'en_IN',
    images: [
      {
        url: `${siteUrl}/images/courses/cyber-security.webp`,
        width: 1200,
        height: 630,
        alt: 'Cyber Security Course Gurgaon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Security Course Gurgaon | SSSAM Academy',
    description: 'Enroll in the Cyber Security course in Gurgaon with live ethical hacking labs, security training, and placement support for Delhi NCR jobs.',
    images: [`${siteUrl}/images/courses/cyber-security.webp`],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Cyber Security course',
      description: 'Cyber Security course in Gurgaon with ethical hacking, threat analysis, and placement readiness for Delhi NCR security careers.',
      provider: {
        '@type': 'Organization',
        name: 'SSSAM Academy',
        sameAs: siteUrl,
      },
      url: `${siteUrl}/cyber-security-course-gurgaon`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does the Cyber Security course include hands-on labs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the course includes live ethical hacking labs, vulnerability scanning, and practical incident response exercises.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this course suitable for working professionals?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we offer flexible batches for working professionals in Gurgaon and Delhi NCR who want to build cyber security skills.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I get placement support after the Cyber Security course?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, placement support includes resume preparation, mock interviews, and employer referrals for Delhi NCR security roles.',
          },
        },
      ],
    },
  ],
};

export default function CyberSecurityCoursePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

        <section className="py-20 md:py-28">
          <Container>
            <div className="max-w-5xl mx-auto rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <Heading level={1} className="mb-6">Cyber Security Course Gurgaon</Heading>
              <Text size="lg" className="mb-6 text-slate-300 leading-relaxed">
                Secure your future with our Cyber Security course in Gurgaon. Learn ethical hacking, vulnerability testing, and incident response with Gurugram placement support.
              </Text>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <Heading level={3} className="text-white">Course Overview</Heading>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>Ethical hacking labs and penetration testing</li>
                    <li>Network security, cloud defense, and SOC practices</li>
                    <li>Placement-focused security career coaching</li>
                  </ul>
                </div>
                <div className="space-y-5">
                  <Heading level={3} className="text-white">Why Choose This Course</Heading>
                  <ul className="list-disc list-inside space-y-3 text-slate-300">
                    <li>Live security labs from a Gurgaon training institute</li>
                    <li>AI-enhanced security tools and modern workflows</li>
                    <li>Career path guidance for Delhi NCR security roles</li>
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
                  'Hands-on ethical hacking experience',
                  'Threat detection and security operations',
                  'Live placement preparation',
                  'Delhi NCR cyber security insights',
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
              <Text className="text-slate-300 leading-relaxed mb-6">Gain placement support with resume review, mock interviews, and employer referrals designed for Gurgaon and Delhi NCR cyber security job seekers.</Text>
              <ul className="list-disc list-inside space-y-3 text-slate-300">
                <li>Resume optimization for security roles</li>
                <li>Mock penetration testing interviews</li>
                <li>Local job market guidance for Gurugram</li>
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
                    question: 'Is this Cyber Security course suitable for beginners?',
                    answer: 'Yes, beginners can join with guided labs and step-by-step security fundamentals.',
                  },
                  {
                    question: 'Does the course include local Gurugram job guidance?',
                    answer: 'Yes. We include placement coaching and employer guidelines for Gurugram and Delhi NCR roles.',
                  },
                  {
                    question: 'How can I contact the Gurugram training center?',
                    answer: 'You can call +91 92170 31899 or visit our Gurugram center in Sector 14 for course details.',
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
