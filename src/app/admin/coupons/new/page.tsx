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
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Create New Coupon</h1>
        <p className="text-sm text-[rgba(255,255,255,0.7)]">Add a new discount coupon for your courses</p>
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
              <label htmlFor="code" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
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
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none uppercase"
              />
              <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">Displayed in uppercase</p>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="Summer discount for all courses"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Discount Details */}
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Discount Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="discountType" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Discount Type *
              </label>
              <select
                id="discountType"
                name="discountType"
                value={formData.discountType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
              >
                <option value="percentage" className="bg-slate-900">Percentage</option>
                <option value="fixed" className="bg-slate-900">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label htmlFor="discountValue" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Discount Value *
              </label>
              <div className="flex gap-2">
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
                  className="flex-1 px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
                />
                <div className="px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white font-semibold">
                  {formData.discountType === 'percentage' ? '%' : '₹'}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="minAmount" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
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
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
              <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">Minimum order amount to use this coupon</p>
            </div>

            <div>
              <label htmlFor="maxDiscount" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
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
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
              <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">Only for percentage discounts</p>
            </div>

            <div>
              <label htmlFor="usageLimit" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Usage Limit
              </label>
              <input
                type="number"
                id="usageLimit"
                name="usageLimit"
                min="0"
                value={formData.usageLimit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              />
              <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">Leave 0 for unlimited usage</p>
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
                Active Coupon
              </label>
            </div>
          </div>
        </div>

        {/* Validity Period */}
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Validity Period</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="validFrom" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Valid From *
              </label>
              <input
                type="date"
                id="validFrom"
                name="validFrom"
                required
                value={formData.validFrom}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="validUntil" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
                Valid Until *
              </label>
              <input
                type="date"
                id="validUntil"
                name="validUntil"
                required
                value={formData.validUntil}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Applicable Courses */}
        <div className="p-6 rounded-lg glass-strong">
          <h2 className="text-lg font-semibold mb-4">Applicable Courses</h2>
          
          <div>
            <label htmlFor="applicableCourses" className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">
              Course IDs (comma-separated)
            </label>
            <input
              type="text"
              id="applicableCourses"
              name="applicableCourses"
              value={formData.applicableCourses?.join(', ')}
              onChange={handleApplicableCoursesChange}
              placeholder="1, 2, 3"
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
            />
            <p className="mt-1 text-xs text-[rgba(255,255,255,0.6)]">
              Leave empty to apply to all courses. Enter course IDs separated by commas.
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3">
          <Link
            href="/admin/coupons"
            className="px-4 py-2 rounded bg-[rgba(255,255,255,0.03)] text-white hover:bg-[rgba(255,255,255,0.05)] transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
}
