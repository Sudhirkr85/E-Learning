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
      <Card interactive className={`overflow-hidden h-full group transition-all duration-300 transform rounded-2xl flex flex-col ${
        isFeatured 
          ? 'ring-2 ring-cyan-500/50 shadow-2xl bg-gradient-to-br from-background-secondary via-background-secondary to-background-tertiary' 
          : 'bg-gradient-to-br from-background-secondary to-background-tertiary'
      }`}>
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Image Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {isFeatured && (
              <Badge variant="success" className="!text-xs">
                ⭐ FEATURED
              </Badge>
            )}
            {isBestSeller && !isFeatured && (
              <Badge variant="warning" className="!text-xs">
                🏆 BESTSELLER
              </Badge>
            )}
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500/80 to-pink-600/80 backdrop-blur-sm text-white rounded-lg px-2 py-1 font-bold shadow-lg z-10 text-center">
              <div className="text-xs">Save</div>
              <div className="text-sm">{discountPercentage}%</div>
            </div>
          )}

          {/* Batch Badge */}
          {course.batchInfo && (
            <div className="absolute bottom-4 left-4 z-10">
              <Badge variant="info" className="!text-xs">
                📅 {course.batchInfo}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-full gap-4">
          {/* Level Badge */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="info" className="!text-xs">
              {course.level}
            </Badge>
            {course.nextBatch && (
              <Badge variant="success" className="!text-xs">
                📅 {course.nextBatch}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg md:text-base text-foreground line-clamp-2 group-hover:text-cyan-300 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <Text size="sm" color="secondary" className="line-clamp-2 flex-grow">
            {course.shortDescription}
          </Text>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating rating={course.rating} size="sm" />
            <Text size="xs" className="text-foreground-tertiary">
              ({course.reviews.toLocaleString()})
            </Text>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-3 py-3 border-t border-slate-700/50">
            <div className="flex flex-col items-center gap-1">
              <span className="text-cyan-400 font-bold text-sm">{course.lessons}</span>
              <Text size="xs" className="text-foreground-tertiary">Lessons</Text>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-purple-400 font-bold text-sm">{course.duration}</span>
              <Text size="xs" className="text-foreground-tertiary">Duration</Text>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-emerald-400 font-bold text-sm">{(course.students / 1000).toFixed(1)}k+</span>
              <Text size="xs" className="text-foreground-tertiary">Students</Text>
            </div>
          </div>

          {/* Price Section */}
          <div className={`border-t border-slate-700/50 pt-4 mt-auto ${
            isFeatured ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 -mx-5 -mb-5 px-5 py-4 rounded-b-2xl' : ''
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className={`font-bold ${isFeatured ? 'text-3xl text-cyan-400' : 'text-2xl text-foreground'}`}>
                  ₹{course.price.toLocaleString('en-IN')}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-foreground-tertiary line-through">
                    ₹{course.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Payment Info */}
            <Text size="xs" className="text-foreground-tertiary mb-3 flex items-center gap-1">
              <span className="text-emerald-400">💳</span>
              UPI • Cards • EMI Available
            </Text>
            
            {course.status === 'published' && (
              <div className={`text-sm font-bold flex items-center gap-2 ${isFeatured ? 'text-cyan-300' : 'text-foreground-secondary'} group-hover:text-cyan-400`}>
                <span>Explore Course</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
