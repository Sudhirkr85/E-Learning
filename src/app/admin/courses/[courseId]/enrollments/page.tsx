'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Container, Heading, Text, Card } from '@/components/ui';

interface Enrollment {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  enrolledAt: string;
  amount: number;
  orderId: string;
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
      <Container>
        <div className="py-12">
          <Text className="text-slate-300">Loading enrollments...</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12">
        <div className="mb-8">
          <Heading className="mb-2">Course Enrollments</Heading>
          {courseInfo && (
            <p className="text-slate-300">
              <span className="font-semibold">{courseInfo.title}</span> • 
              <span className="ml-2 text-green-400">{courseInfo.students} students enrolled</span>
            </p>
          )}
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </Card>

        {/* Enrollments Table */}
        <Card className="p-0 overflow-hidden">
          {filteredEnrollments.length === 0 ? (
            <div className="p-12 text-center">
              <Text className="text-slate-400">
                {enrollments.length === 0 ? 'No students enrolled yet' : 'No students found matching your search'}
              </Text>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-200 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-200 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-200 uppercase">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-200 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-200 uppercase">Enrolled Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-200 uppercase">Order ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.map((enrollment, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-700 hover:bg-slate-800 transition"
                    >
                      <td className="px-6 py-4">
                        <span className="font-medium text-white">{enrollment.studentName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`mailto:${enrollment.studentEmail}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {enrollment.studentEmail}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`tel:${enrollment.studentPhone}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {enrollment.studentPhone}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-400">₹{enrollment.amount}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(enrollment.enrolledAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <code className="bg-slate-700 px-2 py-1 rounded text-slate-200">{enrollment.orderId}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 text-center">
            <Text className="text-slate-400 mb-2">Total Enrolled</Text>
            <Heading className="text-3xl text-green-400">{enrollments.length}</Heading>
          </Card>
          <Card className="p-6 text-center">
            <Text className="text-slate-400 mb-2">Total Revenue</Text>
            <Heading className="text-3xl text-blue-400">
              ₹{enrollments.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN')}
            </Heading>
          </Card>
          <Card className="p-6 text-center">
            <Text className="text-slate-400 mb-2">Average Price</Text>
            <Heading className="text-3xl text-purple-400">
              ₹{enrollments.length > 0 
                ? Math.round(enrollments.reduce((sum, e) => sum + e.amount, 0) / enrollments.length)
                : 0}
            </Heading>
          </Card>
        </div>
      </div>
    </Container>
  );
}
