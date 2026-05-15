'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { courses } from '@/data/courses';

interface EnrollmentRow {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  enrolledAt: string;
  amount: number;
  orderId: string;
  paymentStatus?: string;
}

interface CourseSummary {
  totalPurchases: number;
  enrolledStudentCount: number;
  latestStudents: EnrollmentRow[];
}

export default function AdminCoursesPage() {
  const [summaries, setSummaries] = useState<Record<string, CourseSummary>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const responses = await Promise.all(
          courses.map(async (course) => {
            const response = await fetch(`/api/admin/course-enrollments?courseId=${course.id}`);
            const data = await response.json();
            return [course.id, {
              totalPurchases: data.totalStudents || 0,
              enrolledStudentCount: data.totalStudents || 0,
              latestStudents: (data.enrollments || []).slice(0, 3),
            }] as const;
          })
        );

        setSummaries(Object.fromEntries(responses));
      } catch (error) {
        console.error('Error fetching course summaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  if (loading) {
    return (
      <div className="py-12 container mx-auto px-4">
        <div className="animate-pulse h-8 bg-[rgba(255,255,255,0.06)] rounded w-1/4 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="h-56 rounded-lg bg-slate-800 border border-slate-700" />
          ))}
        </div>
      </div>
    );
  }

  const totalEnrollments = courses.reduce((sum, course) => sum + (summaries[course.id]?.enrolledStudentCount || 0), 0);

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2"> Courses</h1>
        <p className="text-sm text-[rgba(255,255,255,0.7)]">
          Courses are managed in <span className="font-medium">src/data/courses.ts</span>. Admin can only manage sessions and view enrollments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <div className="text-sm text-[rgba(255,255,255,0.65)]"> Courses</div>
          <div className="text-3xl font-bold mt-2">{courses.length}</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Published</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-emerald)]">{courses.filter((course) => course.status === 'published').length}</div>
        </div>
        <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Enrollments</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-primary)]">{totalEnrollments}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => {
          const summary = summaries[course.id];

          return (
            <div key={course.id} className="rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200">{course.category}</span>
                    <span className={`rounded-full px-3 py-1 text-xs ${course.status === 'published' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-cyan-500/15 text-cyan-300'}`}>
                      {course.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="mb-4 max-w-3xl text-sm text-slate-300">{course.shortDescription}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Enrolled students</div>
                      <div className="mt-1 text-2xl font-bold text-white">{summary?.enrolledStudentCount || 0}</div>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Total purchases</div>
                      <div className="mt-1 text-2xl font-bold text-white">{summary?.totalPurchases || 0}</div>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Course price</div>
                      <div className="mt-1 text-2xl font-bold text-white">₹{course.price.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link href={`/admin/courses/${course.id}/sessions`} className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
                      Manage Sessions
                    </Link>
                    <Link href={`/admin/courses/${course.id}/enrollments`} className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-700">
                      View Enrollments
                    </Link>
                  </div>
                </div>

                <div className="w-full lg:w-[26rem]">
                  <div className="rounded-lg border border-slate-700 bg-slate-900/80 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-white">Latest enrolled students</h4>
                      <span className="text-xs text-slate-400">Top 3</span>
                    </div>

                    {(summary?.latestStudents || []).length === 0 ? (
                      <p className="text-sm text-slate-400">No enrollments yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {summary?.latestStudents.map((student) => (
                          <div key={student.orderId} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-200">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="font-medium text-white">{student.studentName}</div>
                                <div className="text-xs text-slate-400">{student.studentEmail}</div>
                                <div className="text-xs text-slate-400">{student.studentPhone}</div>
                              </div>
                              <div className="text-right text-xs text-slate-400">
                                <div className="font-semibold text-emerald-300">₹{student.amount.toLocaleString('en-IN')}</div>
                                <div>{student.paymentStatus || 'completed'}</div>
                                <div>{new Date(student.enrolledAt).toLocaleDateString('en-IN')}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
