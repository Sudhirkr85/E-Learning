'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Course } from '@/types';
import Link from 'next/link';

export default function NewCourse() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    thumbnail: '',
    instructor: '',
    instructorImage: '',
    price: 0,
    originalPrice: 0,
    rating: 0,
    reviews: 0,
    students: 0,
    duration: '',
    lessons: 0,
    level: 'Beginner',
    category: '',
    featured: false,
    status: 'draft',
    tags: [],
    batchInfo: '',
    nextBatch: '',
    sections: [],
    curriculum: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/courses');
      } else {
        setError(data.error || 'Failed to create course');
      }
    } catch (error) {
      setError('An error occurred while creating the course');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Create New Course</h1>
        <p className="text-sm text-[rgba(255,255,255,0.7)]">Add a new course to your academy</p>
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
        {/* Basic Information */}
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Course Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Course Slug *
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                required
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Short Description *
              </label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                required
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Status */}
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Pricing & Status</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                min="0"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
              >
                <option value="draft" className="bg-slate-900">Draft</option>
                <option value="published" className="bg-slate-900">Published</option>
                <option value="coming-soon" className="bg-slate-900">Coming Soon</option>
              </select>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded cursor-pointer accent-[var(--accent-primary)]"
              />
              <label htmlFor="featured" className="text-sm font-medium text-[rgba(255,255,255,0.85)] cursor-pointer">
                Featured Course
              </label>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Course Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instructor" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Instructor *
              </label>
              <input
                type="text"
                id="instructor"
                name="instructor"
                required
                value={formData.instructor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                required
                placeholder="e.g., 12 weeks"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="lessons" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Number of Lessons *
              </label>
              <input
                type="number"
                id="lessons"
                name="lessons"
                required
                min="0"
                value={formData.lessons}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Level *
              </label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
              >
                <option value="Beginner" className="bg-slate-900">Beginner</option>
                <option value="Intermediate" className="bg-slate-900">Intermediate</option>
                <option value="Advanced" className="bg-slate-900">Advanced</option>
                <option value="Beginner to Advanced" className="bg-slate-900">Beginner to Advanced</option>
              </select>
            </div>

            <div>
              <label htmlFor="batchInfo" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Batch Information
              </label>
              <input
                type="text"
                id="batchInfo"
                name="batchInfo"
                value={formData.batchInfo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="nextBatch" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Next Batch Date
              </label>
              <input
                type="text"
                id="nextBatch"
                name="nextBatch"
                value={formData.nextBatch}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags?.join(', ')}
                onChange={handleTagsChange}
                placeholder="React.js, Node.js, MongoDB"
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Media</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="instructorImage" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Instructor Image URL
              </label>
              <input
                type="url"
                id="instructorImage"
                name="instructorImage"
                value={formData.instructorImage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/courses"
            className="px-4 py-2 rounded bg-[rgba(255,255,255,0.03)] text-white hover:bg-[rgba(255,255,255,0.05)] transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
}
