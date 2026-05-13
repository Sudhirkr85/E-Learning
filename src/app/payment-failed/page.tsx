import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Button, Card } from '@/components/ui';
import { ROUTES } from '@/constants';

      <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.08),transparent_35%),linear-gradient(to_bottom,rgba(15,23,42,0.95),rgba(2,6,23,1))] flex items-center">
  title: 'Payment Failed - SSSAM Academy',
  description: 'Your payment could not be processed',
            <Card className="border border-slate-800 bg-slate-900/95 p-12 text-center shadow-2xl shadow-black/40">

              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-400/25 bg-red-400/10 shadow-[0_0_0_6px_rgba(239,68,68,0.08)]">
                <span className="text-4xl text-red-300">✕</span>
    <>
              <Heading level={2} className="mb-2 text-slate-50">

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center">
              <Text size="lg" className="mb-4 text-slate-300">
          <div className="max-w-md mx-auto">
            <Card className="p-12 bg-white text-center">
              <Text className="mb-6 text-slate-300">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✕</span>
              </div>
                <Button variant="primary" size="lg" href={ROUTES.CHECKOUT} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-semibold">
              <Heading level={2} className="mb-2">
                Payment Failed
                <Button variant="outline" size="lg" href={ROUTES.HOME} className="w-full border border-slate-700 text-slate-300 hover:bg-slate-800/50">

              <Text size="lg" color="muted" className="mb-4">
                We couldn't process your payment
              
              <div className="mt-6 text-sm text-slate-300">
                <Text className="block mb-1">Need help? Contact our support:</Text>
                <div className="flex flex-col gap-1 items-center">
                  <a href={`mailto:info@sssamacadmy.com`} className="text-cyan-400 hover:underline">info@sssamacadmy.com</a>
                  <a href={`tel:+919217031899`} className="text-cyan-400 hover:underline">9217031899</a>
                </div>
              </div>
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
