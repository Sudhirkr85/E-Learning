import { ClerkProvider } from '@clerk/nextjs';
import { Header, Footer, DashboardSidebar } from '@/components/layout';

export const metadata = {
  title: 'Dashboard - SSSAM Academy',
  description: 'View your learning progress and enrolled courses',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Header />
      <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col md:flex-row">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
      <Footer />
    </ClerkProvider>
  );
}
