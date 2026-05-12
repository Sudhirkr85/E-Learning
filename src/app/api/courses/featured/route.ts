import { NextResponse } from 'next/server';
import { CourseModel } from '@/lib/models/course';
import { getFeaturedCourse } from '@/data/courses';
import { Course } from '@/types';

/**
 * GET /api/courses/featured
 * Fetch featured course from MongoDB with static fallback
 */
export async function GET() {
  try {
    // Try to fetch featured course from MongoDB
    const featuredCourse = await CourseModel.findFeatured();
    
    if (featuredCourse) {
      return NextResponse.json({
        success: true,
        course: featuredCourse,
        fallback: false,
        message: 'Featured course fetched from database',
      });
    }
    
    // Fallback to static data
    const staticFeatured = getFeaturedCourse();
    return NextResponse.json({
      success: true,
      course: staticFeatured || null,
      fallback: true,
      message: staticFeatured ? 'Using static featured course as fallback' : 'No featured course found',
    });
  } catch (error) {
    console.error('Error fetching featured course:', error);
    
    // If MongoDB fails, fallback to static data
    const staticFeatured = getFeaturedCourse();
    return NextResponse.json({
      success: true,
      course: staticFeatured || null,
      fallback: true,
      message: 'Database error, using static featured course as fallback',
    });
  }
}
