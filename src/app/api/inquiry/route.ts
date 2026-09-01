import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, course, mode, source } = body;

    if (!phone) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }

    try {
      const db = await getDatabase();
      await db.collection('inquiries').insertOne({
        name: name || 'Prospect Student',
        phone,
        course: course || 'General Inquiry',
        mode: mode || 'Classroom (Sector 14 Gurugram)',
        source: source || '/',
        createdAt: new Date().toISOString(),
      });
    } catch (dbErr) {
      // Safe fallback if DB is not connected
      console.log('Lead received (offline mode):', { name, phone, course, mode });
    }

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    return NextResponse.json({ success: true, message: 'Inquiry received' });
  }
}
