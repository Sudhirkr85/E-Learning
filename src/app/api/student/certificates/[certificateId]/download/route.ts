import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { CertificateModel } from '@/lib/models/certificate';
import { formatDateIndia } from '@/utils/helpers';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;

const COLORS = {
  background: rgb(0.97, 0.95, 0.91), // #f7f2e8
  outerBorder: rgb(0.89, 0.84, 0.71), // #e4d5b4
  innerBorder: rgb(0.87, 0.81, 0.67), // #dfcfac
  infoBorder: rgb(0.91, 0.86, 0.76), // #e8dcc3
  infoBg: rgb(1, 0.99, 0.98), // #fffdfa
  accent: rgb(0.55, 0.42, 0.1), // #8b6a1a
  text: rgb(0.06, 0.14, 0.28), // #102348
  subtitle: rgb(0.25, 0.33, 0.49), // #3f557e
  body: rgb(0.2, 0.29, 0.46), // #324b76
  muted: rgb(0.35, 0.44, 0.59), // #596f96
  signatureText: rgb(0.31, 0.39, 0.54), // #4f638a
};

type EmbeddedFont = Awaited<ReturnType<PDFDocument['embedFont']>>;

type PdfPage = import('pdf-lib').PDFPage;

const wrapText = (text: string, font: EmbeddedFont, size: number, maxWidth: number) => {
  const paragraphs = text.split(/\r?\n/);
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push('');
      continue;
    }

    let currentLine = words.shift() ?? '';
    for (const word of words) {
      const candidate = `${currentLine} ${word}`;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        currentLine = candidate;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    lines.push(currentLine);
  }

  return lines;
};

const drawWrappedText = (
  page: PdfPage,
  text: string,
  options: {
    x: number;
    y: number;
    width: number;
    font: EmbeddedFont;
    size: number;
    color: ReturnType<typeof rgb>;
    align?: 'left' | 'center' | 'right';
    lineGap?: number;
  }
) => {
  const { x, y, width, font, size, color, align = 'left', lineGap = size * 0.2 } = options;
  const lines = wrapText(text, font, size, width);
  const lineHeight = size + lineGap;

  lines.forEach((line, index) => {
    const lineWidth = font.widthOfTextAtSize(line, size);
    const drawX =
      align === 'center'
        ? x + (width - lineWidth) / 2
        : align === 'right'
          ? x + width - lineWidth
          : x;

    page.drawText(line, {
      x: drawX,
      y: y - size - index * lineHeight,
      font,
      size,
      color,
    });
  });

  return lines.length * lineHeight;
};

const drawCenteredText = (
  page: PdfPage,
  text: string,
  y: number,
  font: EmbeddedFont,
  size: number,
  color: ReturnType<typeof rgb>
) => {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, {
    x: (PAGE_WIDTH - width) / 2,
    y,
    size,
    font,
    color,
  });
};

const drawBox = (
  page: PdfPage,
  options: {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    value: string;
    labelFont: EmbeddedFont;
    valueFont: EmbeddedFont;
  }
) => {
  const { x, y, width, height, label, value, labelFont, valueFont } = options;

  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderColor: COLORS.infoBorder,
    borderWidth: 0.8,
    color: COLORS.infoBg,
  });

  page.drawText(label.toUpperCase(), {
    x: x + 10,
    y: y + height - 16,
    size: 8,
    font: labelFont,
    color: COLORS.accent,
  });

  const wrappedValue = wrapText(value, valueFont, 10.5, width - 20);
  page.drawText(wrappedValue.join('\n'), {
    x: x + 10,
    y: y + height - 33,
    size: 10.5,
    font: valueFont,
    color: COLORS.text,
    maxWidth: width - 20,
    lineHeight: 12.5,
  });
};

