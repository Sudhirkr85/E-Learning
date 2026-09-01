'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Badge, Card, Rating, Text } from '@/components/ui';
import { getNextMonthlyBatchLabel } from '@/lib/batch';
import { getCourseBenefitLabel } from '@/lib/course-highlights';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const isFeatured = course.featured;
  const isBestSeller = course.rating >= 4.8;

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card interactive className={`overflow-hidden h-full group transition-all duration-300 flex flex-col rounded-2xl border ${
        isFeatured 
          ? 'bg-slate-950 border-cyan-500/40 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/60' 
          : 'bg-slate-950 border-slate-700/50 hover:border-slate-600/80 hover:shadow-lg hover:shadow-slate-900/50'
      }`}>
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-slate-800">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            {isFeatured && (
              <Badge variant="success" className="!text-xs backdrop-blur-sm bg-emerald-500/90 shadow-lg">
                ⭐ POPULAR
              </Badge>
            )}
            {isBestSeller && !isFeatured && (
              <Badge variant="warning" className="!text-xs backdrop-blur-sm bg-amber-500/90 shadow-lg">
                🏆 TOP RATED
              </Badge>
            )}
          </div>

          {/* Scholarship Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-br from-cyan-600 to-blue-600 backdrop-blur-sm text-white rounded-xl px-2.5 py-1.5 font-bold shadow-lg z-20 text-center">
            <div className="text-[10px] font-medium text-cyan-200">Scholarship</div>
            <div className="text-xs font-black">Up to 40%</div>
          </div>

          {/* Batch Badge */}
          {course.batchInfo && (
            <div className="absolute bottom-3 left-3 z-20">
              <Badge variant="info" className="!text-xs backdrop-blur-sm bg-slate-900/90 border border-slate-700 text-cyan-300 shadow-lg">
                📍 Sector 14 Gurugram
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col h-full gap-3 bg-slate-950">
          {/* Level Badge */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="info" className="!text-xs bg-slate-800 text-cyan-400 border border-cyan-500/30">
              {course.level}
            </Badge>
            <Badge variant="success" className="!text-xs bg-slate-800 text-emerald-400 border border-emerald-500/30">
              {getNextMonthlyBatchLabel()}
            </Badge>
          </div>

          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
            {course.title}
          </h3>

          {/* Description */}
          <Text size="sm" color="secondary" className="line-clamp-2 flex-grow text-slate-400 text-xs leading-relaxed">
            {course.shortDescription}
          </Text>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Rating rating={course.rating} size="sm" />
            <Text size="sm" className="text-slate-400 text-xs">
              ({course.reviews.toLocaleString()} reviews)
            </Text>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-800 text-center">
            <div>
              <span className="text-cyan-400 font-bold text-sm">{course.lessons}</span>
              <div className="text-[10px] text-slate-500">Modules</div>
            </div>
            <div>
              <span className="text-purple-400 font-bold text-sm">{course.duration}</span>
              <div className="text-[10px] text-slate-500">Duration</div>
            </div>
            <div>
              <span className="text-emerald-400 font-bold text-xs leading-tight block">{getCourseBenefitLabel(course)}</span>
              <div className="text-[10px] text-slate-500">Placement</div>
            </div>
          </div>

          {/* Fee & Action Section */}
          <div className="border-t border-slate-800 pt-3 mt-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-emerald-400">
                🏷️ Flexible EMI Available
              </span>
              <span className="text-[10px] text-slate-400">
                Live Classroom / Online
              </span>
            </div>

            <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 text-center text-xs font-bold group-hover:bg-cyan-500 group-hover:text-white transition-all flex items-center justify-center gap-1.5">
              <span>Request Fee Structure & Demo Pass →</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
