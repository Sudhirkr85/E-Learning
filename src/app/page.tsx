import { Header, Footer } from '@/components/layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { CoursesGrid } from '@/components/sections/CoursesGrid';
import { TrainersSection } from '@/components/sections/TrainersSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { getFeaturedCourse, getPublishedCourses } from '@/lib/courses';
import { trainers } from '@/data/trainers';
import { faqs } from '@/data/faq';
import { testimonials } from '@/data/testimonials';

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
        
        {/* Trainers Section */}
        <TrainersSection trainers={trainers} />
        
        {/* Testimonials Section */}
        <TestimonialsSection testimonials={testimonials} />
        
        {/* FAQ Section */}
        <FAQSection faqs={faqs} />
        
        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with our expert-led courses. Get started today with our special ₹9 introductory offer!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Browse All Courses
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="mailto:info@sssam-academy.com"
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Contact Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
