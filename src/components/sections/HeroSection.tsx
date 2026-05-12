'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Container, Button, Heading, Text, Badge } from '@/components/ui';
import { ROUTES } from '@/constants';

interface HeroProps {
  course: Course;
}

export function HeroSection({ course }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div>
            <Badge className="mb-4 bg-white text-blue-600 font-semibold">
              {course.level} Course
            </Badge>

            <Heading level={1} className="text-white mb-4">
              {course.title}
            </Heading>

            <Text size="lg" className="text-blue-50 mb-4">
              {course.description}
            </Text>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button variant="primary" href={`/courses/${course.slug}`} size="lg">
                Enroll Now
              </Button>
              <Button variant="outline" href={ROUTES.COURSES} size="lg">
                View All Courses
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold">{course.students.toLocaleString()}</div>
                <Text size="sm" className="text-blue-100">
                  Students
                </Text>
              </div>
              <div>
                <div className="text-2xl font-bold">{course.lessons}</div>
                <Text size="sm" className="text-blue-100">
                  Lessons
                </Text>
              </div>
              <div>
                <div className="text-2xl font-bold">{course.rating}</div>
                <Text size="sm" className="text-blue-100">
                  Rating
                </Text>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
