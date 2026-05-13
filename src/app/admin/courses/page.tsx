'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Course } from '@/types';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 container mx-auto px-4">
        <div className="animate-pulse h-8 bg-[rgba(255,255,255,0.06)] rounded w-1/4 mb-6" />
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Courses Management</h1>
        <p className="text-sm text-[rgba(255,255,255,0.7)]">Manage all courses, sessions, and enrollments</p>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Courses</div>
          <div className="text-3xl font-bold mt-2">{courses.length}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Published</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-emerald)]">{courses.filter(c => c.status === 'published').length}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Students</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-primary)]">{courses.reduce((sum, c) => sum + (c.students || 0), 0)}</div>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {courses.length === 0 ? (
          <div className="p-12 rounded-lg glass-strong text-center">
            <p className="text-[rgba(255,255,255,0.6)]">No courses found</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="p-6 rounded-lg glass-strong hover:border-[rgba(6,182,212,0.4)] transition">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Course Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.6)] mb-4">{course.shortDescription}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-[rgba(6,182,212,0.12)] text-[var(--accent-primary)]">
                      {course.students || 0} students
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      course.status === 'published'
                        ? 'bg-[rgba(16,185,129,0.12)] text-[var(--accent-emerald)]'
                        : 'bg-[rgba(8,145,178,0.12)] text-[var(--accent-primary)]'
                    }`}>
                      {course.status === 'published' ? '✓ Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Link
                    href={`/admin/courses/${course.id}/sessions`}
                    className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition text-center text-sm"
                  >
                    Sessions
                  </Link>
                  <Link
                    href={`/admin/courses/${course.id}/enrollments`}
                    className="px-4 py-2 rounded bg-[var(--accent-secondary)] text-black font-semibold hover:opacity-90 transition text-center text-sm"
                  >
                    Enrollments
                  </Link>
                  <Link
                    href={`/admin/courses/${course.id}`}
                    className="px-4 py-2 rounded bg-[rgba(255,255,255,0.03)] text-white hover:bg-[rgba(255,255,255,0.05)] transition text-center text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

