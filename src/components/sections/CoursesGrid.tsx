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
  title = 'Premium IT Courses in Gurugram',
  description = 'Job-oriented training programs designed for Indian students with placement support and flexible payment options',
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

        {/* Featured Course */}
        {featuredCourses.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
              <h3 className="text-lg font-semibold text-gray-700 whitespace-nowrap flex items-center gap-2">
                <span className="text-red-600">🔥</span>
                Summer Special Offer
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* All Published Courses */}
        {publishedCourses.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1"></div>
              <h3 className="text-lg font-semibold text-gray-700 whitespace-nowrap">Available Courses</h3>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {publishedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Premium Courses */}
        {premiumCourses.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1"></div>
              <h3 className="text-lg font-semibold text-gray-700 whitespace-nowrap flex items-center gap-2">
                <span className="text-purple-600">�</span>
                Advanced Courses
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {premiumCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Call to Action - India Specific */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <Heading level={3} className="text-2xl md:text-3xl font-bold mb-4">
              Start Your IT Career in India?
            </Heading>
            <Text size="lg" className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Indian students who are building successful tech careers with our job-oriented training programs in Gurugram.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse All Courses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Request Free Counseling
              </a>
            </div>
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-blue-100">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Placement Support
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Easy EMI Available
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Hindi + English
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
