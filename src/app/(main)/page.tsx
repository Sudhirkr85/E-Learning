import { Header, Footer } from '@/components/layout';
import { CoursesGrid, FAQSection, ContactSection, TestimonialsSection } from '@/components/sections';
import { getPublishedCourses } from '@/lib/courses';
import { faqs } from '@/data/faq';
import { TESTIMONIALS } from '@/constants';

export const metadata = {
  title: 'SSSAM Academy - Learn Modern Skills',
  description: 'Master in-demand skills with expert instructors. Join thousands of students learning web development, data science, and more.',
};

export default async function Home() {
  // Fetch all courses dynamically with fallback
  const { courses: allCourses } = await getPublishedCourses();

  return (
    <>
      <Header />

      {/* All Courses Grid */}
      {allCourses.length > 0 && (
        <CoursesGrid
          courses={allCourses}
          title="Professional Courses"
          description="Choose from our carefully curated selection of professional courses"
        />
      )}

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={TESTIMONIALS} />

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </>
  );
}
