import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { EnrollCourseButton } from "@/components/ui/EnrollCourseButton";
import { getSeoLocation, seoLocations } from "@/data/seo-locations";
import { getSeoTopic, seoTopics } from "@/data/seo-topics";

const siteUrl = "https://sssamacademy.tech";

interface PageProps {
  params: Promise<{ slug: string; segments: string[] }>;
}

export const dynamicParams = true;
export const revalidate = 604800; // 7-Day Vercel Edge CDN Caching

// Pre-render core city x topic combinations across curated Delhi NCR hubs
export async function generateStaticParams() {
  const topTopics = seoTopics.slice(0, 6);
  const paths: { slug: string; segments: string[] }[] = [];

  for (const loc of seoLocations) {
    for (const top of topTopics) {
      paths.push({ slug: loc.city, segments: [top.topic] });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: city, segments } = await params;
  
  // Strictly enforce 2-segment URL pattern: /courses/[city]/[topic]
  if (!segments || segments.length !== 1) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const location = getSeoLocation(city);
  if (!location) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const topicData = getSeoTopic(segments[0]);
  if (!topicData) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const title = `${topicData.label} in ${location.label} | SSSAM Academy`;
  const description = `${topicData.label} training for learners in ${location.label}. ${topicData.duration} ${topicData.level} practical program near ${location.nearestMetro}. 100% placement support & ISO certification.`;
  const canonicalUrl = `${siteUrl}/courses/${city}/${segments[0]}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "SSSAM Academy",
      locale: "en_IN",
      images: [{ url: `${siteUrl}/images/logo/logo.webp`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description },
    keywords: [
      `${topicData.shortLabel} course in ${location.label}`,
      `${topicData.shortLabel} training ${location.label}`,
      `${topicData.shortLabel} institute near ${location.nearestMetro}`,
      ...topicData.keywords.map((kw) => `${kw} ${location.label}`),
    ].join(", "),
  };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { slug: city, segments } = await params;
  
  // Enforce 404 for any non-2-segment route (including old 3-segment modifier URLs)
  if (!segments || segments.length !== 1) {
    notFound();
  }

  const location = getSeoLocation(city);
  if (!location) notFound();

  const topicData = getSeoTopic(segments[0]);
  if (!topicData) notFound();

  const discount = Math.round(((topicData.originalPrice - topicData.price) / topicData.originalPrice) * 100);
  const relatedTopics = seoTopics.filter((t) => t.topic !== topicData.topic).slice(0, 4);
  const nearbyCities = seoLocations.filter((l) => l.city !== city).slice(0, 4);

  const pageTitle = `${topicData.label} in ${location.label}`;
  const canonicalUrl = `${siteUrl}/courses/${city}/${segments[0]}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: pageTitle,
        description: topicData.description,
        provider: {
          "@type": "EducationalOrganization",
          name: "SSSAM Academy",
          url: siteUrl,
          sameAs: ["https://sssamacademy.com", "https://www.linkedin.com/company/sssamacademy/"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            postalCode: "122001",
            addressCountry: "IN",
          },
        },
        courseMode: "blended",
        educationalLevel: topicData.level,
        offers: {
          "@type": "Offer",
          price: topicData.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/courses/${topicData.courseSlug}`,
        },
        url: canonicalUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${siteUrl}/courses` },
          { "@type": "ListItem", position: 3, name: location.label, item: `${siteUrl}/courses` },
          { "@type": "ListItem", position: 4, name: pageTitle, item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: location.locationFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Semantic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-slate-800/80 bg-slate-900/50 py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center text-xs md:text-sm text-slate-400 gap-2">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/courses" className="hover:text-cyan-400 transition-colors">Courses</Link>
          <span>/</span>
          <span className="text-slate-300 font-medium">{location.label}</span>
          <span>/</span>
          <span className="text-cyan-400 font-medium truncate max-w-xs">{topicData.shortLabel}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-14 md:py-20 px-4 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/60">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <span className="inline-block bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              ⭐ Career Track
            </span>
            <span className="inline-block bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium px-3 py-1 rounded-full">
              📍 {location.label}, {location.state}
            </span>
            <span className="inline-block bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full">
              Scholarship Up to 40% Available
            </span>
          </div>

          <div className="text-4xl md:text-5xl mb-3" aria-hidden="true">{topicData.icon}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {pageTitle}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {topicData.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs sm:text-sm text-slate-300">
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">💻 100% Practical Coding Labs</span>
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">⏱ {topicData.duration}</span>
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">🎯 {topicData.level}</span>
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">📜 Verifiable Certificate</span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-xl mx-auto">
            <EnrollCourseButton
              courseTitle={`${topicData.label} in ${location.label}`}
              label="Request Fee Structure & Scholarship"
            />
            <EnrollCourseButton
              courseTitle={`${topicData.label} in ${location.label}`}
              variant="whatsapp"
            />
            <EnrollCourseButton
              courseTitle={`${topicData.label} in ${location.label}`}
              variant="outline"
              label={`Book Demo Class in ${location.label}`}
            />
          </div>
        </div>
      </section>

      {/* Local Campus & Commute Information Card */}
      <section className="py-12 px-4 bg-slate-900/50 border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📍</span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Local Training & Commute Guide: {location.label}
                </h2>
                <p className="text-xs sm:text-sm text-cyan-400 font-medium">
                  {location.region} • Direct Transit to Sector 14 Campus
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {location.localIntro}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">🚇 Nearest Metro / Transit:</span>
                <span className="text-slate-400">{location.nearestMetro}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">🏛 Landmark & Campus:</span>
                <span className="text-slate-400">{location.landmark}</span>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm">
              <span className="font-semibold text-cyan-300 block mb-1">🚗 Commute Directions:</span>
              <span className="text-slate-400">{location.commuteGuide}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Table */}
      <section className="py-12 px-4 bg-slate-900/30 border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            Key Program Overview for {location.label}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-slate-800">
                <tr className="flex flex-col sm:table-row">
                  <th className="py-3 px-5 font-semibold text-slate-400 sm:w-1/3">Course Name</th>
                  <td className="py-3 px-5 text-white font-medium">{topicData.label}</td>
                </tr>
                <tr className="flex flex-col sm:table-row bg-slate-950/40">
                  <th className="py-3 px-5 font-semibold text-slate-400">Fee Structure</th>
                  <td className="py-3 px-5">
                    <span className="text-sm font-bold text-emerald-400">Scholarship & EMI Options Available</span>
                    <span className="ml-2 text-xs bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full font-medium">Up to 40% Off</span>
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <th className="py-3 px-5 font-semibold text-slate-400">Training Duration</th>
                  <td className="py-3 px-5 text-slate-200">{topicData.duration} (Flexible Morning / Evening / Weekend)</td>
                </tr>
                <tr className="flex flex-col sm:table-row bg-slate-950/40">
                  <th className="py-3 px-5 font-semibold text-slate-400">Learning Mode</th>
                  <td className="py-3 px-5 text-slate-200">Live Interactive Online & Classroom Training ({location.label} Access)</td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <th className="py-3 px-5 font-semibold text-slate-400">Career Placement</th>
                  <td className="py-3 px-5 text-cyan-300 font-medium">100% Placement Assistance & Technical Mock Interviews</td>
                </tr>
                <tr className="flex flex-col sm:table-row bg-slate-950/40">
                  <th className="py-3 px-5 font-semibold text-slate-400">Certification</th>
                  <td className="py-3 px-5 text-slate-200">ISO-Certified Verifiable Industry Credential</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Syllabus Checklist */}
      <section className="py-14 px-4 bg-slate-950 border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Comprehensive Curriculum & Modules
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Step-by-step practical syllabus updated for 2026 industry standards
            </p>
          </div>

          <div className="grid gap-3.5">
            {topicData.syllabus.map((moduleItem, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition hover:border-cyan-500/40"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/20">
                  ✓
                </div>
                <span className="text-slate-200 font-medium text-sm sm:text-base leading-relaxed">
                  {moduleItem}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Assessment Practice Quiz */}
      <section className="py-14 px-4 bg-slate-900/40 border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Interactive Self-Assessment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Test Your Knowledge: {topicData.shortLabel} Practice Quiz
            </h2>
            <p className="text-slate-400 text-sm">
              Click any question below to test your understanding before joining the course (Instant Reveal)
            </p>
          </div>

          <div className="space-y-3">
            {topicData.quiz.map((item, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-800 bg-slate-900/80 p-4 transition-all duration-200 open:border-purple-500/40 open:bg-slate-900"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-200 hover:text-cyan-400 select-none text-sm sm:text-base">
                  <span className="flex items-center gap-2.5">
                    <span className="text-purple-400 font-mono text-xs">Q{idx + 1}.</span>
                    {item.question}
                  </span>
                  <span className="text-purple-400 transition-transform duration-200 group-open:rotate-180 text-sm ml-2">
                    ▼
                  </span>
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 text-sm text-slate-300 leading-relaxed pl-6 bg-slate-950/40 rounded-lg p-3">
                  <span className="font-semibold text-emerald-400 block mb-1">Answer & Explanation:</span>
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Genuine Location-Specific FAQs */}
      <section className="py-14 px-4 bg-slate-950 border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions: {location.label}
            </h2>
            <p className="text-slate-400 text-sm">
              Commute details, batch timings, and training support for learners in {location.label}
            </p>
          </div>

          <div className="space-y-3">
            {location.locationFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-200 open:border-cyan-500/40 open:bg-slate-900"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-200 hover:text-cyan-400 select-none text-sm sm:text-base">
                  <span>{faq.question}</span>
                  <span className="text-cyan-400 transition-transform duration-200 group-open:rotate-180 text-sm ml-2">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 pt-3 border-t border-slate-800 text-sm text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Enrollment CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border-b border-slate-800/80 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-4xl mb-3 block" aria-hidden="true">{topicData.icon}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4">
            Accelerate Your Tech Career in {location.label}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Limited seats per batch to ensure personalized 1-on-1 mentorship. Inquire today for up to 40% scholarship discounts & flexible installments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnrollCourseButton
              courseTitle={`${topicData.label} in ${location.label}`}
              label="Request Fee Structure & Scholarship"
            />
            <EnrollCourseButton
              courseTitle={`${topicData.label} in ${location.label}`}
              variant="whatsapp"
            />
          </div>
        </div>
      </section>

      {/* Internal Cross-Linking Directory */}
      <section className="py-14 px-4 bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* 1. Other courses in this city */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Other IT Courses Available for {location.label} Learners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {relatedTopics.map((t) => (
                <Link
                  key={t.topic}
                  href={`/courses/${city}/${t.topic}`}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-center hover:border-cyan-500/40 hover:bg-slate-900 transition"
                >
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1">{t.shortLabel}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{location.label}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Same course in nearby locations */}
          {nearbyCities.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {topicData.shortLabel} Training Across Other Delhi NCR Hubs
              </h3>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((l) => (
                  <Link
                    key={l.city}
                    href={`/courses/${l.city}/${topicData.topic}`}
                    className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition"
                  >
                    {topicData.shortLabel} in {l.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 3. Official Central Education Network Backlink */}
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Official Educational Network</p>
              <p className="text-sm text-slate-300 mt-0.5">
                SSSAM Academy (Sector 14 Gurugram Center) is an authorized career training hub of the <strong>SSSAM Academy Network</strong>.
              </p>
            </div>
            <a
              href="https://sssamacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 hover:text-cyan-200 text-xs font-semibold transition"
            >
              Visit sssamacademy.com ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}