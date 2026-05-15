import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { getCourseById } from '@/data/courses';

interface CourseIdParams {
  params: Promise<{
    courseId: string;
  }>;
}

/**
 * GET /api/admin/courses/[courseId]
 * Fetch a specific course
 */
export async function GET(request: Request, { params }: CourseIdParams) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await params;

    const course = getCourseById(courseId);

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: 'Course not found',
          message: 'No course found with the provided ID',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course,
      message: 'Course fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching course:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch course',
        message: 'An error occurred while fetching the course',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/courses/[courseId]
 * Update a course
 */
export async function PUT(request: NextRequest, { params }: CourseIdParams) {
  try {
    return NextResponse.json({
      success: false,
      error: 'Course CRUD disabled',
      message: 'Courses are static and cannot be updated from admin anymore',
    }, { status: 410 });
  } catch (error) {
    console.error('Course CRUD disabled:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Course CRUD disabled',
        message: 'Courses are static and cannot be updated from admin anymore',
      },
      { status: 410 }
    );
  }
}

/**
 * DELETE /api/admin/courses/[courseId]
 * Delete a course
 */
export async function DELETE(request: Request, { params }: CourseIdParams) {
  try {
    return NextResponse.json({
      success: false,
      error: 'Course CRUD disabled',
      message: 'Courses are static and cannot be deleted from admin anymore',
    }, { status: 410 });
  } catch (error) {
    console.error('Course CRUD disabled:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Course CRUD disabled',
        message: 'Courses are static and cannot be deleted from admin anymore',
      },
      { status: 410 }
    );
  }
}
