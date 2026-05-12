import { NextRequest, NextResponse } from 'next/server';
import { CourseModel } from '@/lib/models/course';
import { verifyAdminSession } from '@/lib/admin-auth';

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

    const course = await CourseModel.findById(courseId);

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
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await params;
    const body = await request.json();

    // Find existing course
    const existingCourse = await CourseModel.findById(courseId);
    if (!existingCourse) {
      return NextResponse.json(
        {
          success: false,
          error: 'Course not found',
          message: 'No course found with the provided ID',
        },
        { status: 404 }
      );
    }

    // If slug is being updated, check for duplicates
    if (body.slug && body.slug !== existingCourse.slug) {
      const duplicateSlug = await CourseModel.findBySlug(body.slug);
      if (duplicateSlug) {
        return NextResponse.json(
          {
            success: false,
            error: 'Slug already exists',
            message: 'Another course with this slug already exists',
          },
          { status: 409 }
        );
      }
    }

    // Update course
    const updatedCourse = await CourseModel.updateById(courseId, body);

    if (!updatedCourse) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update course',
          message: 'An error occurred while updating the course',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      course: updatedCourse,
      message: 'Course updated successfully',
    });
  } catch (error) {
    console.error('Error updating course:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update course',
        message: 'An error occurred while updating the course',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/courses/[courseId]
 * Delete a course
 */
export async function DELETE(request: Request, { params }: CourseIdParams) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { courseId } = await params;

    // Check if course exists
    const course = await CourseModel.findById(courseId);
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

    // Delete course
    const deleted = await CourseModel.deleteById(courseId);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete course',
          message: 'An error occurred while deleting the course',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting course:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete course',
        message: 'An error occurred while deleting the course',
      },
      { status: 500 }
    );
  }
}
