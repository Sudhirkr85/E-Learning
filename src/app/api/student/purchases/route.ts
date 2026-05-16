import { NextRequest, NextResponse } from 'next/server';
import { PurchaseModel } from '@/lib/models/purchase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return NextResponse.json(
        { error: 'Student ID is required' },
        { status: 400 }
      );
    }

    // Check if MongoDB is configured
    try {
      const purchases = await PurchaseModel.findByStudentId(studentId);
      const completedPurchases = purchases.filter((purchase) => purchase.status === 'completed');
      
      return NextResponse.json({
        purchases: completedPurchases,
        studentId,
      });
    } catch (dbError) {
      // If MongoDB is not configured, return empty array
      if (dbError instanceof Error && dbError.message.includes('MongoDB is not configured')) {
        return NextResponse.json({
          purchases: [],
          studentId,
          error: 'Database not configured',
        });
      }
      throw dbError;
    }

  } catch (error) {
    console.error('Error fetching student purchases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}
