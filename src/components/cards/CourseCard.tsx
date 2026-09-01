'use client';

import Link from 'next/link';
import { Course } from '@/types';
import { Badge, Card, Rating, Text } from '@/components/ui';
import { getNextMonthlyBatchLabel } from '@/lib/batch';
import { getCourseBenefitLabel } from '@/lib/course-highlights';

interface CourseCardProps {
  course: Course;
}

// Icon mapping based on course category / slug
function getCourseIcon(slug: string): string {
  if (slug.includes('data-science')) return '📊';
  if (slug.includes('data-analyst') || slug.includes('analytics') || slug.includes('power-bi')) return '📈';
  if (slug.includes('cyber-security') || slug.includes('ethical-hacking')) return '🔐';
  if (slug.includes('digital-marketing') || slug.includes('seo')) return '📱';
  if (slug.includes('python')) return '🐍';
  return '💻';
}

export function CourseCard({ course }: CourseCardProps) {
  const isFeatured = course.featured;
  const isBestSeller = course.rating >= 4.8;
  const icon = getCourseIcon(course.slug);

  return (
    <Link href={`/courses/${course.slug}`}>
      <Card
        interactive
        className={`overflow-hidden h-full group transition-all duration-300 flex flex-col rounded-2xl border p-6 ${
          isFeatured
            ? 'bg-slate-900/90 border-cyan-500/40 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:border-cyan-500/70'
            : 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 shadow-lg'
        }`}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 group-hover:bg-cyan-500/20 transition-transform duration-300">
            {icon}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              {isFeatured ? '🔥 Most Popular' : isBestSeller ? '🏆 Top Rated' : '⭐ Career Track'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              📍 Sector 14 Gurugram
            </span>
          </div>
        </div>

        {/* Badges Row */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="info" className="!text-xs bg-slate-800 text-cyan-300 border border-cyan-500/30">
            {course.level}
          </Badge>
          <Badge variant="success" className="!text-xs bg-slate-800 text-emerald-300 border border-emerald-500/30">
            {getNextMonthlyBatchLabel()}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors mb-2">
          {course.title}
        </h3>

        {/* Description */}
        <Text size="sm" color="secondary" className="line-clamp-2 flex-grow text-slate-300 text-xs leading-relaxed mb-4">
          {course.shortDescription}
        </Text>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Rating rating={course.rating} size="sm" />
          <span className="text-xs text-slate-400 font-medium">
            ({course.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 py-3.5 border-t border-slate-800 text-center rounded-xl bg-slate-950/60 mb-4">
          <div>
            <span className="text-cyan-400 font-bold text-sm block">{course.lessons}</span>
            <div className="text-[10px] text-slate-500">Modules</div>
          </div>
          <div>
            <span className="text-purple-400 font-bold text-sm block">{course.duration}</span>
            <div className="text-[10px] text-slate-500">Duration</div>
          </div>
          <div>
            <span className="text-emerald-400 font-bold text-xs leading-tight block">{getCourseBenefitLabel(course)}</span>
            <div className="text-[10px] text-slate-500">Placement</div>
          </div>
        </div>

        {/* Fee & Action CTA */}
        <div className="border-t border-slate-800/80 pt-4 mt-auto">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <span>🏷️ Up to 40% Scholarship</span>
            </span>
            <span className="text-[10px] text-slate-400">Classroom / Live</span>
          </div>

          <div className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 text-cyan-200 text-center text-xs font-bold group-hover:bg-cyan-500 group-hover:text-white transition-all flex items-center justify-center gap-1.5 shadow">
            <span>Request Fee Structure & Demo Pass →</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
