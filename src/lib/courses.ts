import { Course } from '@/types';
import {
  courses as staticCourses,
  getFeaturedCourse as getStaticFeaturedCourse,
  getCourseBySlug as getStaticCourseBySlug,
} from '@/data/courses';

// Base URL for API calls
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URLs
    return '/api';
  } else {
    // Server-side: use absolute URL with localhost
    return 'http://localhost:3000/api';
  }
};

/**
 * Fetch all courses from API with automatic fallback to static data
 * - Tries to fetch from MongoDB first
 * - Falls back to static courses if DB is empty or fails
 * - No-store cache policy ensures fresh data when admin updates courses
 */
export async function getAllCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/courses`, {
      cache: 'no-store', // Ensure fresh data for admin sync
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`API returned ${response.status}, falling back to static data`);
      return { courses: staticCourses, fallback: true };
    }

    const result = await response.json();

    if (!result.success) {
      console.warn('API returned unsuccessful response:', result.message);
      return { courses: staticCourses, fallback: true };
    }

    // If API returned no courses, use static data
    if (!result.courses || result.courses.length === 0) {
      return { courses: staticCourses, fallback: true };
    }

    return {
      courses: result.courses || [],
      fallback: result.fallback || false,
    };
  } catch (error) {
    console.error('Error fetching all courses:', error);
    return { courses: staticCourses, fallback: true };
  }
}

/**
 * Fetch featured course from API with automatic fallback
 * - Returns the course marked as featured from MongoDB
 * - Falls back to static featured course if not found in DB
 */
export async function getFeaturedCourse(): Promise<{ course: Course | null; fallback: boolean }> {
  const staticFeaturedCourse = getStaticFeaturedCourse();

  try {
    const response = await fetch(`${getApiBaseUrl()}/courses/featured`, {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Featured course API returned ${response.status}, using fallback`);
      return { course: staticFeaturedCourse || null, fallback: true };
    }

    const result = await response.json();

    if (!result.success) {
      console.warn('Featured course API returned unsuccessful:', result.message);
      return { course: staticFeaturedCourse || null, fallback: true };
    }

    // If API returned a course, use it; otherwise use static
    if (!result.course) {
      return { course: staticFeaturedCourse || null, fallback: true };
    }

    return {
      course: result.course,
      fallback: result.fallback || false,
    };
  } catch (error) {
    console.error('Error fetching featured course:', error);
    return { course: staticFeaturedCourse || null, fallback: true };
  }
}

/**
 * Fetch course by slug from API with automatic fallback
 * - Fetches specific course from MongoDB by slug
 * - Falls back to static course if not found in DB
 */
export async function getCourseBySlug(slug: string): Promise<{ course: Course | null; fallback: boolean }> {
  const staticCourse = getStaticCourseBySlug(slug);

  try {
    const response = await fetch(`${getApiBaseUrl()}/courses/${slug}`, {
      cache: 'no-store', // Ensure fresh data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn(`Course ${slug} API returned ${response.status}, using fallback`);
      return { course: staticCourse || null, fallback: true };
    }

    const result = await response.json();

    if (!result.success) {
      console.warn(`Course ${slug} API returned unsuccessful:`, result.message);
      return { course: staticCourse || null, fallback: true };
    }

    // If API returned a course, use it; otherwise use static
    if (!result.course) {
      return { course: staticCourse || null, fallback: true };
    }

    return {
      course: result.course,
      fallback: result.fallback || false,
    };
  } catch (error) {
    console.error(`Error fetching course ${slug}:`, error);
    return { course: staticCourse || null, fallback: true };
  }
}

/**
 * Fetch all published courses
 * - Filters courses with status === 'published'
 */
export async function getPublishedCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  const { courses, fallback } = await getAllCourses();
  const publishedCourses = courses.filter(course => course.status === 'published');
  return { courses: publishedCourses, fallback };
}

/**
 * Fetch all coming-soon courses
 * - Filters courses with status === 'coming-soon'
 */
export async function getComingSoonCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  const { courses, fallback } = await getAllCourses();
  const comingSoonCourses = courses.filter(course => course.status === 'coming-soon');
  return { courses: comingSoonCourses, fallback };
}

/**
 * Fetch all draft courses
 * - Filters courses with status === 'draft'
 */
export async function getDraftCourses(): Promise<{ courses: Course[]; fallback: boolean }> {
  const { courses, fallback } = await getAllCourses();
  const draftCourses = courses.filter(course => course.status === 'draft');
  return { courses: draftCourses, fallback };
}
