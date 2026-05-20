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
  background: rgb(0.97, 0.95, 0.91),
  card: rgb(0.99, 0.98, 0.95),
  border: rgb(0.23, 0.31, 0.49),
  accent: rgb(0.67, 0.52, 0.16),
  text: rgb(0.08, 0.14, 0.28),
  muted: rgb(0.31, 0.39, 0.54),
  soft: rgb(0.9, 0.83, 0.69),
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
    borderColor: COLORS.soft,
    borderWidth: 0.8,
    color: rgb(1, 0.99, 0.97),
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
  return formatDateIndia(value);
};

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

    if (request.nextUrl?.searchParams?.get('pdf') !== '1') {
      return NextResponse.json({ success: false, error: 'PDF mode is required' }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontMedium = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      color: COLORS.background,
    });

    page.drawRectangle({
      x: 24,
      y: 24,
      width: PAGE_WIDTH - 48,
      height: PAGE_HEIGHT - 48,
      borderColor: COLORS.border,
      borderWidth: 1.8,
      color: COLORS.card,
    });

    page.drawRectangle({
      x: 36,
      y: 36,
      width: PAGE_WIDTH - 72,
      height: PAGE_HEIGHT - 72,
      borderColor: COLORS.soft,
      borderWidth: 0.8,
      color: COLORS.card,
    });

    const sealPath = path.join(process.cwd(), 'public', 'images', 'signatures', 'sssam.png');
    const signaturePath = path.join(process.cwd(), 'public', 'images', 'signatures', 'sign.png');

    let sealImage: Uint8Array | null = null;
    let signatureImage: Uint8Array | null = null;

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

    const seal = sealImage ? await pdfDoc.embedPng(sealImage) : null;
    const signature = signatureImage ? await pdfDoc.embedPng(signatureImage) : null;

    if (seal) {
      page.drawImage(seal, {
        x: 44,
        y: 272,
        width: 170,
        height: 170,
        opacity: 0.12,
      });
    }

    page.drawText('SSSAM ACADEMY', {
      x: 54,
      y: 782,
      size: 18,
      font: fontMedium,
      color: COLORS.text,
    });

    page.drawText('SMART SOLUTION SCHOOL OF AI AND MACHINE LEARNING', {
      x: 54,
      y: 765,
      size: 8.5,
      font: fontMedium,
      color: COLORS.muted,
    });

    page.drawLine({
      start: { x: 54, y: 752 },
      end: { x: PAGE_WIDTH - 54, y: 752 },
      thickness: 1,
      color: COLORS.soft,
    });

    drawCenteredText(page, 'PROFESSIONAL', 708, fontMedium, 22, COLORS.accent);

    drawCenteredText(page, 'CERTIFICATE OF COMPLETION', 680, fontMedium, 25, COLORS.text);

    drawCenteredText(page, 'This certificate is proudly awarded to', 642, fontRegular, 13, COLORS.muted);

    drawWrappedText(page, certificate.studentName, {
      x: 70,
      y: 612,
      width: PAGE_WIDTH - 140,
      font: fontMedium,
      size: 30,
      color: COLORS.text,
      align: 'center',
      lineGap: 3,
    });

    drawCenteredText(
      page,
      'for successfully completing the professional training program in',
      540,
      fontRegular,
      12.5,
      COLORS.muted
    );

    drawWrappedText(page, certificate.courseTitle, {
      x: 70,
      y: 519,
      width: PAGE_WIDTH - 140,
      font: fontMedium,
      size: 20,
      color: COLORS.text,
      align: 'center',
      lineGap: 2,
    });

    const gridTop = 448;
    const boxWidth = 240;
    const boxHeight = 58;
    const leftX = 54;
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
      valueFont: fontMedium,
    });

    drawWrappedText(page, 'We appreciate your dedication, commitment, and successful completion of the program, and wish you continued success in your professional journey.', {
      x: 72,
      y: 275,
      width: PAGE_WIDTH - 144,
      font: fontItalic,
      size: 11.5,
      color: COLORS.muted,
      align: 'center',
      lineGap: 2,
    });

    const signatureTop = 165;
    if (signature) {
      page.drawImage(signature, {
        x: PAGE_WIDTH - 210,
        y: signatureTop,
        width: 150,
        height: 58,
      });
    } else {
      page.drawLine({
        start: { x: PAGE_WIDTH - 215, y: signatureTop + 22 },
        end: { x: PAGE_WIDTH - 65, y: signatureTop + 22 },
        thickness: 0.8,
        color: COLORS.muted,
      });
    }

    page.drawText('Satish Soni', {
      x: PAGE_WIDTH - 206,
      y: 150,
      size: 18,
      font: fontMedium,
      color: COLORS.text,
    });

    page.drawText('Director', {
      x: PAGE_WIDTH - 206,
      y: 134,
      size: 10.5,
      font: fontRegular,
      color: COLORS.muted,
    });

    page.drawText('SSSAM Academy', {
      x: PAGE_WIDTH - 206,
      y: 120,
      size: 10.5,
      font: fontRegular,
      color: COLORS.muted,
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
