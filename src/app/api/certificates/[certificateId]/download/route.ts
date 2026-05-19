import { NextRequest, NextResponse } from 'next/server';
import { CertificateModel } from '@/lib/models/certificate';
import { SITE_CONFIG } from '@/constants';

interface RouteParams {
  params: Promise<{ certificateId: string }>;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const displayDate = (value?: Date | null) => {
  if (!value) {
    return 'To be scheduled';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { certificateId } = await params;
    const certificate = await CertificateModel.findByCertificateId(certificateId);

    if (!certificate) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    if (certificate.status !== 'approved' || !certificate.issueDate) {
      return NextResponse.json(
        { success: false, error: 'Certificate is pending approval' },
        { status: 403 }
      );
    }

    const fileName = `${certificate.studentName.replace(/\s+/g, '-').toLowerCase()}-${certificate.certificateId}.html`;
    const isPreview = _request?.nextUrl?.searchParams?.get?.('preview') === '1';

    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${escapeHtml(certificate.certificateId)} - SSSAM Academy</title>
          <style>
            body { margin: 0; font-family: Inter, Arial, sans-serif; background: linear-gradient(180deg,#f8f4eb 0%,#efe4d1 100%); color: #0b1724; }
            .page { min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; }
            .card { width: min(1120px, 100%); border-radius: 28px; padding: 0; background: linear-gradient(145deg, rgba(8,17,31,.98), rgba(10,22,45,1)); box-shadow: 0 30px 120px rgba(2,10,25,.55); }
            .inner { background: #fff; margin: 24px; border-radius: 20px; position: relative; padding: 36px; }
            .watermark { position: absolute; inset: 0; display:flex; align-items:center; justify-content:center; opacity:0.06; font-size:120px; font-weight:800; color:#000; pointer-events:none; }
            .brand { color: #b58f2a; letter-spacing: .35em; text-transform: uppercase; font-size: 12px; font-weight: 700; }
            h1 { margin: 8px 0 0; font-size: 42px; color: #0b1724; }
            .muted { color: #6b7280; margin-top:6px; }
            .logo { display:flex; justify-content:center; }
            .certIdBox { position:absolute; right:36px; top:36px; background:#fff9ef; border:1px solid rgba(214,177,92,0.25); padding:10px 14px; border-radius:10px; }
            .certIdBox .label { color:#8b6a1a; font-weight:700; font-size:12px; }
            .studentName { text-align:center; margin-top:18px; font-size:44px; font-weight:800; color:#0b1724; }
            .courseName { text-align:center; margin-top:8px; font-size:22px; font-weight:700; color:#0b1724; }
            .mainSentence { margin-top:14px; text-align:center; color:#374151; }
            .pills { display:flex; gap:8px; justify-content:center; margin-top:14px; }
            .pill { background:#f3ecd6; color:#6b4d12; padding:8px 12px; border-radius:999px; font-weight:700; }
            .seal { position:absolute; left:6%; top:44%; transform:translateY(-50%); width:280px; opacity:.12; pointer-events:none; }
            .signature { position:absolute; right:48px; bottom:36px; text-align:right; }
            @media print { body { background:#fff } .card { box-shadow:none } }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="inner">
              <img class="seal" src="/images/signatures/sssam.png" alt="SSSAM premium seal" />
              <div class="certId">${escapeHtml(certificate.certificateId)}</div>
              <div class="brand">SSSAM Academy</div>
              <h1>Certificate of Completion</h1>
              <div class="muted">Premium Certificate of Completion for Live Training Programs</div>

              <div class="award">
                <div class="label">Awarded to</div>
                <div class="name">${escapeHtml(certificate.studentName)}</div>
                <div class="course">${escapeHtml(certificate.courseTitle)}</div>
                <div class="meta">Training: ${displayDate(certificate.trainingStartDate)} — ${displayDate(certificate.trainingEndDate)} | Issued: ${displayDate(certificate.issueDate)}</div>
              </div>

              <div class="signature">
                <img src="/images/signatures/sign.png" alt="signature" style="max-width:280px; display:block;" />
                <div style="margin-top:6px; font-weight:700;">Satish Soni</div>
                <div style="font-size:13px;">Director</div>
                <div style="font-size:13px;">SSSAM Academy</div>
              </div>
            </div>
          </div>
        </body>
      </html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': isPreview ? 'inline' : `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error generating certificate download:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to generate certificate download' },
      { status: 500 }
    );
  }
}
