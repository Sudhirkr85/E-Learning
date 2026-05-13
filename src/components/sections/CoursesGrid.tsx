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
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="text-blue-600">🎓</span>
            Trusted by 15,000+ Indian Students
          </div>
          <Heading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Professional IT Courses Tailored for You
          </Heading>
          <Text className="max-w-3xl mx-auto text-lg leading-relaxed text-slate-700 font-medium">
            Advanced training in AI Full Stack, Data Science, Cyber Security & Digital Marketing. Industry-focused with live training, lifetime recorded access, and job placement support.
          </Text>
        </div>

        {/* All 6 Courses in Single Grid - Homepage Fixed Structure */}
        {publishedCourses.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {publishedCourses.slice(0, 6).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
