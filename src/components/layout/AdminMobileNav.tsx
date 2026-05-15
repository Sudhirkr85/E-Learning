'use client';

import { useState } from 'react';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/courses', label: 'Courses' },
  { href: '/admin/coupons', label: 'Coupons' },
  { href: '/admin/lessons', label: 'Lesson Links' },
  { href: '/admin/courses', label: 'Enrollments' },
];

export default function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/90 p-2 text-slate-100 shadow-sm hover:bg-slate-700 active:bg-slate-600"
        aria-label="Open admin navigation"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 6h14" />
          <path d="M3 10h14" />
          <path d="M3 14h14" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/70"
            aria-label="Close admin navigation overlay"
            onClick={() => setOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-[82vw] max-w-xs border-r border-slate-800 bg-slate-950 p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">SSSAM</p>
                <h2 className="mt-1 text-lg font-semibold text-white">Admin Menu</h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                aria-label="Close admin navigation"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M5 5l10 10" />
                  <path d="M15 5L5 15" />
                </svg>
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-500/40 hover:bg-slate-800"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}