import type { Course } from '@/types';

export const getCourseBenefitLabel = (course: Pick<Course, 'title' | 'category'>): string => {
  const text = `${course.title} ${course.category}`.toLowerCase();

  if (text.includes('cyber')) {
    return 'Placement Support';
  }

  if (text.includes('data science') || text.includes('data analyst') || text.includes('analytics')) {
    return 'Practical Training';
  }

  if (text.includes('marketing')) {
    return 'Beginner Friendly';
  }

  if (text.includes('web development') || text.includes('full stack') || text.includes('ai')) {
    return 'Live Projects';
  }

  return 'Industry-Aligned Curriculum';
};