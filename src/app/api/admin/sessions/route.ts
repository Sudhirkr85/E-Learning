import { NextRequest, NextResponse } from 'next/server';
import { ClassSessionModel } from '@/lib/models/class-session';
import { getCourseById } from '@/data/courses';

const normalizeExternalUrl = (value: unknown) => {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  try {
    return new URL(trimmed).toString();
  } catch {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return '';
    }
  }
};

export async function GET(req: NextRequest) {
  try {
    const courseId = req.nextUrl.searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ success: false, message: 'courseId is required' }, { status: 400 });
    }

    const sessions = await ClassSessionModel.findByCourseId(courseId);

    return NextResponse.json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch sessions',
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId: bodyCourseId, googleMeetLink, sessionTitle, sessionDate, sessionTime, active } = body;
    const normalizedGoogleMeetLink = normalizeExternalUrl(googleMeetLink);

    // Validate required fields
    if (!bodyCourseId || !normalizedGoogleMeetLink || !sessionTitle || !sessionDate || !sessionTime) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields',
      }, { status: 400 });
    }

    // Verify course exists
    const course = getCourseById(bodyCourseId);
    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Course not found',
      }, { status: 404 });
    }

    const session = await ClassSessionModel.createSession({
      courseId: bodyCourseId,
      googleMeetLink: normalizedGoogleMeetLink,
      sessionTitle,
      sessionDate,
      sessionTime,
      active: typeof active === 'boolean' ? active : true,
    });

    return NextResponse.json({
      success: true,
      session,
      message: 'Session created successfully',
    });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to create session',
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, ...updateData } = body;

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        message: 'Session ID is required',
      }, { status: 400 });
    }

    const normalizedUpdateData = {
      ...updateData,
      ...(updateData.googleMeetLink ? { googleMeetLink: normalizeExternalUrl(updateData.googleMeetLink) } : {}),
    };

    if (updateData.courseId) {
      const course = getCourseById(updateData.courseId);
      if (!course) {
        return NextResponse.json({ success: false, message: 'Course not found' }, { status: 404 });
      }
    }

    const success = await ClassSessionModel.updateSession(sessionId, normalizedUpdateData);

    if (!success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to update session',
      }, { status: 500 });
    }

    const updatedSession = await ClassSessionModel.getSessionById(sessionId);

    return NextResponse.json({
      success: true,
      session: updatedSession,
      message: 'Session updated successfully',
    });
  } catch (error) {
    console.error('Error updating session:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update session',
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({
        success: false,
        message: 'Session ID is required',
      }, { status: 400 });
    }

    const success = await ClassSessionModel.deleteSession(sessionId);

    if (!success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to delete session',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Session deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete session',
    }, { status: 500 });
  }
}
