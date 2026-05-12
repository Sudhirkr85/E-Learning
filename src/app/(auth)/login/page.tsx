import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Input, Button, Divider } from '@/components/ui';
import { ROUTES } from '@/constants';

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

            <form className="space-y-4">
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

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Sign In
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
                🔵 Continue with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                🔗 Continue with GitHub
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Text size="sm" color="muted">
                Don't have an account?{' '}
                <a href={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign up
                </a>
              </Text>
            </div>

            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}
