'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Heading, Text, Card, Button } from '@/components/ui';
import { courses } from '@/data/courses';

export default function MyCoursesPage() {
  const [purchasedCourses, setPurchasedCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      // In a real app, studentId would come from authentication
      const studentId = 'temp_student_id';
      const response = await fetch(`/api/student/purchases?studentId=${studentId}`);
      
      if (response.ok) {
        const data = await response.json();
        // Get course details for each purchase
        const coursesWithDetails = data.purchases.map((purchase: any) => {
          const course = courses.find(c => c.id === purchase.courseId);
          return {
            ...purchase,
            course,
          };
        }).filter((item: any) => item.course); // Filter out courses that don't exist
        
        setPurchasedCourses(coursesWithDetails);
      }
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-8">
        <Heading level={1} className="mb-2">
          My Courses
        </Heading>
        <Text color="muted" className="mb-8">
          Loading your courses...
        </Text>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Heading level={1} className="mb-2">
        My Courses
      </Heading>
      <Text color="muted" className="mb-8">
        Continue learning and track your progress
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedCourses.map(purchase => (
          <Link key={purchase.orderId} href={`/dashboard/lessons/${purchase.courseId}`}>
            <Card interactive className="overflow-hidden h-full flex flex-col">
              {/* Image */}
              <div className="relative w-full h-40 bg-gray-200">
                <Image
                  src={purchase.course.thumbnail}
                  alt={purchase.course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {purchase.course.title}
                </h3>

                {/* Purchase Info */}
                <div className="mb-4">
                  <Text size="sm" color="muted">
                    Purchased on {new Date(purchase.createdAt).toLocaleDateString()}
                  </Text>
                  <Text size="sm" className="font-semibold text-green-600">
                    ₹{purchase.amount.toLocaleString()}
                  </Text>
                </div>

                {/* Stats */}
                <div className="text-sm text-gray-600 mb-4">
                  <span>📚 {purchase.course.lessons} lessons</span>
                  <span className="mx-2">•</span>
                  <span>⏱️ {purchase.course.duration}</span>
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
      {purchasedCourses.length === 0 && (
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
