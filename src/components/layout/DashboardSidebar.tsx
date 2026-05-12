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
    <aside className="w-full md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-4 md:sticky md:top-20 md:h-[calc(100vh-80px)]">
      <nav className="space-y-2">
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-left">
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
