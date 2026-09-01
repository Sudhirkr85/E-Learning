import { Course } from '@/types';
import {
  courses as staticCourses,
  getFeaturedCourse as getStaticFeaturedCourse,
  getCourseBySlug as getStaticCourseBySlug,
} from '@/data/courses';
import { CourseModel } from '@/lib/models/course';

/**
 * Fetch all courses with automatic fallback to static data
 * - Tries to fetch from MongoDB directly first
 * - Falls back to static courses if DB is empty, unconfigured, or throws error
 */
export async function getAllCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  try {
    const dbCourses = await CourseModel.findAll();
    if (dbCourses && dbCourses.length > 0) {
      return { courses: dbCourses, fallback: false };
    }
    return { courses: staticCourses, fallback: true };
  } catch (error) {
    return { courses: staticCourses, fallback: true };
  }
}

/**
 * Fetch featured course with automatic fallback
 * - Returns the course marked as featured from MongoDB
 * - Falls back to static featured course if not found in DB
 */
export async function getFeaturedCourse(): Promise<{ course: Course | null; fallback: boolean }> {
  const staticFeaturedCourse = getStaticFeaturedCourse();
  try {
    const dbCourse = await CourseModel.findFeatured();
    if (dbCourse) {
      return { course: dbCourse, fallback: false };
    }
    return { course: staticFeaturedCourse || null, fallback: true };
  } catch (error) {
    return { course: staticFeaturedCourse || null, fallback: true };
  }
}

/**
 * Fetch course by slug with automatic fallback
 * - Fetches specific course from MongoDB by slug
 * - Falls back to static course if not found in DB
 */
export async function getCourseBySlug(slug: string): Promise<{ course: Course | null; fallback: boolean }> {
  const staticCourse = getStaticCourseBySlug(slug);
  try {
    const dbCourse = await CourseModel.findBySlug(slug);
    if (dbCourse) {
      return { course: dbCourse, fallback: false };
    }
    return { course: staticCourse || null, fallback: true };
  } catch (error) {
    return { course: staticCourse || null, fallback: true };
  }
}

/**
 * Fetch all published courses
 * - Filters courses with status === 'published'
 */
export async function getPublishedCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  try {
    const dbCourses = await CourseModel.findPublished();
    if (dbCourses && dbCourses.length > 0) {
      return { courses: dbCourses, fallback: false };
    }
    const published = staticCourses.filter((c) => c.status === 'published');
    return { courses: published, fallback: true };
  } catch (error) {
    const published = staticCourses.filter((c) => c.status === 'published');
    return { courses: published, fallback: true };
  }
}

/**
 * Fetch all coming-soon courses
 * - Filters courses with status === 'coming-soon'
 */
export async function getComingSoonCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  try {
    const dbCourses = await CourseModel.findComingSoon();
    if (dbCourses && dbCourses.length > 0) {
      return { courses: dbCourses, fallback: false };
    }
    const comingSoon = staticCourses.filter((c) => c.status === 'coming-soon');
    return { courses: comingSoon, fallback: true };
  } catch (error) {
    const comingSoon = staticCourses.filter((c) => c.status === 'coming-soon');
    return { courses: comingSoon, fallback: true };
  }
}

/**
 * Fetch all draft courses
 * - Filters courses with status === 'draft'
 */
export async function getDraftCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  try {
    const { courses, fallback } = await getAllCourses();
    const draftCourses = courses.filter((course) => course.status === 'draft');
    return { courses: draftCourses, fallback };
  } catch (error) {
    const draftCourses = staticCourses.filter((course) => course.status === 'draft');
    return { courses: draftCourses, fallback: true };
  }
}
