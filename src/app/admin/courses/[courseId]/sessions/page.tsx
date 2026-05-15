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
  active?: boolean;
  googleMeetLink: string;
  sessionTitle: string;
  description?: string;
  sessionDate: string;
  sessionTime: string;
  durationMinutes: number;
  recordingLink?: string;
  notes?: string;
}

interface CourseContact {
  supportEmail: string;
  supportPhone: string;
  instructorName: string;
  instructorEmail?: string;
  officeHours?: string;
}

export default function ManageSessionsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const currentCourse = courses.find((course) => course.id === courseId) || courses[0];

  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [contact, setContact] = useState<CourseContact>({
    supportEmail: '',
    supportPhone: '',
    instructorName: '',
    instructorEmail: '',
    officeHours: '',
  });
  const [loading, setLoading] = useState(true);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null);

  const [sessionForm, setSessionForm] = useState({
    courseId: currentCourse?.id || courseId,
    sessionTitle: '',
    description: '',
    googleMeetLink: '',
    sessionDate: '',
    sessionTime: '',
    durationMinutes: 60,
    recordingLink: '',
    notes: '',
    active: true,
  });

  useEffect(() => {
    fetchData();
  }, [courseId]);

  const fetchData = async () => {
    try {
      const [sessionsRes, contactRes] = await Promise.all([
        fetch(`/api/admin/sessions?courseId=${courseId}`),
        fetch(`/api/admin/course-contact?courseId=${courseId}`),
      ]);

      const sessionsData = await sessionsRes.json();
      const contactData = await contactRes.json();

      if (sessionsData.success) {
        setSessions(sessionsData.sessions || []);
      }

      if (contactData.success && contactData.contact) {
        setContact(contactData.contact);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async () => {
    try {
      const response = await fetch('/api/admin/course-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, ...contact }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Contact information saved successfully!');
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact information');
    }
  };

  const handleAddSession = async () => {
    if (!sessionForm.courseId || !sessionForm.sessionTitle || !sessionForm.googleMeetLink || !sessionForm.sessionDate || !sessionForm.sessionTime) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const method = editingSession ? 'PUT' : 'POST';
      const body = editingSession
        ? { sessionId: editingSession._id, ...sessionForm }
        : { ...sessionForm };

      const response = await fetch('/api/admin/sessions', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        alert(editingSession ? 'Session updated!' : 'Session created!');
        const selectedCourseId = sessionForm.courseId;
        if (selectedCourseId !== courseId) {
          router.push(`/admin/courses/${selectedCourseId}/sessions`);
          return;
        }
        setSessionForm({
          courseId,
          sessionTitle: '',
          description: '',
          googleMeetLink: '',
          sessionDate: '',
          sessionTime: '',
          durationMinutes: 60,
          recordingLink: '',
          notes: '',
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
      courseId: session.courseId || courseId,
      sessionTitle: session.sessionTitle,
      description: session.description || '',
      googleMeetLink: session.googleMeetLink,
      sessionDate: session.sessionDate.split('T')[0],
      sessionTime: session.sessionTime,
      durationMinutes: session.durationMinutes,
      recordingLink: session.recordingLink || '',
      notes: session.notes || '',
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
        <Heading className="mb-8">Manage Course Sessions & Support</Heading>

        <Card className="p-4 mb-8 border-slate-700 bg-slate-800/80">
          <p className="text-sm text-slate-300">
            Working course: <span className="font-semibold text-white">{currentCourse?.title || 'Select a course'}</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">The dropdown uses the six static courses from src/data/courses.ts.</p>
        </Card>

        {/* Contact Information Section */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Support Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Instructor Name *
              </label>
              <Input
                type="text"
                value={contact.instructorName}
                onChange={(e) => setContact({ ...contact, instructorName: e.target.value })}
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Support Email *
              </label>
              <Input
                type="email"
                value={contact.supportEmail}
                onChange={(e) => setContact({ ...contact, supportEmail: e.target.value })}
                placeholder="support@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Support Phone *
              </label>
              <Input
                type="tel"
                value={contact.supportPhone}
                onChange={(e) => setContact({ ...contact, supportPhone: e.target.value })}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Instructor Email
              </label>
              <Input
                type="email"
                value={contact.instructorEmail || ''}
                onChange={(e) => setContact({ ...contact, instructorEmail: e.target.value })}
                placeholder="instructor@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Office Hours
              </label>
              <Input
                type="text"
                value={contact.officeHours || ''}
                onChange={(e) => setContact({ ...contact, officeHours: e.target.value })}
                placeholder="e.g., Monday-Friday 9AM-6PM IST"
              />
            </div>
          </div>

          <Button onClick={handleSaveContact} className="bg-green-600 hover:bg-green-700">
            Save Contact Information
          </Button>
        </Card>

        {/* Sessions Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Class Sessions</h3>
            <Button
              onClick={() => {
                setEditingSession(null);
                setSessionForm({
                  courseId,
                  sessionTitle: '',
                  description: '',
                  googleMeetLink: '',
                  sessionDate: '',
                  sessionTime: '',
                  durationMinutes: 60,
                  recordingLink: '',
                  notes: '',
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
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Course *
                  </label>
                  <select
                    value={sessionForm.courseId}
                    onChange={(e) => setSessionForm({ ...sessionForm, courseId: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-slate-400">Choose one of the static course entries. The session will be saved against the selected course.</p>
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

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    value={sessionForm.durationMinutes}
                    onChange={(e) => setSessionForm({ ...sessionForm, durationMinutes: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Recording Link (optional)
                  </label>
                  <Input
                    type="url"
                    value={sessionForm.recordingLink}
                    onChange={(e) => setSessionForm({ ...sessionForm, recordingLink: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Description
                  </label>
                  <textarea
                    value={sessionForm.description}
                    onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                    placeholder="Session details..."
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    rows={3}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={sessionForm.notes}
                    onChange={(e) => setSessionForm({ ...sessionForm, notes: e.target.value })}
                    placeholder="Additional notes..."
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    rows={2}
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
                      {session.description && (
                        <p className="text-sm text-slate-300 mt-1">{session.description}</p>
                      )}
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

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
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
                      <span className="text-slate-400">Duration:</span>
                      <p className="text-white font-medium">{session.durationMinutes} min</p>
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

                  {session.recordingLink && (
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <a
                        href={session.recordingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 text-sm"
                      >
                        📹 View Recording
                      </a>
                    </div>
                  )}
                  {!session.recordingLink && (
                    <div className="mt-3 pt-3 border-t border-slate-600 text-sm text-slate-300">
                      Recording not added yet. Please contact support.
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </Container>
  );
}
