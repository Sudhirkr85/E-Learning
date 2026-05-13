'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Footer, Header } from '@/components/layout';
import { Button, Card, Container, Divider, Heading, Text } from '@/components/ui';
import { useUserSync } from '@/hooks/use-user-sync';
import { Course } from '@/types';

type RazorpayHandlerResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
  handler: (response: RazorpayHandlerResponse) => void;
};

type RazorpayWindow = Window & {
  Razorpay?: new (options: RazorpayOptions) => { open: () => void };
};

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseParam = searchParams.get('course');
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState('');

  useUserSync();

  useEffect(() => {
    let active = true;

    const fetchCourse = async () => {
      try {
        const endpoint = courseParam ? `/api/courses/${courseParam}` : '/api/courses/featured';
        const response = await fetch(endpoint, { cache: 'no-store' });
        const data = await response.json();

        if (!active) {
          return;
        }

        if (data.success && data.course) {
          setCourse(data.course);
          return;
        }

        if (courseParam) {
          setError('Selected course could not be loaded. Please return to the course page and try again.');
        }
      } catch (fetchError) {
        if (active) {
          setError('Unable to load the selected course. Please try again.');
        }

        console.error('Failed to fetch checkout course:', fetchError);
      }
    };

    fetchCourse();

    return () => {
      active = false;
    };
  }, [courseParam]);

  useEffect(() => {
    const existingScript = document.getElementById('razorpay-checkout-js');
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setError('Failed to load payment gateway. Please refresh the page.');
    document.body.appendChild(script);
  }, []);

  const customerName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() || 'Student';
  const customerEmail = user?.primaryEmailAddress?.emailAddress || '';
  const customerPhone = user?.primaryPhoneNumber?.phoneNumber || '';

  const coursePrice = course?.price ?? 0;
  const taxAmount = Math.round(coursePrice * 0.18);
  const totalAmount = coursePrice + taxAmount;

  const handlePayment = async () => {
    if (!course) {
      setError('Please wait for the course details to load.');
      return;
    }

    if (!isLoaded || !user) {
      setError('Please sign in before continuing to payment.');
      return;
    }

    const razorpayWindow = window as RazorpayWindow;
    if (!scriptLoaded || !razorpayWindow.Razorpay) {
      setError('Payment gateway is still loading. Please try again in a moment.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course.id,
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const options: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SSSAM Academy',
        description: course.title,
        order_id: orderData.orderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#22d3ee',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
        handler: async (response: RazorpayHandlerResponse) => {
          try {
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok && verifyData.success) {
              router.push('/checkout/success');
              return;
            }

            throw new Error('Payment verification failed. Please contact support.');
          } catch (verifyError) {
            console.error('Payment verification error:', verifyError);
            setError(verifyError instanceof Error ? verifyError.message : 'Payment verification failed.');
            router.push('/payment-failed');
          } finally {
            setIsLoading(false);
          }
        },
      };

      const razorpay = new razorpayWindow.Razorpay(options);
      razorpay.open();
    } catch (paymentError) {
      console.error('Payment error:', paymentError);
      setError(paymentError instanceof Error ? paymentError.message : 'Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="relative overflow-hidden bg-slate-950 py-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(34, 211, 238, 0.08) 25%, rgba(34, 211, 238, 0.08) 26%, transparent 27%, transparent 74%, rgba(34, 211, 238, 0.08) 75%, rgba(34, 211, 238, 0.08) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(168, 85, 247, 0.08) 25%, rgba(168, 85, 247, 0.08) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.08) 75%, rgba(168, 85, 247, 0.08) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          <Container className="relative z-10">
            <div className="mx-auto max-w-5xl">
              <Heading level={1} className="mb-3 text-white">
                Checkout
              </Heading>
              <Text className="mb-8 text-slate-300">
                Review your selected course and complete payment in one step.
              </Text>

              {error ? (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="overflow-hidden border border-slate-800 bg-slate-900/80 p-0 lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
                    <div className="relative min-h-56 md:min-h-full">
                      {course?.thumbnail ? (
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 220px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex min-h-56 h-full items-center justify-center bg-slate-800 text-slate-500">
                          Loading course...
                        </div>
                      )}
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                        Selected Course
                      </div>
                      <Heading level={3} className="mb-3 text-white">
                        {course?.title || 'Loading course details'}
                      </Heading>
                      <Text className="mb-6 text-slate-300">
                        {course?.shortDescription || course?.description || 'Loading the latest course information.'}
                      </Text>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                          <Text className="mb-1 text-slate-500">Instructor</Text>
                          <Text className="font-semibold text-white">{course?.instructor || 'Loading...'}</Text>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                          <Text className="mb-1 text-slate-500">Duration</Text>
                          <Text className="font-semibold text-white">{course?.duration || 'Loading...'}</Text>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                          <Text className="mb-1 text-slate-500">Lessons</Text>
                          <Text className="font-semibold text-white">{course?.lessons ?? 'Loading...'}</Text>
                        </div>
                        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                          <Text className="mb-1 text-slate-500">Category</Text>
                          <Text className="font-semibold text-white">{course?.category || 'Loading...'}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="sticky top-24 self-start border border-slate-800 bg-slate-900/80 p-6">
                  <Heading level={3} className="mb-4 text-white">
                    Order Summary
                  </Heading>

                  <div className="mb-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                    <Text className="mb-1 text-slate-500">Signed in as</Text>
                    <Text className="font-semibold text-white">{customerName}</Text>
                    <Text size="sm" className="text-slate-400">
                      {customerEmail || 'Email loading...'}
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <Text className="text-slate-400">Course fee</Text>
                      <Text className="font-semibold text-white">₹{coursePrice.toLocaleString()}</Text>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Text className="text-slate-400">GST (18%)</Text>
                      <Text className="font-semibold text-white">₹{taxAmount.toLocaleString()}</Text>
                    </div>
                  </div>

                  <Divider className="my-5 border-slate-800" />

                  <div className="mb-6 flex items-end justify-between gap-4">
                    <Text className="text-lg font-semibold text-white">Total</Text>
                    <Text className="text-3xl font-bold text-cyan-300">₹{totalAmount.toLocaleString()}</Text>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isLoading || !course || !isLoaded || !scriptLoaded}
                  >
                    {isLoading ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </Card>
              </div>
            </div>
          </Container>
        </div>

        <Footer />
      </>
    );
  }
