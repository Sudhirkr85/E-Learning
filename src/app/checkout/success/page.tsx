'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button, Divider, Card } from '@/components/ui';
import { ROUTES, SITE_CONFIG } from '@/constants';
import { getNextMonthlyBatchDateString } from '@/lib/batch';
import { Course } from '@/types';

interface NextSession {
  _id: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
  googleMeetLink: string;
  active?: boolean;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [purchaseData, setPurchaseData] = useState({
    orderId: '',
    paymentId: '',
    amount: 0,
    courseTitle: '',
    courseSlug: '',
    studentEmail: '',
  });
  const [course, setCourse] = useState<Course | null>(null);
  const [nextSession, setNextSession] = useState<NextSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const paymentId = searchParams.get('payment_id') || searchParams.get('paymentId') || '';
    const orderId = searchParams.get('order_id') || searchParams.get('orderId') || '';
    const amount = Number(searchParams.get('amount') || '0');
    const courseTitle = searchParams.get('course_title') || searchParams.get('courseTitle') || '';
    const courseSlug = searchParams.get('course_slug') || searchParams.get('courseSlug') || '';
    const studentEmail = searchParams.get('student_email') || searchParams.get('studentEmail') || '';

    setPurchaseData({
      orderId,
      paymentId,
      amount,
      courseTitle,
      courseSlug,
      studentEmail,
    });

    const fetchSessionDetails = async () => {
      if (!courseSlug) {
        setIsLoading(false);
        return;
      }

      try {
        const courseRes = await fetch(`/api/courses/${courseSlug}`);
        const courseData = await courseRes.json();

        if (courseData.success) {
          setCourse(courseData.course);
          const sessionsRes = await fetch(
            `/api/admin/sessions?courseId=${encodeURIComponent(courseData.course.id)}`
          );
          const sessionsData = await sessionsRes.json();

          if (sessionsData.success) {
            const activeSessions = (sessionsData.sessions || [])
              .filter((session: NextSession) => session.active !== false)
              .map((session: NextSession) => ({
                ...session,
                dateTime: new Date(`${session.sessionDate}T${session.sessionTime}`),
              }))
              .sort((a: any, b: any) => a.dateTime.getTime() - b.dateTime.getTime());

            const upcoming = activeSessions.find((session: any) => session.dateTime >= new Date());
            if (upcoming) {
              setNextSession(upcoming);
            } else if (activeSessions.length > 0) {
              setNextSession(activeSessions[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error loading course/session details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionDetails();
  }, [searchParams]);
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-950 flex items-center">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <Text className="text-slate-300">Loading payment details...</Text>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_35%),linear-gradient(to_bottom,rgba(15,23,42,0.95),rgba(2,6,23,1))] flex items-center">
        <Container>
          <div className="max-w-md mx-auto">
            <Card className="border border-slate-800 bg-slate-900/95 p-12 text-center shadow-2xl shadow-black/40">
              {/* Success Icon */}
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-400/25 bg-emerald-400/10 shadow-[0_0_0_6px_rgba(16,185,129,0.08)]">
                <span className="text-4xl text-emerald-300">✓</span>
              </div>

              <Heading level={2} className="mb-2 text-slate-50">
                Payment Successful!
              </Heading>

              <Text size="lg" className="mb-4 text-slate-300">
                Your enrollment is confirmed
              </Text>

              <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-left">
                <div className="mb-3">
                  <Text size="sm" className="text-slate-400">
                    Order ID
                  </Text>
                  <Text className="font-mono text-sm font-semibold text-slate-100 break-all">{purchaseData?.orderId}</Text>
                </div>
                <Divider className="my-3 border-slate-800" />
                <div className="mb-3">
                  <Text size="sm" className="text-slate-400">
                    Payment ID
                  </Text>
                  <Text className="font-mono text-sm font-semibold text-slate-100 break-all">{purchaseData?.paymentId}</Text>
                </div>
                <Divider className="my-3 border-slate-800" />
                <div className="mb-3">
                  <Text size="sm" className="text-slate-400">
                    Amount Paid
                  </Text>
                  <Text className="text-2xl font-bold text-emerald-400">₹{purchaseData?.amount?.toLocaleString()}</Text>
                </div>
                <Divider className="my-3 border-slate-800" />
                <div>
                  <Text size="sm" className="text-slate-400">
                    Course
                  </Text>
                  <Text className="font-semibold text-slate-100">{purchaseData?.courseTitle}</Text>
                </div>
              </div>

              <Text className="mb-6 text-slate-300">
                {purchaseData.studentEmail
                  ? `A confirmation email has been sent to ${purchaseData.studentEmail}. You can now access the course content from your dashboard.`
                  : 'You can now access the course content from your dashboard.'}
              </Text>

              {purchaseData.courseSlug && (
                <Card className="mb-6 border border-slate-800 bg-slate-950/80 p-4 text-left">
                  <Text size="sm" className="text-slate-400 mb-2">
                    Next live session details for {course?.title || purchaseData.courseTitle}
                  </Text>
                  {nextSession ? (
                    <div className="space-y-3">
                      <div>
                        <Text className="text-slate-400 text-xs">Session</Text>
                        <Text className="font-semibold text-white">{nextSession.sessionTitle}</Text>
                      </div>
                      <div>
                        <Text className="text-slate-400 text-xs">Start Date</Text>
                        <Text className="font-semibold text-white">{new Date(`${nextSession.sessionDate}T${nextSession.sessionTime}`).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}</Text>
                      </div>
                      <div>
                        <Text className="text-slate-400 text-xs">Start Time</Text>
                        <Text className="font-semibold text-white">{nextSession.sessionTime}</Text>
                      </div>
                      {nextSession.googleMeetLink ? (
                        <a
                          href={nextSession.googleMeetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Open live class link
                        </a>
                      ) : (
                        <Text size="sm" className="text-slate-400">
                          Live class link will be provided before the batch starts.
                        </Text>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Text size="sm" className="text-slate-400 mb-2">
                        Course sessions are being scheduled by our team.
                      </Text>
                      <Text size="sm" className="text-slate-400">
                        Next monthly batch: <span className="font-semibold text-white">{getNextMonthlyBatchDateString()}</span>. You will receive onboarding and access information before the batch starts.
                      </Text>
                    </div>
                  )}
                </Card>
              )}

              <div className="space-y-3">
                {purchaseData.courseSlug && (
                  <Button 
                    variant="primary" 
                    size="lg" 
                    href={`/dashboard/courses/${purchaseData.courseSlug}`} 
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    🚀 Continue Learning
                  </Button>
                )}
                <Button variant="primary" size="lg" href={ROUTES.DASHBOARD} className="w-full">
                  Go to Dashboard
                </Button>
                <Button variant="outline" size="lg" href={ROUTES.MY_COURSES} className="w-full">
                  View My Courses
                </Button>
              </div>
              <div className="mt-6 text-sm text-slate-300">
                <Text className="block mb-1">Need help? Contact our support:</Text>
                <div className="flex flex-col gap-1 items-center">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-400 hover:underline">{SITE_CONFIG.email}</a>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-blue-400 hover:underline">{SITE_CONFIG.phone}</a>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <div className="min-h-screen bg-slate-950 flex items-center">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <Text className="text-slate-300">Loading...</Text>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
