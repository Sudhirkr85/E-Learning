import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { PurchaseModel } from '@/lib/models/purchase';

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId } = body;
    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const purchase = await PurchaseModel.findByOrderId(orderId);
    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    if (purchase.studentId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Mark the purchase as failed
    const updated = await PurchaseModel.updatePaymentStatus(orderId, purchase.paymentId || '', 'failed');

    if (!updated) {
      return NextResponse.json({ error: 'Failed to cancel order' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Order cancelled' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return NextResponse.json({ error: 'Failed to cancel order' }, { status: 500 });
  }
}
