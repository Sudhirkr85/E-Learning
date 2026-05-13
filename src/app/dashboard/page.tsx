'use client';

import { useState, useEffect } from 'react';
import { Container, Heading, Text, Card } from '@/components/ui';
import { useUser } from '@clerk/nextjs';
import { useUserSync } from '@/hooks/use-user-sync';

export default function DashboardPage() {
  const { user } = useUser();
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useUserSync();

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user?.id]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/api/student/purchases?studentId=${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setEnrolledCount(data.purchases?.length || 0);
        // Recent activity: show latest 3 purchases
        setRecentActivity(
          (data.purchases || [])
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3)
        );
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-8">
      <Heading level={1} className="mb-2 text-slate-50">
        Dashboard
      </Heading>
      <Text className="mb-8 text-slate-300">
        Welcome back, {user?.firstName || 'Student'}! Here's your learning overview.
      </Text>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border border-slate-800 bg-slate-900/80 p-6">
          <div className="text-3xl font-bold text-cyan-400 mb-2">{enrolledCount}</div>
          <Text size="sm" className="text-slate-400">
            Courses Enrolled
          </Text>
        </Card>
        <Card className="border border-slate-800 bg-slate-900/80 p-6">
          <div className="text-3xl font-bold text-slate-400 mb-2">—</div>
          <Text size="sm" className="text-slate-400">
            Average Progress
          </Text>
        </Card>
        <Card className="border border-slate-800 bg-slate-900/80 p-6">
          <div className="text-3xl font-bold text-slate-400 mb-2">—</div>
          <Text size="sm" className="text-slate-400">
            Hours Learned
          </Text>
        </Card>
        <Card className="border border-slate-800 bg-slate-900/80 p-6">
          <div className="text-3xl font-bold text-slate-400 mb-2">—</div>
          <Text size="sm" className="text-slate-400">
            Certificates Earned
          </Text>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border border-slate-800 bg-slate-900/80 p-6">
        <Heading level={3} className="mb-4 text-slate-50">
          Recent Activity
        </Heading>
        {isLoading ? (
          <Text className="text-slate-400">Loading activity...</Text>
        ) : recentActivity.length === 0 ? (
          <Text className="text-slate-400">No recent activity. Enroll in a course to get started!</Text>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((purchase, i) => (
              <div key={i} className="pb-3 border-b border-slate-800 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Text className="font-medium text-slate-100">{purchase.courseTitle}</Text>
                    <Text size="sm" className="text-slate-400">
                      Enrolled on {new Date(purchase.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                  <Text size="sm" className="text-emerald-400 font-semibold">
                    ₹{purchase.amount.toLocaleString()}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </Container>
  );
}
