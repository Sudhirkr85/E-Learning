'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';
import { Text } from '@/components/ui';
import { useClerk } from '@clerk/nextjs';

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  const menuItems = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: '📊' },
    { label: 'My Courses', href: ROUTES.MY_COURSES, icon: '📚' },
    { label: 'Profile', href: ROUTES.PROFILE, icon: '👤' },
    { label: 'Settings', href: ROUTES.SETTINGS, icon: '⚙️' },
  ];

  return (
    <aside className="w-full md:w-72 bg-slate-950/95 text-slate-300 border-b md:border-b-0 md:border-r border-slate-800/50 p-5 md:sticky md:top-20 md:h-[calc(100vh-80px)] overflow-y-auto backdrop-blur-xl shadow-lg shadow-slate-950/40">
      <div className="mb-6 rounded-3xl border border-cyan-500/10 bg-slate-900/80 p-4 text-sm text-slate-400">
        <p className="font-semibold text-white mb-1">Student Dashboard</p>
        <p>Live sessions, AI learning pathways, and batch progress in Gurugram style.</p>
      </div>
      <nav className="space-y-2">
        {menuItems.map(item => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/8'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="mt-8 pt-8 border-t border-slate-800/50">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium text-left group"
          onClick={async () => {
            try {
              await signOut();
              router.push('/');
            } catch (err) {
              router.push('/');
            }
          }}
        >
          <span className="text-xl group-hover:scale-110 transition-transform">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
