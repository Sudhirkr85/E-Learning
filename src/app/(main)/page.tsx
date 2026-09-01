import { Header, Footer } from '@/components/layout';
import { CoursesGrid, FAQSection, ContactSection, TestimonialsSection } from '@/components/sections';
import { getPublishedCourses } from '@/lib/courses';
import { faqs } from '@/data/faq';
import { TESTIMONIALS } from '@/constants';

export const metadata = {
  title: 'SSSAM Academy — AI-Driven IT Training Institute in Gurugram',
  description: 'SSSAM Academy offers AI-first, placement-oriented IT training in Gurugram. Live practical classes, real projects, and career support for full stack, data science, cyber security and digital marketing learners.',
};

export const revalidate = 86400; // 24-Hour ISR Cache

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
