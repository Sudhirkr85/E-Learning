import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { verifyAdminSession } from '@/lib/admin-auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ couponId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { couponId } = await params;
    const db = await getDatabase();
    const coupon = await db.collection('coupons').findOne({ id: couponId });
    
    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      coupon: {
        ...coupon,
        _id: undefined
      }
    });
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupon' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ couponId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { couponId } = await params;
    const body = await request.json();
    const db = await getDatabase();
    
    // If code is being updated, check if it already exists for another coupon
    if (body.code) {
      const existingCoupon = await db.collection('coupons').findOne({ 
        code: body.code.toUpperCase(),
        id: { $ne: couponId }
      });
      
      if (existingCoupon) {
        return NextResponse.json(
          { success: false, error: 'Coupon code already exists' },
          { status: 400 }
        );
      }
    }
    
    const updatedCoupon = {
      ...body,
      code: body.code ? body.code.toUpperCase() : undefined,
      updatedAt: new Date().toISOString(),
    };
    
    const result = await db.collection('coupons').updateOne(
      { id: couponId },
      { $set: updatedCoupon }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      coupon: updatedCoupon
    });
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update coupon' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ couponId: string }> }
) {
  try {
    const isAuthenticated = await verifyAdminSession();
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { couponId } = await params;
    const db = await getDatabase();
    const result = await db.collection('coupons').deleteOne({ id: couponId });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Coupon deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete coupon' },
      { status: 500 }
    );
  }
}
