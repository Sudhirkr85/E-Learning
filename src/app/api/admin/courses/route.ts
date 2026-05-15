import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { courses } from '@/data/courses';

/**
 * GET /api/admin/courses
 * Fetch all courses for admin panel
 */
export async function GET() {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      courses,
      message: 'Courses fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching courses:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch courses',
        message: 'An error occurred while fetching courses',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/courses
 * Create a new course
 */
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: false,
        error: 'Course CRUD disabled',
        message: 'Courses are static and cannot be created from admin anymore',
      },
      { status: 410 }
    );
  } catch (error) {
    console.error('Course CRUD disabled:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Course CRUD disabled',
        message: 'Courses are static and cannot be created from admin anymore',
      },
      { status: 410 }
    );
  }
}
