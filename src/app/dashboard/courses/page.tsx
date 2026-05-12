import Image from 'next/image';
import Link from 'next/link';
import { Container, Heading, Text, Card, Button } from '@/components/ui';
import { courses } from '@/data/courses';

export const metadata = {
  title: 'My Courses - SSSAM Academy',
  description: 'View all your enrolled courses',
};

export default function MyCoursesPage() {
  // Mock enrolled courses
  const enrolledCourses = courses.slice(0, 3);

  return (
    <Container className="py-8">
      <Heading level={1} className="mb-2">
        My Courses
      </Heading>
      <Text color="muted" className="mb-8">
        Continue learning and track your progress
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map(course => (
          <Link key={course.id} href={`/dashboard/lessons/${course.id}`}>
            <Card interactive className="overflow-hidden h-full flex flex-col">
              {/* Image */}
              <div className="relative w-full h-40 bg-gray-200">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <Text size="sm" color="muted">
                      Progress
                    </Text>
                    <Text size="sm" className="font-semibold text-blue-600">
                      45%
                    </Text>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="text-sm text-gray-600 mb-4">
                  <span>📚 {course.lessons} lessons</span>
                  <span className="mx-2">•</span>
                  <span>⏱️ {course.duration}</span>
                </div>

                <Button variant="primary" size="sm" className="w-full mt-auto">
                  Continue Learning
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {enrolledCourses.length === 0 && (
        <Card className="p-12 text-center bg-white">
          <Text size="lg" color="muted">
            You haven't enrolled in any courses yet.
          </Text>
          <Button variant="primary" href="/courses" className="mt-6">
            Explore Courses
          </Button>
        </Card>
      )}
    </Container>
  );
}
