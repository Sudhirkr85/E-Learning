import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { Coupon } from '@/types';

export async function GET() {
  try {
    const db = await getDatabase();
    const coupons = await db.collection('coupons').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({
      success: true,
      coupons: coupons.map(coupon => ({
        ...coupon,
        _id: undefined
      }))
    });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = await getDatabase();
    
    // Check if coupon code already exists
    const existingCoupon = await db.collection('coupons').findOne({ 
      code: body.code.toUpperCase() 
    });
    
    if (existingCoupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon code already exists' },
        { status: 400 }
      );
    }
    
    const newCoupon: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt'> = {
      ...body,
      id: new Date().getTime().toString(),
      code: body.code.toUpperCase(),
      usedCount: 0,
      isActive: body.isActive !== undefined ? body.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db.collection('coupons').insertOne(newCoupon);
    
    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        coupon: newCoupon
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to create coupon' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create coupon' },
      { status: 500 }
    );
  }
}
