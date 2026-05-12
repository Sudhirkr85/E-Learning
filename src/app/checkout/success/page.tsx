'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button, Divider, Card } from '@/components/ui';
import { ROUTES } from '@/constants';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get payment data from URL params or localStorage
    const paymentId = searchParams.get('payment_id');
    const orderId = searchParams.get('order_id');
    
    // For now, we'll use mock data since we don't have a way to pass data
    // In a real app, you'd fetch this from an API or use query params
    setPurchaseData({
      orderId: orderId || `ORD-${Date.now()}`,
      paymentId: paymentId || `PAY-${Date.now()}`,
      amount: 5899,
      courseTitle: 'Master Full Stack Web Development',
      studentEmail: 'student@example.com',
    });
    setIsLoading(false);
  }, [searchParams]);
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <Text>Loading payment details...</Text>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center">
        <Container>
          <div className="max-w-md mx-auto">
            <Card className="p-12 bg-white text-center">
              {/* Success Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✓</span>
              </div>

              <Heading level={2} className="mb-2">
                Payment Successful!
              </Heading>

              <Text size="lg" color="muted" className="mb-4">
                Your enrollment is confirmed
              </Text>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="mb-3">
                  <Text size="sm" color="muted">
                    Order ID
                  </Text>
                  <Text className="font-mono font-semibold">{purchaseData?.orderId}</Text>
                </div>
                <Divider className="my-3" />
                <div className="mb-3">
                  <Text size="sm" color="muted">
                    Payment ID
                  </Text>
                  <Text className="font-mono font-semibold text-sm">{purchaseData?.paymentId}</Text>
                </div>
                <Divider className="my-3" />
                <div className="mb-3">
                  <Text size="sm" color="muted">
                    Amount Paid
                  </Text>
                  <Text className="text-2xl font-bold text-green-600">₹{purchaseData?.amount?.toLocaleString()}</Text>
                </div>
                <Divider className="my-3" />
                <div>
                  <Text size="sm" color="muted">
                    Course
                  </Text>
                  <Text className="font-semibold">{purchaseData?.courseTitle}</Text>
                </div>
              </div>

              <Text color="secondary" className="mb-6">
                A confirmation email has been sent to {purchaseData?.studentEmail}. You can now access the course content from your dashboard.
              </Text>

              <div className="space-y-3">
                <Button variant="primary" size="lg" href={ROUTES.DASHBOARD} className="w-full">
                  Go to Dashboard
                </Button>
                <Button variant="outline" size="lg" href={ROUTES.MY_COURSES} className="w-full">
                  View My Courses
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <Text>Loading...</Text>
            </div>
          </Container>
        </div>
        <Footer />
      </>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
