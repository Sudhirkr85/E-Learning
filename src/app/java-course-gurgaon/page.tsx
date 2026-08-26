import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";

const siteUrl = "https://sssamacademy.tech";

export const revalidate = 604800;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Java Course in Gurgaon | Best Java Training — SSSAM Academy",
  description: "Best Java course in Gurgaon at SSSAM Academy. Learn Core Java, Spring Boot, REST APIs, and full stack development with live mentorship, projects, and placement support.",
  alternates: { canonical: "${siteUrl}/java-course-gurgaon" },
  openGraph: {
    title: "Java Course in Gurgaon | Best Java Training — SSSAM Academy",
    description: "Best Java course in Gurgaon at SSSAM Academy. Learn Core Java, Spring Boot, REST APIs, and full stack development with live mentorship, projects, and placement support.",
    type: "website",
    url: "${siteUrl}/java-course-gurgaon",
    siteName: "SSSAM Academy",
    locale: "en_IN",
    images: [{ url: "${siteUrl}/images/logo/logo.png", width: 1200, height: 630, alt: "Java Course in Gurgaon | Best Java Training — SSSAM Academy" }],
  },
  twitter: { card: "summary_large_image", title: "Java Course in Gurgaon | Best Java Training — SSSAM Academy", description: "Best Java course in Gurgaon at SSSAM Academy. Learn Core Java, Spring Boot, REST APIs, and full stack development with live mentorship, projects, and placement support." },
  keywords: "Java course Gurgaon,Java training Gurgaon,Core Java Gurgaon,Java classes Gurgaon,Java programming Gurgaon,Java Spring Boot Gurgaon,Java full stack Gurgaon",
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        name: "SSSAM Academy",
        url: siteUrl,
        description: "Master Java programming in Gurgaon at SSSAM Academy. Our Java course covers Core Java, OOP, Spring Boot, REST APIs, and enterprise full stack development with live project training.",
        address: { "@type": "PostalAddress", streetAddress: "M24 Ground Floor, Sector 14", addressLocality: "Gurugram", addressRegion: "Haryana", postalCode: "122001", addressCountry: "IN" },
        telephone: "+91 92170 31899",
        sameAs: ["https://www.facebook.com/sssamacademy", "https://www.linkedin.com/company/sssam-academy"],
      },
      {
        "@type": "Course",
        name: "Java Course in Gurgaon — SSSAM Academy",
        description: "Master Java programming in Gurgaon at SSSAM Academy. Our Java course covers Core Java, OOP, Spring Boot, REST APIs, and enterprise full stack development with live project training.",
        provider: { "@type": "EducationalOrganization", name: "SSSAM Academy", url: siteUrl },
        courseMode: "blended",
        educationalLevel: "Beginner to Advanced",
        offers: { "@type": "Offer", price: 15000, priceCurrency: "INR", availability: "https://schema.org/InStock" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "${siteUrl}/" },
          { "@type": "ListItem", position: 2, name: "Java Course in Gurgaon — SSSAM Academy", item: "${siteUrl}/java-course-gurgaon" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the best Java institute in Gurgaon?", acceptedAnswer: { "@type": "Answer", text: "SSSAM Academy is one of the best Java Programming institutes accessible from Gurgaon. We offer 4 months training with live mentorship, real projects, a certificate, and dedicated placement support." } },
          { "@type": "Question", name: "How much does the Java course cost?", acceptedAnswer: { "@type": "Answer", text: "The Java Programming course at SSSAM Academy is priced at Rs.15,000 (original Rs.25,000), saving you 40%. Includes all materials, live sessions, projects, and a certificate." } },
          { "@type": "Question", name: "Is the Java course available online for Gurgaon students?", acceptedAnswer: { "@type": "Answer", text: "Yes! SSSAM Academy offers both online and blended learning so students from Gurgaon can join live sessions remotely and access all course content online." } },
          { "@type": "Question", name: "Will I get a certificate?", acceptedAnswer: { "@type": "Answer", text: "Yes, every student who completes the Java Programming course receives a Training Completion Certificate from SSSAM Academy, valid for jobs, internships, and portfolio building." } },
        ],
      },
    ],
  };

  const relatedSearches = ["Java Spring Boot Gurgaon","Core Java course Gurgaon","Java developer training Gurgaon","Java certification Gurgaon","Java backend course Gurgaon"];

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <nav className="text-sm text-blue-300 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Java Course in Gurgaon — SSSAM Academy</span>
          </nav>
          <span className="inline-block bg-orange-500 text-white text-sm font-bold px-5 py-2 rounded-full mb-4">#1 Rated in Gurgaon</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Java Course in Gurgaon — SSSAM Academy</h1>
          <p className="text-blue-200 text-xl max-w-3xl mx-auto mb-8">Master Java programming in Gurgaon at SSSAM Academy. Our Java course covers Core Java, OOP, Spring Boot, REST APIs, and enterprise full stack development with live project training.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">
            <span className="bg-white/10 px-4 py-2 rounded-full">⭐ 4.9/5 Rating</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">👥 2,456+ Students</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Duration: 4 months</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Level: Beginner to Advanced</span>
            <span className="bg-green-500/20 border border-green-400 px-4 py-2 rounded-full text-green-300">40% OFF — Rs.15,000</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses/full-stack-web-development-6-month" className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition">View Course Details</Link>
            <Link href="/checkout" className="border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold px-8 py-4 rounded-xl text-lg transition">Enroll Now — Rs.15,000</Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-b py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{ stat: "4.9 Stars", label: "Avg Rating" }, { stat: "2,456+", label: "Students Trained" }, { stat: "95%", label: "Placement Rate" }, { stat: "10+", label: "Hiring Partners" }].map((s) => (
            <div key={s.label}><p className="text-3xl font-black text-blue-900">{s.stat}</p><p className="text-gray-500 text-sm mt-1">{s.label}</p></div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why SSSAM Academy is the Best Java Institute in Gurgaon</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🎓", title: "Expert Instructors", desc: "10+ years of real industry experience in the IT sector." },
              { icon: "🛠️", title: "Live Projects", desc: "Work on real-world projects and build a job-ready portfolio." },
              { icon: "💼", title: "Placement Support", desc: "Resume prep, mock interviews, and hiring partner network access." },
              { icon: "🤖", title: "AI Tools Training", desc: "Learn ChatGPT, GitHub Copilot, and Cursor AI alongside core skills." },
              { icon: "📜", title: "Certificate", desc: "Training Completion Certificate valid for jobs and internships." },
              { icon: "📍", title: "Gurgaon Accessible", desc: "Live online sessions accessible from Gurgaon — no travel needed." },
            ].map((c) => (
              <div key={c.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">People in Gurgaon Also Search For</h2>
          <div className="flex flex-wrap gap-3">
            {relatedSearches.map((term) => (
              <span key={term} className="bg-white border border-blue-200 px-4 py-2 rounded-full text-sm text-gray-700">{term}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is the best Java institute in Gurgaon?", a: "SSSAM Academy is one of the best Java Programming institutes accessible from Gurgaon. We offer 4 months training with live mentorship, real projects, a certificate, and dedicated placement support." },
              { q: "How much does the Java course cost?", a: "The Java Programming course is priced at Rs.15,000 (original Rs.25,000), saving you 40%. Includes all materials, live sessions, projects, mentorship, and a certificate." },
              { q: "Is the Java course available online for Gurgaon students?", a: "Yes! SSSAM Academy offers both online and blended learning. Students from Gurgaon can join live sessions remotely and access all course content online with mentor support." },
              { q: "Will I get a certificate after completing the Java course?", a: "Absolutely. Every student who completes the course receives a Training Completion Certificate from SSSAM Academy, valid for jobs, internships, LinkedIn profiles, and portfolio building." },
              { q: "Does SSSAM Academy provide placement support?", a: "Yes! We offer dedicated placement support including resume workshops, mock interview sessions, LinkedIn profile optimization, and introductions to our hiring partner network across India." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Your Java Career in Gurgaon Today!</h2>
          <p className="text-orange-100 mb-8 text-lg">Limited seats available. Enroll now and save 40%!</p>
          <Link href="/courses/full-stack-web-development-6-month" className="inline-block bg-white text-orange-600 font-bold px-10 py-4 rounded-xl text-lg hover:bg-orange-50 transition">View Full Course — Enroll Now</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}