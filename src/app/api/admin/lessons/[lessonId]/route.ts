import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAdminSession } from '@/lib/admin-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { lessonId } = await params;
    const db = await getDatabase();
    const lesson = await db.collection('lessons').findOne({ id: lessonId });
    
    if (!lesson) {
      return NextResponse.json(
        { success: false, error: 'Lesson link not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      lesson: {
        ...lesson,
        _id: undefined
      }
    });
  } catch (error) {
    console.error('Error fetching lesson link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lesson link' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { lessonId } = await params;
    const body = await request.json();
    const db = await getDatabase();
    
    const updatedLesson = {
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    const result = await db.collection('lessons').updateOne(
      { id: lessonId },
      { $set: updatedLesson }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Lesson link not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      lesson: updatedLesson
    });
  } catch (error) {
    console.error('Error updating lesson link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lesson link' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { lessonId } = await params;
    const db = await getDatabase();
    const result = await db.collection('lessons').deleteOne({ id: lessonId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Lesson link not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Lesson link deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lesson link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete lesson link' },
      { status: 500 }
    );
  }
}
