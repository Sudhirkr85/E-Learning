import { NextResponse } from 'next/server';
import { handleAdminLogout } from '@/lib/admin-auth';

export async function POST() {
  try {
    await handleAdminLogout();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin logout API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
