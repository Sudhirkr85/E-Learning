'use client';

import { Container, Heading, Text, Card } from '@/components/ui';
import { useUser } from '@clerk/nextjs';
import { useUserSync } from '@/hooks/use-user-sync';

export default function DashboardPage() {
  const { user } = useUser();
  useUserSync();

  return (
    <Container className="py-8">
      <Heading level={1} className="mb-2">
        Dashboard
      </Heading>
      <Text color="muted" className="mb-8">
        Welcome back, {user?.firstName || 'Student'}! Here's your learning overview.
      </Text>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-white">
          <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
          <Text size="sm" color="muted">
            Courses Enrolled
          </Text>
        </Card>
        <Card className="p-6 bg-white">
          <div className="text-3xl font-bold text-green-600 mb-2">45%</div>
          <Text size="sm" color="muted">
            Average Progress
          </Text>
        </Card>
        <Card className="p-6 bg-white">
          <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
          <Text size="sm" color="muted">
            Hours Learned
          </Text>
        </Card>
        <Card className="p-6 bg-white">
          <div className="text-3xl font-bold text-orange-600 mb-2">1</div>
          <Text size="sm" color="muted">
            Certificate Earned
          </Text>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-white">
        <Heading level={3} className="mb-4">
          Recent Activity
        </Heading>
        <div className="space-y-3">
          {[
            { course: 'Full Stack Development', action: 'Completed Lesson 5', date: 'Today' },
            { course: 'React Patterns', action: 'Started Course', date: 'Yesterday' },
            {
              course: 'Data Science with Python',
              action: 'Completed Quiz',
              date: '2 days ago',
            },
          ].map((item, i) => (
            <div key={i} className="pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  <Text className="font-medium">{item.course}</Text>
                  <Text size="sm" color="muted">
                    {item.action}
                  </Text>
                </div>
                <Text size="sm" color="muted">
                  {item.date}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
}
