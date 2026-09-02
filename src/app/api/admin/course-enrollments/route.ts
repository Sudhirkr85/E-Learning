import { NextRequest, NextResponse } from 'next/server';
import { getCourseById } from '@/data/courses';
import { verifyAdminSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();

    if (!isAuthenticated) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const courseId = req.nextUrl.searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: 'Course ID is required',
      }, { status: 400 });
    }

    // Get all purchases for this course (completed only)
    const db = await require('@/lib/mongodb').getDatabase();
    const purchasesCollection = db.collection('purchases');
    
    const enrollments = await purchasesCollection
      .find({
        courseId,
        status: 'completed'
      })
      .sort({ createdAt: -1 })
      .toArray();

    const course = getCourseById(courseId);

    return NextResponse.json({
      success: true,
      enrollments: enrollments.map((e: any) => ({
        studentName: e.studentName,
        studentEmail: e.studentEmail,
        studentPhone: e.studentPhone,
        enrolledAt: e.purchaseDate || e.createdAt,
        amount: e.amount,
        orderId: e.orderId,
        paymentStatus: e.status,
      })),
      course: course ? { title: course.title, students: enrollments.length } : null,
      totalStudents: enrollments.length,
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch enrollments',
    }, { status: 500 });
  }
}
