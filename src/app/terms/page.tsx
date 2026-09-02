import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text } from '@/components/ui';
import { SITE_CONFIG } from '@/constants';

const siteUrl = 'https://sssamacademy.tech';

export const metadata: Metadata = {
  title: 'Terms and Conditions - SSSAM Academy',
  description: 'Terms and conditions governing course admissions, classroom training, certification, and fee refund policies at SSSAM Academy Gurugram.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      <main className="py-16 md:py-24">
        <Container className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <span className="inline-block bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
              Student Agreement
            </span>
            <Heading level={1} className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Terms and Conditions
            </Heading>
            <Text color="secondary" className="text-sm text-slate-400">
              Effective Date: September 2026 • SSSAM Academy
            </Text>
          </div>

          <div className="space-y-8 bg-slate-900/60 border border-slate-800 p-8 sm:p-10 rounded-3xl text-sm sm:text-base leading-relaxed text-slate-300">
            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                1. Acceptance of Terms
              </Heading>
              <Text>
                By accessing our website (sssamacademy.tech), enrolling in training batches, or utilizing our computer lab facilities at Sector 14 Gurugram, you agree to comply with and be bound by these Terms and Conditions.
              </Text>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                2. Admissions & Course Access
              </Heading>
              <Text>
                Course enrollment grants a non-transferable right to attend scheduled classroom or live online training sessions and access associated study materials. SSSAM Academy reserves the right to adjust batch timings or instructor schedules with prior notice to students.
              </Text>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                3. Fee Payments & Refund Policy
              </Heading>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-400">
                <li>Course fees, installment schedules, and scholarships are confirmed upon batch registration.</li>
                <li>Free demo classes are provided so students can evaluate teaching methodology before committing.</li>
                <li>Refund requests submitted prior to the commencement of the official first batch session are eligible for full refund minus nominal processing charges.</li>
                <li>Once batches have commenced and course materials/lab access have been issued, fees are generally non-refundable, though batch transfer or postponement options remain available upon written request.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                4. Certification & Placement Support
              </Heading>
              <Text>
                Certificates of Completion are awarded to students who maintain at least 80% batch attendance and successfully complete all practical capstone projects. Placement assistance (mock interviews, resume reviews, hiring referrals) is provided in good faith; final employment offers depend on individual student interview performance.
              </Text>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                5. Code of Conduct & Intellectual Property
              </Heading>
              <Text>
                All proprietary curriculum, lab guides, and video materials remain the intellectual property of SSSAM Academy. Unauthorized recording, redistribution, or commercial resale of learning materials is strictly prohibited.
              </Text>
            </section>

            <section className="space-y-3">
              <Heading level={2} className="text-xl font-bold text-white">
                6. Contact Details
              </Heading>
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
