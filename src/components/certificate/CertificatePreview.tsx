"use client";

import Image from "next/image";
import { formatDateIndia } from "@/utils/helpers";
import { SITE_CONFIG } from "@/constants";

type CertificatePreviewProps = {
  certificate: {
    certificateId: string;
    studentName: string;
    courseTitle: string;
    status: "pending" | "approved" | "rejected";
    issueDate?: string | Date | null;
    approvedBy?: string | null;
    completionDate?: string | Date | null;
    trainingStartDate?: string | Date | null;
    trainingEndDate?: string | Date | null;
  };
};

const displayDate = (value?: string | Date | null) => {
  if (!value) return "To be scheduled";
  return formatDateIndia(new Date(value));
};

const InfoCard = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
  <div className="rounded-lg border border-[#e8dcc3] bg-[#fffdfa] p-3">
    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b6a1a]">{label}</div>
    <div className={`mt-2 text-sm font-semibold text-[#102348] ${mono ? "font-mono text-[13px]" : ""}`}>{value}</div>
  </div>
);

export function CertificatePreview({ certificate }: CertificatePreviewProps) {
  return (
    <div className="mx-auto w-full max-w-[980px] overflow-x-auto">
      <div className="overflow-hidden rounded-2xl border border-[#e4d5b4] bg-[#f7f2e8] p-3 shadow-[0_26px_90px_rgba(66,46,11,0.14)] sm:p-4">
        <div className="relative w-full rounded-xl border border-[#dfcfac] bg-[linear-gradient(180deg,#fffefb_0%,#f8f2e8_100%)] p-4 sm:aspect-[1/1.414] sm:p-6">
          <Image src="/images/signatures/sssam.png" alt="SSSAM premium seal" width={300} height={300} className="pointer-events-none absolute left-[6%] top-[42%] z-0 h-auto w-[220px] -translate-y-1/2 opacity-[0.12] sm:w-[280px]" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="text-center">
              <div className="text-[18px] font-extrabold tracking-[0.08em] text-[#102348] sm:text-[22px]">SSSAM ACADEMY</div>
              <div className="mt-1 text-[11px] font-semibold tracking-[0.1em] text-[#3f557e] sm:text-xs">
                Smart Solution School of AI and Machine Learning
              </div>
              <div className="mt-3 flex justify-center">
                <Image src="/images/logo/logo.webp" alt={SITE_CONFIG.name} width={56} height={56} className="object-contain sm:h-[72px] sm:w-[72px]" />
              </div>
            </div>

            <div className="mt-4 text-center sm:mt-5">
              <h2 className="text-[20px] font-extrabold tracking-[0.14em] text-[#8b6a1a] sm:text-[26px]">PROFESSIONAL</h2>
              <h3 className="mt-1 text-[18px] font-bold tracking-[0.06em] text-[#102348] sm:text-[24px]">CERTIFICATE OF COMPLETION</h3>
            </div>

            <div className="mt-4 text-center text-[#324b76] sm:mt-5">
              <p className="text-sm sm:text-base">This certificate is proudly awarded to</p>
              <div className="mt-2 text-2xl font-bold text-[#102348] sm:text-4xl">{certificate.studentName}</div>
              <p className="mt-3 text-sm sm:text-base">for successfully completing the professional training program in</p>
              <div className="mt-2 text-lg font-semibold text-[#102348] sm:text-2xl">{certificate.courseTitle || "AI-Powered Full Stack Development Bootcamp"}</div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2">
              <InfoCard label="Training Period" value={`${displayDate(certificate.trainingStartDate)} - ${displayDate(certificate.trainingEndDate)}`} />
              <InfoCard label="Mode" value="Online Live Training" />
              <InfoCard label="Issued On" value={displayDate(certificate.issueDate)} />
              <InfoCard label="Certificate ID" value={certificate.certificateId} mono />
            </div>

            <p className="mx-auto mt-4 max-w-[720px] text-center text-xs leading-relaxed text-[#596f96] sm:mt-5 sm:text-sm">
              We appreciate your dedication, commitment, and successful completion of the program, and wish you continued success in your professional journey.
            </p>

            <div className="mt-auto border-t border-[#dfcfac] pt-4 sm:pt-5">
              <div className="flex justify-end">
                <div className="w-full max-w-[210px] text-left sm:max-w-[280px] md:text-right">
                  <Image
                    src="/images/signatures/sign.png"
                    alt="Signature"
                    width={170}
                    height={54}
                    className="h-auto w-[140px] object-contain brightness-110 contrast-125 saturate-105 sm:w-[170px] md:ml-auto"
                  />
                  <div className="mt-2 text-lg font-semibold text-[#102348] sm:text-xl">Satish Soni</div>
                  <div className="mt-1 text-xs text-[#4f638a] sm:text-sm">Director</div>
                  <div className="text-xs text-[#4f638a] sm:text-sm">SSSAM Academy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
