import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { CertificateModel } from '@/lib/models/certificate';
import { formatDateIndia } from '@/utils/helpers';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function GET(
  request: NextRequest,
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

    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo', 'logo.webp');
    const signPath = path.join(process.cwd(), 'public', 'images', 'signatures', 'satish-kumar.webp');
    const [logoData, signData] = await Promise.all([readFile(logoPath), readFile(signPath)]);
    const logoDataUri = `data:image/webp;base64,${logoData.toString('base64')}`;
    const signDataUri = `data:image/webp;base64,${signData.toString('base64')}`;

    const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(certificate.certificateId)} - Certificate of Completion</title>
  <style>
    body { margin: 0; font-family: Inter, Arial, sans-serif; background: #08111f; color: #dbe5f8; }
    .page { min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; }
    .card { width: min(1120px, 100%); border-radius: 24px; padding: 16px; border: 1px solid #2e426a; background: #071125; box-shadow: 0 26px 90px rgba(2,8,20,.55); box-sizing: border-box; }
    .inner { aspect-ratio: 1 / 1.414; border-radius: 16px; border: 1px solid rgba(65,91,141,.75); background: #08142d; padding: 28px; box-sizing: border-box; display: flex; flex-direction: column; }
    .titleTop { text-align: center; color: #f6f8ff; font-size: 30px; font-weight: 800; letter-spacing: .08em; }
    .subTop { text-align: center; color: #b4c4df; font-size: 14px; font-weight: 600; letter-spacing: .1em; margin-top: 6px; }
    .logo { text-align: center; margin-top: 14px; }
    .pro { margin-top: 20px; text-align: center; color: #f7f9ff; font-size: 30px; font-weight: 800; letter-spacing: .14em; }
    .h1 { margin-top: 6px; text-align: center; color: #dce7fb; font-size: 35px; font-weight: 700; letter-spacing: .06em; }
    .desc { margin-top: 18px; text-align: center; color: #dbe5f8; font-size: 18px; }
    .name { margin-top: 10px; text-align: center; color: #f8faff; font-size: 52px; font-weight: 700; }
    .courseLabel { margin-top: 14px; text-align: center; color: #dbe5f8; font-size: 18px; }
    .course { margin-top: 8px; text-align: center; color: #f2f6ff; font-size: 34px; font-weight: 600; }
    .grid { margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .box { border-radius: 10px; border: 1px solid #2d3e63; background: #0c1a34; padding: 12px; }
    .boxLabel { font-size: 12px; font-weight: 600; color: #9cb2d8; text-transform: uppercase; letter-spacing: .14em; }
    .boxValue { margin-top: 8px; font-size: 16px; font-weight: 600; color: #f4f7ff; }
    .mono { font-family: monospace; font-size: 15px; }
    .note { margin: 18px auto 0; max-width: 760px; text-align: center; color: #b8c8e4; font-size: 14px; line-height: 1.55; }
    .footer { margin-top: auto; border-top: 1px solid rgba(47,69,111,.55); padding-top: 16px; display: flex; justify-content: flex-end; }
    .sign { width: 280px; text-align: right; }
    .sign img { width: 170px; height: auto; object-fit: contain; margin-left: auto; filter: brightness(1.1) contrast(1.25) saturate(1.05); }
    .signName { margin-top: 8px; font-size: 28px; font-weight: 600; color: #f1f6ff; }
    .signRole { margin-top: 4px; font-size: 14px; color: #b8c8e4; }
    .verify { margin-top: 12px; display: inline-block; border: 1px solid rgba(240,212,140,.45); border-radius: 999px; padding: 6px 12px; font-size: 12px; font-weight: 700; color: #f0d48c; }
  </style>
</head>
<body>
  <div class="page">
    <div class="card">
      <div class="inner">
        <div class="titleTop">SSSAM ACADEMY</div>
        <div class="subTop">SMART SOLUTION SCHOOL OF AI AND MACHINE LEARNING</div>
        <div class="logo"><img src="${logoDataUri}" alt="SSSAM Academy" width="72" height="72"/></div>

        <div class="pro">PROFESSIONAL</div>
        <div class="h1">CERTIFICATE OF COMPLETION</div>

        <div class="desc">This certificate is proudly awarded to</div>
        <div class="name">${escapeHtml(certificate.studentName)}</div>
        <div class="courseLabel">for successfully completing the professional training program in</div>
        <div class="course">${escapeHtml(certificate.courseTitle)}</div>

        <div class="grid">
          <div class="box">
            <div class="boxLabel">Training Period</div>
            <div class="boxValue">${certificate.trainingStartDate ? escapeHtml(formatDateIndia(certificate.trainingStartDate)) : 'To be scheduled'} - ${certificate.trainingEndDate ? escapeHtml(formatDateIndia(certificate.trainingEndDate)) : 'To be scheduled'}</div>
          </div>
          <div class="box">
            <div class="boxLabel">Mode</div>
            <div class="boxValue">Online Live Training</div>
          </div>
          <div class="box">
            <div class="boxLabel">Issued On</div>
            <div class="boxValue">${certificate.issueDate ? escapeHtml(formatDateIndia(certificate.issueDate)) : 'To be scheduled'}</div>
          </div>
          <div class="box">
            <div class="boxLabel">Certificate ID</div>
            <div class="boxValue mono">${escapeHtml(certificate.certificateId)}</div>
          </div>
        </div>

        <div class="note">We appreciate your dedication, commitment, and successful completion of the program, and wish you continued success in your professional journey.</div>

        <div class="footer">
          <div class="sign">
            <img src="${signDataUri}" alt="Satish Kumar Signature" />
            <div class="signName">Satish Kumar</div>
            <div class="signRole">Director</div>
            <div class="signRole">SSSAM Academy</div>
            <div class="verify">Verify Certificate</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const makePdf = async (): Promise<Uint8Array | null> => {
      try {
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
          const isPdf =
            pdfBytes.length > 5 &&
            pdfBytes[0] === 0x25 &&
            pdfBytes[1] === 0x50 &&
            pdfBytes[2] === 0x44 &&
            pdfBytes[3] === 0x46 &&
            pdfBytes[4] === 0x2d;

          return isPdf ? pdfBytes : null;
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

    if (request.nextUrl?.searchParams?.get('pdf') !== '1') {
      return NextResponse.json({ success: false, error: 'PDF mode is required' }, { status: 400 });
    }

    const pdf = await makePdf();
    if (!pdf) {
      return NextResponse.json(
        { success: false, error: 'Failed to generate PDF certificate' },
        { status: 500 }
      );
    }

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="certificate.pdf"',
        'Cache-Control': 'no-store',
        'Content-Length': String(pdf.byteLength),
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
