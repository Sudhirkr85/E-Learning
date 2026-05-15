'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LessonLink } from '@/types';
import Link from 'next/link';
import { courses } from '@/data/courses';

export default function NewLessonLink() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<LessonLink>>({
    courseId: courses[0]?.id || '',
    lessonId: '',
    title: '',
    type: 'youtube',
    url: '',
    description: '',
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/lessons');
      } else {
        setError(data.error || 'Failed to create lesson link');
      }
    } catch (error) {
      setError('An error occurred while creating the lesson link');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateUrl = (url: string, type: string): boolean => {
    if (!url) return false;
    
    try {
      new URL(url);
      
      if (type === 'youtube') {
        return url.includes('youtube.com') || url.includes('youtu.be');
      }
      
      if (type === 'google_meet') {
        return url.includes('meet.google.com');
      }
      
      return true;
    } catch {
      return false;
    }
  };

  const getUrlPlaceholder = (type: string) => {
    switch (type) {
      case 'youtube':
        return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      case 'google_meet':
        return 'https://meet.google.com/xxx-xxxx-xxx';
      default:
        return 'https://example.com/video';
    }
  };

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Create New Lesson Link</h1>
        <p className="text-sm text-[rgba(255,255,255,0.7)]">Add a new YouTube video or Google Meet link for your courses</p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Introduction to React.js"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Link Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
              >
                <option value="youtube" className="bg-slate-900">YouTube Video</option>
                <option value="google_meet" className="bg-slate-900">Google Meet</option>
                <option value="other" className="bg-slate-900">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="courseId" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Course *
              </label>
              <select
                id="courseId"
                name="courseId"
                required
                value={formData.courseId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              >
                <option value="" className="bg-slate-900">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id} className="bg-slate-900">
                    {course.title}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">Choose from the six static courses in src/data/courses.ts</p>
            </div>

            <div>
              <label htmlFor="lessonId" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Lesson ID
              </label>
              <input
                type="text"
                id="lessonId"
                name="lessonId"
                placeholder="1"
                value={formData.lessonId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
              <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">Optional: Specific lesson ID within the course</p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="url" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                URL *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                required
                placeholder={getUrlPlaceholder(formData.type || 'youtube')}
                value={formData.url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
              {formData.type === 'youtube' && (
                <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">
                  YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
                </p>
              )}
              {formData.type === 'google_meet' && (
                <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">
                  Google Meet URL (e.g., https://meet.google.com/xxx-xxxx-xxx)
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Brief description of the lesson content"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="w-4 h-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded cursor-pointer accent-[var(--accent-primary)]"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-[rgba(255,255,255,0.85)] cursor-pointer">
                Active Link
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/lessons"
            className="px-4 py-2 rounded bg-[rgba(255,255,255,0.03)] text-white hover:bg-[rgba(255,255,255,0.05)] transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !validateUrl(formData.url || '', formData.type || 'youtube')}
            className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Lesson Link'}
          </button>
        </div>
      </form>
    </div>
  );
}
