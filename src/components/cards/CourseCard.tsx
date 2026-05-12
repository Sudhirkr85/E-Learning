'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Badge, Card, Rating, Text } from '@/components/ui';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const isFeatured = course.students > 5000;
  const isBestSeller = course.rating >= 4.8;
  const discountPercentage = course.originalPrice ? 
    Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) : 0;

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card interactive className="overflow-hidden h-full group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isBestSeller && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xs px-2 py-1 shadow-lg">
                🏆 Bestseller
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs px-2 py-1 shadow-lg">
                ⭐ Featured
              </Badge>
            )}
          </div>

          {/* Batch Info Badge */}
          {course.batchInfo && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs px-2 py-1 shadow-lg">
                📅 {course.batchInfo}
              </Badge>
            </div>
          )}

          {/* Price Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm shadow-lg">
              -{discountPercentage}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-full">
          {/* Next Batch Info */}
          {course.nextBatch && (
            <div className="mb-3">
              <Badge variant="info" className="text-xs bg-green-100 text-green-800 font-medium">
                Next Batch: {course.nextBatch}
              </Badge>
            </div>
          )}

          {/* Level Badge */}
          <div className="mb-3">
            <Badge variant="info" className="text-xs bg-blue-100 text-blue-800 font-medium">
              {course.level}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <Text size="sm" color="muted" className="mb-4 line-clamp-2 flex-grow">
            {course.shortDescription}
          </Text>

          {/* Instructor */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 relative overflow-hidden border-2 border-gray-300">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(course.instructor)}`}
                alt={course.instructor}
                fill
                sizes="40px"
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <Text size="sm" className="font-medium text-gray-900">
                {course.instructor}
              </Text>
              <Text size="sm" color="muted">
                Expert Instructor
              </Text>
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-4">
            <Rating rating={course.rating} reviews={course.reviews} size="sm" />
            <Text size="sm" color="muted" className="text-gray-500">
              ({course.reviews.toLocaleString()} reviews)
            </Text>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{course.students.toLocaleString()}+</span>
            </div>
          </div>

          {/* Price Section - India Specific */}
          <div className="border-t pt-4 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">₹{course.price.toLocaleString('en-IN')}</span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{course.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {course.status === 'published' && (
                <div className="text-sm text-green-600 font-medium">
                  Enroll Now →
                </div>
              )}
            </div>
            {/* Payment Methods */}
            <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <span>UPI • Cards • Net Banking</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
