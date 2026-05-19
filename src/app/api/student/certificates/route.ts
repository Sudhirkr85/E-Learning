import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { courses } from '@/data/courses';
import { PurchaseModel } from '@/lib/models/purchase';
import { CertificateModel } from '@/lib/models/certificate';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const [user, purchases, certificates] = await Promise.all([
      currentUser(),
      PurchaseModel.findByStudentId(userId),
      CertificateModel.findByStudentId(userId),
    ]);

    const completedPurchases = purchases.filter((purchase) => purchase.status === 'completed');
    const purchasedCourses = completedPurchases
      .map((purchase) => {
        const course = courses.find((item) => item.id === purchase.courseId);
        if (!course) {
          return null;
        }

        const certificate = certificates.find((entry) => entry.courseId === purchase.courseId) || null;

        return {
          courseId: purchase.courseId,
          courseTitle: course.title,
          courseSlug: course.slug,
          purchaseDate: purchase.purchaseDate,
          amount: purchase.amount,
          certificate: certificate
            ? {
                certificateId: certificate.certificateId,
                status: certificate.status,
                issueDate: certificate.issueDate,
                completionDate: certificate.completionDate,
                trainingStartDate: certificate.trainingStartDate,
                trainingEndDate: certificate.trainingEndDate,
                approvedBy: certificate.approvedBy,
                notes: certificate.notes,
              }
            : null,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      student: {
        id: userId,
        name: user?.fullName || user?.firstName || 'Student',
        email: user?.emailAddresses?.[0]?.emailAddress || '',
      },
      purchasedCourses,
      certificates,
    });
  } catch (error) {
    console.error('Error fetching student certificate data:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to fetch certificate data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const body = await request.json();
    const courseId = String(body.courseId || '').trim();
    const notes = typeof body.notes === 'string' ? body.notes.trim() : '';

    if (!courseId) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const course = courses.find((item) => item.id === courseId);
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    const purchase = await PurchaseModel.findByStudentIdAndCourseId(userId, courseId);
    if (!purchase) {
      return NextResponse.json(
        { success: false, error: 'Certificate can only be requested for purchased courses' },
        { status: 403 }
      );
    }

    const existingRequest = await CertificateModel.findByStudentAndCourse(userId, courseId);
    if (existingRequest) {
      return NextResponse.json({ success: true, certificate: existingRequest, existing: true });
    }

    const certificate = await CertificateModel.create({
      studentId: userId,
      studentName: user?.fullName || purchase.studentName || 'Student',
      studentEmail: user?.emailAddresses?.[0]?.emailAddress || purchase.studentEmail,
      courseId,
      courseSlug: course.slug,
      courseTitle: course.title,
      status: 'pending',
      issueDate: null,
      approvedBy: null,
      completionDate: null,
      trainingStartDate: null,
      trainingEndDate: null,
      notes: notes || undefined,
    });

    return NextResponse.json({ success: true, certificate });
  } catch (error) {
    console.error('Error creating certificate request:', error);

    return NextResponse.json(
      { success: false, error: 'Failed to create certificate request' },
      { status: 500 }
    );
  }
}