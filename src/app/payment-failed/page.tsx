import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button, Card } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata = {
  title: 'Payment Failed - SSSAM Academy',
  description: 'Your payment could not be processed',
};

export default function PaymentFailedPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center">
        <Container>
          <div className="max-w-md mx-auto">
            <Card className="p-12 bg-white text-center">
              {/* Failure Icon */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✕</span>
              </div>

              <Heading level={2} className="mb-2">
                Payment Failed
              </Heading>

              <Text size="lg" color="muted" className="mb-4">
                We couldn't process your payment
              </Text>

              <Text color="muted" className="mb-6">
                Don't worry, no charges were made. Please try again or contact support if the problem persists.
              </Text>

              <div className="space-y-3">
                <Button variant="primary" size="lg" href={ROUTES.CHECKOUT} className="w-full">
                  Try Again
                </Button>
                <Button variant="outline" size="lg" href={ROUTES.HOME} className="w-full">
                  Back to Home
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
