'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LessonLink } from '@/types';
import Link from 'next/link';

export default function NewLessonLink() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<LessonLink>>({
    courseId: '',
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
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Lesson Link</h1>
        <p className="text-gray-600">Add a new YouTube video or Google Meet link for your courses</p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Link Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="youtube">YouTube Video</option>
                <option value="google_meet">Google Meet</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">
                Course ID *
              </label>
              <input
                type="text"
                id="courseId"
                name="courseId"
                required
                placeholder="1"
                value={formData.courseId}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">The ID of the course this link belongs to</p>
            </div>

            <div>
              <label htmlFor="lessonId" className="block text-sm font-medium text-gray-700">
                Lesson ID
              </label>
              <input
                type="text"
                id="lessonId"
                name="lessonId"
                placeholder="1"
                value={formData.lessonId}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">Optional: Specific lesson ID within the course</p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {formData.type === 'youtube' && (
                <p className="mt-1 text-sm text-gray-500">
                  YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
                </p>
              )}
              {formData.type === 'google_meet' && (
                <p className="mt-1 text-sm text-gray-500">
                  Google Meet URL (e.g., https://meet.google.com/xxx-xxxx-xxx)
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="Brief description of the lesson content"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active Link
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/lessons"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !validateUrl(formData.url || '', formData.type || 'youtube')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Lesson Link'}
          </button>
        </div>
      </form>
    </div>
  );
}
