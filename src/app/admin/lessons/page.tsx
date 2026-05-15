'use client';

import { useEffect, useState } from 'react';
import { LessonLink } from '@/types';
import Link from 'next/link';
import { courses } from '@/data/courses';

export default function LessonsManagement() {
  const [lessons, setLessons] = useState<LessonLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch('/api/admin/lessons');
      const data = await response.json();
      
      if (data.success) {
        setLessons(data.lessons || []);
      } else {
        setError('Failed to fetch lesson links');
      }
    } catch (error) {
      setError('An error occurred while fetching lesson links');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson link?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/lessons/${lessonId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setLessons(lessons.filter(lesson => lesson.id !== lessonId));
      } else {
        setError('Failed to delete lesson link');
      }
    } catch (error) {
      setError('An error occurred while deleting lesson link');
    }
  };

  const toggleLessonStatus = async (lesson: LessonLink) => {
    try {
      const response = await fetch(`/api/admin/lessons/${lesson.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !lesson.isActive }),
      });

      const data = await response.json();

      if (data.success) {
        setLessons(lessons.map(l => 
          l.id === lesson.id ? { ...l, isActive: !l.isActive } : l
        ));
      } else {
        setError('Failed to update lesson status');
      }
    } catch (error) {
      setError('An error occurred while updating lesson status');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return '📺';
      case 'google_meet':
        return '📹';
      default:
        return '🔗';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'youtube':
        return 'YouTube';
      case 'google_meet':
        return 'Google Meet';
      default:
        return 'Other';
    }
  };

  const getCourseLabel = (courseId: string) => {
    const course = courses.find((item) => item.id === courseId || item.slug === courseId);
    return course ? course.title : courseId;
  };

  if (loading) {
    return (
      <div className="py-12 container mx-auto px-4">
        <div className="animate-pulse h-8 bg-[rgba(255,255,255,0.06)] rounded w-1/4 mb-6" />
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Lesson Links Management</h1>
          <p className="text-sm text-[rgba(255,255,255,0.7)]">Manage YouTube videos and Google Meet links for courses</p>
          <p className="mt-1 text-xs text-[rgba(255,255,255,0.5)]">Live class schedules are managed in Admin &gt; Courses &gt; Manage Sessions.</p>
        </div>
        <Link
          href="/admin/lessons/new"
          className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition whitespace-nowrap"
        >
          + New Link
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-[rgba(236,72,153,0.1)] border border-[rgba(236,72,153,0.3)]">
          <div className="flex gap-3">
            <div className="text-[var(--accent-tertiary)] flex-shrink-0">⚠</div>
            <div>
              <h3 className="text-sm font-medium text-[rgba(236,72,153,0.9)]">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Links</div>
          <div className="text-3xl font-bold mt-2">{lessons.length}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Active</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-emerald)]">{lessons.filter(l => l.isActive).length}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">YouTube / Meet</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-primary)]">{lessons.filter(l => ['youtube', 'google_meet'].includes(l.type)).length}</div>
        </div>
      </div>

      {/* Lessons Table */}
      <div className="p-6 rounded-lg glass-strong overflow-hidden">
        {lessons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">URL</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="hover:bg-[rgba(255,255,255,0.01)] transition">
                    <td className="px-4 py-3">
                      <div className="font-medium">{lesson.title}</div>
                      {lesson.description && (
                        <div className="text-xs text-[rgba(255,255,255,0.6)] mt-1">{lesson.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span>{getTypeIcon(lesson.type)}</span>
                        <span>{getTypeLabel(lesson.type)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="font-medium text-white">{getCourseLabel(lesson.courseId)}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.5)]">Course key: {lesson.courseId}</div>
                      {lesson.lessonId && (
                        <div className="text-xs text-[rgba(255,255,255,0.5)]">Lesson: {lesson.lessonId}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <a 
                        href={lesson.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--accent-primary)] hover:underline truncate block max-w-xs"
                        title={lesson.url}
                      >
                        {new URL(lesson.url).hostname}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lesson.isActive 
                          ? 'bg-[rgba(16,185,129,0.12)] text-[var(--accent-emerald)]'
                          : 'bg-[rgba(236,72,153,0.12)] text-[var(--accent-tertiary)]'
                      }`}>
                        {lesson.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleLessonStatus(lesson)}
                          className="text-xs text-[var(--accent-secondary)] hover:opacity-80 transition"
                          title={lesson.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {lesson.isActive ? '⊖' : '⊕'}
                        </button>
                        <Link
                          href={`/admin/lessons/${lesson.id}/edit`}
                          className="text-[var(--accent-primary)] hover:underline text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(lesson.id)}
                          className="text-[var(--accent-tertiary)] hover:opacity-80 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-[rgba(255,255,255,0.6)] mb-4">No lesson links found</p>
            <Link href="/admin/lessons/new" className="text-[var(--accent-primary)] hover:underline">
              Create your first lesson link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
