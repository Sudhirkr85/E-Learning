'use client';

import { useEffect, useState } from 'react';
import { Coupon } from '@/types';
import Link from 'next/link';

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/admin/coupons');
      const data = await response.json();
      
      if (data.success) {
        setCoupons(data.coupons || []);
      } else {
        setError('Failed to fetch coupons');
      }
    } catch (error) {
      setError('An error occurred while fetching coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (couponId: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setCoupons(coupons.filter(coupon => coupon.id !== couponId));
      } else {
        setError('Failed to delete coupon');
      }
    } catch (error) {
      setError('An error occurred while deleting coupon');
    }
  };

  const toggleCouponStatus = async (coupon: Coupon) => {
    try {
      const response = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });

      const data = await response.json();

      if (data.success) {
        setCoupons(coupons.map(c => 
          c.id === coupon.id ? { ...c, isActive: !c.isActive } : c
        ));
      } else {
        setError('Failed to update coupon status');
      }
    } catch (error) {
      setError('An error occurred while updating coupon status');
    }
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
          <h1 className="text-2xl font-semibold mb-2">Coupon Management</h1>
          <p className="text-sm text-[rgba(255,255,255,0.7)]">Manage discount coupons and promotions</p>
        </div>
        <Link
          href="/admin/coupons/new"
          className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition whitespace-nowrap"
        >
          + New Coupon
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
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Coupons</div>
          <div className="text-3xl font-bold mt-2">{coupons.length}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Active</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-emerald)]">{coupons.filter(c => c.isActive).length}</div>
        </div>

        <div className="p-4 rounded-lg glass-strong">
          <div className="text-sm text-[rgba(255,255,255,0.65)]">Total Usage</div>
          <div className="text-3xl font-bold mt-2 text-[var(--accent-primary)]">{coupons.reduce((sum, c) => sum + c.usedCount, 0)}</div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="p-6 rounded-lg glass-strong overflow-hidden">
        {coupons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Discount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Usage</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Valid Period</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[rgba(255,255,255,0.75)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-[rgba(255,255,255,0.01)] transition">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{coupon.code}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.6)]">{coupon.description}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {coupon.discountType === 'percentage' 
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`
                      }
                      {coupon.minAmount && (
                        <div className="text-xs text-[rgba(255,255,255,0.5)]">
                          Min ₹{coupon.minAmount}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {coupon.usedCount}
                      {coupon.usageLimit && (
                        <span className="text-[rgba(255,255,255,0.5)] ml-1">
                          / {coupon.usageLimit}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>{new Date(coupon.validFrom).toLocaleDateString()}</div>
                      <div className="text-[rgba(255,255,255,0.5)]">to {new Date(coupon.validUntil).toLocaleDateString()}</div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        coupon.isActive 
                          ? 'bg-[rgba(16,185,129,0.12)] text-[var(--accent-emerald)]'
                          : 'bg-[rgba(236,72,153,0.12)] text-[var(--accent-tertiary)]'
                      }`}>
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleCouponStatus(coupon)}
                          className="text-xs px-2 py-1 rounded transition"
                          title={coupon.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <span className="text-[var(--accent-secondary)] hover:opacity-80">
                            {coupon.isActive ? '⊖' : '⊕'}
                          </span>
                        </button>
                        <Link
                          href={`/admin/coupons/${coupon.id}/edit`}
                          className="text-[var(--accent-primary)] hover:underline text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(coupon.id)}
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
            <p className="text-[rgba(255,255,255,0.6)] mb-4">No coupons found</p>
            <Link href="/admin/coupons/new" className="text-[var(--accent-primary)] hover:underline">
              Create your first coupon
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
