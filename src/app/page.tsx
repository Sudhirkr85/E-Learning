import type { Metadata } from 'next';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { EnrollCourseButton } from '@/components/ui/EnrollCourseButton';
import { faqs } from '@/data/faq';
import { testimonials } from '@/data/testimonials';
import { seoTopics } from '@/data/seo-topics';

const siteUrl = 'https://sssamacademy.tech';
const pageTitle = 'AI & IT Training Institute in Gurugram (Sector 14) | Full Stack, Data Science, Python & Digital Marketing';
const pageDescription = 'SSSAM Academy is Gurugram’s top AI & IT training institute in Sector 14 offering classroom & online courses in Full Stack, Data Science, Power BI, Python, Cyber Security & Digital Marketing with 100% placement support.';

export const revalidate = 86400; // 24-Hour ISR Cache

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: 'website',
    url: `${siteUrl}/`,
    siteName: 'SSSAM Academy',
    locale: 'en_IN',
    images: [
      {
        url: 'https://sssamacademy.tech/images/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'SSSAM Academy AI Training Institute Gurugram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['https://sssamacademy.tech/images/logo/logo.png'],
  },
};

export default async function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'SSSAM Academy',
        url: siteUrl,
        logo: `${siteUrl}/images/logo/logo.png`,
        sameAs: [
          'https://sssamacademy.com',
          'https://www.linkedin.com/company/sssamacademy',
          'https://www.instagram.com/sssamacademy/',
          'https://www.youtube.com/@codingwithsudhir',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+91 92170 31899',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14',
          addressLocality: 'Gurugram',
          addressRegion: 'Haryana',
          postalCode: '122001',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'EducationalOrganization',
        name: 'SSSAM Academy',
        url: siteUrl,
        telephone: '+91 92170 31899',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14',
          addressLocality: 'Gurugram',
          addressRegion: 'Haryana',
          postalCode: '122001',
          addressCountry: 'IN',
        },
        areaServed: ['Gurugram', 'Gurgaon', 'Delhi NCR', 'Noida'],
        openingHours: ['Mo-Fr 09:00-20:00', 'Sa-Su 09:00-18:00'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  // Top 6 Featured Career Tracks
  const featuredTracks = [
    {
      topic: 'full-stack-development',
      title: 'Full Stack Web Development (MERN & Next.js)',
      icon: '💻',
      desc: 'HTML, CSS, Tailwind, JavaScript, React, Node.js, Express, MongoDB & Next.js with live real-world projects.',
      duration: '6 Months',
      tag: '🔥 Most Popular',
    },
    {
      topic: 'data-science',
      title: 'Data Science with Python & Machine Learning',
      icon: '📊',
      desc: 'NumPy, Pandas, Matplotlib, Scikit-Learn, Deep Learning, and predictive modeling for high-paying analytics roles.',
      duration: '3 Months',
      tag: '⭐ Top Ranked',
    },
    {
      topic: 'data-analytics',
      title: 'Data Analytics, Power BI & SQL Masterclass',
      icon: '📈',
      desc: 'Advanced Excel, SQL queries, Power BI data modeling, DAX, and executive KPI dashboard creation.',
      duration: '2.5 Months',
      tag: '💼 High Placement',
    },
    {
      topic: 'cyber-security',
      title: 'Cyber Security & Ethical Hacking (CEH)',
      icon: '🔐',
      desc: 'Kali Linux, network vulnerability assessment, web app pentesting (OWASP), and cyber security certification prep.',
      duration: '3 Months',
      tag: '🛡️ Defense Track',
    },
    {
      topic: 'digital-marketing',
      title: 'Performance Digital Marketing & SEO Mastery',
      icon: '📱',
      desc: 'Technical SEO, Google Ads (PPC), Meta Ads Manager, GA4 analytics, and lead conversion funnels.',
      duration: '2.5 Months',
      tag: '🚀 High ROI',
    },
    {
      topic: 'python-training',
      title: 'Python Programming & DSA Masterclass',
      icon: '🐍',
      desc: 'Python OOPs, data structures, algorithms, automation scripting, and technical interview problem solving.',
      duration: '2 Months',
      tag: '🌱 Beginner Friendly',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* ── 1. Sector 14 Gurugram Offline Training Advantages ─────────────── */}
        <section className="py-16 md:py-20 bg-slate-900/40 border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                📍 Sector 14 Gurugram Training Center
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Why Students Choose SSSAM Academy in Gurugram
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                100% practical, mentor-led classroom training designed to bridge the gap between college and high-paying tech jobs.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-cyan-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center text-2xl mb-4">
                  🏫
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AC Computer Labs</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Dedicated high-speed systems, high-speed Wi-Fi, and real corporate development lab environments.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-cyan-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-2xl mb-4">
                  📅
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Flexible Batches</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Regular Weekday (Morning & Evening) batches + dedicated Weekend batches for working professionals.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-cyan-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center text-2xl mb-4">
                  👥
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1-on-1 Mentorship</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Small batch sizes (15-20 students) ensuring personalized code reviews and daily doubt clearing.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 hover:border-cyan-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/15 text-yellow-400 flex items-center justify-center text-2xl mb-4">
                  💼
                </div>
                <h3 className="text-lg font-bold text-white mb-2">100% Placement Cell</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Resume optimization, LinkedIn branding, technical mock interviews & direct referrals to 120+ hiring partners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Top In-Demand Career Programs ────────────────────────────── */}
        <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Featured IT Programs
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
                  Most In-Demand Career Tracks
                </h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2">
                  Choose a domain to book your free demo class at our Sector 14 Gurugram center.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition"
              >
                <span>View All 80+ Courses →</span>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTracks.map((track) => (
                <div
                  key={track.topic}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-cyan-500/40 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-3xl">{track.icon}</span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {track.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {track.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>⏱ Duration: <strong>{track.duration}</strong></span>
                      <span>📍 Sector 14 Offline / Online</span>
                    </div>

                    <div className="flex gap-2">
                      <EnrollCourseButton
                        courseTitle={track.title}
                        label="Book Free Demo"
                        className="flex-1 !py-2.5 !text-xs !font-bold"
                      />
                      <EnrollCourseButton
                        courseTitle={track.title}
                        variant="whatsapp"
                        className="!py-2.5 !px-3 !text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Student Reviews & Testimonials ────────────────────────────── */}
        <TestimonialsSection testimonials={testimonials} />

        {/* ── 4. Frequently Asked Questions ────────────────────────────────── */}
        <FAQSection faqs={faqs} />

        {/* ── 5. Center Location & Contact Form ────────────────────────────── */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
