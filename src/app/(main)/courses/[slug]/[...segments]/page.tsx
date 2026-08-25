import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { getSeoLocation, seoLocations } from "@/data/seo-locations";
import { getSeoTopic, seoTopics } from "@/data/seo-topics";
import { getSeoModifier, seoModifiers } from "@/data/seo-modifiers";

const siteUrl = "https://sssamacademy.tech";

interface PageProps {
  params: Promise<{ slug: string; segments: string[] }>;
}

// Generates all city x topic AND city x modifier x topic paths
export async function generateStaticParams() {
  const paths: { slug: string; segments: string[] }[] = [];
  for (const loc of seoLocations) {
    // city/topic
    for (const top of seoTopics) {
      paths.push({ slug: loc.city, segments: [top.topic] });
    }
    // city/modifier/topic
    for (const mod of seoModifiers) {
      for (const top of seoTopics) {
        paths.push({ slug: loc.city, segments: [mod.modifier, top.topic] });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: city, segments } = await params;
  const location = getSeoLocation(city);
  if (!location) return { title: "Not Found" };

  // 2-segment: city/topic
  if (segments.length === 1) {
    const topicData = getSeoTopic(segments[0]);
    if (!topicData) return { title: "Not Found" };
    const title = `${topicData.label} in ${location.label} | SSSAM Academy`;
    const description = `Looking for a ${topicData.label} in ${location.label}, ${location.state}? SSSAM Academy offers ${topicData.duration} ${topicData.level} training with live mentorship, real projects, and placement support.`;
    return {
      title,
      description,
      alternates: { canonical: `${siteUrl}/courses/${city}/${segments[0]}` },
      openGraph: { title, description, type: "website", url: `${siteUrl}/courses/${city}/${segments[0]}`, siteName: "SSSAM Academy", locale: "en_IN", images: [{ url: `${siteUrl}/images/logo/logo.png`, width: 1200, height: 630, alt: title }] },
      twitter: { card: "summary_large_image", title, description },
      keywords: [`${topicData.shortLabel} course in ${location.label}`, `${topicData.shortLabel} training in ${location.label}`, `best ${topicData.shortLabel} institute ${location.label}`, ...topicData.keywords.map((kw) => `${kw} ${location.label}`)].join(", "),
    };
  }

  // 3-segment: city/modifier/topic
  if (segments.length === 2) {
    const modifierData = getSeoModifier(segments[0]);
    const topicData = getSeoTopic(segments[1]);
    if (!modifierData || !topicData) return { title: "Not Found" };
    const title = `${modifierData.label} ${topicData.label} in ${location.label} | SSSAM Academy`;
    const description = `Find the ${modifierData.metaAdjective} ${topicData.label} in ${location.label}, ${location.state}. SSSAM Academy provides ${topicData.duration} ${topicData.level} training with live mentorship, real projects, and placement support.`;
    return {
      title,
      description,
      alternates: { canonical: `${siteUrl}/courses/${city}/${segments[0]}/${segments[1]}` },
      openGraph: { title, description, type: "website", url: `${siteUrl}/courses/${city}/${segments[0]}/${segments[1]}`, siteName: "SSSAM Academy", locale: "en_IN", images: [{ url: `${siteUrl}/images/logo/logo.png`, width: 1200, height: 630, alt: title }] },
      twitter: { card: "summary_large_image", title, description },
      keywords: [`${modifierData.metaAdjective} ${topicData.shortLabel} course in ${location.label}`, `${modifierData.metaAdjective} ${topicData.shortLabel} training in ${location.label}`, ...topicData.keywords.map((kw) => `${modifierData.metaAdjective} ${kw} ${location.label}`)].join(", "),
    };
  }

  return { title: "Not Found" };
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { slug: city, segments } = await params;
  const location = getSeoLocation(city);
  if (!location) notFound();

  const isCityTopic = segments.length === 1;
  const isCityModifierTopic = segments.length === 2;

  const topicData = isCityTopic ? getSeoTopic(segments[0]) : isCityModifierTopic ? getSeoTopic(segments[1]) : null;
  const modifierData = isCityModifierTopic ? getSeoModifier(segments[0]) : null;

  if (!topicData) notFound();
  if (isCityModifierTopic && !modifierData) notFound();

  const discount = Math.round(((topicData.originalPrice - topicData.price) / topicData.originalPrice) * 100);
  const relatedTopics = seoTopics.filter((t) => t.topic !== topicData.topic).slice(0, 4);
  const nearbyCities = seoLocations.filter((l) => l.region === location.region && l.city !== city).slice(0, 5);
  const relatedModifiers = modifierData ? seoModifiers.filter((m) => m.modifier !== modifierData.modifier) : [];

  const pageTitle = modifierData
    ? `${modifierData.label} ${topicData.label} in ${location.label}`
    : `${topicData.label} in ${location.label}`;

  const badge = modifierData ? modifierData.badge : "⭐ Top Rated";
  const ctaText = modifierData ? modifierData.ctaText : `Enroll Now`;
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
        provider: { "@type": "EducationalOrganization", name: "SSSAM Academy", url: siteUrl, address: { "@type": "PostalAddress", streetAddress: "M24 Ground Floor, Sector 14", addressLocality: "Gurugram", addressRegion: "Haryana", postalCode: "122001", addressCountry: "IN" } },
        courseMode: modifierData?.modifier === "online" ? "online" : "blended",
        educationalLevel: topicData.level,
        offers: { "@type": "Offer", price: topicData.price, priceCurrency: "INR", availability: "https://schema.org/InStock", url: `${siteUrl}/courses/${topicData.courseSlug}` },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "2456", bestRating: "5" },
        url: canonicalUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${siteUrl}/courses` },
          { "@type": "ListItem", position: 3, name: pageTitle, item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `Is there a ${topicData.label} available in ${location.label}?`, acceptedAnswer: { "@type": "Answer", text: `Yes! SSSAM Academy offers a ${topicData.label} with online and blended learning accessible from ${location.label}, ${location.state}. Includes live mentorship, real projects, and placement support.` } },
          { "@type": "Question", name: `What is the fee for ${topicData.shortLabel} training?`, acceptedAnswer: { "@type": "Answer", text: `The ${topicData.label} is available at Rs.${topicData.price.toLocaleString("en-IN")} (original Rs.${topicData.originalPrice.toLocaleString("en-IN")}). Save ${discount}%. Includes all materials, sessions, projects, and a certificate.` } },
          { "@type": "Question", name: `How long is the ${topicData.label}?`, acceptedAnswer: { "@type": "Answer", text: `The course runs for ${topicData.duration} designed for ${topicData.level} learners with hands-on project-based training.` } },
          { "@type": "Question", name: "Does SSSAM Academy provide placement support?", acceptedAnswer: { "@type": "Answer", text: "Yes, we provide resume workshops, mock interviews, LinkedIn optimization, and hiring partner connections." } },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav className="text-sm text-blue-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/courses" className="hover:text-white">Courses</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{pageTitle}</span>
          </nav>
          <span className="inline-block bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-full mb-4">{badge}</span>
          <div className="text-5xl mb-4">{topicData.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageTitle}</h1>
          <p className="text-blue-200 text-xl max-w-3xl mx-auto mb-8">
            {topicData.description} Accessible from {location.label}, {location.state}.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
            <span className="bg-white/10 px-4 py-2 rounded-full">⭐ 4.9/5 Rating</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">👥 2,456+ Students</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">⏱ {topicData.duration}</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">🎯 {topicData.level}</span>
            <span className="bg-green-500/20 border border-green-400 px-4 py-2 rounded-full text-green-300">{discount}% OFF — Rs.{topicData.price.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/courses/${topicData.courseSlug}`} className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition">View Course Details</Link>
            <Link href="/checkout" className="border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold px-8 py-4 rounded-xl text-lg transition">{ctaText} — Rs.{topicData.price.toLocaleString("en-IN")}</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ stat: "4.9★", label: "Avg Rating" }, { stat: "2,456+", label: "Students Trained" }, { stat: "95%", label: "Placement Rate" }, { stat: "10+", label: "Hiring Partners" }].map((s) => (
            <div key={s.label}><p className="text-3xl font-black text-blue-900">{s.stat}</p><p className="text-gray-500 text-sm mt-1">{s.label}</p></div>
          ))}
        </div>
      </section>

      {/* Why SSSAM */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Why SSSAM Academy for {topicData.shortLabel} Training in {location.label}?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🎓", title: "Expert Instructors", desc: "10+ years of real industry IT experience." },
              { icon: "🛠️", title: "Live Projects", desc: "Build a job-ready portfolio with real-world projects." },
              { icon: "💼", title: "Placement Support", desc: "Resume prep, mock interviews & hiring partner access." },
              { icon: "🤖", title: "AI Tools Training", desc: "Learn ChatGPT, GitHub Copilot, Cursor AI alongside core skills." },
              { icon: "📜", title: "Certificate", desc: "Training Completion Certificate for jobs & internships." },
              { icon: "📍", title: `${location.label} Accessible`, desc: `Live online sessions from ${location.label}, ${location.state}.` },
            ].map((c) => (
              <div key={c.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Learn */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {topicData.keywords.map((kw) => (
              <div key={kw} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-blue-100">
                <span className="text-green-500 text-xl font-bold">✓</span>
                <span className="text-gray-800 capitalize font-medium">{kw}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Fee</h2>
          <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-10 shadow-2xl">
            <p className="text-blue-300 text-sm mb-2 uppercase tracking-widest">Limited Time Offer</p>
            <div className="flex items-end justify-center gap-3 mb-2">
              <span className="text-5xl font-black">Rs.{topicData.price.toLocaleString("en-IN")}</span>
              <span className="text-blue-300 line-through text-xl mb-1">Rs.{topicData.originalPrice.toLocaleString("en-IN")}</span>
            </div>
            <span className="inline-block bg-orange-500 text-sm font-bold px-4 py-1 rounded-full mb-6">Save {discount}%</span>
            <ul className="text-left space-y-3 mb-8 text-sm text-blue-100">
              <li>✓ {topicData.duration} structured training</li>
              <li>✓ Live mentorship sessions</li>
              <li>✓ Hands-on real-world projects</li>
              <li>✓ Training Completion Certificate</li>
              <li>✓ Placement assistance</li>
              <li>✓ Access from {location.label}, {location.state}</li>
            </ul>
            <Link href={`/courses/${topicData.courseSlug}`} className="block w-full bg-orange-500 hover:bg-orange-400 font-bold py-4 rounded-xl text-lg transition">{ctaText}</Link>
          </div>
        </div>
      </section>

      {/* Modifier links (only for city/topic pages) */}
      {isCityTopic && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{topicData.label} in {location.label} — Browse by Type</h2>
            <div className="flex flex-wrap gap-3">
              {seoModifiers.map((m) => (
                <Link key={m.modifier} href={`/courses/${city}/${m.modifier}/${topicData.topic}`} className="bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-700 px-5 py-2 rounded-full text-sm text-gray-700 transition font-medium">
                  {m.badge} {m.label} {topicData.shortLabel}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related modifier links (only for city/modifier/topic pages) */}
      {isCityModifierTopic && relatedModifiers.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Also Search For</h2>
            <div className="flex flex-wrap gap-3">
              {relatedModifiers.map((m) => (
                <Link key={m.modifier} href={`/courses/${city}/${m.modifier}/${topicData.topic}`} className="bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-700 px-4 py-2 rounded-full text-sm text-gray-700 transition">
                  {m.badge} {m.label} {topicData.shortLabel} in {location.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">FAQ</h2>
          <div className="space-y-4">
            {[
              { q: `Is there a ${topicData.label} in ${location.label}?`, a: `Yes! SSSAM Academy offers a comprehensive ${topicData.label} with online and blended learning accessible from ${location.label}, ${location.state}. Includes live mentorship, real projects, certificate and placement support.` },
              { q: `What is the fee for ${topicData.shortLabel} training?`, a: `The ${topicData.label} is priced at Rs.${topicData.price.toLocaleString("en-IN")} (original Rs.${topicData.originalPrice.toLocaleString("en-IN")}). Save ${discount}%. Includes all materials, live sessions, projects, and a certificate.` },
              { q: `How long is the ${topicData.shortLabel} course?`, a: `The course runs for ${topicData.duration} designed for ${topicData.level} learners with hands-on project-based training throughout.` },
              { q: "Will I get a certificate?", a: `Yes! All students who complete the ${topicData.label} receive a Training Completion Certificate for jobs, internships, and portfolio building.` },
              { q: "Does SSSAM Academy provide placement support?", a: "Yes. We offer resume workshops, mock interviews, LinkedIn optimization, and hiring partner network connections across India." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Topics */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Courses in {location.label}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTopics.map((t) => (
              <Link key={t.topic} href={`/courses/${city}/${t.topic}`} className="bg-white hover:bg-blue-100 border border-blue-100 rounded-xl p-4 text-center transition shadow-sm">
                <div className="text-3xl mb-2">{t.icon}</div>
                <p className="font-semibold text-gray-800 text-sm">{t.label}</p>
                <p className="text-blue-600 text-xs mt-1">in {location.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-10 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">{topicData.label} — Nearby Areas</h2>
            <div className="flex flex-wrap gap-3">
              {nearbyCities.map((l) => (
                <Link key={l.city} href={`/courses/${l.city}/${segments.join("/")}`} className="bg-gray-50 border border-gray-200 hover:border-blue-400 hover:text-blue-700 px-4 py-2 rounded-full text-sm text-gray-700 transition">
                  {topicData.shortLabel} in {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">{topicData.icon}</div>
          <h2 className="text-3xl font-bold mb-4">Start Your {topicData.shortLabel} Career in {location.label} Today!</h2>
          <p className="text-orange-100 mb-8 text-lg">Limited seats available. Join thousands of students from {location.label} at SSSAM Academy!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/courses/${topicData.courseSlug}`} className="inline-block bg-white text-orange-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-orange-50 transition">View Full Course Details</Link>
            <Link href="/checkout" className="inline-block border-2 border-white text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-white/10 transition">Enroll Now — Rs.{topicData.price.toLocaleString("en-IN")}</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}