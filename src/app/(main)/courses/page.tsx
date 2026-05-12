import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button } from '@/components/ui';
import { CoursesGrid } from '@/components/sections';
import { getPublishedCourses, getComingSoonCourses } from '@/lib/courses';
import { ROUTES } from '@/constants';

export const metadata = {
  title: 'Courses - SSSAM Academy',
  description: 'Browse all our courses in web development, data science, mobile development, and more.',
};

export default async function CoursesPage() {
  // Fetch courses dynamically with fallback
  const { courses: publishedCourses } = await getPublishedCourses();
  const { courses: comingSoonCourses } = await getComingSoonCourses();

  return (
    <>
      <Header />

      <Container className="py-12">
        <Heading level={1} className="mb-4">
          All Courses
        </Heading>
        <Text size="lg" color="muted">
          Choose from our complete catalog of professional courses
        </Text>
      </Container>

      {/* Published Courses */}
      {publishedCourses.length > 0 && (
        <CoursesGrid
          courses={publishedCourses}
          title="Available Now"
          description="Enroll in these courses and start learning immediately"
        />
      )}

      {/* Coming Soon Courses */}
      {comingSoonCourses.length > 0 && (
        <CoursesGrid
          courses={comingSoonCourses}
          title="Coming Soon"
          description="These exciting courses are in development. Notify me when available."
        />
      )}

      <Footer />
    </>
  );
}
