'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container, Heading, Text, Button } from '@/components/ui';
import { getCourseById } from '@/data/courses';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const course = getCourseById(id);

  useEffect(() => {
    if (course?.slug) {
      router.replace(`/dashboard/courses/${course.slug}`);
    }
  }, [course?.slug, router]);

  if (!course) {
    return (
      <Container>
        <div className="py-12 text-center">
          <Heading className="mb-4">Course Not Found</Heading>
          <Text className="text-slate-300 mb-6">This course details link is no longer available.</Text>
          <Link href="/dashboard/courses">
            <Button>Back to My Courses</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12 text-center">
        <Text className="text-slate-300">Redirecting to course details...</Text>
      </div>
    </Container>
  );
}
