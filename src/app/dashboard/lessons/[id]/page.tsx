import { Container, Heading, Text, Card, Button, Divider } from '@/components/ui';
import { getCourseById } from '@/data/courses';
import { notFound } from 'next/navigation';

interface LessonPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: LessonPageProps) {
  const course = getCourseById(params.id);
  return {
    title: `${course?.title || 'Lesson'} - SSSAM Academy`,
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const course = getCourseById(params.id);

  if (!course) {
    notFound();
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
