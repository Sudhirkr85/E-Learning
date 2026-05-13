'use client';

import { Suspense } from 'react';
import { Footer, Header } from '@/components/layout';
import { Container, Heading, Text } from '@/components/ui';
import { CheckoutContent } from './checkout-content';

function CheckoutFallback() {
  return (
    <>
      <Header />
      <div className="relative overflow-hidden bg-slate-950 py-12 md:py-16 flex items-center min-h-[400px]">
        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl">
            <Heading level={1} className="mb-3 text-white">
              Checkout
            </Heading>
            <Text className="mb-8 text-slate-300">
              Loading checkout...
            </Text>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}
