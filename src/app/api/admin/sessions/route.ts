import { NextRequest, NextResponse } from 'next/server';
import { ClassSessionModel } from '@/lib/models/class-session';
import { CourseModel } from '@/lib/models/course';

export async function GET(req: NextRequest) {
  try {
    const courseId = req.nextUrl.searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({
        success: false,
        message: 'Course ID is required',
      }, { status: 400 });
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
    const { courseId, googleMeetLink, sessionTitle, description, sessionDate, sessionTime, durationMinutes, recordingLink, notes } = body;

    // Validate required fields
    if (!courseId || !googleMeetLink || !sessionTitle || !sessionDate || !sessionTime || !durationMinutes) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields',
      }, { status: 400 });
    }

    // Verify course exists
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return NextResponse.json({
        success: false,
        message: 'Course not found',
      }, { status: 404 });
    }

    const session = await ClassSessionModel.createSession({
      courseId,
      googleMeetLink,
      sessionTitle,
      description,
      sessionDate,
      sessionTime,
      durationMinutes,
      recordingLink,
      notes,
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

    const success = await ClassSessionModel.updateSession(sessionId, updateData);

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
