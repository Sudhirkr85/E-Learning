export const dynamic = 'force-dynamic';

import LogoutButton from '@/components/LogoutButton';
import { HeroMesh } from '@/components/ui';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Don't add auth here - it will cause redirect loops
  // Each admin page that needs protection should call requireAdminAuth instead

  return (
    <div className="min-h-screen text-white bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <aside className="flex flex-col flex-grow pt-6 pb-4 overflow-y-auto bg-slate-850/40 border-r border-slate-800 backdrop-blur-sm">
            <div className="flex items-center flex-shrink-0 px-6 mb-6">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
                    </svg>
                  </div>
                  <h1 className="text-lg font-semibold tracking-wide">SSSAM Admin</h1>
                </div>
              </div>
            </div>

            <nav className="px-4 space-y-1">
              <a href="/admin/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800">Dashboard</a>
              <a href="/admin/courses" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[rgba(255,255,255,0.03)]">Courses</a>
              <a href="/admin/coupons" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[rgba(255,255,255,0.03)]">Coupons</a>
              <a href="/admin/lessons" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[rgba(255,255,255,0.03)]">Lesson Links</a>
              <a href="/admin/courses" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-[rgba(255,255,255,0.03)]">Enrollments</a>
            </nav>
          </aside>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <div className="sticky top-0 z-20 flex-shrink-0">
            <div className="relative">
              <div className="h-20 glass flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-[rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-4">
                  <button className="md:hidden p-2 rounded-md hover:bg-[rgba(255,255,255,0.02)]">{/* mobile menu placeholder */}
                    <svg className="w-5 h-5 text-[var(--foreground)]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <div className="relative w-[360px] max-w-[60vw]">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-3">
                      <svg className="h-5 w-5 text-[rgba(255,255,255,0.45)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] placeholder-[rgba(255,255,255,0.35)] text-[rgba(255,255,255,0.95)] border border-[rgba(255,255,255,0.03)] focus:outline-none"
                      placeholder="Search admin..."
                      type="search"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-sm text-[rgba(255,255,255,0.75)]">Signed in as Admin</div>
                  <LogoutButton />
                </div>
              </div>

              {/* subtle hero mesh overlay anchored to top */}
              <div className="absolute inset-x-0 top-0 h-20 pointer-events-none">
                <HeroMesh />
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
