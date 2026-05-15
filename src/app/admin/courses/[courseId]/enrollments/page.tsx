'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Enrollment {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  enrolledAt: string;
  amount: number;
  orderId: string;
  paymentStatus?: string;
}

export default function ViewEnrollmentsPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseInfo, setCourseInfo] = useState<{ title: string; students: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, [courseId]);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch(`/api/admin/course-enrollments?courseId=${courseId}`);
      const data = await response.json();

      if (data.success) {
        setEnrollments(data.enrollments || []);
        setCourseInfo(data.course);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.studentPhone.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="py-12 container mx-auto px-4">
        <div className="animate-pulse h-8 bg-[rgba(255,255,255,0.06)] rounded w-1/4 mb-6" />
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Enrollment Management</h1>
        {courseInfo && (
          <p className="text-sm text-[rgba(255,255,255,0.7)]">
            <span className="font-semibold">{courseInfo.title}</span> • 
            <span className="ml-2 text-[var(--accent-primary)]">{courseInfo.students} students enrolled</span>
          </p>
        )}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Enrolled</div>
          <div className="text-3xl font-bold mt-2">{enrollments.length}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Revenue</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-emerald)]">₹{enrollments.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN')}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Average Price</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-primary)]">₹{enrollments.length > 0 ? Math.round(enrollments.reduce((sum, e) => sum + e.amount, 0) / enrollments.length) : 0}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-lg glass-strong mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
        />
      </div>

      {/* Enrollments Table */}
      <div className="p-4 rounded-lg glass-strong overflow-hidden">
        {filteredEnrollments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[rgba(255,255,255,0.6)]">
              {enrollments.length === 0 ? 'No students enrolled yet' : 'No students found matching your search'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Enrolled</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Order ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                {filteredEnrollments.map((enrollment, index) => (
                  <tr key={index} className="hover:bg-[rgba(255,255,255,0.01)] transition">
                    <td className="px-4 py-3">
                      <span className="font-medium">{enrollment.studentName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${enrollment.studentEmail}`} className="text-[var(--accent-primary)] hover:underline text-sm">
                        {enrollment.studentEmail}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${enrollment.studentPhone}`} className="text-[var(--accent-primary)] hover:underline text-sm">
                        {enrollment.studentPhone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-[var(--accent-emerald)]">₹{enrollment.amount}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                        {enrollment.paymentStatus || 'completed'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[rgba(255,255,255,0.75)]">
                      {new Date(enrollment.enrolledAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <code className="bg-[rgba(255,255,255,0.04)] px-2 py-1 rounded text-[rgba(255,255,255,0.8)]">{enrollment.orderId}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
