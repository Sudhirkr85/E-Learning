import Link from 'next/link';
import { formatDateIndia } from '@/utils/helpers';

type CertificatePreviewProps = {
  certificate: {
    certificateId: string;
    studentName: string;
    courseTitle: string;
    status: 'pending' | 'approved' | 'rejected';
    issueDate?: string | Date | null;
    approvedBy?: string | null;
    completionDate?: string | Date | null;
    trainingStartDate?: string | Date | null;
    trainingEndDate?: string | Date | null;
  };
  downloadHref?: string;
  verifyHref?: string;
  publicView?: boolean;
};

const displayDate = (value?: string | Date | null) => {
  if (!value) return 'To be scheduled';
  return formatDateIndia(new Date(value));
};

export function CertificatePreview({ certificate, downloadHref, verifyHref, publicView = false }: CertificatePreviewProps) {
  const isApproved = certificate.status === 'approved' && Boolean(certificate.issueDate);
  const hasTrainingWindow = certificate.trainingStartDate || certificate.trainingEndDate;

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#bfa15b]/20 bg-[#08111f] shadow-[0_30px_120px_rgba(2,10,25,0.55)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,111,255,0.22),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(191,161,91,0.18),_transparent_30%)]" />
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#2d6dff]/20 blur-3xl" />
      <div className="absolute right-0 top-24 h-52 w-52 rounded-full bg-[#d6b15c]/15 blur-3xl" />

      <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.45fr_0.95fr] lg:p-10">
        <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8bb72]">SSSAM Academy</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Certificate of Completion</h2>
              <p className="mt-1 text-sm text-slate-300">Premium completion certificate for live training programs</p>
            </div>
            <div className="rounded-2xl border border-[#d8bb72]/25 bg-[#d8bb72]/10 px-4 py-3 text-right">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#f2dfad]">Certificate ID</p>
              <p className="mt-1 font-mono text-sm text-white">{certificate.certificateId}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Awarded to</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{certificate.studentName}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-slate-950/45 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Course</p>
                <p className="mt-2 text-lg font-semibold text-white">{certificate.courseTitle}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/45 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Mode</p>
                <p className="mt-2 text-lg font-semibold text-white">Online Live Training</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Training Start</p>
                <p className="mt-2 font-medium text-white">{displayDate(certificate.trainingStartDate)}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Training End</p>
                <p className="mt-2 font-medium text-white">{displayDate(certificate.trainingEndDate)}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/35 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Issue Date</p>
                <p className="mt-2 font-medium text-white">{displayDate(certificate.issueDate)}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {downloadHref ? (
                <a
                  href={downloadHref}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${isApproved ? 'bg-gradient-to-r from-[#caa95c] to-[#f0d48c] text-slate-950 shadow-lg shadow-[#caa95c]/20 hover:brightness-105' : 'cursor-not-allowed bg-white/10 text-slate-400'}`}
                  aria-disabled={!isApproved}
                  onClick={(event) => {
                    if (!isApproved) {
                      event.preventDefault();
                    }
                  }}
                >
                  {isApproved ? 'Download Certificate' : 'Pending Approval'}
                </a>
              ) : null}
              {verifyHref ? (
                <Link href={verifyHref} className="inline-flex items-center justify-center rounded-full border border-[#74a5ff]/35 bg-[#0d1f40] px-5 py-3 text-sm font-semibold text-[#dbe8ff] transition hover:border-[#9dc0ff] hover:bg-[#102749]">
                  Verify Certificate
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-[28px] border border-white/8 bg-slate-950/45 p-6 backdrop-blur-sm sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d8bb72]">Certificate Status</p>
            <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white">
              {certificate.status.toUpperCase()}
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Authorized Signature</p>
                <p className="mt-6 font-serif text-3xl text-[#f0d48c]">Sudesh Yadav</p>
                <p className="mt-1 text-sm text-slate-300">Founder, SSSAM Academy</p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">Training Period</p>
                <p className="mt-2">{hasTrainingWindow ? `${displayDate(certificate.trainingStartDate)} to ${displayDate(certificate.trainingEndDate)}` : 'Managed by the admin approval flow'}</p>
                <p className="mt-4 font-semibold text-white">Completion Date</p>
                <p className="mt-2">{displayDate(certificate.completionDate)}</p>
              </div>
            </div>
          </div>

          {!publicView ? (
            <div className="rounded-2xl border border-[#74a5ff]/20 bg-[#0b1c36] p-4 text-sm text-[#dbe8ff]">
              Download becomes available only after admin approval and completion review.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}