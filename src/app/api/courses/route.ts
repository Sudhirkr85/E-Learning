import { NextResponse } from 'next/server';
import { CourseModel } from '@/lib/models/course';
import { courses } from '@/data/courses';
import { Course } from '@/types';

/**
 * GET /api/courses
 * Fetch all courses with MongoDB fallback to static data
 */
export async function GET() {
  try {
    // Try to fetch from MongoDB
    const dbCourses = await CourseModel.findAll();
    
    // If courses exist in DB, return them
    if (dbCourses.length > 0) {
      return NextResponse.json({
        success: true,
        courses: dbCourses,
        fallback: false,
        message: 'Courses fetched from database',
      });
    }
    
    // Fallback to static data
    return NextResponse.json({
      success: true,
      courses: courses,
      fallback: true,
      message: 'Using static course data as fallback',
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    
    // If MongoDB fails, fallback to static data
    return NextResponse.json({
      success: true,
      courses: courses,
      fallback: true,
      message: 'Database error, using static course data as fallback',
    });
  }
}
