import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata = {
  title: 'Not Found - SSSAM Academy',
  description: 'Page not found',
};

export default function NotFound() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
        <Container>
          <div className="text-center">
            <Heading level={1} className="text-6xl font-bold text-gray-900 mb-4">
              404
            </Heading>
            <Heading level={2} className="mb-4">
              Page Not Found
            </Heading>
            <Text size="lg" color="muted" className="mb-8 max-w-md mx-auto">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </Text>
            <Button variant="primary" size="lg" href={ROUTES.HOME}>
              Go to Home
            </Button>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}
