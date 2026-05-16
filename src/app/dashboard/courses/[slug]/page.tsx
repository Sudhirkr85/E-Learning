'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Course } from '@/types';
import { Container, Heading, Text, Card } from '@/components/ui';
import { useUser } from '@clerk/nextjs';
import { checkCourseAccess } from '@/lib/course-access';
import { formatTimeIndia, formatDateIndia } from '@/utils/helpers';

interface ClassSession {
  _id: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
  googleMeetLink: string;
  active?: boolean;
}

const isPlaceholderVideoUrl = (url: string) => url.includes('dQw4w9WgXcQ');

const normalizeExternalUrl = (value?: string) => {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return '';
    }
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    fetchCourseData();
  }, [slug, user?.id]);

  const fetchCourseData = async () => {
    try {
      // Fetch course
      const courseRes = await fetch(`/api/courses/${slug}`);
      const courseData = await courseRes.json();

      if (courseData.success) {
        setCourse(courseData.course);

        // Only fetch sessions if the current user has purchased the course
        const studentId = user?.id;
        let hasAccess = false;
        if (studentId) {
          hasAccess = await checkCourseAccess(courseData.course.id, studentId);
        }

        if (hasAccess) {
          const sessionsRes = await fetch(`/api/admin/sessions?courseId=${encodeURIComponent(courseData.course.id)}`);
          const sessionsData = await sessionsRes.json();

          if (sessionsData.success) {
            // only show active sessions to students
            setSessions((sessionsData.sessions || []).filter((s: any) => s.active !== false));
          }
        } else {
          // no access: keep sessions empty
          setSessions([]);
        }
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="py-12">
          <Text className="text-slate-300">Loading course details...</Text>
        </div>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container>
        <div className="py-12 text-center">
          <Heading className="mb-4">Course not found</Heading>
          <Link href="/dashboard/courses" className="text-blue-400 hover:text-blue-300">
            ← Back to courses
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-14">
        {/* Course Header */}
        <div className="mb-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
            <div>
              <Heading className="mb-2 text-white">{course.title}</Heading>
              <p className="text-slate-400 text-sm lg:text-base max-w-2xl">
                Practical learning, live class schedules, and Gurugram-focused placement coaching for students with access to AI-enabled training.
              </p>
              <p className="text-slate-400 mt-2">
                Instructor: <span className="font-semibold text-white">{course.instructor}</span>
              </p>
            </div>
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-100 font-semibold transition"
            >
              ← Back to My Courses
            </Link>
          </div>
          <p className="text-slate-300 leading-relaxed">{course.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Class Sessions Section */}
            <Card className="p-8 mb-8 bg-slate-900/95 border border-cyan-500/10 shadow-2xl shadow-cyan-500/10">
              <Heading className="text-2xl mb-6 flex items-center gap-2 text-white">
                📅 Class Schedule
              </Heading>

              {sessions.length === 0 ? (
                <div className="py-12 text-center bg-slate-950 rounded-3xl border border-slate-800">
                  <Text className="text-slate-400">No class sessions scheduled yet. Please check back for the latest batch details.</Text>
                </div>
              ) : (
                <div className="space-y-5">
                  {sessions.map((session, index) => {
                    const sessionDate = new Date(session.sessionDate);
                    const isUpcoming = sessionDate > new Date();
                    const liveClassLink = normalizeExternalUrl(session.googleMeetLink);

                    return (
                      <div
                        key={session._id}
                        className={`rounded-3xl border p-6 transition ${
                          isUpcoming
                            ? 'border-cyan-500/30 bg-cyan-500/10'
                            : 'border-slate-700 bg-slate-950/80'
                        }`}
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white text-lg">
                              {index + 1}. {session.sessionTitle}
                            </h4>
                            <p className="text-slate-400 text-sm mt-1">Live practical session with expert guidance and follow-up resources.</p>
                          </div>
                          {isUpcoming && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                              Upcoming
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5 text-sm">
                          <div className="rounded-3xl bg-slate-950/70 p-4">
                            <p className="text-slate-400 uppercase text-[0.7rem] tracking-[0.16em] mb-2">Date</p>
                            <p className="text-white font-semibold">
                              {formatDateIndia(sessionDate)}
                            </p>
                          </div>
                          <div className="rounded-3xl bg-slate-950/70 p-4">
                            <p className="text-slate-400 uppercase text-[0.7rem] tracking-[0.16em] mb-2">Time</p>
                            <p className="text-white font-semibold">{formatTimeIndia(session.sessionTime, session.sessionDate)}</p>
                          </div>
                          <div className="rounded-3xl bg-slate-950/70 p-4">
                            <p className="text-slate-400 uppercase text-[0.7rem] tracking-[0.16em] mb-2">Mode</p>
                            <p className="text-white font-semibold">Live Online</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          {liveClassLink ? (
                            <a
                              href={liveClassLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white hover:from-cyan-400 hover:to-blue-500 transition"
                            >
                              Join Live Class
                            </a>
                          ) : (
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/90 px-5 py-3 text-sm font-semibold text-slate-300">
                              Live class link will be shared soon.
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 bg-slate-900/95 border border-cyan-500/10 shadow-2xl shadow-cyan-500/10">
              <Heading className="text-lg mb-6 text-white">Course Snapshot</Heading>

              <div className="space-y-5">
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-[0.16em] mb-2">Level</p>
                  <p className="font-semibold text-white">{course.level}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-[0.16em] mb-2">Duration</p>
                  <p className="font-semibold text-white">{course.duration}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-[0.16em] mb-2">Lessons</p>
                  <p className="font-semibold text-white">{course.lessons}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-[0.16em] mb-2">Category</p>
                  <p className="font-semibold text-white">{course.category}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-[0.16em] mb-2">Rating</p>
                  <p className="font-semibold text-white">⭐ {course.rating}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