const safeFormatDate = (value?: string | Date | null) => {
  if (!value) return 'To be scheduled';
  return formatDateIndia(new Date(value));
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const allowTestNoAuth = process.env.ALLOW_TEST_CERTIFICATE_DOWNLOAD_NO_AUTH === '1';
    const { userId } = await auth();
    if (!allowTestNoAuth && !userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { certificateId } = await params;
    const certificate = await CertificateModel.findByCertificateId(certificateId);

    const isOwner = userId ? certificate?.studentId === userId : false;
    if (!certificate || (!allowTestNoAuth && !isOwner)) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    if (certificate.status !== 'approved' || !certificate.issueDate) {
      return NextResponse.json({ success: false, error: 'Certificate is pending approval' }, { status: 403 });
    }

    if (request.nextUrl?.searchParams?.get('pdf') !== '1') {
      return NextResponse.json({ success: false, error: 'PDF mode is required' }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontMedium = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontMono = await pdfDoc.embedFont(StandardFonts.CourierBold);

    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      color: COLORS.background,
    });

    const shellX = 10;
    const shellY = 10;
    const shellW = PAGE_WIDTH - shellX * 2;
    const shellH = PAGE_HEIGHT - shellY * 2;

    page.drawRectangle({
      x: shellX,
      y: shellY,
      width: shellW,
      height: shellH,
      borderColor: COLORS.outerBorder,
      borderWidth: 1,
      color: COLORS.background,
    });

    const cardX = shellX + 10;
    const cardY = shellY + 10;
    const cardW = shellW - 20;
    const cardH = shellH - 20;

    page.drawRectangle({
      x: cardX,
      y: cardY,
      width: cardW,
      height: cardH,
      borderColor: COLORS.innerBorder,
      borderWidth: 0.8,
      color: rgb(1, 0.996, 0.985),
    });

    // Subtle lower-half tint to approximate the preview gradient.
    page.drawRectangle({
      x: cardX,
      y: cardY,
      width: cardW,
      height: cardH * 0.6,
      color: COLORS.background,
      opacity: 0.35,
    });

    const sealPath = path.join(process.cwd(), 'public', 'images', 'signatures', 'sssam.png');
    const signaturePath = path.join(process.cwd(), 'public', 'images', 'signatures', 'sign.png');
    const logoCandidates: Array<{ path: string; type: 'png' | 'jpg' }> = [
      { path: path.join(process.cwd(), 'public', 'images', 'logo', 'logo.jpg'), type: 'jpg' },
      { path: path.join(process.cwd(), 'public', 'images', 'logo', 'logo.jpeg'), type: 'jpg' },
      { path: path.join(process.cwd(), 'public', 'images', 'logo', 'logo.png'), type: 'png' },
      { path: path.join(process.cwd(), 'public', 'logo.jpg'), type: 'jpg' },
      { path: path.join(process.cwd(), 'public', 'logo.jpeg'), type: 'jpg' },
      { path: path.join(process.cwd(), 'public', 'logo.png'), type: 'png' },
    ];

    let sealImage: Uint8Array | null = null;
    let signatureImage: Uint8Array | null = null;
    let logoImage: Uint8Array | null = null;
    let logoType: 'png' | 'jpg' | null = null;

    try {
      sealImage = await readFile(sealPath);
    } catch {
      sealImage = null;
    }

    try {
      signatureImage = await readFile(signaturePath);
    } catch {
      signatureImage = null;
    }

    for (const candidate of logoCandidates) {
      try {
        logoImage = await readFile(candidate.path);
        logoType = candidate.type;
        break;
      } catch {
        // Continue to next candidate path.
      }
    }

    const seal = sealImage ? await pdfDoc.embedPng(sealImage) : null;
    const signature = signatureImage ? await pdfDoc.embedPng(signatureImage) : null;
    const logo =
      logoImage && logoType === 'png'
        ? await pdfDoc.embedPng(logoImage)
        : logoImage && logoType === 'jpg'
          ? await pdfDoc.embedJpg(logoImage)
          : null;

    if (seal) {
      page.drawImage(seal, {
        x: cardX + cardW * 0.06,
        y: cardY + cardH * 0.42 - 130,
        width: 260,
        height: 260,
        opacity: 0.12,
      });
    }

    const titleTop = cardY + cardH - 44;
    drawCenteredText(page, 'SSSAM ACADEMY', titleTop, fontMedium, 22, COLORS.text);
    drawCenteredText(
      page,
      'Smart Solutions School of AI and Machine Learning',
      titleTop - 18,
      fontMedium,
      10,
      COLORS.subtitle
    );

    if (logo) {
      page.drawImage(logo, {
        x: PAGE_WIDTH / 2 - 30,
        y: titleTop - 78,
        width: 60,
        height: 60,
      });
    }

    const titleBlockOffset = logo ? 0 : 16;

    drawCenteredText(page, 'CERTIFICATE OF COMPLETION', titleTop - 126 + titleBlockOffset, fontMedium, 24, COLORS.text);

    drawCenteredText(page, 'This certificate is proudly awarded to', titleTop - 180 + titleBlockOffset, fontRegular, 13.5, COLORS.body);

    const studentTextTop = titleTop - 206 + titleBlockOffset;
    const studentTextHeight = drawWrappedText(page, certificate.studentName, {
      x: 60,
      y: studentTextTop,
      width: PAGE_WIDTH - 120,
      font: fontMedium,
      size: 35,
      color: COLORS.text,
      align: 'center',
      lineGap: 3,
    });

    const afterStudentY = studentTextTop - studentTextHeight;

    drawCenteredText(
      page,
      'for successfully completing the professional training program in',
      afterStudentY - 28,
      fontRegular,
      13,
      COLORS.body
    );

    const courseTitle = certificate.courseTitle || 'AI-Powered Full Stack Development Bootcamp';
    const courseTitleSize = courseTitle.length > 56 ? 20 : 24;
    const courseTextTop = afterStudentY - 54;
    const estimatedCourseLines = wrapText(courseTitle, fontMedium, courseTitleSize, PAGE_WIDTH - 128).length;
    const dynamicGap = 60 + Math.max(0, estimatedCourseLines - 1) * 12;
    const courseTextHeight = drawWrappedText(page, courseTitle, {
      x: 64,
      y: courseTextTop,
      width: PAGE_WIDTH - 128,
      font: fontMedium,
      size: courseTitleSize,
      color: COLORS.text,
      align: 'center',
      lineGap: 3,
    });

    const gridTop = courseTextTop - courseTextHeight - dynamicGap;
    const boxWidth = 236;
    const boxHeight = 62;
    const leftX = 58;
    const rightX = PAGE_WIDTH - 54 - boxWidth;

    drawBox(page, {
      x: leftX,
      y: gridTop,
      width: boxWidth,
      height: boxHeight,
      label: 'Training Period',
      value: `${safeFormatDate(certificate.trainingStartDate)} - ${safeFormatDate(certificate.trainingEndDate)}`,
      labelFont: fontMedium,
      valueFont: fontRegular,
    });

    drawBox(page, {
      x: rightX,
      y: gridTop,
      width: boxWidth,
      height: boxHeight,
      label: 'Mode',
      value: 'Online Live Training',
      labelFont: fontMedium,
      valueFont: fontRegular,
    });

    drawBox(page, {
      x: leftX,
      y: gridTop - 74,
      width: boxWidth,
      height: boxHeight,
      label: 'Issued On',
      value: safeFormatDate(certificate.issueDate),
      labelFont: fontMedium,
      valueFont: fontRegular,
    });

    drawBox(page, {
      x: rightX,
      y: gridTop - 74,
      width: boxWidth,
      height: boxHeight,
      label: 'Certificate ID',
      value: certificate.certificateId,
      labelFont: fontMedium,
      valueFont: fontMono,
    });

    drawWrappedText(page, 'We appreciate your dedication, commitment, and successful completion of the program, and wish you continued success in your professional journey.', {
      x: 70,
      y: gridTop - 100,
      width: PAGE_WIDTH - 140,
      font: fontRegular,
      size: 11,
      color: COLORS.muted,
      align: 'center',
      lineGap: 2,
    });

    const signatureTop = cardY + 72;
    if (signature) {
      page.drawImage(signature, {
        x: PAGE_WIDTH - 226,
        y: signatureTop,
        width: 170,
        height: 54,
      });
    } else {
      page.drawLine({
        start: { x: PAGE_WIDTH - 228, y: signatureTop + 20 },
        end: { x: PAGE_WIDTH - 58, y: signatureTop + 20 },
        thickness: 0.8,
        color: COLORS.muted,
      });
    }

    page.drawText('Satish Soni', {
      x: PAGE_WIDTH - 216,
      y: signatureTop - 18,
      size: 20,
      font: fontMedium,
      color: COLORS.text,
    });

    page.drawText('Director', {
      x: PAGE_WIDTH - 216,
      y: signatureTop - 33,
      size: 11,
      font: fontRegular,
      color: COLORS.signatureText,
    });

    page.drawText('SSSAM Academy', {
      x: PAGE_WIDTH - 216,
      y: signatureTop - 46,
      size: 11,
      font: fontRegular,
      color: COLORS.signatureText,
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${certificate.certificateId}.pdf"`,
        'Cache-Control': 'no-store',
        'Content-Length': String(pdfBytes.byteLength),
      },
    });
  } catch (error) {
    console.error('Error generating certificate download:', error);
    return NextResponse.json({ success: false, error: 'Failed to download certificate' }, { status: 500 });
  }
}
