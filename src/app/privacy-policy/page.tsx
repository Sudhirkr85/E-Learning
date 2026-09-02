import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text } from '@/components/ui';
import { SITE_CONFIG } from '@/constants';

const siteUrl = 'https://sssamacademy.tech';

export const metadata: Metadata = {
  title: 'Privacy Policy - SSSAM Academy',
  description: 'Learn how SSSAM Academy collects, protects, and uses student data for IT and AI training programs in Sector 14 Gurugram.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      <main className="py-16 md:py-24">
        <Container className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <span className="inline-block bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
              Legal & Trust
            </span>
            <Heading level={1} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Privacy Policy
            </Heading>
            <Text color="secondary" className="text-sm text-slate-400">
              Last updated: September 2026 • SSSAM Academy (Gurugram)
            </Text>
          </div>

          <div className="space-y-8 bg-slate-900/60 border border-slate-800 p-8 sm:p-10 rounded-3xl text-sm sm:text-base leading-relaxed text-slate-300">
            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                1. Information We Collect
              </Heading>
              <Text>
                When you register on SSSAM Academy, request a course demo class, or contact our counseling team, we may collect personal information including:
              </Text>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
                <li>Full Name and contact details (email address and phone/WhatsApp number).</li>
                <li>Educational background, preferred training mode (Classroom / Online), and course interests.</li>
                <li>Billing and transaction identifiers for fee payments and certificate verification.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                2. How We Use Your Information
              </Heading>
              <Text>
                We use the information collected exclusively for legitimate educational and student support purposes, including:
              </Text>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
                <li>Scheduling free demo classes and sending course syllabus updates.</li>
                <li>Providing 1-on-1 counseling and personalized fee scholarship guidance.</li>
                <li>Managing batch schedules, classroom access, and live mentor sessions.</li>
                <li>Generating and issuing verifiable certificates of completion.</li>
                <li>Connecting students with our 120+ corporate hiring partners for job placements.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                3. Data Protection & Security
              </Heading>
              <Text>
                We implement industry-standard encryption, secure databases, and access controls to ensure your personal information remains confidential. We do not sell, rent, or trade student personal information to third-party advertisers.
              </Text>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                4. Cookies and Web Analytics
              </Heading>
              <Text>
                Our website uses standard functional cookies and privacy-friendly web analytics to improve website navigation, load times, and user experience. You can modify your browser settings to decline cookies if you prefer.
              </Text>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                5. Contact Information
              </Heading>
              <Text>
                For questions or requests regarding your data and privacy, please contact our data grievance officer:
              </Text>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1 text-slate-300">
                <p><strong>{SITE_CONFIG.fullName}</strong></p>
                <p>Address: {SITE_CONFIG.address}</p>
                <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-cyan-400 hover:underline">{SITE_CONFIG.email}</a></p>
                <p>Phone: <a href={`tel:${SITE_CONFIG.phone}`} className="text-cyan-400 hover:underline">{SITE_CONFIG.phone}</a></p>
              </div>
            </section>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
