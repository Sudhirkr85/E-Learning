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
  description?: string;
  sessionDate: string;
  sessionTime: string;
  durationMinutes: number;
  googleMeetLink: string;
  recordingLink?: string;
  notes?: string;
}

interface CourseContact {
  supportEmail: string;
  supportPhone: string;
  instructorName: string;
  instructorEmail?: string;
  officeHours?: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [contact, setContact] = useState<CourseContact | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    fetchCourseData();
  }, [slug]);

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
          const [sessionsRes, contactRes] = await Promise.all([
            fetch(`/api/admin/sessions?courseId=${courseData.course.id}`),
            fetch(`/api/admin/course-contact?courseId=${courseData.course.id}`),
          ]);

          const sessionsData = await sessionsRes.json();
          const contactData = await contactRes.json();

          if (sessionsData.success) {
            // only show active sessions to students
            setSessions((sessionsData.sessions || []).filter((s: any) => s.active !== false));
          }

          if (contactData.success && contactData.contact) {
            setContact(contactData.contact);
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
                            {session.description && (
                              <p className="text-sm text-slate-300 mt-1">{session.description}</p>
                            )}
                          </div>
                          {isUpcoming && (
                            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                              UPCOMING
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
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
                          <div>
                            <span className="text-slate-400">Duration:</span>
                            <p className="font-semibold text-white">{session.durationMinutes} min</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Status:</span>
                            <p className="font-semibold text-white">
                              {isUpcoming ? '🔴 Live' : '✅ Completed'}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <a
                            href={session.googleMeetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition inline-flex items-center gap-2"
                          >
                            🎥 Join Google Meet
                          </a>

                          {session.recordingLink && (
                            <a
                              href={session.recordingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-semibold transition inline-flex items-center gap-2"
                            >
                              📹 View Recording
                            </a>
                          )}
                        </div>

                        {session.notes && (
                          <div className="mt-4 p-3 bg-slate-700 rounded border-l-4 border-blue-400">
                            <p className="text-sm text-slate-300">
                              <span className="font-semibold text-blue-400">Note: </span>
                              {session.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Course Materials Section */}
            {course.curriculum && course.curriculum.length > 0 && (
              <Card className="p-8">
                <Heading className="text-2xl mb-6 flex items-center gap-2">
                  📚 Course Materials
                </Heading>

                <div className="space-y-4">
                  {course.curriculum.map((lesson, index) => (
                    <div key={lesson.id} className="p-4 bg-slate-800 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-white">
                            Lesson {index + 1}: {lesson.title}
                          </h4>
                          {lesson.description && (
                            <p className="text-sm text-slate-300 mt-1">{lesson.description}</p>
                          )}
                          <p className="text-xs text-slate-400 mt-2">
                            ⏱️ {lesson.duration} minutes
                          </p>
                        </div>
                        <a
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition whitespace-nowrap"
                        >
                          Watch Video
                        </a>
                      </div>

                      {lesson.resources && lesson.resources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-600">
                          <p className="text-xs text-slate-400 mb-2">Resources:</p>
                          <div className="flex gap-2 flex-wrap">
                            {lesson.resources.map((resource) => (
                              <a
                                key={resource.id}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-slate-700 hover:bg-slate-600 text-blue-400 px-2 py-1 rounded transition"
                              >
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Support Info */}
          <div className="lg:col-span-1">
            {/* Support Card */}
            <Card className="p-6 mb-6 sticky top-4">
              <Heading className="text-xl mb-4 flex items-center gap-2">
                💬 Support
              </Heading>

              {contact ? (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800 rounded">
                    <p className="text-xs text-slate-400 mb-1">Instructor</p>
                    <p className="font-semibold text-white">{contact.instructorName}</p>
                    {contact.instructorEmail && (
                      <a
                        href={`mailto:${contact.instructorEmail}`}
                        className="text-sm text-blue-400 hover:text-blue-300 block mt-1"
                      >
                        {contact.instructorEmail}
                      </a>
                    )}
                  </div>

                  <div className="p-4 bg-slate-800 rounded">
                    <p className="text-xs text-slate-400 mb-1">Support Email</p>
                    <a
                      href={`mailto:${contact.supportEmail}`}
                      className="font-semibold text-blue-400 hover:text-blue-300 break-all"
                    >
                      {contact.supportEmail}
                    </a>
                  </div>

                  <div className="p-4 bg-slate-800 rounded">
                    <p className="text-xs text-slate-400 mb-1">Support Phone</p>
                    <a
                      href={`tel:${contact.supportPhone}`}
                      className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                      {contact.supportPhone}
                    </a>
                  </div>

                  {contact.officeHours && (
                    <div className="p-4 bg-slate-800 rounded">
                      <p className="text-xs text-slate-400 mb-1">Office Hours</p>
                      <p className="text-sm text-white">{contact.officeHours}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                    <div className="p-4 bg-slate-800 rounded">
                      <p className="text-xs text-slate-400 mb-1">Support Email</p>
                      <a
                        href={`mailto:info@sssamacadmy.com`}
                        className="font-semibold text-blue-400 hover:text-blue-300 break-words whitespace-normal"
                      >
                        info@sssamacadmy.com
                      </a>
                    </div>

                    <div className="p-4 bg-slate-800 rounded">
                      <p className="text-xs text-slate-400 mb-1">Support Phone</p>
                      <a href={`tel:+919217031899`} className="font-semibold text-blue-400 hover:text-blue-300">+91 9217031899</a>
                    </div>
                </div>
              )}
            </Card>

            {/* Course Info Card */}
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
