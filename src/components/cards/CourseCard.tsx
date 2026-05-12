'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Badge, Card, Rating, Text } from '@/components/ui';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const isFeatured = course.featured || course.students > 5000;
  const isBestSeller = course.rating >= 4.8;
  const discountPercentage = course.originalPrice ? 
    Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100) : 0;

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card interactive className={`overflow-hidden h-full group transition-all duration-300 transform rounded-2xl ${course.featured ? 'hover:shadow-2xl hover:-translate-y-3 ring-2 ring-green-400 shadow-2xl bg-gradient-to-br from-white via-green-50 to-white' : 'hover:shadow-xl hover:-translate-y-2 bg-white'}`}>
        {/* Image Container */}
        <div className={`relative w-full h-56 overflow-hidden ${course.featured ? 'rounded-t-2xl' : ''}`}>
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {course.featured && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs px-3 py-1 shadow-lg rounded-full flex items-center gap-1">
                <span>⭐</span> FEATURED
              </Badge>
            )}
            {isBestSeller && !course.featured && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold text-xs px-3 py-1 shadow-lg rounded-full flex items-center gap-1">
                <span>🏆</span> Bestseller
              </Badge>
            )}
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full w-14 h-14 flex flex-col items-center justify-center font-bold shadow-lg z-10">
              <div className="text-xs">Save</div>
              <div className="text-lg">{discountPercentage}%</div>
            </div>
          )}

          {/* Batch Info */}
          {course.batchInfo && (
            <div className="absolute bottom-4 left-4 z-10">
              <Badge className="bg-white/95 backdrop-blur-sm text-gray-800 font-semibold text-xs px-3 py-1 shadow-md rounded-full flex items-center gap-1">
                <span>📅</span> {course.batchInfo}
              </Badge>
            </div>
          )}

        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-full">
          {/* Meta Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {course.nextBatch && (
              <Badge className="text-xs bg-gradient-to-r from-green-100 to-green-50 text-green-800 font-medium border border-green-200">
                <span className="inline-block mr-1">📅</span>Next: {course.nextBatch}
              </Badge>
            )}
            <Badge className="text-xs bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-medium border border-blue-200">
              {course.level}
            </Badge>
          </div>

          {/* Title */}
          <h3 className={`font-bold mb-3 line-clamp-2 transition-colors ${course.featured ? 'text-xl text-green-700 group-hover:text-green-800' : 'text-lg text-gray-900 group-hover:text-blue-700'}`}>
            {course.title}
          </h3>

          {/* Description */}
          <Text size="sm" color="muted" className="mb-4 line-clamp-2 flex-grow">
            {course.shortDescription}
          </Text>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-4">
            <Rating rating={course.rating} reviews={course.reviews} size="sm" />
            <Text size="sm" color="muted" className="text-gray-500">
              ({course.reviews.toLocaleString()} reviews)
            </Text>
          </div>

          {/* Course Stats - Better Icons */}
          <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-gray-100">
            <div className="flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 13a3 3 0 105 0H5a3 3 0 00-3-3h6V7a1 1 0 100-2H4a4 4 0 000 8h1v3a3 3 0 003 3h8a1 1 0 100-2h-8a1 1 0 00-1 1v-1h5a4 4 0 000-8z" />
              </svg>
              <span className="font-medium text-gray-700">{course.lessons}</span>
              <span className="text-gray-500">lessons</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-.707.707a1 1 0 101.414 1.414L9 9.414V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700">{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="font-medium text-gray-700">{(course.students / 1000).toFixed(1)}k+</span>
            </div>
          </div>

          {/* Price Section - India Specific */}
          <div className={`border-t pt-4 mt-auto ${course.featured ? 'bg-gradient-to-r from-green-50 to-emerald-50 -mx-5 -mb-5 px-5 py-4 rounded-b-lg' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${course.featured ? 'text-3xl text-green-600' : 'text-2xl text-blue-600'}`}>₹{course.price.toLocaleString('en-IN')}</span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{course.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Payment Methods & CTA */}
            <div className="text-xs text-gray-600 mb-2">
              <span className="flex items-center gap-1 mb-2">
                <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                UPI • Cards • Net Banking • EMI
              </span>
            </div>
            
            {course.status === 'published' && (
              <div className={`text-sm font-bold ${course.featured ? 'text-green-600' : 'text-blue-600'} flex items-center gap-1`}>
                <span>Explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
