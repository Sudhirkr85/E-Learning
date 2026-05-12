import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { LessonLink } from '@/types';
import { verifyAdminSession } from '@/lib/admin-auth';

export async function GET() {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const db = await getDatabase();
    const lessons = await db.collection('lessons').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({
      success: true,
      lessons: lessons.map(lesson => ({
        ...lesson,
        _id: undefined
      }))
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const db = await getDatabase();
    
    const newLesson: Omit<LessonLink, 'id' | 'createdAt' | 'updatedAt'> = {
      ...body,
      id: new Date().getTime().toString(),
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection('lessons').insertOne(newLesson);
    
    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        lesson: newLesson
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to create lesson link' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating lesson link:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lesson link' },
      { status: 500 }
    );
  }
}
