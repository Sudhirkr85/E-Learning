import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { CertificateModel } from '@/lib/models/certificate';
import { formatDateIndia } from '@/utils/helpers';
import { SITE_CONFIG } from '@/constants';

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

    const modeText = (certificate && (certificate as any).mode) ? `(${escapeHtml(String((certificate as any).mode))})` : '';

    const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(certificate.certificateId)} - SSSAM Academy Certificate</title>
      <style>
        body { margin: 0; font-family: Inter, Arial, sans-serif; background: #08111f; color: #0b1724; }
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
        .signature { position:absolute; left:48px; bottom:36px; text-align:left; }
        .contact { position:absolute; right:48px; bottom:36px; text-align:right; color:#374151; }
        .badge { display:inline-block; background:linear-gradient(90deg,#d6b15c,#f0d48c); color:#08111f; padding:8px 12px; border-radius:999px; font-weight:800; }
        @media print { body { background:#fff } .card { box-shadow:none } }
      </style>
</head>
<body>
  <div class="page">
      <div class="card">
        <div class="inner">
          <div class="watermark">SSSAM</div>
          <div class="logo"><img src="/images/logo/logo.webp" alt="${SITE_CONFIG.name}" width="96" height="96"/></div>
          <div class="brand">${SITE_CONFIG.name}</div>
          <h1>Certificate</h1>
          <div class="muted">Premium Certificate of Completion for Live Training Programs</div>

          <div class="certIdBox">
            <div class="label">Certificate ID</div>
            <div class="value" style="font-family:monospace;">${escapeHtml(certificate.certificateId)}</div>
          </div>

          <div class="studentName">${escapeHtml(certificate.studentName)}</div>
          <div class="courseName">${escapeHtml(certificate.courseTitle)}</div>
          <div class="mainSentence">This confirms that <strong>${escapeHtml(certificate.studentName)}</strong> has successfully completed the <strong>${escapeHtml(certificate.courseTitle)}</strong> ${modeText} conducted by ${SITE_CONFIG.name}.</div>

          <div class="pills">
            <div class="pill">${certificate.trainingStartDate ? escapeHtml(formatDateIndia(certificate.trainingStartDate)) : 'TBC'}</div>
            <div class="pill">to</div>
            <div class="pill">${certificate.trainingEndDate ? escapeHtml(formatDateIndia(certificate.trainingEndDate)) : 'TBC'}</div>
          </div>

          <div style="margin-top:12px; text-align:center;"><span class="badge">Verified Completion</span></div>

          <div class="signature">
            <img src="/images/signatures/satish-kumar.svg" alt="signature" style="max-width:280px; display:block;" />
            <div style="margin-top:6px; font-weight:700;">Satish Kumar</div>
            <div style="font-size:13px;">Director</div>
            <div style="font-size:13px;">SSSAM Academy</div>
          </div>

          <div class="contact">
            <div style="font-weight:700;">${SITE_CONFIG.name}</div>
            <div style="margin-top:6px;">${SITE_CONFIG.address}</div>
            <div style="margin-top:6px;">${SITE_CONFIG.email} | ${SITE_CONFIG.url}</div>
          </div>
        </div>
      </div>
  </div>
</body>
</html>`;

    // If client requested PDF, render a true PDF on the server using Playwright.
    const makePdf = async (): Promise<Uint8Array | null> => {
      try {
        // Playwright is optional. Suppress TS error when it's not installed.
        // @ts-ignore
        const { chromium } = await import('playwright');
        const browser = await chromium.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          headless: true,
        });
        try {
          const page = await browser.newPage();
          await page.setContent(content, { waitUntil: 'networkidle' });
          const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
          const pdfBytes = new Uint8Array(pdfBuffer);
          // Basic PDF signature check: "%PDF-"
          const isPdf =
            pdfBytes.length > 5 &&
            pdfBytes[0] === 0x25 &&
            pdfBytes[1] === 0x50 &&
            pdfBytes[2] === 0x44 &&
            pdfBytes[3] === 0x46 &&
            pdfBytes[4] === 0x2d;
          if (!isPdf) {
            console.error('PDF generation produced invalid bytes (missing PDF header).');
            return null;
          }
          return pdfBytes;
        } finally {
          await browser.close();
        }
      } catch (err) {
        console.error('PDF generation failed (Playwright missing or error):', err);
        const message = err instanceof Error ? err.message : String(err);
        if (message.toLowerCase().includes("executable doesn't exist")) {
          console.error('Playwright browser executable missing. Run: npx playwright install chromium');
        }
        return null;
      }
    };

    const wantPdf = _request.nextUrl?.searchParams?.get('pdf') === '1';

    if (wantPdf) {
      const pdf = await makePdf();
      if (pdf) {
        return new NextResponse(pdf, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${certificate.certificateId}.pdf"`,
            'Cache-Control': 'no-store',
            'Content-Length': String(pdf.byteLength),
          },
        });
      }
      return NextResponse.json(
        { success: false, error: 'Failed to generate PDF certificate' },
        { status: 500 }
      );
    }

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
