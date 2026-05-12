import { Header, Footer } from '@/components/layout';
import { Container, Heading, Text, Card, Button, Input, Divider } from '@/components/ui';
import { ROUTES } from '@/constants';

export const metadata = {
  title: 'Checkout - SSSAM Academy',
  description: 'Complete your course purchase',
};

export default function CheckoutPage() {
  const coursePrice = 4999;
  const taxAmount = Math.round(coursePrice * 0.18);
  const totalAmount = coursePrice + taxAmount;

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

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" required />
                  <Input label="Last Name" placeholder="Doe" required />
                </div>

                <Input label="Email Address" type="email" placeholder="john@example.com" required />

                <Input label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" required />

                <Input label="Address" placeholder="123 Main St" required />

                <div className="grid grid-cols-2 gap-4">
                  <Input label="City" placeholder="New York" required />
                  <Input label="ZIP Code" placeholder="10001" required />
                </div>

                <Input label="Country" placeholder="United States" required />
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

              <Button variant="primary" size="lg" className="w-full">
                Proceed to Payment
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
                      Master Full Stack Web Development
                    </Text>
                    <Text size="sm" color="muted">
                      by Alex Johnson
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

              <Input placeholder="Coupon Code" className="mb-3" />
              <Button variant="outline" size="md" className="w-full">
                Apply Coupon
              </Button>

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
