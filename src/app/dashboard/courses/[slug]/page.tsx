'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Course } from '@/types';
import { Container, Heading, Text, Card } from '@/components/ui';
import { useUser } from '@clerk/nextjs';
import { checkCourseAccess } from '@/lib/course-access';

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
      <div className="py-12">
        {/* Course Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Heading className="mb-2">{course.title}</Heading>
              <p className="text-slate-300">
                Instructor: <span className="font-semibold">{course.instructor}</span>
              </p>
            </div>
            <Link
              href="/dashboard/courses"
              className="text-slate-400 hover:text-slate-300"
            >
              ← Back
            </Link>
          </div>
          <p className="text-slate-300">{course.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Class Sessions Section */}
            <Card className="p-8 mb-8">
              <Heading className="text-2xl mb-6 flex items-center gap-2">
                📅 Class Schedule
              </Heading>

              {sessions.length === 0 ? (
                <div className="py-12 text-center bg-slate-800 rounded-lg">
                  <Text className="text-slate-400">No class sessions scheduled yet</Text>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session, index) => {
                    const sessionDate = new Date(session.sessionDate);
                    const isUpcoming = sessionDate > new Date();
                    const liveClassLink = normalizeExternalUrl(session.googleMeetLink);

                    return (
                      <div
                        key={session._id}
                        className={`p-4 rounded-lg border-2 transition ${
                          isUpcoming
                            ? 'border-green-500 bg-green-900/20'
                            : 'border-slate-600 bg-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-white text-lg">
                              {index + 1}. {session.sessionTitle}
                            </h4>
                          </div>
                          {isUpcoming && (
                            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                              UPCOMING
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                          <div>
                            <span className="text-slate-400">Date:</span>
                            <p className="font-semibold text-white">
                              {sessionDate.toLocaleDateString('en-IN', {
                                weekday: 'short',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-400">Time:</span>
                            <p className="font-semibold text-white">{session.sessionTime}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          {liveClassLink ? (
                            <a
                              href={liveClassLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition inline-flex items-center gap-2"
                            >
                              🎥 Join Live Class
                            </a>
                          ) : (
                            <div className="px-4 py-2 rounded text-sm font-semibold border border-slate-700 bg-slate-900/70 text-slate-300">
                              Live class link will appear here once scheduled.
                            </div>
                          )}
                        </div>


                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Live Class Links removed per admin request */}

            {/* Course Materials removed per admin request */}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <Heading className="text-lg mb-4">📊 Course Info</Heading>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400">Level</p>
                  <p className="font-semibold text-white">{course.level}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Duration</p>
                  <p className="font-semibold text-white">{course.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Lessons</p>
                  <p className="font-semibold text-white">{course.lessons}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Category</p>
                  <p className="font-semibold text-white">{course.category}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Rating</p>
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
