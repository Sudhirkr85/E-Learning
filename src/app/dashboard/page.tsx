'use client';

import { useState, useEffect } from 'react';
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
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[rgba(255,255,255,0.7)]">
          Welcome back, {user?.firstName || 'Student'}! Here's your learning overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-6 rounded-lg glass-strong">
          <div className="text-4xl font-bold text-[var(--accent-primary)] mb-2">{enrolledCount}</div>
          <p className="text-sm text-[rgba(255,255,255,0.65)]">Courses Enrolled</p>
        </div>

        <div className="p-6 rounded-lg glass-strong">
          <div className="text-4xl font-bold text-[var(--accent-secondary)] mb-2">—</div>
          <p className="text-sm text-[rgba(255,255,255,0.65)]">Average Progress</p>
        </div>

        <div className="p-6 rounded-lg glass-strong">
          <div className="text-4xl font-bold text-[var(--accent-emerald)] mb-2">—</div>
          <p className="text-sm text-[rgba(255,255,255,0.65)]">Hours Learned</p>
        </div>

        <div className="p-6 rounded-lg glass-strong">
          <div className="text-4xl font-bold text-[var(--accent-tertiary)] mb-2">—</div>
          <p className="text-sm text-[rgba(255,255,255,0.65)]">Certificates</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-lg glass-strong">
        <h2 className="text-xl font-semibold mb-4">Recent Enrollments</h2>
        
        {isLoading ? (
          <div className="animate-pulse py-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-[rgba(255,255,255,0.06)] rounded w-full" />
            ))}
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[rgba(255,255,255,0.6)]">No recent activity. Enroll in a course to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((purchase, i) => (
              <div key={i} className="pb-3 border-b border-[rgba(255,255,255,0.05)] last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{purchase.courseTitle}</p>
                    <p className="text-sm text-[rgba(255,255,255,0.6)]">
                      Enrolled on {new Date(purchase.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--accent-emerald)] whitespace-nowrap">
                    ₹{purchase.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
