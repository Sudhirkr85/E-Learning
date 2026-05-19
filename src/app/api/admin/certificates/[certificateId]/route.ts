import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { CertificateModel } from '@/lib/models/certificate';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();

    if (!isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { certificateId } = await params;
    const certificate = await CertificateModel.findByCertificateId(certificateId);

    if (!certificate) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error('Error fetching certificate:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch certificate' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();

    if (!isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { certificateId } = await params;
    const body = await request.json();
    const isApproving = body?.status === 'approved';

    if (isApproving && !body?.completionDate) {
      return NextResponse.json(
        { success: false, error: 'Completion date is required before approving certificate.' },
        { status: 400 }
      );
    }

    const updated = await CertificateModel.updateByCertificateId(certificateId, {
      status: body?.status,
      approvedBy: body?.approvedBy ?? null,
      issueDate: body?.issueDate ? new Date(body.issueDate) : undefined,
      completionDate: body?.completionDate ? new Date(body.completionDate) : undefined,
      trainingStartDate: body?.trainingStartDate ? new Date(body.trainingStartDate) : undefined,
      trainingEndDate: body?.trainingEndDate ? new Date(body.trainingEndDate) : undefined,
      notes: body?.notes,
    });

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    const certificate = await CertificateModel.findByCertificateId(certificateId);
    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error('Error patching certificate:', error);
    return NextResponse.json({ success: false, error: 'Failed to update certificate' }, { status: 500 });
  }
}
