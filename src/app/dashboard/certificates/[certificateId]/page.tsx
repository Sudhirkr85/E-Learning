import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { CertificatePreview } from '@/components/certificate/CertificatePreview';
import { CertificateModel } from '@/lib/models/certificate';

type Props = {
  params: Promise<{ certificateId: string }>;
};

export default async function CertificateDetailPage({ params }: Props) {
  const { userId } = await auth();
  const { certificateId } = await params;

  if (!userId) {
    notFound();
  }

  const certificate = await CertificateModel.findByCertificateId(certificateId);

  if (!certificate || certificate.studentId !== userId) {
    notFound();
  }

  // Convert MongoDB document to plain object safe for Client Component props
  const certificatePlain = {
    certificateId: certificate.certificateId,
    studentName: certificate.studentName,
    courseTitle: certificate.courseTitle,
    status: certificate.status,
    issueDate: certificate.issueDate ? certificate.issueDate.toISOString() : null,
    approvedBy: certificate.approvedBy || null,
    completionDate: certificate.completionDate ? certificate.completionDate.toISOString() : null,
    trainingStartDate: certificate.trainingStartDate ? certificate.trainingStartDate.toISOString() : null,
    trainingEndDate: certificate.trainingEndDate ? certificate.trainingEndDate.toISOString() : null,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8bb72]">Certificate Preview</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Your premium certificate</h1>
        <p className="mt-3 text-slate-300">Preview, verify, and download your certificate after approval.</p>
      </div>

      <CertificatePreview
        certificate={certificatePlain}
      />
    </div>
  );
}