import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { CertificateModel } from '@/lib/models/certificate';
import { formatDateIndia } from '@/utils/helpers';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { certificateId } = await params;
    const certificate = await CertificateModel.findByCertificateId(certificateId);

    if (!certificate || certificate.studentId !== userId) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    if (certificate.status !== 'approved' || !certificate.issueDate) {
      return NextResponse.json({ success: false, error: 'Certificate is pending approval' }, { status: 403 });
    }

    const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(certificate.certificateId)} - SSSAM Academy Certificate</title>
  <style>
    body { margin: 0; font-family: Arial, sans-serif; background: #08111f; color: #f8fafc; }
    .page { min-height: 100vh; display: grid; place-items: center; padding: 32px; box-sizing: border-box; }
    .card { width: min(1120px, 100%); border: 1px solid rgba(214,177,92,.35); border-radius: 28px; padding: 48px; background: linear-gradient(145deg, rgba(8,17,31,.96), rgba(10,22,45,.98)); box-shadow: 0 30px 120px rgba(2,10,25,.55); }
    .brand { color: #d8bb72; letter-spacing: .35em; text-transform: uppercase; font-size: 12px; font-weight: 700; }
    .title { margin: 12px 0 0; font-size: 52px; line-height: 1; }
    .subtitle { margin-top: 8px; color: #cbd5e1; }
    .grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 28px; margin-top: 32px; }
    .panel { border-radius: 24px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); padding: 28px; }
    .name { margin: 0; font-size: 44px; line-height: 1.05; }
    .label { font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: #94a3b8; }
    .value { margin-top: 10px; font-size: 18px; font-weight: 700; }
    .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px; }
    .metaItem { border-radius: 18px; border: 1px solid rgba(255,255,255,.08); background: rgba(2,6,23,.35); padding: 16px; }
    .signature { margin-top: 20px; font-family: Georgia, serif; font-size: 34px; color: #f0d48c; }
    .button { display: inline-block; margin-top: 20px; padding: 14px 22px; border-radius: 999px; background: linear-gradient(90deg, #caa95c, #f0d48c); color: #08111f; font-weight: 700; text-decoration: none; }
  </style>
</head>
<body>
  <div class="page">
    <div class="card">
      <div class="brand">SSSAM Academy</div>
      <h1 class="title">Certificate of Completion</h1>
      <p class="subtitle">Online Live Training</p>
      <div class="grid">
        <div class="panel">
          <div class="label">Awarded to</div>
          <h2 class="name">${escapeHtml(certificate.studentName)}</h2>
          <div class="meta">
            <div class="metaItem"><div class="label">Course</div><div class="value">${escapeHtml(certificate.courseTitle)}</div></div>
            <div class="metaItem"><div class="label">Training Start</div><div class="value">${certificate.trainingStartDate ? escapeHtml(formatDateIndia(certificate.trainingStartDate)) : 'To be scheduled'}</div></div>
            <div class="metaItem"><div class="label">Training End</div><div class="value">${certificate.trainingEndDate ? escapeHtml(formatDateIndia(certificate.trainingEndDate)) : 'To be scheduled'}</div></div>
          </div>
          <div class="meta" style="grid-template-columns: repeat(2, 1fr);">
            <div class="metaItem"><div class="label">Certificate ID</div><div class="value">${escapeHtml(certificate.certificateId)}</div></div>
            <div class="metaItem"><div class="label">Issue Date</div><div class="value">${certificate.issueDate ? escapeHtml(formatDateIndia(certificate.issueDate)) : 'To be scheduled'}</div></div>
          </div>
        </div>
        <div class="panel">
          <div class="label">Authorized Signature</div>
          <div class="signature">Sudesh Yadav</div>
          <p>Founder, SSSAM Academy</p>
          <div style="margin-top: 28px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,.08);">
            <div class="label">Completion Date</div>
            <div class="value">${certificate.completionDate ? escapeHtml(formatDateIndia(certificate.completionDate)) : 'To be scheduled'}</div>
            <div class="label" style="margin-top: 18px;">Status</div>
            <div class="value">${escapeHtml(certificate.status.toUpperCase())}</div>
          </div>
          <a class="button" href="javascript:window.print()">Print / Save Certificate</a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${certificate.certificateId}.html"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating certificate download:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to download certificate' },
      { status: 500 }
    );
  }
}