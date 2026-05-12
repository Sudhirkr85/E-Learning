import { NextRequest, NextResponse } from 'next/server';
import razorpay from '@/lib/razorpay';
import { PurchaseModel } from '@/lib/models/purchase';
import { getFeaturedCourse } from '@/data/courses';

export async function POST(request: NextRequest) {
  try {
    // Check if Razorpay is configured
    if (!razorpay) {
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { 
      studentId, 
      studentEmail, 
      studentName, 
      studentPhone, 
      courseId, 
      couponCode,
      amount 
    } = body;

    // Validate required fields
    if (!studentId || !studentEmail || !studentName || !studentPhone || !courseId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get course details
    const course = getFeaturedCourse();
    if (!course || course.id !== courseId) {
      return NextResponse.json(
        { error: 'Invalid course' },
        { status: 400 }
      );
    }

    // Check if student already purchased this course
    const hasPurchased = await PurchaseModel.hasStudentPurchasedCourse(studentId, courseId);
    if (hasPurchased) {
      return NextResponse.json(
        { error: 'You have already purchased this course' },
        { status: 400 }
      );
    }

    // Calculate amounts
    let discountAmount = 0;
    let finalAmount = amount;

    // TODO: Implement coupon validation logic here
    if (couponCode) {
      // For now, let's add a simple discount logic
      if (couponCode === 'TEST10') {
        discountAmount = Math.round(amount * 0.1);
        finalAmount = amount - discountAmount;
      }
    }

    const taxAmount = Math.round(finalAmount * 0.18);
    const totalAmount = finalAmount + taxAmount;

    // Create Razorpay order
    const options = {
      amount: totalAmount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        studentId,
        courseId,
        originalAmount: amount,
        discountAmount,
        taxAmount,
        couponCode: couponCode || '',
      },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create purchase record in database
    await PurchaseModel.create({
      orderId: razorpayOrder.id,
      studentId,
      studentEmail,
      studentName,
      studentPhone,
      courseId,
      courseTitle: course.title,
      amount: totalAmount,
      currency: 'INR',
      status: 'pending',
      paymentMethod: 'razorpay',
      couponCode,
      discountAmount,
      originalAmount: amount,
      taxAmount,
    });

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      finalAmount,
      taxAmount,
      discountAmount,
      originalAmount: amount,
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
