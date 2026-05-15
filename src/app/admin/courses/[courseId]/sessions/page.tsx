'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Container,
  Text,
  Heading,
  Card,
  Button,
  Input,
} from '@/components/ui';
import { courses } from '@/data/courses';

interface ClassSession {
  _id: string;
  courseId: string;
  googleMeetLink: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
  active?: boolean;
}

export default function ManageSessionsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const selectedCourse = courses.find((course) => course.id === courseId);
  const currentCourse = selectedCourse || courses[0];

  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null);

  const [sessionForm, setSessionForm] = useState({
    sessionTitle: '',
    googleMeetLink: '',
    sessionDate: '',
    sessionTime: '',
    active: true,
  });

  useEffect(() => {
    fetchData();
  }, [courseId]);

  useEffect(() => {
    if (!selectedCourse && courseId) {
      router.replace(`/admin/courses/${currentCourse.id}/sessions`);
    }
  }, [courseId, selectedCourse, currentCourse.id, router]);

  const fetchData = async () => {
    try {
      const sessionsRes = await fetch(`/api/admin/sessions?courseId=${encodeURIComponent(currentCourse.id)}`);
      const sessionsData = await sessionsRes.json();

      if (sessionsData.success) {
        setSessions(sessionsData.sessions || []);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSession = async () => {
    if (!sessionForm.sessionTitle || !sessionForm.googleMeetLink || !sessionForm.sessionDate || !sessionForm.sessionTime) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const payload = {
        courseId: currentCourse.id,
        googleMeetLink: sessionForm.googleMeetLink,
        sessionTitle: sessionForm.sessionTitle,
        sessionDate: sessionForm.sessionDate,
        sessionTime: sessionForm.sessionTime,
        active: sessionForm.active,
      };

      const method = editingSession ? 'PUT' : 'POST';
      const body = editingSession
        ? { sessionId: editingSession._id, ...payload }
        : payload;

      const response = await fetch('/api/admin/sessions', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        alert(editingSession ? 'Session updated!' : 'Session created!');
        setSessionForm({
          sessionTitle: '',
          googleMeetLink: '',
          sessionDate: '',
          sessionTime: '',
          active: true,
        });
        setEditingSession(null);
        setShowSessionForm(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error saving session:', error);
      alert('Failed to save session');
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to delete this session?')) return;

    try {
      const response = await fetch(`/api/admin/sessions?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        alert('Session deleted!');
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Failed to delete session');
    }
  };

  const handleToggleActive = async (sessionId: string, current: boolean) => {
    try {
      const response = await fetch('/api/admin/sessions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, active: !current }),
      });

      const data = await response.json();
      if (data.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error toggling active state:', error);
      alert('Failed to update session state');
    }
  };

  const handleEditSession = (session: ClassSession) => {
    setEditingSession(session);

    setSessionForm({
      sessionTitle: session.sessionTitle,
      googleMeetLink: session.googleMeetLink,
      sessionDate: session.sessionDate.split('T')[0],
      sessionTime: session.sessionTime,
      active: typeof session.active === 'boolean' ? session.active : true,
    });
    setShowSessionForm(true);
  };

  if (loading) {
    return (
      <Container>
        <div className="py-12">
          <Text className="text-slate-300">Loading...</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <Heading>Manage Live Class Sessions</Heading>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="text-sm font-medium text-slate-200">Select course</label>
            <select
              value={currentCourse.id}
              onChange={(e) => router.push(`/admin/courses/${e.target.value}/sessions`)}
              className="rounded-lg bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.id} - {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Card className="p-4 mb-8 border-slate-700 bg-slate-800/80">
          <p className="text-sm text-slate-300">
            Course: <span className="font-semibold text-white">{currentCourse?.title || 'Select a course'}</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">Sessions are stored by course ID from src/data/courses.ts</p>
        </Card>

        {/* Sessions Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Class Sessions</h3>
            <Button
              onClick={() => {
                setEditingSession(null);
                setSessionForm({
                  sessionTitle: '',
                  googleMeetLink: '',
                  sessionDate: '',
                  sessionTime: '',
                  active: true,
                });
                setShowSessionForm(!showSessionForm);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {showSessionForm ? 'Cancel' : '+ Add Session'}
            </Button>
          </div>

          {showSessionForm && (
            <div className="bg-slate-800 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                {editingSession ? 'Edit Session' : 'Create New Session'}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-300 mb-2">
                    Course: <span className="font-semibold text-white">{currentCourse.title}</span>
                  </p>
                  <p className="text-xs text-slate-400">This session will be saved for the current course only.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Session Title *
                  </label>
                  <Input
                    type="text"
                    value={sessionForm.sessionTitle}
                    onChange={(e) => setSessionForm({ ...sessionForm, sessionTitle: e.target.value })}
                    placeholder="e.g., Lecture 1 - Introduction"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Google Meet Link *
                  </label>
                  <Input
                    type="url"
                    value={sessionForm.googleMeetLink}
                    onChange={(e) => setSessionForm({ ...sessionForm, googleMeetLink: e.target.value })}
                    placeholder="https://meet.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Session Date *
                  </label>
                  <Input
                    type="date"
                    value={sessionForm.sessionDate}
                    onChange={(e) => setSessionForm({ ...sessionForm, sessionDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Session Time *
                  </label>
                  <Input
                    type="time"
                    value={sessionForm.sessionTime}
                    onChange={(e) => setSessionForm({ ...sessionForm, sessionTime: e.target.value })}
                  />
                </div>


                <div className="md:col-span-2 flex items-center gap-3">
                  <label className="text-sm font-medium text-slate-200">Active</label>
                  <input
                    type="checkbox"
                    checked={sessionForm.active}
                    onChange={(e) => setSessionForm({ ...sessionForm, active: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <p className="text-xs text-slate-400">When inactive, session will be hidden from students.</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddSession} className="bg-green-600 hover:bg-green-700">
                  {editingSession ? 'Update Session' : 'Create Session'}
                </Button>
                <Button
                  onClick={() => setShowSessionForm(false)}
                  className="bg-slate-700 hover:bg-slate-600"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {sessions.length === 0 ? (
              <Text className="text-slate-400">No sessions created yet</Text>
            ) : (
              sessions.map((session) => (
                <div key={session._id} className="bg-slate-700 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-white">{session.sessionTitle}</h4>
                    </div>
                    <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSession(session)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSession(session._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleToggleActive(session._id, (session as any).active ?? true)}
                          className={`px-3 py-1 text-white text-sm rounded transition ${((session as any).active ?? true) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-600 hover:bg-slate-500'}`}
                        >
                          {((session as any).active ?? true) ? 'Active' : 'Inactive'}
                        </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-slate-400">Date:</span>
                      <p className="text-white font-medium">
                        {new Date(session.sessionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400">Time:</span>
                      <p className="text-white font-medium">{session.sessionTime}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Meet Link:</span>
                      <a
                        href={session.googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs"
                      >
                        Open Link
                      </a>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
}
