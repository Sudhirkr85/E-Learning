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
    if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

    const { certificateId } = await params;
    const certificate = await CertificateModel.findByCertificateId(certificateId);

    if (!certificate || certificate.studentId !== userId) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }
    if (certificate.status !== 'approved' || !certificate.issueDate) {
      return NextResponse.json({ success: false, error: 'Certificate is pending approval' }, { status: 403 });
    }
    if (request.nextUrl?.searchParams?.get('pdf') !== '1') {
      return NextResponse.json({ success: false, error: 'PDF mode is required' }, { status: 400 });
    }

    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo', 'logo.webp');
    const signPrimary = path.join(process.cwd(), 'public', 'images', 'signatures', 'sign.png');
    const signFallback = path.join(process.cwd(), 'public', 'images', 'signatures', 'sign.png');
    const sealPath = path.join(process.cwd(), 'public', 'images', 'signatures', 'sssam.png');

    const logoData = await readFile(logoPath);

    let signData: Buffer | null = null;
    let signMime = 'image/png';
    try {
      signData = await readFile(signPrimary);
      signMime = 'image/png';
    } catch (err) {
      try {
        signData = await readFile(signFallback);
        signMime = 'image/png';
      } catch (err2) {
        console.warn('Signature file missing, proceeding without signature image', err2);
        signData = null;
      }
    }

    const logoDataUri = `data:image/webp;base64,${logoData.toString('base64')}`;
    const signDataUri = signData ? `data:${signMime};base64,${signData.toString('base64')}` : '';
    const sealData = await readFile(sealPath);
    const sealDataUri = `data:image/png;base64,${sealData.toString('base64')}`;

    const content = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(certificate.certificateId)} - Certificate of Completion</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; height: 100%; font-family: Inter, Arial, sans-serif; }
    body { background: linear-gradient(180deg,#f8f4eb 0%,#efe4d1 100%); color: #324b76; }
    .page { width: 100%; min-height: 100%; display: grid; place-items: center; padding: 28px; }
    .preview-shell { width: min(980px, 100%); border-radius: 16px; border: 1px solid #e4d5b4; background: #f7f2e8; padding: 16px; box-shadow: 0 26px 90px rgba(66,46,11,.14); }
    .preview-card {
      width: 100%; aspect-ratio: 1 / 1.414; border-radius: 12px; border: 1px solid rgba(65,91,141,.75);
      position: relative;
      background: linear-gradient(180deg,#fffefb 0%,#f8f2e8 100%);
      padding: 24px; display: flex; flex-direction: column;
    }
    .seal { position:absolute; left:6%; top:42%; transform:translateY(-50%); width:280px; opacity:.12; pointer-events:none; }
    .titleTop { text-align: center; color: #102348; font-size: 22px; font-weight: 800; letter-spacing: .08em; }
    .subTop { text-align: center; color: #3f557e; font-size: 12px; font-weight: 600; letter-spacing: .1em; margin-top: 4px; }
    .logo { text-align: center; margin-top: 12px; }
    .pro { margin-top: 14px; text-align: center; color: #8b6a1a; font-size: 26px; font-weight: 800; letter-spacing: .14em; }
    .h1 { margin-top: 4px; text-align: center; color: #102348; font-size: 30px; font-weight: 700; letter-spacing: .06em; }
    .desc { margin-top: 14px; text-align: center; color: #324b76; font-size: 16px; }
    .name { margin-top: 8px; text-align: center; color: #102348; font-size: 42px; font-weight: 700; line-height: 1.1; }
    .courseLabel { margin-top: 10px; text-align: center; color: #324b76; font-size: 16px; }
    .course { margin-top: 8px; text-align: center; color: #102348; font-size: 28px; font-weight: 600; line-height: 1.2; }
    .grid { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .box { border-radius: 10px; border: 1px solid #e8dcc3; background: #fffdfa; padding: 10px; }
    .boxLabel { font-size: 10px; font-weight: 600; color: #8b6a1a; text-transform: uppercase; letter-spacing: .14em; }
    .boxValue { margin-top: 6px; font-size: 14px; font-weight: 600; color: #102348; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; }
    .note { margin: 14px auto 0; max-width: 720px; text-align: center; color: #596f96; font-size: 13px; line-height: 1.45; }
    .footer { margin-top: auto; border-top: 1px solid #dfcfac; padding-top: 14px; display: flex; justify-content: flex-end; }
    .sign { width: 280px; text-align: right; }
    .sign img { width: 170px; height: auto; object-fit: contain; margin-left: auto; filter: brightness(1.1) contrast(1.25) saturate(1.05); }
    .signName { margin-top: 8px; font-size: 20px; font-weight: 600; color: #102348; }
    .signRole { margin-top: 2px; font-size: 13px; color: #4f638a; }
    @page { size: A4 portrait; margin: 0; }
  </style>
</head>
<body>
  <div class="page">
    <div class="preview-shell">
      <div class="preview-card">
        <img class="seal" src="${sealDataUri}" alt="SSSAM premium seal" />
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
          <div class="box"><div class="boxLabel">Training Period</div><div class="boxValue">${certificate.trainingStartDate ? escapeHtml(formatDateIndia(certificate.trainingStartDate)) : 'To be scheduled'} - ${certificate.trainingEndDate ? escapeHtml(formatDateIndia(certificate.trainingEndDate)) : 'To be scheduled'}</div></div>
          <div class="box"><div class="boxLabel">Mode</div><div class="boxValue">Online Live Training</div></div>
          <div class="box"><div class="boxLabel">Issued On</div><div class="boxValue">${certificate.issueDate ? escapeHtml(formatDateIndia(certificate.issueDate)) : 'To be scheduled'}</div></div>
          <div class="box"><div class="boxLabel">Certificate ID</div><div class="boxValue mono">${escapeHtml(certificate.certificateId)}</div></div>
        </div>

        <div class="note">We appreciate your dedication, commitment, and successful completion of the program, and wish you continued success in your professional journey.</div>

        <div class="footer">
            <div class="sign">
            ${signDataUri ? `<img src="${signDataUri}" alt="Satish Kumar Signature" />` : ''}
            <div class="signName">Satish Soni</div>
            <div class="signRole">Director</div>
            <div class="signRole">SSSAM Academy</div>
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
        const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
        try {
          const page = await browser.newPage({ viewport: { width: 1400, height: 1980 }, deviceScaleFactor: 2 });
          await page.setContent(content, { waitUntil: 'networkidle' });
          const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: false,
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
          });
          const pdfBytes = new Uint8Array(pdfBuffer);
          const isPdf = pdfBytes.length > 5 && pdfBytes[0] === 0x25 && pdfBytes[1] === 0x50 && pdfBytes[2] === 0x44 && pdfBytes[3] === 0x46 && pdfBytes[4] === 0x2d;
          return isPdf ? pdfBytes : null;
        } finally {
          await browser.close();
        }
      } catch (err) {
        console.error('PDF generation failed (Playwright missing or error):', err);
        return null;
      }
    };

    const pdf = await makePdf();
    if (!pdf) return NextResponse.json({ success: false, error: 'Failed to generate PDF certificate' }, { status: 500 });

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
    return NextResponse.json({ success: false, error: 'Failed to download certificate' }, { status: 500 });
  }
}
