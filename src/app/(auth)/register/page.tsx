import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text } from '@/components/ui';
import { ROUTES } from '@/constants';
import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Register - SSSAM Academy',
  description: 'Create your SSSAM Academy account',
};

const TRUST_POINTS = [
  'Beginner Friendly',
  'Real Projects',
  'AI-Assisted Learning',
  'Certificate Support',
];

const clerkAppearance = {
  elements: {
    rootBox: 'w-full',
    card: 'w-full max-w-[480px] rounded-2xl border border-slate-200/70 bg-white/95 shadow-[0_25px_80px_rgba(2,6,23,0.35)] backdrop-blur-sm',
    headerTitle: 'text-slate-900 text-2xl font-bold tracking-tight',
    headerSubtitle: 'text-slate-600 text-sm',
    formButtonPrimaryText: 'text-white font-semibold',
    socialButtonsBlockButton:
      'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors',
    socialButtonsBlockButtonText: 'text-sm font-medium',
    formButtonPrimary:
      'bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md transition-colors',
    formFieldInput:
      'rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500/30',
    formFieldLabel: 'text-slate-700 font-medium',
    footerActionText: 'text-slate-500',
    footerActionLink: 'text-cyan-700 hover:text-cyan-600 font-semibold',
    identityPreviewText: 'text-slate-600',
    dividerLine: 'bg-slate-200',
    dividerText: 'text-slate-500 text-xs',
  },
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams?: Promise<{ returnTo?: string }>;
}) {
  const params = await searchParams;
  const returnTo = params?.returnTo || ROUTES.HOME;

  return (
    <>
      <Header />

      <div className="relative min-h-screen overflow-hidden bg-slate-950">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.24),transparent_34%),radial-gradient(circle_at_85%_18%,rgba(6,182,212,0.18),transparent_36%),linear-gradient(135deg,#020617_0%,#0f172a_60%,#1e293b_100%)]" />
        <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <Container>
          <div className="relative z-10 flex min-h-screen items-center py-12 md:py-16">
            <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <section className="hidden lg:block text-slate-100">
                <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  SSSAM Academy
                </p>
                <Heading level={1} className="mb-5 text-4xl font-bold leading-tight text-white xl:text-5xl">
                  Start Your AI Developer Journey
                </Heading>
                <Text className="mb-4 text-lg text-slate-200">
                  Start your learning journey with AI-powered full stack training.
                </Text>
                <Text className="mb-8 max-w-xl text-slate-300">
                  Learn full stack development with AI tools, real projects, deployment, and certificate support.
                </Text>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TRUST_POINTS.map((point) => (
                    <div key={point} className="rounded-xl border border-slate-700/70 bg-slate-900/40 px-4 py-3 text-sm font-medium text-slate-100">
                      {'\u2705'} {point}
                    </div>
                  ))}
                </div>
              </section>

              <section className="mx-auto w-full max-w-[520px]">
                <div className="mb-4 text-center text-slate-100 lg:mb-5 lg:mt-1">
                  <Heading level={2} className="mb-2 text-3xl text-white">
                    Create your SSSAM Academy account
                  </Heading>
                  <Text className="text-slate-300">Start your learning journey with AI-powered full stack training.</Text>
                  <Text className="mt-2 text-slate-400">Join to access courses, projects, and student resources.</Text>
                </div>

                <SignUp
                  path="/register"
                  routing="path"
                  signInUrl={`/login?returnTo=${encodeURIComponent(returnTo)}`}
                  forceRedirectUrl={returnTo}
                  fallbackRedirectUrl={returnTo}
                  appearance={clerkAppearance}
                />
              </section>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
}


