import { Header, Footer, DashboardSidebar } from '@/components/layout';
import { Container, Heading, Text, Card } from '@/components/ui';

export const metadata = {
  title: 'Dashboard - SSSAM Academy',
  description: 'View your learning progress and enrolled courses',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <DashboardSidebar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </>
  );
}
