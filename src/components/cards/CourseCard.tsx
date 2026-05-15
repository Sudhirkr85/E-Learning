'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Badge, Card, Rating, Text } from '@/components/ui';
import { getNextMonthlyBatchLabel } from '@/lib/batch';

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
      <Card interactive className={`overflow-hidden h-full group transition-all duration-300 flex flex-col rounded-xl border ${
        isFeatured 
          ? 'bg-slate-950 border-cyan-500/40 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/60' 
          : 'bg-slate-950 border-slate-700/50 hover:border-slate-600/80 hover:shadow-lg hover:shadow-slate-900/50'
      }`}>
        {/* Image Container */}
        <div className="relative w-full h-64 overflow-hidden bg-slate-800">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Subtle overlay - barely visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            {isFeatured && (
              <Badge variant="success" className="!text-xs backdrop-blur-sm bg-emerald-500/90 shadow-lg">
                ⭐ FEATURED
              </Badge>
            )}
            {isBestSeller && !isFeatured && (
              <Badge variant="warning" className="!text-xs backdrop-blur-sm bg-amber-500/90 shadow-lg">
                🏆 BESTSELLER
              </Badge>
            )}
          </div>

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-br from-red-500 to-red-600 backdrop-blur-sm text-white rounded-lg px-2.5 py-1.5 font-bold shadow-lg z-20 text-center">
              <div className="text-xs font-semibold">Save</div>
              <div className="text-sm font-bold">{discountPercentage}%</div>
            </div>
          )}

          {/* Batch Badge */}
          {course.batchInfo && (
            <div className="absolute bottom-3 left-3 z-20">
              <Badge variant="info" className="!text-xs backdrop-blur-sm bg-blue-500/90 shadow-lg">
                📅 {course.batchInfo}
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full gap-4 bg-slate-950">
          {/* Level Badge */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="info" className="!text-xs bg-slate-800 text-cyan-400 border border-cyan-500/30">
              {course.level}
            </Badge>
            <Badge variant="success" className="!text-xs bg-slate-800 text-emerald-400 border border-emerald-500/30">
              {getNextMonthlyBatchLabel()}
            </Badge>
          </div>

          <h3 className="text-xl font-semibold text-white mt-3">
            {course.title}
          </h3>

          {/* Description */}
          <Text size="sm" color="secondary" className="line-clamp-2 flex-grow text-slate-400">
            {course.shortDescription}
          </Text>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating rating={course.rating} size="sm" />
            <Text size="sm" className="text-slate-500 text-xs">
              ({course.reviews.toLocaleString()})
            </Text>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-slate-700">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-cyan-400 font-bold text-base">{course.lessons}</span>
              <Text size="sm" className="text-slate-500 text-xs">Lessons</Text>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-purple-400 font-bold text-base">{course.duration}</span>
              <Text size="sm" className="text-slate-500 text-xs">Duration</Text>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-emerald-400 font-bold text-base">{(course.students / 1000).toFixed(1)}k+</span>
              <Text size="sm" className="text-slate-500 text-xs">Students</Text>
            </div>
          </div>

          {/* Price Section */}
          <div className={`border-t border-slate-700 pt-4 mt-auto ${
            isFeatured ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 -mx-6 -mb-6 px-6 py-4 rounded-b-[10px]' : ''
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-2">
                <span className={`font-bold ${isFeatured ? 'text-3xl text-cyan-400' : 'text-2xl text-white'}`}>
                  ₹{course.price.toLocaleString('en-IN')}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-slate-500 line-through font-medium">
                    ₹{course.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Payment Info */}
            <Text size="sm" className="text-slate-500 mb-3 flex items-center gap-1.5 text-xs font-medium">
              <span className="text-emerald-400">💳</span>
              UPI • Cards • EMI Available
            </Text>
            
            {course.status === 'published' && (
              <div className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isFeatured ? 'text-cyan-400 group-hover:text-cyan-300' : 'text-slate-300 group-hover:text-cyan-400'}`}>
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
