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

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8bb72]">Certificate Preview</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Your premium certificate</h1>
        <p className="mt-3 text-slate-300">Preview, verify, and download your certificate after approval.</p>
      </div>

      <CertificatePreview
        certificate={certificate}
        downloadHref={`/api/student/certificates/${certificate.certificateId}/download`}
        verifyHref={`/verify-certificate?certificateId=${certificate.certificateId}`}
      />
    </div>
  );
}