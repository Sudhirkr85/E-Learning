'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Footer, Header } from '@/components/layout';
import { Button, Card, Container, Divider, Heading, Text } from '@/components/ui';
import { ROUTES } from '@/constants';
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

const formatPhoneNumber = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '').slice(0, 10);

  if (digitsOnly.length <= 5) {
    return digitsOnly;
  }

  return `${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
};

const normalizePhoneNumber = (value: string) => value.replace(/\D/g, '').slice(0, 10);

export function CheckoutContent() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseParam = searchParams.get('course');
  const [course, setCourse] = useState<Course | null>(null);
  const [studentPhone, setStudentPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState('');
  const [pendingOrderId, setPendingOrderId] = useState('');
  const [showPendingModal, setShowPendingModal] = useState(false);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  useUserSync();

  const returnTo = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const authRedirect = encodeURIComponent(returnTo);

  useEffect(() => {
    let active = true;

    const fetchCourse = async () => {
      try {
        const endpoint = courseParam ? `/api/courses/${courseParam}` : '/api/courses/featured';
        const response = await fetch(endpoint);
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
    if (!isLoaded || !user) {
      return;
    }

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
  }, [isLoaded, user]);

  useEffect(() => {
    if (!error.toLowerCase().includes('phone number')) {
      return;
    }

    phoneInputRef.current?.focus();
    phoneInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [error]);

  const customerName = [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim() || 'Student';
  const customerEmail = user?.primaryEmailAddress?.emailAddress || '';
  const customerPhone = normalizePhoneNumber(studentPhone);

  const coursePrice = course?.price ?? 0;
  const taxAmount = Math.round(coursePrice * 0.18);
  const totalAmount = coursePrice + taxAmount;

  const openExistingPayment = async (existingOrderId: string) => {
    const infoResp = await fetch(`/api/razorpay/order-info?orderId=${encodeURIComponent(existingOrderId)}`);
    const infoData = await infoResp.json();
    if (!infoResp.ok) {
      throw new Error(infoData.error || 'Failed to load existing order');
    }

    const options: RazorpayOptions = {
      key: infoData.key,
      amount: infoData.amount,
      currency: infoData.currency,
      name: 'SSSAM Academy',
      description: infoData.courseTitle || course?.title,
      order_id: infoData.orderId,
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
            const purchase = verifyData.purchase ?? {};
            const successParams = new URLSearchParams({
              order_id: String(purchase.orderId ?? response.razorpay_order_id ?? ''),
              payment_id: String(purchase.paymentId ?? response.razorpay_payment_id ?? ''),
              amount: String(purchase.amount ?? infoData.amount / 100),
              course_title: String(purchase.courseTitle ?? course?.title ?? ''),
              student_email: String(purchase.studentEmail ?? customerEmail),
            });

            router.push(`/checkout/success?${successParams.toString()}`);
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

    const razorpayWindow = window as RazorpayWindow;
    if (!razorpayWindow.Razorpay) {
      throw new Error('Razorpay checkout is not available. Please refresh and try again.');
    }

    const RazorpayConstructor = razorpayWindow.Razorpay;
    const razorpay = new RazorpayConstructor(options);
    razorpay.open();
  };

  const cancelPendingPurchase = async (existingOrderId: string) => {
    const cancelResp = await fetch('/api/razorpay/cancel-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: existingOrderId }),
    });

    const cancelData = await cancelResp.json();
    if (!cancelResp.ok) {
      throw new Error(cancelData.error || 'Failed to cancel existing order');
    }

    setShowPendingModal(false);
    setPendingOrderId('');
    setIsLoading(false);
    await handlePayment();
  };

  const handlePayment = async () => {
    if (!course) {
      setError('Please wait for the course details to load.');
      return;
    }

    if (!isLoaded || !user) {
      setError('Please sign in before continuing to payment.');
      return;
    }

    if (customerPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
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
          studentPhone: customerPhone,
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        const errorMessage = orderData.error || 'Failed to create order';

        // Handle pending purchase case: offer user to complete existing payment or cancel it
        if (orderData?.code === 'pending_exists' && orderData?.orderId) {
          setPendingOrderId(orderData.orderId as string);
          setShowPendingModal(true);
          setIsLoading(false);
          return;
        }

        throw new Error(errorMessage);
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
              const purchase = verifyData.purchase ?? {};
              const successParams = new URLSearchParams({
                order_id: String(purchase.orderId ?? response.razorpay_order_id ?? ''),
                payment_id: String(purchase.paymentId ?? response.razorpay_payment_id ?? ''),
                amount: String(purchase.amount ?? orderData.amount / 100),
                course_title: String(purchase.courseTitle ?? course.title),
                student_email: String(purchase.studentEmail ?? customerEmail),
              });

              router.push(`/checkout/success?${successParams.toString()}`);
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

      if (!razorpayWindow.Razorpay) {
        throw new Error('Razorpay checkout is not available. Please refresh and try again.');
      }

      const RazorpayConstructor = razorpayWindow.Razorpay;
      const razorpay = new RazorpayConstructor(options);
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
                Complete Your Enrollment
              </Heading>
              <Text className="mb-8 text-slate-300">
                Secure your seat in the 30-Day AI-Powered Full Stack Development Bootcamp.
              </Text>

                  <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 md:p-5">
                    <div className="mb-4">
                      <Heading level={4} className="text-base text-white">
                        Student Contact
                      </Heading>
                      <Text className="text-sm text-slate-400">
                        Enter your WhatsApp number for class updates, support, and course access.
                      </Text>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-200">Phone number</span>
                      <input
                        ref={phoneInputRef}
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={11}
                        required
                        value={studentPhone}
                        onChange={(event) => setStudentPhone(formatPhoneNumber(event.target.value))}
                        placeholder="e.g. 98765 43210"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      />
                    </label>
                  </div>

              {!isLoaded ? (
                <Card className="border border-slate-800 bg-slate-900/80 p-6 md:p-8">
                  <Heading level={3} className="mb-3 text-white">
                    Checking your account
                  </Heading>
                  <Text className="text-slate-300">
                    We are verifying whether you are signed in.
                  </Text>
                </Card>
              ) : !user ? (
                <Card className="border border-slate-800 bg-slate-900/80 p-6 md:p-8 text-center">
                  <div className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                    Account Required
                  </div>

                  <Heading level={3} className="mb-3 text-white">
                    Create an account to continue
                  </Heading>
                  <Text className="mb-6 text-slate-300">
                    New students should register first. If you already have an account, sign in to continue to checkout.
                  </Text>

                  <div className="space-y-3">
                    <Button
                      variant="primary"
                      size="lg"
                      href={`${ROUTES.REGISTER}?returnTo=${authRedirect}`}
                      className="w-full"
                    >
                      Register to Continue
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      href={`${ROUTES.LOGIN}?returnTo=${authRedirect}`}
                      className="w-full border border-slate-700 text-slate-300 hover:bg-slate-800/50"
                    >
                      Already have an account? Sign in
                    </Button>
                  </div>
                </Card>
              ) : error ? (
                <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 border border-slate-800 bg-slate-900/80 p-6 md:p-8">
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
                </Card>

                <Card className="sticky top-24 self-start border border-slate-800 bg-slate-900/80 p-6">
                  <Heading level={3} className="mb-4 text-white">
                    Introductory Student Pricing
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
                      <Text className="text-slate-400">Course Access</Text>
                      <Text className="font-semibold text-white">₹{coursePrice.toLocaleString()}</Text>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <Text className="text-slate-400">GST</Text>
                      <Text className="font-semibold text-white">₹{taxAmount.toLocaleString()}</Text>
                    </div>
                  </div>

                  <Divider className="my-5 border-slate-800" />

                  <div className="mb-6 flex items-end justify-between gap-4">
                    <Text className="text-lg font-semibold text-white">Total Payable</Text>
                    <Text className="text-3xl font-bold text-cyan-300">₹{totalAmount.toLocaleString()}</Text>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    disabled={isLoading || !course || !isLoaded || !user || !scriptLoaded}
                  >
                    {isLoading ? 'Processing...' : 'Complete Enrollment'}
                  </Button>
                  <Text size="sm" className="mt-3 text-center text-slate-400">
                    ✅ Beginner Friendly • Certificate Included • Secure Payment
                  </Text>
                </Card>
              </div>
            </div>
          </Container>
        </div>

        <Footer />

        {showPendingModal && pendingOrderId ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50">
              <div className="border-b border-slate-800 px-6 py-5">
                <div className="mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                  Pending Payment Found
                </div>
                <Heading level={3} className="text-white">
                  Continue or restart this payment?
                </Heading>
                <Text className="mt-2 text-sm text-slate-300">
                  You already have an unfinished order for this course. You can continue the same payment or cancel it and create a fresh one.
                </Text>
              </div>

              <div className="px-6 py-5">
                <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-slate-500">Order ID</span>
                    <span className="font-mono text-xs text-slate-200 break-all text-right">{pendingOrderId}</span>
                  </div>
                  <div className="text-slate-400">
                    No access is granted until this payment is successfully verified.
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800"
                    onClick={async () => {
                      try {
                        await cancelPendingPurchase(pendingOrderId);
                      } catch (cancelError) {
                        setError(cancelError instanceof Error ? cancelError.message : 'Failed to cancel existing order');
                      }
                    }}
                    disabled={isLoading}
                  >
                    Cancel and create new order
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={async () => {
                      try {
                        setShowPendingModal(false);
                        await openExistingPayment(pendingOrderId);
                      } catch (existingOrderError) {
                        setError(existingOrderError instanceof Error ? existingOrderError.message : 'Failed to open existing payment');
                        setIsLoading(false);
                      }
                    }}
                    disabled={isLoading}
                  >
                    Continue payment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }


