import { NextRequest, NextResponse } from 'next/server';
import { CertificateModel } from '@/lib/models/certificate';

interface RouteParams {
  params: Promise<{ certificateId: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { certificateId } = await params;
    const certificate = await CertificateModel.findByCertificateId(certificateId);

    if (!certificate) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error('Error fetching certificate:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  }
}