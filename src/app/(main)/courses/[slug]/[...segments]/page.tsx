import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { EnrollCourseButton } from "@/components/ui/EnrollCourseButton";
import { getSeoLocation, seoLocations } from "@/data/seo-locations";
import { getSeoTopic, seoTopics } from "@/data/seo-topics";
import { getSeoModifier, seoModifiers } from "@/data/seo-modifiers";

const siteUrl = "https://sssamacademy.tech";

interface PageProps {
  params: Promise<{ slug: string; segments: string[] }>;
}

export const dynamicParams = true;
export const revalidate = 604800; // 7-Day Vercel Edge CDN Caching (0 Serverless function invocations on repeat visits)

// Pre-render top popular combinations at build time (<20s build, 0 disk/memory bloat)
// All remaining 50,000+ combinations generate instantly on-demand via ISR
export async function generateStaticParams() {
  const topCities = seoLocations.slice(0, 5); // 5 top cities (Gurgaon, Delhi, South Delhi, Noida, Bangalore)
  const topTopics = seoTopics.slice(0, 4); // 4 core courses
  const topModifiers = seoModifiers.slice(0, 3); // 3 primary modifiers (best, online, offline)

  const paths: { slug: string; segments: string[] }[] = [];

  for (const loc of topCities) {
    // 2-segment: city/topic (5 x 4 = 20)
    for (const top of topTopics) {
      paths.push({ slug: loc.city, segments: [top.topic] });
    }
    // 3-segment: city/modifier/topic (5 x 3 x 4 = 60)
    for (const mod of topModifiers) {
      for (const top of topTopics) {
        paths.push({ slug: loc.city, segments: [mod.modifier, top.topic] });
      }
    }
  }

  return paths; // Total 80 pages pre-rendered at build time
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: city, segments } = await params;
  const location = getSeoLocation(city);
  if (!location) return { title: "Course Not Found" };

  // 2-segment: /courses/[city]/[topic]
  if (segments.length === 1) {
    const topicData = getSeoTopic(segments[0]);
    if (!topicData) return { title: "Course Not Found" };

    const title = `${topicData.label} in ${location.label} | SSSAM Academy`;
    const description = `Join the top-rated ${topicData.label} in ${location.label}, ${location.state}. ${topicData.duration} ${topicData.level} training with 100% placement support, real projects & certification.`;
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
        images: [{ url: `${siteUrl}/images/logo/logo.png`, width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, description },
      keywords: [
        `${topicData.shortLabel} course in ${location.label}`,
        `${topicData.shortLabel} training in ${location.label}`,
        `best ${topicData.shortLabel} institute ${location.label}`,
        ...topicData.keywords.map((kw) => `${kw} ${location.label}`),
      ].join(", "),
    };
  }

  // 3-segment: /courses/[city]/[modifier]/[topic]
  if (segments.length === 2) {
    const modifierData = getSeoModifier(segments[0]);
    const topicData = getSeoTopic(segments[1]);
    if (!modifierData || !topicData) return { title: "Course Not Found" };

    const title = `${modifierData.headlinePrefix} ${topicData.label} in ${location.label} | SSSAM Academy`;
    const description = `Explore the ${modifierData.metaAdjective} ${topicData.label} in ${location.label}, ${location.state}. Designed for ${modifierData.intentSignal}. ${topicData.duration} course with live mentorship & job assistance.`;
    const canonicalUrl = `${siteUrl}/courses/${city}/${segments[0]}/${segments[1]}`;

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
        images: [{ url: `${siteUrl}/images/logo/logo.png`, width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, description },
      keywords: [
        `${modifierData.metaAdjective} ${topicData.shortLabel} course in ${location.label}`,
        `${modifierData.metaAdjective} ${topicData.shortLabel} training in ${location.label}`,
        ...topicData.keywords.map((kw) => `${modifierData.metaAdjective} ${kw} ${location.label}`),
      ].join(", "),
    };
  }

  return { title: "Course Not Found" };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { slug: city, segments } = await params;
  const location = getSeoLocation(city);
  if (!location) notFound();

  const isCityTopic = segments.length === 1;
  const isCityModifierTopic = segments.length === 2;

  const topicData = isCityTopic
    ? getSeoTopic(segments[0])
    : isCityModifierTopic
    ? getSeoTopic(segments[1])
    : null;

  const modifierData = isCityModifierTopic ? getSeoModifier(segments[0]) : null;

  if (!topicData) notFound();
  if (isCityModifierTopic && !modifierData) notFound();

  const discount = Math.round(((topicData.originalPrice - topicData.price) / topicData.originalPrice) * 100);
  const relatedTopics = seoTopics.filter((t) => t.topic !== topicData.topic).slice(0, 6);
  const nearbyCities = seoLocations.filter((l) => l.city !== city && l.region === location.region).slice(0, 6);
  const otherModifiers = seoModifiers.filter((m) => !modifierData || m.modifier !== modifierData.modifier);

  const pageTitle = modifierData
    ? `${modifierData.headlinePrefix} ${topicData.label} in ${location.label}`
    : `${topicData.label} in ${location.label}`;

  const badge = modifierData ? modifierData.badge : "⭐ Top Rated";
  const ctaText = modifierData ? modifierData.ctaText : "Enroll in Course";
  const canonicalUrl = isCityModifierTopic
    ? `${siteUrl}/courses/${city}/${segments[0]}/${segments[1]}`
    : `${siteUrl}/courses/${city}/${segments[0]}`;

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
          address: {
            "@type": "PostalAddress",
            streetAddress: "M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            postalCode: "122001",
            addressCountry: "IN",
          },
        },
        courseMode: modifierData?.modifier === "online" ? "online" : "blended",
        educationalLevel: topicData.level,
        offers: {
          "@type": "Offer",
          price: topicData.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/courses/${topicData.courseSlug}`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "2840",
          bestRating: "5",
        },
        url: canonicalUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${siteUrl}/courses` },
          { "@type": "ListItem", position: 3, name: `${location.label}`, item: `${siteUrl}/courses` },
          { "@type": "ListItem", position: 4, name: pageTitle, item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What is the fee structure for ${topicData.label} in ${location.label}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The discounted fee for ${topicData.label} is ₹${topicData.price.toLocaleString("en-IN")} (regular price ₹${topicData.originalPrice.toLocaleString("en-IN")}), saving you ${discount}%. Includes full curriculum, live mentors, projects, and certification.`,
            },
          },
          {
            "@type": "Question",
            name: `Is placement support provided for students from ${location.label}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! SSSAM Academy offers 100% placement support including resume workshops, technical mock interviews, LinkedIn branding, and direct interview referrals to 100+ hiring partners across India.",
            },
          },
          {
            "@type": "Question",
            name: `What is the duration and class schedule for this course?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The program duration is ${topicData.duration} for ${topicData.level} learners. Flexible weekday morning, evening, and weekend batches are available with live online and classroom options.`,
            },
          },
          {
            "@type": "Question",
            name: `Will I receive a verified certificate upon completion?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every graduate receives an ISO-certified, industry-recognized Certificate of Completion with a unique verification ID for your resume and LinkedIn profile.",
            },
          },
        ],
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
              {badge}
            </span>
            <span className="inline-block bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium px-3 py-1 rounded-full">
              📍 {location.label}, {location.state}
            </span>
            <span className="inline-block bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold px-3 py-1 rounded-full">
              Save {discount}% Today
            </span>
          </div>

          <div className="text-4xl md:text-5xl mb-3" aria-hidden="true">{topicData.icon}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {pageTitle}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {topicData.description} Accessible from {location.label} with live mentor sessions, real-world project portfolios, and 100% placement support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs sm:text-sm text-slate-300">
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">⭐ 4.9/5 Rating (2,840+ Reviews)</span>
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">⏱ {topicData.duration}</span>
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">🎯 {topicData.level}</span>
            <span className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-lg">📜 ISO Certificate</span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center max-w-xl mx-auto">
            <EnrollCourseButton
              courseTitle={`${topicData.label} in ${location.label}`}
              price={topicData.price}
              label={`${ctaText} — ₹${topicData.price.toLocaleString("en-IN")}`}
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
                  <th className="py-3 px-5 font-semibold text-slate-400">Discounted Fee</th>
                  <td className="py-3 px-5">
                    <span className="text-lg font-bold text-emerald-400">₹{topicData.price.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">₹{topicData.originalPrice.toLocaleString("en-IN")}</span>
                    <span className="ml-2 text-xs bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full font-medium">Save {discount}%</span>
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

      {/* Self-Assessment Practice Quiz (Native HTML details/summary - 0 JS) */}
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

      {/* Frequently Asked Questions (Native HTML details/summary) */}
      <section className="py-14 px-4 bg-slate-950 border-b border-slate-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions in {location.label}
            </h2>
            <p className="text-slate-400 text-sm">
              Everything you need to know about enrollments, batch timings, and career support
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: `What is the fee structure for ${topicData.label} in ${location.label}?`,
                a: `The course fee is ₹${topicData.price.toLocaleString("en-IN")} after a limited-time discount of ${discount}% off the original fee of ₹${topicData.originalPrice.toLocaleString("en-IN")}. Installment payment options are also supported.`,
              },
              {
                q: `Is placement support provided for learners in ${location.label}?`,
                a: `Yes, SSSAM Academy provides full placement assistance including mock interviews, resume optimization, portfolio reviews, and direct interview scheduling with top IT recruiters.`,
              },
              {
                q: `How long is the ${topicData.shortLabel} course and what are the timings?`,
                a: `The training duration is ${topicData.duration}. We offer flexible batch options including Morning, Evening, and Weekend schedules suitable for both freshers and working professionals.`,
              },
              {
                q: `Can I attend online sessions from ${location.label}?`,
                a: `Yes! All sessions are available live online with interactive mentor Q&A, recorded class archives, and classroom lab access in Delhi NCR.`,
              },
              {
                q: `Do I need prior coding experience to join?`,
                a: `No prior experience is necessary for beginner modules. Our curriculum starts from fundamental basics and progressively advances to production-grade architecture.`,
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-200 open:border-cyan-500/40 open:bg-slate-900"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-200 hover:text-cyan-400 select-none text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <span className="text-cyan-400 transition-transform duration-200 group-open:rotate-180 text-sm ml-2">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 pt-3 border-t border-slate-800 text-sm text-slate-300 leading-relaxed">
                  {faq.a}
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
            Limited seats per batch to ensure personalized 1-on-1 mentorship. Enroll today at ₹{topicData.price.toLocaleString("en-IN")} and save {discount}%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnrollCourseButton
              courseTitle={`${topicData.label} in ${location.label}`}
              price={topicData.price}
              label={`Enroll Now — ₹${topicData.price.toLocaleString("en-IN")}`}
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
          {/* 1. Other search intents in this city */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Explore {topicData.shortLabel} Options in {location.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherModifiers.slice(0, 20).map((m) => (
                <Link
                  key={m.modifier}
                  href={`/courses/${city}/${m.modifier}/${topicData.topic}`}
                  className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition"
                >
                  {m.label} {topicData.shortLabel}
                </Link>
              ))}
            </div>
          </div>

          {/* 2. Other courses in this city */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Other Popular IT Courses in {location.label}
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

          {/* 3. Nearby Locations */}
          {nearbyCities.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {topicData.shortLabel} Training in Nearby Locations
              </h3>
              <div className="flex flex-wrap gap-2">
                {nearbyCities.map((l) => (
                  <Link
                    key={l.city}
                    href={`/courses/${l.city}/${segments.join("/")}`}
                    className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition"
                  >
                    {topicData.shortLabel} in {l.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}