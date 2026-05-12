'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Badge, Card, Rating, Text } from '@/components/ui';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card interactive className="overflow-hidden h-full">
        {/* Image */}
        <div className="relative w-full h-48 bg-gray-200">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {course.status === 'coming-soon' && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Badge variant="warning" className="text-lg">
                Coming Soon
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="info" className="text-xs">
              {course.level}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {course.title}
          </h3>

          <Text size="sm" color="muted" className="mb-3 line-clamp-2">
            {course.shortDescription}
          </Text>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 relative">
              <Image
                src={course.instructorImage}
                alt={course.instructor}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <Text size="sm" color="muted">
              {course.instructor}
            </Text>
          </div>

          {/* Rating */}
          <div className="mb-3">
            <Rating rating={course.rating} reviews={course.reviews} size="sm" />
          </div>

          {/* Stats */}
          <div className="flex gap-3 mb-4 text-sm text-gray-600">
            <span>📚 {course.lessons} lessons</span>
            <span>⏱️ {course.duration}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">₹{course.price.toLocaleString()}</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{course.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
