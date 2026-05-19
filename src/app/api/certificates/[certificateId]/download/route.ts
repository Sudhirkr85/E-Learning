import { NextRequest, NextResponse } from 'next/server';
import { CertificateModel } from '@/lib/models/certificate';

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

    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${escapeHtml(certificate.certificateId)} - SSSAM Academy</title>
          <style>
            :root {
              color-scheme: dark;
            }
            body {
              margin: 0;
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: linear-gradient(135deg, #08111f 0%, #0d1b33 55%, #121f3d 100%);
              color: #f8fafc;
              font-family: Inter, Arial, sans-serif;
            }
            .sheet {
              width: min(1120px, calc(100vw - 32px));
              border: 1px solid rgba(216, 187, 114, 0.25);
              border-radius: 28px;
              background: rgba(5, 12, 23, 0.94);
              box-shadow: 0 30px 120px rgba(2, 10, 25, 0.55);
              overflow: hidden;
            }
            .sheet-inner {
              padding: 42px;
              display: grid;
              grid-template-columns: 1.45fr 0.95fr;
              gap: 28px;
            }
            .panel {
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 24px;
              background: rgba(255,255,255,0.03);
              padding: 28px;
            }
            .eyebrow {
              letter-spacing: 0.3em;
              text-transform: uppercase;
              color: #d8bb72;
              font-size: 12px;
              font-weight: 700;
            }
            h1 {
              margin: 10px 0 0;
              font-size: 52px;
              line-height: 1;
            }
            .muted { color: #cbd5e1; }
            .name { font-size: 46px; font-weight: 700; margin: 10px 0 0; }
            .grid { display: grid; gap: 14px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .info, .status-box, .signature, .detail-box { border-radius: 18px; border: 1px solid rgba(255,255,255,0.08); background: rgba(2,6,23,0.35); padding: 18px; }
            .label { color: #94a3b8; text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; }
            .value { margin-top: 8px; font-size: 18px; font-weight: 600; }
            .right { display: flex; flex-direction: column; justify-content: space-between; gap: 18px; }
            .cert-id { font-family: monospace; font-size: 14px; }
            .approved { display: inline-flex; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); padding: 10px 16px; font-weight: 700; }
            .signature-name { margin-top: 22px; font-size: 30px; color: #f0d48c; font-family: Georgia, serif; }
            @media print {
              body { background: #fff; }
              .sheet { width: 100%; box-shadow: none; }
            }
            @media (max-width: 900px) {
              .sheet-inner { grid-template-columns: 1fr; padding: 24px; }
              h1 { font-size: 34px; }
              .name { font-size: 34px; }
              .grid { grid-template-columns: 1fr; }
            }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="sheet-inner">
              <div class="panel">
                <div style="display:flex; justify-content:space-between; gap:20px; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,0.10); padding-bottom:20px; margin-bottom:24px;">
                  <div>
                    <div class="eyebrow">SSSAM Academy</div>
                    <h1>Certificate of Completion</h1>
                    <div class="muted" style="margin-top:8px;">Premium completion certificate for live training programs</div>
                  </div>
                  <div style="border-radius:18px; border:1px solid rgba(216,187,114,0.25); background:rgba(216,187,114,0.10); padding:16px; text-align:right; min-width:180px;">
                    <div class="label">Certificate ID</div>
                    <div class="cert-id" style="margin-top:8px; color:#fff;">${escapeHtml(certificate.certificateId)}</div>
                  </div>
                </div>

                <div class="label">Awarded to</div>
                <div class="name">${escapeHtml(certificate.studentName)}</div>

                <div class="grid" style="margin-top:24px;">
                  <div class="info">
                    <div class="label">Course</div>
                    <div class="value">${escapeHtml(certificate.courseTitle)}</div>
                  </div>
                  <div class="info">
                    <div class="label">Mode</div>
                    <div class="value">Online Live Training</div>
                  </div>
                  <div class="info">
                    <div class="label">Training Start</div>
                    <div class="value">${displayDate(certificate.trainingStartDate)}</div>
                  </div>
                  <div class="info">
                    <div class="label">Training End</div>
                    <div class="value">${displayDate(certificate.trainingEndDate)}</div>
                  </div>
                  <div class="info">
                    <div class="label">Issue Date</div>
                    <div class="value">${displayDate(certificate.issueDate)}</div>
                  </div>
                  <div class="info">
                    <div class="label">Verify Certificate</div>
                    <div class="value">${escapeHtml(`${process.env.NEXT_PUBLIC_APP_URL || ''}/verify-certificate?certificateId=${encodeURIComponent(certificate.certificateId)}`)}</div>
                  </div>
                </div>
              </div>

              <div class="right">
                <div class="status-box">
                  <div class="eyebrow">Certificate Status</div>
                  <div class="approved" style="margin-top:14px;">APPROVED</div>
                  <div class="detail-box" style="margin-top:18px;">
                    <div class="label">Training Period</div>
                    <div class="value" style="font-size:16px; font-weight:500;">${displayDate(certificate.trainingStartDate)} to ${displayDate(certificate.trainingEndDate)}</div>
                    <div class="label" style="margin-top:16px;">Completion Date</div>
                    <div class="value" style="font-size:16px; font-weight:500;">${displayDate(certificate.completionDate)}</div>
                  </div>
                </div>

                <div class="signature">
                  <div class="label">Authorized Signature</div>
                  <div class="signature-name">Sudesh Yadav</div>
                  <div class="muted" style="margin-top:4px;">Founder, SSSAM Academy</div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileName}"`,
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