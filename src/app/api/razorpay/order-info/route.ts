import { NextRequest, NextResponse } from 'next/server';
import { PurchaseModel } from '@/lib/models/purchase';

export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get('orderId');
    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const purchase = await PurchaseModel.findByOrderId(orderId);
    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      orderId: purchase.orderId,
      amount: purchase.amount * 100, // return paise
      currency: purchase.currency || 'INR',
      key: process.env.RAZORPAY_KEY_ID,
      courseTitle: purchase.courseTitle,
    });
  } catch (error) {
    console.error('Error fetching order info:', error);
    return NextResponse.json({ error: 'Failed to fetch order info' }, { status: 500 });
  }
}
