'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Coupon } from '@/types';
import Link from 'next/link';

export default function NewCoupon() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    minAmount: 0,
    maxDiscount: 0,
    usageLimit: 0,
    applicableCourses: [],
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/coupons');
      } else {
        setError(data.error || 'Failed to create coupon');
      }
    } catch (error) {
      setError('An error occurred while creating the coupon');
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

  const handleApplicableCoursesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const courses = e.target.value.split(',').map(course => course.trim()).filter(course => course);
    setFormData(prev => ({ ...prev, applicableCourses: courses }));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Coupon</h1>
        <p className="text-gray-600">Add a new discount coupon for your courses</p>
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
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Coupon Code *
              </label>
              <input
                type="text"
                id="code"
                name="code"
                required
                placeholder="SUMMER2026"
                value={formData.code}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase"
              />
              <p className="mt-1 text-sm text-gray-500">This will be displayed in uppercase</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Summer discount for all courses"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Discount Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">
                Discount Type *
              </label>
              <select
                id="discountType"
                name="discountType"
                value={formData.discountType}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700">
                Discount Value *
              </label>
              <input
                type="number"
                id="discountValue"
                name="discountValue"
                required
                min="0"
                max={formData.discountType === 'percentage' ? 100 : undefined}
                step={formData.discountType === 'percentage' ? 1 : 0.01}
                value={formData.discountValue}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.discountType === 'percentage' ? '%' : '₹'}
              </p>
            </div>

            <div>
              <label htmlFor="minAmount" className="block text-sm font-medium text-gray-700">
                Minimum Amount (₹)
              </label>
              <input
                type="number"
                id="minAmount"
                name="minAmount"
                min="0"
                step="0.01"
                value={formData.minAmount}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">Minimum order amount to use this coupon</p>
            </div>

            <div>
              <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700">
                Maximum Discount (₹)
              </label>
              <input
                type="number"
                id="maxDiscount"
                name="maxDiscount"
                min="0"
                step="0.01"
                value={formData.maxDiscount}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">Only for percentage discounts</p>
            </div>

            <div>
              <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700">
                Usage Limit
              </label>
              <input
                type="number"
                id="usageLimit"
                name="usageLimit"
                min="0"
                value={formData.usageLimit}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p className="mt-1 text-sm text-gray-500">Leave 0 for unlimited usage</p>
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
                Active Coupon
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Validity Period</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">
                Valid From *
              </label>
              <input
                type="date"
                id="validFrom"
                name="validFrom"
                required
                value={formData.validFrom}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700">
                Valid Until *
              </label>
              <input
                type="date"
                id="validUntil"
                name="validUntil"
                required
                value={formData.validUntil}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Applicable Courses</h2>
          
          <div>
            <label htmlFor="applicableCourses" className="block text-sm font-medium text-gray-700">
              Course IDs (comma-separated)
            </label>
            <input
              type="text"
              id="applicableCourses"
              name="applicableCourses"
              value={formData.applicableCourses?.join(', ')}
              onChange={handleApplicableCoursesChange}
              placeholder="1, 2, 3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty to apply to all courses. Enter course IDs separated by commas.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/coupons"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
}
