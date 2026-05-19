"use client";

import Image from 'next/image';
import { formatDateIndia } from '@/utils/helpers';
import { SITE_CONFIG } from '@/constants';

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
};

const displayDate = (value?: string | Date | null) => {
  if (!value) return 'To be scheduled';
  return formatDateIndia(new Date(value));
};

const InfoCard = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div className="h-full min-h-[118px] rounded-xl border border-[#2d3e63] bg-[#0c1a34]/80 p-4">
    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9cb2d8]">{label}</div>
    <div className={`mt-3 text-base font-semibold text-[#f4f7ff] ${mono ? 'font-mono text-[15px]' : ''}`}>{value}</div>
  </div>
);

export function CertificatePreview({ certificate }: CertificatePreviewProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#071125] via-[#081733] to-[#071125] p-5 shadow-[0_26px_90px_rgba(2,8,20,0.65)] md:p-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05] select-none">
        <div className="text-[120px] font-bold tracking-[0.2em] text-[#8ea2c8]">SSSAM</div>
      </div>

      <div className="mx-auto max-w-[1120px] overflow-hidden rounded-[20px] border border-[#2e426a] bg-[#08142d]">
        <div className="relative p-6 md:p-8">
          <div className="pointer-events-none absolute inset-4 rounded-[14px] border border-[#415b8d]/75" />

          <div className="relative z-10">
            <div className="text-center">
              <div className="text-[26px] font-extrabold tracking-[0.08em] text-[#f6f8ff]">SSSAM ACADEMY</div>
              <div className="mt-1 text-sm font-semibold tracking-[0.12em] text-[#b4c4df]">
                Smart Solution School of AI and Machine Learning
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <Image src="/images/logo/logo.webp" alt={SITE_CONFIG.name} width={82} height={82} className="object-contain" />
            </div>

            <div className="mt-3 text-center">
              <h2 className="text-[36px] leading-tight font-extrabold tracking-[0.2em] text-[#f7f9ff]">PROFESSIONAL</h2>
              <h3 className="mt-1 text-[30px] leading-tight font-bold tracking-[0.08em] text-[#dce7fb]">CERTIFICATE OF COMPLETION</h3>
            </div>

            <div className="mt-6 text-center text-[#dbe5f8]">
              <p className="text-base md:text-lg">This certificate is proudly awarded to</p>
              <div className="mt-2 text-4xl font-bold text-[#f8faff] md:text-5xl">{certificate.studentName}</div>
              <p className="mt-4 text-base md:text-lg">for successfully completing the professional training program in</p>
              <div className="mt-2 text-2xl font-semibold text-[#f2f6ff] md:text-3xl">
                {certificate.courseTitle || 'AI-Powered Full Stack Development Bootcamp'}
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoCard
                label="Training Period"
                value={`${displayDate(certificate.trainingStartDate)} — ${displayDate(certificate.trainingEndDate)}`}
              />
              <InfoCard label="Mode" value="Online Live Training" />
              <InfoCard label="Issued On" value={displayDate(certificate.issueDate)} />
              <InfoCard label="Certificate ID" value={certificate.certificateId} mono />
            </div>

            <p className="mx-auto mt-6 max-w-[900px] text-center text-sm leading-relaxed text-[#b8c8e4]">
              We appreciate your dedication, commitment, and successful completion of the program, and wish you continued
              success in your professional journey.
            </p>

            <div className="mt-7 grid grid-cols-2 items-end gap-6">
              <div>
                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#c9a75f] bg-[radial-gradient(circle_at_30%_30%,#ffe8ac,#b48a3e)]" />
              </div>
              <div className="text-right">
                <div className="inline-block -rotate-3">
                  <Image src="/images/signatures/satish-kumar.svg" alt="Signature" width={210} height={66} style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#2f456f] pt-5">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <div className="text-xl font-bold text-[#f4f8ff]">Satish Kumar</div>
                  <div className="text-sm text-[#b8c8e4]">Director</div>
                  <div className="text-sm text-[#b8c8e4]">SSSAM Academy</div>
                </div>
                <div className="text-sm text-[#b8c8e4] md:text-right">
                  <div>www.sssamacademy.com</div>
                  <div>info@sssamacademy.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
