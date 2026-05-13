'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants';
import { Text } from '@/components/ui';

export function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: '📊' },
    { label: 'My Courses', href: ROUTES.MY_COURSES, icon: '📚' },
    { label: 'Profile', href: ROUTES.PROFILE, icon: '👤' },
    { label: 'Settings', href: ROUTES.SETTINGS, icon: '⚙️' },
  ];

  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-background-secondary to-background-tertiary border-b md:border-b-0 md:border-r border-slate-700/50 p-4 md:sticky md:top-20 md:h-[calc(100vh-80px)] overflow-y-auto">
      <nav className="space-y-2">
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg'
                  : 'text-foreground-secondary hover:text-cyan-300 hover:bg-cyan-500/10'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="mt-8 pt-8 border-t border-slate-700/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-foreground-secondary hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium text-left group">
          <span className="text-xl group-hover:scale-110 transition-transform">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
