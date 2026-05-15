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
    <div className="min-h-screen bg-white">
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
        <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Tech Career?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of Indian students who have launched their tech careers with SSSAM Academy. Start today with our limited summer offer on the AI Full Stack course.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Explore All Courses
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="tel:+919217031899"
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Call Now: +91 9217031899
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-blue-100">
                Email: <a href="mailto:info@sssamacadmy.com" className="underline hover:text-white transition">info@sssamacadmy.com</a> | Available 24/7 in Hindi & English
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
