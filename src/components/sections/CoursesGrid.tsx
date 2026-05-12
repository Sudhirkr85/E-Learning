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
  title = 'Featured Courses',
  description = 'Explore our most popular courses',
}: CoursesGridProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4">
            {title}
          </Heading>
          <Text size="lg" color="muted" className="max-w-2xl mx-auto">
            {description}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </Container>
    </section>
  );
}
