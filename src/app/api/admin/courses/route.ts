import { NextRequest, NextResponse } from 'next/server';
import { CourseModel } from '@/lib/models/course';
import { Course } from '@/types';
import { verifyAdminSession } from '@/lib/admin-auth';

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

    const courses = await CourseModel.findAll();

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
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'title, slug, and description are required',
        },
        { status: 400 }
      );
    }

    // Check for duplicate slug
    const existingCourse = await CourseModel.findBySlug(body.slug);
    if (existingCourse) {
      return NextResponse.json(
        {
          success: false,
          error: 'Slug already exists',
          message: 'A course with this slug already exists',
        },
        { status: 409 }
      );
    }

    // Create course
    const newCourse = await CourseModel.create({
      ...body,
      status: body.status || 'draft',
      featured: body.featured || false,
    });

    return NextResponse.json(
      {
        success: true,
        course: newCourse,
        message: 'Course created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating course:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create course',
        message: 'An error occurred while creating the course',
      },
      { status: 500 }
    );
  }
}
