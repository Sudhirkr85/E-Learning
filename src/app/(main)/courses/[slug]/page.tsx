import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button, Badge, Rating, Divider } from '@/components/ui';
import { CurriculumPreview } from '@/components/sections';
import { getCourseBySlug } from '@/lib/courses';
import { ROUTES } from '@/constants';

interface CourseDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata({ params }: CourseDetailsPageProps) {
  const { slug } = await params;
  const { course } = await getCourseBySlug(slug);

  if (!course) {
    return { title: 'Course Not Found' };
  }

  return {
    title: `${course.title} - SSSAM Academy`,
    description: course.description,
  };
}

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps) {
  const { slug } = await params;
  const { course } = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Content */}
            <div>
              <Badge variant="info" className="mb-4">
                {course.level}
              </Badge>

              <Heading level={1} className="mb-4">
                {course.title}
              </Heading>

              <Text size="lg" color="secondary" className="mb-6">
                {course.description}
              </Text>

              <Rating rating={course.rating} reviews={course.reviews} className="mb-6" />

              <div className="flex gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  href={ROUTES.CHECKOUT}
                  disabled={course.status === 'coming-soon'}
                >
                  {course.status === 'coming-soon' ? 'Coming Soon' : 'Enroll Now'}
                </Button>
                <Button variant="outline" size="lg">
                  Add to Wishlist
                </Button>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 bg-white rounded-lg p-4">
                <div>
                  <Text size="sm" color="muted">
                    Duration
                  </Text>
                  <Text className="font-semibold">{course.duration}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted">
                    Lessons
                  </Text>
                  <Text className="font-semibold">{course.lessons}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted">
                    Students
                  </Text>
                  <Text className="font-semibold">{course.students.toLocaleString()}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted">
                    Category
                  </Text>
                  <Text className="font-semibold">{course.category}</Text>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Instructor */}
      <section className="py-12 md:py-20 bg-white">
        <Container>
          <Heading level={2} className="mb-8">
            Your Instructor
          </Heading>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={course.instructorImage}
                alt={course.instructor}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <div>
              <Heading level={3} className="mb-2">
                {course.instructor}
              </Heading>
              <Text size="lg" color="secondary" className="mb-4">
                Expert instructor with years of industry experience
              </Text>
              <Text color="secondary">
                Learn directly from a professional who has successfully implemented these skills in real-world projects. Get insights, tips, and best practices that will accelerate your learning journey.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* Curriculum */}
      <CurriculumPreview lessons={course.curriculum} />

      <Divider />

      {/* Learning Outcomes */}
      <section className="py-12 md:py-20 bg-gray-50">
        <Container>
          <Heading level={2} className="mb-8">
            What You'll Learn
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Master the fundamentals and advanced concepts',
              'Build real-world projects from scratch',
              'Learn industry best practices and patterns',
              'Get personalized feedback and support',
              'Understand how to apply these skills professionally',
              'Join a community of like-minded learners',
            ].map((item, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <Text color="secondary">{item}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Divider />

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <Container>
          <div className="text-center">
            <Heading level={2} className="text-white mb-4">
              Ready to Get Started?
            </Heading>
            <Text size="lg" className="text-blue-50 mb-8">
              Join thousands of students learning this course
            </Text>
            <Button
              variant="primary"
              size="lg"
              href={ROUTES.CHECKOUT}
              disabled={course.status === 'coming-soon'}
            >
              {course.status === 'coming-soon' ? 'Coming Soon' : `Enroll for ₹${course.price.toLocaleString()}`}
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
