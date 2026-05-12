import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Input, Button, Divider } from '@/components/ui';
import { ROUTES } from '@/constants';

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

            <form className="space-y-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                required
              />

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Create Account
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <Divider className="flex-1" />
              <Text size="sm" color="muted">
                or
              </Text>
              <Divider className="flex-1" />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                🔵 Sign up with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                🔗 Sign up with GitHub
              </Button>
            </div>

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
