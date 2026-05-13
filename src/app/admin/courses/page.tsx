'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Course } from '@/types';
import { Container, Heading, Text, Button, Card } from '@/components/ui';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="py-12">
          <Text className="text-slate-300">Loading courses...</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12">
        <Heading className="mb-8">Courses Management</Heading>

        <div className="grid grid-cols-1 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{course.shortDescription}</p>
                  <div className="flex gap-2 mb-4">
                    <span className="text-xs bg-slate-700 px-3 py-1 rounded text-slate-200">
                      {course.students || 0} students
                    </span>
                    <span className={`text-xs px-3 py-1 rounded ${
                      course.status === 'published' 
                        ? 'bg-green-900 text-green-200' 
                        : 'bg-yellow-900 text-yellow-200'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/admin/courses/${course.id}/sessions`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm whitespace-nowrap transition"
                  >
                    Manage Sessions
                  </Link>
                  <Link
                    href={`/admin/courses/${course.id}/enrollments`}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm whitespace-nowrap transition"
                  >
                    View Enrollments
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <Card className="p-12 text-center">
            <Text className="text-slate-400">No courses found</Text>
          </Card>
        )}
      </div>
    </Container>
  );
}
