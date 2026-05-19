import { NextRequest, NextResponse } from 'next/server';
import { ClassSessionModel } from '@/lib/models/class-session';

export async function GET(req: NextRequest) {
  try {
    const courseId = req.nextUrl.searchParams.get('courseId');

    if (!courseId) {
      return NextResponse.json({ success: false, message: 'courseId is required' }, { status: 400 });
    }

    const sessions = await ClassSessionModel.findByCourseId(courseId);

    const publicSessions = (sessions || [])
      .filter((s) => s.active !== false)
      .map((s) => ({
        _id: s._id,
        courseId: s.courseId,
        sessionTitle: s.sessionTitle,
        sessionDate: s.sessionDate,
        sessionTime: s.sessionTime,
        googleMeetLink: s.googleMeetLink,
        active: s.active,
      }));

    return NextResponse.json({ success: true, sessions: publicSessions });
  } catch (error) {
    console.error('Error fetching public sessions:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch sessions' }, { status: 500 });
  }
}
