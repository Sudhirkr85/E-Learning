import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Divider } from '@/components/ui';
import { ROUTES } from '@/constants';
import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Register - SSSAM Academy',
  description: 'Create your SSSAM Academy account',
};

export default function RegisterPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center">
        <Container>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <Heading level={2} className="mb-2">
                Get Started
              </Heading>
              <Text color="muted">
                Create your account to begin learning
              </Text>
            </div>

            <SignUp 
              path="/register"
              routing="path"
              signInUrl="/login"
              forceRedirectUrl="/dashboard"
              fallbackRedirectUrl="/dashboard"
            />

            <div className="mt-6 text-center">
              <Text size="sm" color="muted">
                Already have an account?{' '}
                <a href={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign in
                </a>
              </Text>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}
