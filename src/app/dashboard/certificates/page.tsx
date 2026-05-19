'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const handleApply = async () => {
    if (!selectedCourseId) return;

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await fetch('/api/student/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: selectedCourseId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Certificate request submitted successfully.');
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
                <div className="mt-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  {course.certificate?.status === 'approved'
                    ? 'Approved'
                    : course.certificate?.status === 'pending'
                    ? 'Pending Approval'
                    : course.certificate?.status === 'rejected'
                    ? 'Rejected - Reapply'
                    : 'Not Applied'}
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
              <div className="rounded-[28px] border border-white/8 bg-slate-950/80 p-6 shadow-2xl shadow-black/30">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Selected course</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{selectedCourse.courseTitle}</h2>
                  </div>
                  <div className="text-right text-sm text-slate-400">
                    <p>Purchase Date</p>
                    <p className="mt-1 font-semibold text-white">{formatDateIndia(new Date(selectedCourse.purchaseDate))}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Student</p>
                    <p className="mt-2 font-semibold text-white">{user?.firstName || user?.fullName || 'Student'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
                    <p className="mt-2 font-semibold text-white">{selectedCertificate?.status?.toUpperCase() || 'NOT APPLIED'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Certificate ID</p>
                    <p className="mt-2 font-mono text-sm text-white">{selectedCertificate?.certificateId || 'Generated after application'}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleApply}
                    disabled={isSubmitting || selectedCertificate?.status === 'pending' || selectedCertificate?.status === 'approved'}
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition ${isSubmitting || selectedCertificate?.status === 'pending' || selectedCertificate?.status === 'approved' ? 'cursor-not-allowed bg-white/10 text-slate-500' : 'bg-gradient-to-r from-[#caa95c] to-[#f0d48c] text-slate-950 hover:brightness-105'}`}
                  >
                    {isSubmitting ? 'Submitting...' : selectedCertificate?.status === 'pending' ? 'Pending Approval' : selectedCertificate?.status === 'approved' ? 'Approved' : selectedCertificate?.status === 'rejected' ? 'Reapply for Certificate' : 'Apply for Certificate'}
                  </button>

                  {selectedCertificate?.status === 'approved' ? (
                    <a
                      href={`/dashboard/certificates/${selectedCertificate.certificateId}`}
                      className="rounded-full border border-[#74a5ff]/35 bg-[#0d1f40] px-5 py-3 text-sm font-semibold text-[#dbe8ff] transition hover:border-[#9dc0ff] hover:bg-[#102749]"
                    >
                      View Certificate
                    </a>
                  ) : null}
                </div>

                {message ? <p className="mt-4 text-sm text-[#f0d48c]">{message}</p> : null}
              </div>

              {selectedCertificate ? (
                <CertificatePreview
                  certificate={selectedCertificate as CertificateRequest}
                  downloadHref={`/api/student/certificates/${selectedCertificate.certificateId}/download`}
                  verifyHref={`/verify-certificate?certificateId=${selectedCertificate.certificateId}`}
                />
              ) : (
                <div className="rounded-[28px] border border-dashed border-white/12 bg-slate-950/60 p-8 text-center text-slate-300">
                  Apply first to unlock your premium certificate preview.
                </div>
              )}
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