import { NextRequest, NextResponse } from 'next/server';
import { CourseContactModel } from '@/lib/models/class-session';
import { getCourseById } from '@/data/courses';

export async function GET(req: NextRequest) {
  try {
    const courseId = req.nextUrl.searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: 'Course ID is required',
      }, { status: 400 });
    }

    const contact = await CourseContactModel.findByCourseId(courseId);

    return NextResponse.json({
      success: true,
      contact: contact || null,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch contact',
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, supportEmail, supportPhone, instructorName, instructorEmail, officeHours } = body;

    // Validate required fields
    if (!courseId || !supportEmail || !supportPhone || !instructorName) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields',
      }, { status: 400 });
    }

    const course = getCourseById(courseId);
    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Course not found',
      }, { status: 404 });
    }

    const contact = await CourseContactModel.createOrUpdate({
      courseId,
      supportEmail,
      supportPhone,
      instructorName,
      instructorEmail,
      officeHours,
    });

    return NextResponse.json({
      success: true,
      contact,
      message: 'Contact information saved successfully',
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to save contact',
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, ...updateData } = body;

    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: 'Course ID is required',
      }, { status: 400 });
    }

    const success = await CourseContactModel.updateByCourseId(courseId, updateData);

    if (!success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to update contact',
      }, { status: 500 });
    }

    const updatedContact = await CourseContactModel.findByCourseId(courseId);

    return NextResponse.json({
      success: true,
      contact: updatedContact,
      message: 'Contact information updated successfully',
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update contact',
    }, { status: 500 });
  }
}
