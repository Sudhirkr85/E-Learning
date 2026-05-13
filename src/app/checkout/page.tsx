'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Card, Button, Input, Divider } from '@/components/ui';
import { ROUTES } from '@/constants';
import { Course } from '@/types';
import { useUser } from '@clerk/nextjs';
import { useUserSync } from '@/hooks/use-user-sync';

export default function CheckoutPage() {
  const { user } = useUser();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useUserSync();

  // Fetch featured course on mount
  useEffect(() => {
    const fetchFeaturedCourse = async () => {
      try {
        const response = await fetch('/api/courses/featured', {
          cache: 'no-store',
        });
        const data = await response.json();
        if (data.success && data.course) {
          setCourse(data.course);
        }
      } catch (error) {
        console.error('Failed to fetch featured course:', error);
      }
    };
    
    fetchFeaturedCourse();
  }, []);

  // Pre-fill form with user data when available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        phone: user.primaryPhoneNumber?.phoneNumber || '',
      }));
    }
  }, [user]);

  const coursePrice = course?.price || 4999;
  const discountedPrice = coursePrice - discount;
  const taxAmount = Math.round(discountedPrice * 0.18);
  const totalAmount = discountedPrice + taxAmount;

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // Simple coupon validation (in production, this would be an API call)
    if (couponCode.toUpperCase() === 'TEST10') {
      setDiscount(Math.round(coursePrice * 0.1));
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handlePayment = async () => {
    // Validate form
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    const missingField = requiredFields.find(field => !formData[field as keyof typeof formData].trim());
    
    if (missingField) {
      alert(`Please fill in all required fields`);
      return;
    }

    setIsLoading(true);

    try {
      // Create Razorpay order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: user?.id || 'temp_student_id',
          studentEmail: formData.email,
          studentName: `${formData.firstName} ${formData.lastName}`,
          studentPhone: formData.phone,
          courseId: course?.id,
          couponCode: couponCode || undefined,
          amount: discountedPrice,
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'SSSAM Academy',
        description: course?.title,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          // Verify payment
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
            // Redirect to success page
            router.push('/checkout/success');
          } else {
            alert('Payment verification failed. Please contact support.');
            router.push('/checkout');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <Container className="py-12">
        <Heading level={1} className="mb-2">
          Checkout
        </Heading>
        <Text color="muted" className="mb-8">
          Complete your purchase to enroll in the course
        </Text>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white mb-6">
              <Heading level={3} className="mb-6">
                Billing Information
              </Heading>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="First Name" 
                    placeholder="Your first name" 
                    required 
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                  <Input 
                    label="Last Name" 
                    placeholder="Your last name" 
                    required 
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                </div>

                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />

                <Input 
                  label="Phone Number (India)" 
                  type="tel" 
                  placeholder="+91 9XXX XXX XXX" 
                  required 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </form>
            </Card>

            <Card className="p-6 bg-white">
              <Heading level={3} className="mb-6">
                Payment Method
              </Heading>

              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-3 p-4 border-2 border-blue-200 bg-blue-50 rounded-lg cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                  <div>
                    <Text className="font-semibold">Credit/Debit Card</Text>
                    <Text size="sm" color="muted">
                      Secure payment with Razorpay
                    </Text>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <div>
                    <Text className="font-semibold">UPI</Text>
                    <Text size="sm" color="muted">
                      Google Pay, PhonePe, Paytm
                    </Text>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <div>
                    <Text className="font-semibold">Net Banking</Text>
                    <Text size="sm" color="muted">
                      All major Indian banks
                    </Text>
                  </div>
                </label>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={handlePayment}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 bg-white sticky top-24">
              <Heading level={3} className="mb-6">
                Order Summary
              </Heading>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex gap-3 mb-3">
                  <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0" />
                  <div>
                    <Text className="font-semibold line-clamp-2">
                      {course?.title || 'Master Full Stack Web Development'}
                    </Text>
                    <Text size="sm" color="muted">
                      by {course?.instructor || 'Alex Johnson'}
                    </Text>
                  </div>
                </div>
              </div>

              <Divider className="mb-4" />

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <Text color="muted">Subtotal</Text>
                  <Text className="font-semibold">₹{coursePrice.toLocaleString()}</Text>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <Text color="muted">Discount</Text>
                    <Text className="font-semibold text-green-600">-₹{discount.toLocaleString()}</Text>
                  </div>
                )}
                <div className="flex justify-between">
                  <Text color="muted">Tax (18% GST)</Text>
                  <Text className="font-semibold">₹{taxAmount.toLocaleString()}</Text>
                </div>
              </div>

              <Divider className="mb-4" />

              <div className="flex justify-between mb-6">
                <Text className="font-semibold text-lg">Total Amount</Text>
                <Text className="font-bold text-2xl text-blue-600">
                  ₹{totalAmount.toLocaleString()}
                </Text>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Coupon Code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="mb-0"
                  />
                  <Button 
                    variant="outline" 
                    size="md" 
                    onClick={applyCoupon}
                    disabled={!couponCode.trim()}
                  >
                    Apply
                  </Button>
                </div>
                {couponError && (
                  <Text size="sm" color="muted" className="text-red-600">{couponError}</Text>
                )}
                {discount > 0 && (
                  <Text size="sm" color="muted" className="text-green-600">Coupon applied successfully!</Text>
                )}
              </div>

              {/* Security Info */}
              <div className="mt-6 p-3 bg-green-50 rounded-lg">
                <Text size="sm" color="secondary" className="flex gap-2">
                  <span>🔒</span>
                  <span>Your payment is secure and encrypted</span>
                </Text>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}
