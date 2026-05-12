import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Divider } from '@/components/ui';
import { ROUTES } from '@/constants';
import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Login - SSSAM Academy',
  description: 'Sign in to your SSSAM Academy account',
};

export default function LoginPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center">
        <Container>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <Heading level={2} className="mb-2">
                Welcome Back
              </Heading>
              <Text color="muted">
                Sign in to your account to continue learning
              </Text>
            </div>

            <SignIn 
              path="/login"
              routing="path"
              signUpUrl="/register"
              forceRedirectUrl="/dashboard"
              fallbackRedirectUrl="/dashboard"
            />

            <div className="mt-6 text-center">
              <Text size="sm" color="muted">
                Don't have an account?{' '}
                <a href={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign up
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
