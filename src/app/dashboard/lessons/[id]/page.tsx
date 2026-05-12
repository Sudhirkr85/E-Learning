'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Heading, Text, Card, Button, Divider } from '@/components/ui';
import { getCourseById } from '@/data/courses';
import { checkCourseAccess } from '@/lib/course-access';

interface LessonPageProps {
  params: {
    id: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const course = getCourseById(params.id);

  useEffect(() => {
    verifyAccess();
  }, [params.id]);

  const verifyAccess = async () => {
    try {
      // In a real app, studentId would come from authentication
      const studentId = 'temp_student_id';
      const access = await checkCourseAccess(params.id, studentId);
      setHasAccess(access);
    } catch (error) {
      console.error('Error verifying access:', error);
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!course) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <Heading level={2}>Course Not Found</Heading>
          <Text color="muted" className="mb-4">
            The course you're looking for doesn't exist.
          </Text>
          <Button onClick={() => router.push('/dashboard/courses')}>
            Back to My Courses
          </Button>
        </div>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <Text>Verifying access...</Text>
        </div>
      </Container>
    );
  }

  if (!hasAccess) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <Heading level={2}>Access Restricted</Heading>
          <Text color="muted" className="mb-4">
            You need to purchase this course to access the content.
          </Text>
          <Button onClick={() => router.push('/checkout')}>
            Purchase Course
          </Button>
        </div>
      </Container>
    );
  }

  const currentLesson = course.curriculum[0];

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden mb-6 aspect-video">
            <iframe
              className="w-full h-full"
              src={currentLesson.videoUrl}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Lesson Info */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <Heading level={2} className="mb-2">
              {currentLesson.title}
            </Heading>
            <Text color="muted" className="mb-4">
              {currentLesson.description}
            </Text>
            <div className="flex gap-4 items-center">
              <span className="text-sm text-gray-600">⏱️ {currentLesson.duration} minutes</span>
              <Button variant="primary" size="sm">
                Mark as Complete
              </Button>
            </div>
          </div>

          {/* Resources */}
          <Card className="p-6 bg-white">
            <Heading level={3} className="mb-4">
              Resources
            </Heading>
            <div className="space-y-3">
              <a
                href="#"
                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                📄 Lesson Notes (PDF)
              </a>
              <a
                href="#"
                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                💻 Source Code & Assets
              </a>
              <a
                href="#"
                className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                📺 Recording (MP4)
              </a>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div>
          {/* Course Info */}
          <Card className="p-6 bg-white mb-6">
            <Heading level={3} className="mb-4">
              {course.title}
            </Heading>
            <div className="space-y-3 text-sm mb-4">
              <div>
                <Text color="muted">Instructor</Text>
                <Text className="font-semibold">{course.instructor}</Text>
              </div>
              <div>
                <Text color="muted">Progress</Text>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span className="font-semibold">45%</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Course
            </Button>
          </Card>

          {/* Lessons List */}
          <Card className="p-6 bg-white">
            <Heading level={3} className="mb-4">
              Lessons
            </Heading>
            <div className="space-y-2">
              {course.curriculum.map((lesson, index) => (
                <div key={lesson.id} className="p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                  <div className="flex items-start gap-2">
                    <span className="text-sm text-gray-500 flex-shrink-0 mt-1">
                      {index === 0 ? '▶️' : '○'}
                    </span>
                    <div className="min-w-0">
                      <Text size="sm" className={index === 0 ? 'font-semibold' : ''}>
                        {lesson.title}
                      </Text>
                      <Text size="sm" color="muted">
                        {lesson.duration}m
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Meeting Links */}
          <Card className="p-6 bg-white mt-6">
            <Heading level={3} className="mb-4">
              Meeting Links
            </Heading>
            <div className="space-y-2">
              <a
                href="#"
                className="block p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                📞 Live Q&A Session
              </a>
              <a
                href="#"
                className="block p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
              >
                👥 Community Forum
              </a>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
