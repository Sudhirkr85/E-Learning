import type { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { CoursesGrid } from '@/components/sections/CoursesGrid';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { getFeaturedCourse, getPublishedCourses } from '@/lib/courses';
import { faqs } from '@/data/faq';
import { testimonials } from '@/data/testimonials';

const siteUrl = 'https://sssamacademy.tech';
const pageTitle = 'AI Training Institute Gurugram | Full Stack Development & Data Science';
const pageDescription = 'SSSAM Academy offers AI-first IT training in Gurugram with Full Stack Development, Data Science, Cyber Security and Digital Marketing courses plus placement support.';

export const dynamic = 'force-dynamic';

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
  // Fetch featured course and all published courses from MongoDB with fallback
  const { course: featuredCourse } = await getFeaturedCourse();
  const { courses: allCourses } = await getPublishedCourses();

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'SSSAM Academy',
        url: siteUrl,
        logo: `${siteUrl}/images/logo/logo.png`,
        sameAs: [
          'https://www.facebook.com/sssamacademy',
          'https://www.linkedin.com/company/sssam-academy',
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
        areaServed: ['Gurugram', 'Gurgaon', 'Delhi NCR'],
        openingHours: ['Mo-Fr 10:00-19:00', 'Sa 10:00-16:00'],
      },
      {
        '@type': 'LocalBusiness',
        name: 'SSSAM Academy',
        image: `${siteUrl}/images/logo/logo.png`,
        telephone: '+91 92170 31899',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14',
          addressLocality: 'Gurugram',
          addressRegion: 'Haryana',
          postalCode: '122001',
          addressCountry: 'IN',
        },
        sameAs: [
          'https://www.facebook.com/sssamacademy',
          'https://www.linkedin.com/company/sssam-academy',
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'Course',
            name: 'Full Stack Development course',
            description: 'Full Stack Development course in Gurugram with AI-enabled workflows, live projects, and placement coaching.',
            provider: { '@type': 'Organization', name: 'SSSAM Academy', sameAs: siteUrl },
          },
          {
            '@type': 'Course',
            name: 'Data Science training',
            description: 'Data Science training in Gurgaon covering Python, ML, analytics, and industry case studies.',
            provider: { '@type': 'Organization', name: 'SSSAM Academy', sameAs: siteUrl },
          },
          {
            '@type': 'Course',
            name: 'Cyber Security course',
            description: 'Cyber Security course in Gurugram with ethical hacking labs, threat detection, and placement support.',
            provider: { '@type': 'Organization', name: 'SSSAM Academy', sameAs: siteUrl },
          },
          {
            '@type': 'Course',
            name: 'Digital Marketing institute',
            description: 'Digital Marketing institute program for Delhi NCR learners with SEO, ads, analytics, and campaign projects.',
            provider: { '@type': 'Organization', name: 'SSSAM Academy', sameAs: siteUrl },
          },
        ],
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

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_35%),linear-gradient(180deg,_#020617,_#0b112a)] text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        {featuredCourse && <HeroSection course={featuredCourse} />}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* About Section */}
        <section id="about" className="py-20 md:py-28 bg-slate-950">
          <div className="max-w-6xl mx-auto px-4">
            <div className="rounded-[2rem] border border-cyan-500/10 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-200 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-cyan-500/20">
                Gurugram AI Training Institute
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                AI-first IT training for Full Stack, Data Science, Cyber Security and Digital Marketing careers
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl">
                SSSAM Academy is the trusted AI training institute in Gurugram and Gurgaon offering modern IT courses with live projects, placement support, and Delhi NCR career coaching. Our programs are built for students, freshers and professionals who want job-ready skills in Full Stack Development, Data Science and Cyber Security.
              </p>
              <div className="grid gap-6 md:grid-cols-2 pt-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">What we teach</h3>
                  <ul className="space-y-3 text-slate-300 list-disc list-inside">
                    <li>AI-focused Full Stack Development course with React, Node.js, MongoDB and modern deployment.</li>
                    <li>Data Science training with Python, ML, analytics and business intelligence.</li>
                    <li>Cyber Security course with ethical hacking, network defense, and incident response.</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Why choose SSSAM</h3>
                  <ul className="space-y-3 text-slate-300 list-disc list-inside">
                    <li>Live project-based learning from a local Gurugram institute.</li>
                    <li>Placement support for Delhi NCR and Gurgaon employers.</li>
                    <li>AI-first teaching methods, career coaching, and resume support.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <CoursesGrid 
          courses={allCourses}
          title="AI & IT Courses in Gurugram"
          description="Explore Full Stack Development, Data Science, Cyber Security and Digital Marketing training with live projects and placement-ready learning."
        />
        
        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonials} />
        
        {/* FAQ Section */}
        <FAQSection faqs={faqs} />
        
        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-28 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-slate-900/80 border border-cyan-500/20 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
              <div className="grid gap-10 lg:grid-cols-[1.8fr_1fr] items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-200 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-cyan-500/20">
                    Gurugram Center • Sector 14
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to Elevate Your Career with AI-First IT Training?
                  </h2>
                  <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                    Learn with live project-based training, placement support, and AI-integrated curriculum from a trusted IT training institute in Gurugram.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/courses"
                      className="inline-flex items-center gap-2 justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 px-8 rounded-xl shadow-xl hover:from-cyan-400 hover:to-blue-500 transition-all"
                    >
                      Explore Gurugram AI Courses
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                    <a
                      href="https://maps.google.com/?q=M24+Ground+Floor+Near+SBI+Bank+Old+DLF+Colony+Sector+14+Gurugram+122001"
                      className="inline-flex items-center gap-2 justify-center border border-cyan-500/30 text-cyan-200 bg-slate-900/90 font-semibold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Gurugram Training Institute
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 shadow-[0_35px_120px_-40px_rgba(15,23,42,0.9)]">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300 font-semibold mb-4">
                    Contact Details
                  </p>
                  <div className="space-y-4 text-slate-300">
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      <a href="tel:+919217031899" className="block text-white font-semibold">+91 92170 31899</a>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <a href="mailto:info@sssamacademy.com" className="block text-white font-semibold">info@sssamacademy.com</a>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Address</p>
                      <p className="text-white font-semibold">
                        M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14, Gurugram, Haryana 122001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
