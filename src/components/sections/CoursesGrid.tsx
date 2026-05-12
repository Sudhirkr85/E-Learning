'use client';

import { Container, Heading, Text } from '@/components/ui';
import { CourseCard } from '@/components/cards';
import { Course } from '@/types';

interface CoursesGridProps {
  courses: Course[];
  title?: string;
  description?: string;
}

export function CoursesGrid({
  courses,
  title = 'Professional IT Courses for Indian Students | SSSAM Academy',
  description = 'Advanced training in AI Full Stack, Data Science, Cyber Security & Digital Marketing. Job-focused courses with placement support, flexible payment options, and live training + lifetime recordings.',
}: CoursesGridProps) {
  const publishedCourses = courses.filter(course => course.status === 'published');
  const premiumCourses = courses.filter(course => course.price > 10000);
  const featuredCourses = courses.filter(course => course.featured);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="text-blue-600">🎓</span>
            Trusted by Indian Students
          </div>
          <Heading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </Heading>
          <Text size="lg" color="muted" className="max-w-3xl mx-auto text-lg leading-relaxed">
            {description}
          </Text>
        </div>

        {/* Featured Course - Premium Styling */}
        {featuredCourses.length > 0 && (
          <div className="mb-16">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-emerald-200 blur-2xl opacity-50"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <svg className="w-8 h-8 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Featured - Limited Time Offer</h3>
                    <p className="text-sm text-gray-600 mt-1">Start your AI Full Stack journey at an unbeatable price</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* All Other Courses */}
        {publishedCourses.filter(c => !c.featured).length > 0 && (
          <div className="mb-16">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 blur-2xl opacity-40"></div>
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Other Professional Courses</h3>
                <p className="text-sm text-gray-600 mt-2">Advanced training in web development, data science, cybersecurity & digital marketing</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {publishedCourses.filter(c => !c.featured).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}


        {/* Call to Action - India Specific */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 md:p-14 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Transform Your Tech Career with SSSAM Academy
            </h3>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join over 15,000+ Indian students who've successfully built their tech careers. Our industry-focused courses come with job placement support, live training, lifetime access to recordings, and flexible payment options including UPI, cards, and net banking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-50 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                View All Courses
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Free Counseling
              </a>
            </div>
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-blue-100">
              <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 8a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>95% Placement Support</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Flexible Payment Plans</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span>24/7 Hindi + English Support</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
