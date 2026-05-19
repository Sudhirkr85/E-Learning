'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useUserSync } from '@/hooks/use-user-sync';
import { CertificateRequest } from '@/types';
import { CertificatePreview } from '@/components/certificate/CertificatePreview';
import { formatDateIndia } from '@/utils/helpers';

type PurchasedCourse = {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  purchaseDate: string;
  amount: number;
  certificate: {
    certificateId: string;
    status: 'pending' | 'approved' | 'rejected';
    issueDate?: string | null;
    completionDate?: string | null;
    trainingStartDate?: string | null;
    trainingEndDate?: string | null;
    approvedBy?: string | null;
    notes?: string;
  } | null;
};

export default function CertificatesPage() {
  const { user } = useUser();
  const [courses, setCourses] = useState<PurchasedCourse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  useUserSync();

  async function fetchCertificateData() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/student/certificates');
      const data = await response.json();

      if (response.ok && data.success) {
        const loadedCourses = (data.purchasedCourses || []) as PurchasedCourse[];
        setCourses(loadedCourses);
        setSelectedCourseId(previous => previous || loadedCourses[0]?.courseId || '');
      }
    } catch (error) {
      console.error('Error loading certificate data:', error);
      setMessage('Unable to load certificates right now.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchCertificateData();
    }
  }, [user?.id]);

  const selectedCourse = useMemo(
    () => courses.find(course => course.courseId === selectedCourseId),
    [courses, selectedCourseId]
  );

  const selectedCertificate = selectedCourse?.certificate;

  const previewCertificate = selectedCertificate
    ? ({
        ...selectedCertificate,
        courseTitle: selectedCourse?.courseTitle || '',
        studentName: user?.firstName || user?.fullName || 'Student',
      } as any)
    : null;

  const handleApply = async (courseIdParam?: string) => {
    const courseId = String(courseIdParam || selectedCourseId || '').trim();
    if (!courseId) return;

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await fetch('/api/student/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Certificate request submitted successfully.');
        // ensure selected course stays in view
        setSelectedCourseId(courseId);
        await fetchCertificateData();
      } else {
        setMessage(data.error || 'Unable to submit certificate request.');
      }
    } catch (error) {
      console.error('Error submitting certificate request:', error);
      setMessage('Something went wrong while submitting the request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-10 container mx-auto px-4">
        <div className="h-8 w-72 animate-pulse rounded-full bg-white/10" />
        <div className="mt-8 h-56 animate-pulse rounded-[28px] bg-white/5" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8bb72]">Certificates</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Apply for your completion certificate</h1>
        <p className="mt-3 text-slate-300">
          Select from your purchased courses only. Requests are reviewed by the admin team before download becomes available.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.2fr]">
        <div className="rounded-[28px] border border-white/8 bg-slate-950/80 p-6 shadow-2xl shadow-black/30">
          <label className="block text-sm font-medium text-slate-200">Your purchased courses</label>
          <select
            value={selectedCourseId}
            onChange={(event) => setSelectedCourseId(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-[#d8bb72]/70"
          >
            {courses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseTitle}
              </option>
            ))}
          </select>

          <div className="mt-6 space-y-4">
            {courses.map((course) => (
              <button
                key={course.courseId}
                onClick={() => setSelectedCourseId(course.courseId)}
                className={`w-full rounded-2xl border p-4 text-left transition ${selectedCourseId === course.courseId ? 'border-[#d8bb72]/60 bg-[#d8bb72]/10' : 'border-white/8 bg-white/4 hover:border-white/16'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">{course.courseTitle}</p>
                    <p className="mt-1 text-sm text-slate-400">Purchased on {formatDateIndia(new Date(course.purchaseDate))}</p>
                  </div>
                  <div className="text-right text-sm font-semibold text-[#f0d48c]">₹{course.amount.toLocaleString('en-IN')}</div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                    {course.certificate?.status === 'approved'
                      ? 'Approved'
                      : course.certificate?.status === 'pending'
                      ? 'Pending Approval'
                      : course.certificate?.status === 'rejected'
                      ? 'Rejected - Reapply'
                      : 'Not Applied'}
                  </div>

                  {!course.certificate || course.certificate.status === 'rejected' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCourseId(course.courseId);
                        handleApply(course.courseId);
                      }}
                      className="ml-auto rounded-full bg-[#caa95c]/10 px-3 py-1 text-xs font-semibold text-[#f0d48c] hover:bg-[#caa95c]/15 transition"
                    >
                      Apply
                    </button>
                  ) : null}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">
            Download is enabled only after course completion review and admin approval.
          </div>
        </div>

        <div className="space-y-6">
          {selectedCourse ? (
            <>
              <div className="rounded-[20px] bg-slate-950/70 p-6 shadow-sm border border-white/6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Course</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">{selectedCourse.courseTitle}</h2>
                  </div>
                  <div className="text-right">
                    {selectedCertificate?.status === 'approved' ? (
                      <span className="inline-flex items-center rounded-full bg-green-600/25 px-3 py-1 text-sm font-semibold text-green-200">Approved</span>
                    ) : selectedCertificate?.status === 'pending' ? (
                      <span className="inline-flex items-center rounded-full bg-yellow-600/20 px-3 py-1 text-sm font-semibold text-yellow-200">Pending Approval</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-sm font-semibold text-slate-300">Not Applied</span>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Student</p>
                    <p className="font-medium text-white">{user?.firstName || user?.fullName || 'Student'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Certificate ID</p>
                    <p className="font-mono text-white">{selectedCertificate?.certificateId || 'Generated after application'}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  {(!selectedCertificate || selectedCertificate.status === 'rejected') && (
                    <button
                      onClick={() => handleApply()}
                      disabled={isSubmitting}
                      className="rounded-full bg-gradient-to-r from-[#caa95c] to-[#f0d48c] px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:brightness-105 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Applying...' : 'Apply'}
                    </button>
                  )}

                  {selectedCertificate?.status === 'approved' && (
                    <>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-full border border-white/8 bg-white/4 px-4 py-2 text-sm font-semibold text-white hover:bg-white/6"
                      >
                        View
                      </button>

                      <button
                        onClick={async () => {
                          if (!selectedCertificate) return;
                          try {
                            setIsDownloading(true);
                            const res = await fetch(`/api/student/certificates/${selectedCertificate.certificateId}/download?pdf=1`);
                            const contentType = res.headers.get('content-type') || '';
                            if (!res.ok) {
                              const errorText = await res.text();
                              throw new Error(errorText || 'Download failed');
                            }
                            if (!contentType.toLowerCase().includes('application/pdf')) {
                              throw new Error(`Invalid download content type: ${contentType || 'unknown'}`);
                            }
                            const blob = await res.blob();
                            if (blob.size === 0) {
                              throw new Error('Downloaded PDF is empty');
                            }
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${selectedCertificate.certificateId}.pdf`;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            setTimeout(() => URL.revokeObjectURL(url), 1000);
                          } catch (err) {
                            console.error(err);
                            setMessage('PDF download failed. Please try again in a moment.');
                          } finally {
                            setIsDownloading(false);
                          }
                        }}
                        disabled={isDownloading}
                        className="rounded-full bg-gradient-to-r from-[#6ea8ff] to-[#3b82f6] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-105"
                      >
                        {isDownloading ? 'Downloading...' : 'Download Certificate'}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Modal */}
              {isModalOpen ? (
                <div className="fixed inset-0 z-[9999]">
                  <div
                    className="fixed inset-0 bg-[#020817]/78 backdrop-blur-2xl backdrop-saturate-150"
                    onClick={() => setIsModalOpen(false)}
                  />

                  <div className="relative z-[10000] mx-auto flex min-h-full w-full max-w-5xl items-start justify-center px-4 py-6 md:items-center md:py-8">
                    <div className="transform transition-all duration-300 ease-out">
                      <div className="relative rounded-2xl bg-[#071125] shadow-2xl animate-fade-in-scale md:max-h-[calc(100vh-4rem)]">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className={`absolute right-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0b1833]/90 text-slate-200 shadow-lg backdrop-blur hover:bg-[#12264a] hover:text-white transition-all duration-200 ${isAtTop ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                          aria-label="Close preview"
                        >
                          <span className="text-xl leading-none">&times;</span>
                        </button>

                        <div ref={scrollRef} onScroll={() => {
                          const el = scrollRef.current;
                          if (!el) return;
                          setIsAtTop(el.scrollTop === 0);
                        }} className="max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl">
                          <div className="px-4 pb-4 pt-2 sm:p-6">
                            {previewCertificate ? (
                              <CertificatePreview
                                certificate={previewCertificate as CertificateRequest}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-[28px] border border-white/8 bg-slate-950/80 p-8 text-slate-300">
              No purchased courses found yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
