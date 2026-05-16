import { NextRequest, NextResponse } from 'next/server';
import { PurchaseModel } from '@/lib/models/purchase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('order_id');
    const paymentId = searchParams.get('payment_id');

    if (!orderId && !paymentId) {
      return NextResponse.json(
        { error: 'Missing order_id or payment_id parameter' },
        { status: 400 }
      );
    }

    let purchase;
    if (orderId) {
      purchase = await PurchaseModel.findByOrderId(orderId);
    } else if (paymentId) {
      purchase = await PurchaseModel.findByPaymentId(paymentId);
    }

    if (!purchase) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      purchase: {
        orderId: purchase.orderId,
        paymentId: purchase.paymentId,
        courseId: purchase.courseId,
        courseTitle: purchase.courseTitle,
        amount: purchase.amount,
        studentEmail: purchase.studentEmail,
        studentName: purchase.studentName,
        studentPhone: purchase.studentPhone,
        status: purchase.status,
        purchaseDate: purchase.purchaseDate,
      },
    });

  } catch (error) {
    console.error('Error fetching purchase:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchase details' },
      { status: 500 }
    );
  }
}
