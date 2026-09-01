import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

const CENTRAL_CRM_URL = 'https://api.sssamacademy.com/api/enquiry';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, fullName, phone, phoneNumber, course, mode, email, source } = body;

    const studentName = (fullName || name || 'Prospect Student').trim();
    const studentPhone = (phoneNumber || phone || '').toString().replace(/\D/g, '').slice(0, 10);
    const studentCourse = (course || 'General IT Course Inquiry').trim();
    const studentEmail = (email || '').trim();

    if (!studentPhone || studentPhone.length < 10) {
      return NextResponse.json(
        { success: false, message: 'Valid 10-digit phone number is required' },
        { status: 400 }
      );
    }

    // 1. Save to Local MongoDB
    try {
      const db = await getDatabase();
      await db.collection('inquiries').insertOne({
        name: studentName,
        phone: studentPhone,
        course: studentCourse,
        mode: mode || 'Classroom (Sector 14 Gurugram)',
        email: studentEmail,
        source: source || '/',
        createdAt: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.log('Local DB Log (Offline):', { studentName, studentPhone, studentCourse });
    }

    // 2. Forward to Central CRM Backend API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      await fetch(CENTRAL_CRM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: studentName,
          phoneNumber: studentPhone,
          course: studentCourse,
          customCourseName: '',
          email: studentEmail,
        }),
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));
    } catch (crmErr) {
      // Non-blocking catch to ensure student experience is smooth
      console.log('Central CRM forward logged:', studentPhone);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
    });
  } catch (error) {
    return NextResponse.json({ success: true, message: 'Inquiry received' });
  }
}
