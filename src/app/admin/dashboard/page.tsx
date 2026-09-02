'use client';

import { useEffect, useState } from 'react';
import { Course, Coupon } from '@/types';
import { HeroMesh } from '@/components/ui';
import { courses as staticCourses } from '@/data/courses';
import { formatDateIndia } from '@/utils/helpers';

interface DashboardStats {
  totalCourses: number;
  totalCoupons: number;
  activeCoupons: number;
  publishedCourses: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalCoupons: 0,
    activeCoupons: 0,
    publishedCourses: 0,
  });
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const couponsResponse = await fetch('/api/admin/coupons');
      const couponsData = await couponsResponse.json();

      if (couponsData.success) {
        const courses = staticCourses;
        const coupons = couponsData.coupons || [];

        setStats({
          totalCourses: courses.length,
          totalCoupons: coupons.length,
          activeCoupons: coupons.filter((c: Coupon) => c.isActive).length,
          publishedCourses: courses.filter((c: Course) => c.status === 'published').length,
        });

        setRecentCourses(
          courses
            .sort((a: Course, b: Course) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 6)
        );
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-pulse container mx-auto px-4">
          <div className="h-8 bg-[rgba(255,255,255,0.06)] rounded w-1/4 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-[rgba(255,255,255,0.02)] rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="relative mb-8">
          <div className="p-6 rounded-lg bg-slate-800 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <p className="text-sm text-[rgba(255,255,255,0.7)]">Overview of courses, enrollments, and sessions</p>
              </div>
              <div className="w-64">
                <HeroMesh />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
            <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Courses</div>
            <div className="text-2xl font-bold mt-2">{stats.totalCourses}</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
            <div className="text-sm text-[rgba(255,255,255,0.65)]">Published Courses</div>
            <div className="text-2xl font-bold mt-2">{stats.publishedCourses}</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
            <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Coupons</div>
            <div className="text-2xl font-bold mt-2">{stats.totalCoupons}</div>
          </div>
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
            <div className="text-sm text-[rgba(255,255,255,0.65)]">Active Coupons</div>
            <div className="text-2xl font-bold mt-2">{stats.activeCoupons}</div>
          </div>
        </div>

        {/* Course overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Courses Overview</h3>
                <div className="text-sm text-[rgba(255,255,255,0.7)]">Latest updated courses</div>
              </div>

              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center gap-4 p-3 rounded hover:bg-[rgba(255,255,255,0.02)] transition">
                    <img src={course.thumbnail || '/images/courses/fullstack-6month.webp'} alt={course.title} className="w-20 h-12 object-cover rounded-md" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">{course.title}</div>
                          <div className="text-xs text-[rgba(255,255,255,0.6)]">{course.status}</div>
                        </div>
                        <div className="text-right text-xs text-[rgba(255,255,255,0.6)]">Updated {formatDateIndia(new Date(course.updatedAt))}</div>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <a href={`/admin/courses/${course.id}/sessions`} className="px-3 py-1 rounded bg-[rgba(6,182,212,0.12)] text-[var(--accent-primary)] text-sm">Manage Sessions</a>
                        <a href={`/admin/courses/${course.id}/enrollments`} className="px-3 py-1 rounded bg-[rgba(139,92,246,0.08)] text-[var(--accent-secondary)] text-sm">View Enrollments</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <a href="/admin/coupons/new" className="block text-center px-3 py-2 rounded bg-[var(--accent-secondary)] text-white">New Coupon</a>
                <a href="/admin/courses" className="block text-center px-3 py-2 rounded bg-[rgba(6,182,212,0.12)] text-[var(--accent-primary)]">Manage Sessions</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
