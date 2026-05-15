import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { CoursesGrid } from '@/components/sections/CoursesGrid';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { getFeaturedCourse, getPublishedCourses } from '@/lib/courses';
import { faqs } from '@/data/faq';
import { testimonials } from '@/data/testimonials';

// Mark this page as dynamic because getFeaturedCourse and getPublishedCourses use cache: 'no-store'
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured course and all published courses from MongoDB with fallback
  const { course: featuredCourse } = await getFeaturedCourse();
  const { courses: allCourses } = await getPublishedCourses();
  
  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_35%),linear-gradient(180deg,_#020617,_#0b112a)] text-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        {featuredCourse && <HeroSection course={featuredCourse} />}
        
        {/* Courses Grid */}
        <CoursesGrid 
          courses={allCourses}
          title="Explore Our Courses"
          description="Choose from our wide range of courses designed to help you master in-demand skills and advance your career."
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
                      Explore Courses
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
                      View on Google Maps
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
