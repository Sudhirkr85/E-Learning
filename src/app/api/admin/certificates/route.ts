import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { CertificateModel } from '@/lib/models/certificate';

export async function GET() {
  try {
    const isAuthenticated = await verifyAdminSession();

    if (!isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const certificates = await CertificateModel.findAll();

    return NextResponse.json({ success: true, certificates });
  } catch (error) {
    console.error('Error fetching certificates for admin:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch certificates' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();

    if (!isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const certificateId = String(body.certificateId || '').trim();

    if (!certificateId) {
      return NextResponse.json({ success: false, error: 'Certificate ID is required' }, { status: 400 });
    }

    const existing = await CertificateModel.findByCertificateId(certificateId);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    const updates: Record<string, unknown> = {};

    if (body.status) {
      updates.status = body.status;
      if (body.status === 'approved') {
        updates.issueDate = body.issueDate ? new Date(body.issueDate) : new Date();
        updates.approvedBy = body.approvedBy || 'Admin';
      }
      if (body.status === 'rejected') {
        updates.issueDate = null;
      }
    }

    if (body.completionDate !== undefined) {
      updates.completionDate = body.completionDate ? new Date(body.completionDate) : null;
    }

    if (body.trainingStartDate !== undefined) {
      updates.trainingStartDate = body.trainingStartDate ? new Date(body.trainingStartDate) : null;
    }

    if (body.trainingEndDate !== undefined) {
      updates.trainingEndDate = body.trainingEndDate ? new Date(body.trainingEndDate) : null;
    }

    if (body.notes !== undefined) {
      updates.notes = body.notes;
    }

    const ok = await CertificateModel.updateByCertificateId(certificateId, updates);

    if (!ok) {
      return NextResponse.json({ success: false, error: 'Failed to update certificate' }, { status: 500 });
    }

    const certificate = await CertificateModel.findByCertificateId(certificateId);

    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error('Error updating certificate request:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to update certificate request' },
      { status: 500 }
    );
  }
}