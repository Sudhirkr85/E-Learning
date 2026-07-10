import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button, Badge, Rating, Divider } from '@/components/ui';
import { CurriculumPreview } from '@/components/sections';
import { getCourseBySlug } from '@/lib/courses';
import { getCourseBenefitLabel } from '@/lib/course-highlights';
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
    alternates: {
      canonical: `https://sssamacademy.tech/courses/${slug}`,
    },
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

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://sssamacademy.tech/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Courses',
                  item: 'https://sssamacademy.tech/courses',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: course.title,
                  item: `https://sssamacademy.tech/courses/${course.slug}`,
                },
              ],
            },
            {
              '@type': 'Course',
              name: course.title,
              description: course.description,
              provider: {
                '@type': 'Organization',
                name: 'SSSAM Academy',
                url: 'https://sssamacademy.tech',
              },
              url: `https://sssamacademy.tech/courses/${course.slug}`,
            },
          ],
        })}
      </script>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-12 md:py-20 overflow-hidden">
        {/* Spider-web background */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.08) 25%, rgba(6, 182, 212, 0.08) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.08) 75%, rgba(6, 182, 212, 0.08) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.08) 25%, rgba(139, 92, 246, 0.08) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.08) 75%, rgba(139, 92, 246, 0.08) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }} />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Content */}
            <div>
              <Badge variant="info" className="mb-4 bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">
                {course.level}
              </Badge>

              <Heading level={1} className="mb-4 text-white">
                {course.title}
              </Heading>
              {course.slug === 'ai-full-stack-web-development-summer-2026' && (
                <Text size="lg" color="secondary" className="mb-4 text-slate-300">
                  Gurugram Live Batch • 30-Day Practical Training
                </Text>
              )}

              <Text size="lg" color="secondary" className="mb-6 text-slate-300">
                {course.description}
              </Text>

              <Rating rating={course.rating} reviews={course.reviews} className="mb-6" />

              <div className="flex gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  href={`${ROUTES.CHECKOUT}?course=${course.slug}`}
                  disabled={course.status === 'coming-soon'}
                >
                  {course.status === 'coming-soon' ? 'Coming Soon' : 'Enroll Now'}
                </Button>
                <Button variant="outline" size="lg">
                  Add to Wishlist
                </Button>
                <Button variant="ghost" size="lg" href="/#contact">
                  Book a Demo Class
                </Button>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-4 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div>
                  <Text size="sm" color="muted" className="text-slate-500">
                    Duration
                  </Text>
                  <Text className="font-semibold text-white">{course.duration}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted" className="text-slate-500">
                    Lessons
                  </Text>
                  <Text className="font-semibold text-white">{course.lessons}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted" className="text-slate-500">
                    Benefit
                  </Text>
                  <Text className="font-semibold text-white">{getCourseBenefitLabel(course)}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted" className="text-slate-500">
                    Category
                  </Text>
                  <Text className="font-semibold text-white">{course.category}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted" className="text-slate-500">
                    Fee
                  </Text>
                  <Text className="font-semibold text-white">₹{course.price.toLocaleString('en-IN')}</Text>
                </div>
                <div>
                  <Text size="sm" color="muted" className="text-slate-500">
                    Last Updated
                  </Text>
                  <Text className="font-semibold text-white">{new Date(course.updatedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}</Text>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-contain md:object-cover"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Instructor */}
      <section className="relative py-12 md:py-20 bg-slate-950 overflow-hidden">
        {/* Spider-web background */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.07) 25%, rgba(6, 182, 212, 0.07) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.07) 75%, rgba(6, 182, 212, 0.07) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.07) 25%, rgba(139, 92, 246, 0.07) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.07) 75%, rgba(139, 92, 246, 0.07) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }} />
        <Container className="relative z-10">
          <Heading level={2} className="mb-8 text-white">
            Your Instructor
          </Heading>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
              <Image
                src={course.instructorImage}
                alt={course.instructor}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>

            <div>
              <Heading level={3} className="mb-2 text-white">
                {course.instructor}
              </Heading>
              <Text size="lg" color="secondary" className="mb-4 text-slate-300">
                Expert instructor with years of industry experience
              </Text>
              <Text color="secondary" className="text-slate-400">
                Learn directly from a professional who has successfully implemented these skills in real-world projects. Get insights, tips, and best practices that will accelerate your learning journey.
              </Text>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* Curriculum */}
      <CurriculumPreview
        lessons={course.curriculum}
        title={course.curriculumTitle}
        subtitle={course.curriculumSubtitle}
      />

      <Divider />

      {/* Learning Outcomes */}
      <section className="relative py-12 md:py-20 bg-slate-900 overflow-hidden">
        {/* Spider-web background */}
        <div className="absolute inset-0 opacity-45" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.075) 25%, rgba(6, 182, 212, 0.075) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.075) 75%, rgba(6, 182, 212, 0.075) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.075) 25%, rgba(139, 92, 246, 0.075) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.075) 75%, rgba(139, 92, 246, 0.075) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }} />
        <Container className="relative z-10">
          <Heading level={2} className="mb-8 text-white">
            {course.learningTitle || "What You'll Learn"}
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(course.learningPoints || [
              'Master the fundamentals and advanced concepts',
              'Build real-world projects from scratch',
              'Learn industry best practices and patterns',
              'Get personalized feedback and support',
              'Understand how to apply these skills professionally',
              'Join a community of like-minded learners',
            ]).map((item, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-2xl flex-shrink-0 text-cyan-400">✓</span>
                <Text color="secondary" className="text-slate-300">{item}</Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Divider />

      {/* CTA Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 overflow-hidden">
        {/* Spider-web background */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.08) 25%, rgba(6, 182, 212, 0.08) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.08) 75%, rgba(6, 182, 212, 0.08) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.08) 25%, rgba(139, 92, 246, 0.08) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.08) 75%, rgba(139, 92, 246, 0.08) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }} />
        {/* Gradient overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 pointer-events-none" />
        <Container className="relative z-10">
          <div className="text-center">
            <Heading level={2} className="text-white mb-4">
              Ready to Get Started?
            </Heading>
            <Text size="lg" className="text-slate-300 mb-8">
              {course.ctaSupportText || 'Join thousands of students learning this course'}
            </Text>
            <Button
              variant="primary"
              size="lg"
              href={`${ROUTES.CHECKOUT}?course=${course.slug}`}
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

