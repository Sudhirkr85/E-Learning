import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button, Divider, Card } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata = {
  title: 'Payment Successful - SSSAM Academy',
  description: 'Your course enrollment is confirmed',
};

export default function PaymentSuccessPage() {
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
                  <Text className="font-mono font-semibold">ORD-2024-123456</Text>
                </div>
                <Divider className="my-3" />
                <div className="mb-3">
                  <Text size="sm" color="muted">
                    Amount Paid
                  </Text>
                  <Text className="text-2xl font-bold text-green-600">₹5,899</Text>
                </div>
                <Divider className="my-3" />
                <div>
                  <Text size="sm" color="muted">
                    Course
                  </Text>
                  <Text className="font-semibold">Master Full Stack Web Development</Text>
                </div>
              </div>

              <Text color="secondary" className="mb-6">
                A confirmation email has been sent to your registered email address. You can now access the course content from your dashboard.
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
