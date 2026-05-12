import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Course } from '@/types';

export async function GET() {
  try {
    const db = await getDatabase();
    const courses = await db.collection('courses').find({}).sort({ updatedAt: -1 }).toArray();
    
    return NextResponse.json({
      success: true,
      courses: courses.map(course => ({
        ...course,
        _id: undefined
      }))
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    const newCourse: Omit<Course, 'id' | 'createdAt' | 'updatedAt'> = {
      ...body,
      id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection('courses').insertOne(newCourse);
    
    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        course: newCourse
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to create course' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
