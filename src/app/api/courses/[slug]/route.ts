import { NextResponse } from 'next/server';
import { CourseModel } from '@/lib/models/course';
import { getCourseBySlug } from '@/data/courses';
import { Course } from '@/types';

interface CourseParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/courses/[slug]
 * Fetch course by slug from MongoDB with static fallback
 */
export async function GET(request: Request, { params }: CourseParams) {
  try {
    const { slug } = await params;

    // Try to fetch from MongoDB
    const dbCourse = await CourseModel.findBySlug(slug);

    if (dbCourse) {
      return NextResponse.json({
        success: true,
        course: dbCourse,
        fallback: false,
        message: 'Course fetched from database',
      });
    }

    // Fallback to static data
    const staticCourse = getCourseBySlug(slug);

    if (!staticCourse) {
      return NextResponse.json(
        {
          success: false,
          error: 'Course not found',
          fallback: true,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course: staticCourse,
      fallback: true,
      message: 'Using static course data as fallback',
    });
  } catch (error) {
    console.error('Error fetching course by slug:', error);

    // If MongoDB fails, fallback to static data
    const resolvedParams = await params;
    const staticCourse = getCourseBySlug(resolvedParams.slug);

    if (!staticCourse) {
      return NextResponse.json(
        {
          success: false,
          error: 'Course not found',
          fallback: true,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course: staticCourse,
      fallback: true,
      message: 'Database error, using static course data as fallback',
    });
  }
}
