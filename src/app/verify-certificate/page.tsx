import Link from 'next/link';
import { CertificatePreview } from '@/components/certificate/CertificatePreview';
import { CertificateModel } from '@/lib/models/certificate';

type Props = {
  searchParams: Promise<{ certificateId?: string }>;
};

export default async function VerifyCertificatePage({ searchParams }: Props) {
  const params = await searchParams;
  const certificateId = params.certificateId?.trim();
  const certificate = certificateId ? await CertificateModel.findByCertificateId(certificateId) : null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8bb72]">Verify Certificate</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Internal certificate verification</h1>
        <p className="mt-3 text-slate-300">Enter a certificate ID to confirm completion status and official issue details.</p>

        <form className="mt-8 flex flex-col gap-3 sm:flex-row" action="/verify-certificate" method="get">
          <input
            name="certificateId"
            defaultValue={certificateId || ''}
            placeholder="Enter certificate ID"
            className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-[#d8bb72]/70"
          />
          <button className="rounded-2xl bg-gradient-to-r from-[#caa95c] to-[#f0d48c] px-6 py-3 font-semibold text-slate-950">
            Verify
          </button>
        </form>
      </div>

      <div className="mx-auto mt-10 max-w-6xl">
        {certificate ? (
          <>
            <div className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-200">
              Certificate verified successfully.
            </div>
            <CertificatePreview certificate={certificate} />
          </>
        ) : certificateId ? (
          <div className="rounded-[28px] border border-red-400/20 bg-red-500/10 p-8 text-center text-red-100">
            Certificate not found or ID is invalid.
            <div className="mt-4">
              <Link href="/verify-certificate" className="text-sm font-semibold text-white underline">
                Clear search
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-white/8 bg-slate-950/70 p-8 text-center text-slate-300">
            Search for a certificate ID to verify it.
          </div>
        )}
      </div>
    </div>
  );
}