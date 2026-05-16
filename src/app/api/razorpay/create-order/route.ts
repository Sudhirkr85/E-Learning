import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import razorpay from '@/lib/razorpay';
import { PurchaseModel } from '@/lib/models/purchase';
import { getCourseById, getCourseBySlug } from '@/data/courses';
import { CourseModel } from '@/lib/models/course';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if Razorpay is configured
    if (!razorpay) {
      return NextResponse.json(
        { error: 'Payment service is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      courseId,
      couponCode,
      studentPhone,
    } = body;

    // Validate required fields
    if (!courseId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const dbCourse = await CourseModel.findById(courseId);
    const fallbackCourse = dbCourse || getCourseById(courseId) || getCourseBySlug(courseId);

    if (!fallbackCourse) {
      return NextResponse.json(
        { error: 'Invalid course' },
        { status: 400 }
      );
    }

    const studentId = user.id;
    const studentEmail = user.primaryEmailAddress?.emailAddress || '';
    const studentName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || user.fullName || 'Student';
    if (!studentPhone || typeof studentPhone !== 'string' || !studentPhone.trim()) {
      return NextResponse.json(
        { error: 'Student phone number is required' },
        { status: 400 }
      );
    }

    const normalizedStudentPhone = studentPhone.trim();
    const amount = fallbackCourse.price;

    // If there's an existing pending purchase, tell the client so they can complete or cancel it
    const pending = await PurchaseModel.findPendingPurchase(studentId, courseId);
    if (pending) {
      return NextResponse.json(
        { error: 'Pending purchase exists', code: 'pending_exists', orderId: pending.orderId },
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
      studentPhone: normalizedStudentPhone,
      courseId,
      courseTitle: fallbackCourse.title,
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
