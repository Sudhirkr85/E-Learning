import { NextRequest, NextResponse } from 'next/server';
import { PurchaseModel } from '@/lib/models/purchase';

export async function GET(request: NextRequest, { params }: { params: Promise<{ courseId: string }> }) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const { courseId } = await params;

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Check if MongoDB is configured
    try {
      const hasPurchased = await PurchaseModel.hasStudentPurchasedCourse(studentId, courseId);
      
      return NextResponse.json({
        hasAccess: hasPurchased,
        courseId,
        studentId,
      });
    } catch (dbError) {
      // If MongoDB is not configured, return false for access
      if (dbError instanceof Error && dbError.message.includes('MongoDB is not configured')) {
        return NextResponse.json({
          hasAccess: false,
          courseId,
          studentId,
          error: 'Database not configured',
        });
      }
      throw dbError;
    }

  } catch (error) {
    console.error('Error checking course access:', error);
    return NextResponse.json(
      { error: 'Failed to check course access' },
      { status: 500 }
    );
  }
}
