import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { PurchaseModel } from '@/lib/models/purchase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // Verify signature
    const body_str = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body_str)
      .digest('hex');

    if (razorpay_signature !== expected_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update purchase record
    const updated = await PurchaseModel.updatePaymentStatus(
      razorpay_order_id,
      razorpay_payment_id,
      'completed'
    );

    if (!updated) {
      return NextResponse.json(
        { error: 'Purchase record not found' },
        { status: 404 }
      );
    }

    // Get purchase details for response
    const purchase = await PurchaseModel.findByOrderId(razorpay_order_id);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      purchase: {
        orderId: purchase?.orderId,
        paymentId: purchase?.paymentId,
        courseId: purchase?.courseId,
        courseTitle: purchase?.courseTitle,
        amount: purchase?.amount,
        studentEmail: purchase?.studentEmail,
        studentName: purchase?.studentName,
        studentPhone: purchase?.studentPhone,
        purchaseDate: purchase?.purchaseDate,
        status: purchase?.status,
      },
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
