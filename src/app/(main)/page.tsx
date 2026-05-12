import { Header, Footer } from '@/components/layout';
import { HeroSection, CoursesGrid, TrainersSection, FAQSection, ContactSection, TestimonialsSection } from '@/components/sections';
import { getFeaturedCourse, getComingSoonCourses } from '@/lib/courses';
import { trainers } from '@/data/trainers';
import { faqs } from '@/data/faq';
import { TESTIMONIALS } from '@/constants';

export const metadata = {
  title: 'SSSAM Academy - Learn Modern Skills',
  description: 'Master in-demand skills with expert instructors. Join thousands of students learning web development, data science, and more.',
};

export default async function Home() {
  // Fetch courses dynamically with fallback
  const { course: featuredCourse } = await getFeaturedCourse();
  const { courses: comingSoonCourses } = await getComingSoonCourses();

  return (
    <>
      <Header />

      {/* Hero Section */}
      {featuredCourse && <HeroSection course={featuredCourse} />}

      {/* Featured Courses Grid */}
      {comingSoonCourses.length > 0 && (
        <CoursesGrid
          courses={comingSoonCourses}
          title="Explore Our Courses"
          description="Choose from our carefully curated selection of professional courses"
        />
      )}

      {/* Trainers Section */}
      <TrainersSection trainers={trainers} />

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
