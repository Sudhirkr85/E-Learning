'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface ClassSession {
  _id: string;
  courseId: string;
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
  const courseId = params.courseId as string;

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
    sessionTitle: '',
    description: '',
    googleMeetLink: '',
    sessionDate: '',
    sessionTime: '',
    durationMinutes: 60,
    recordingLink: '',
    notes: '',
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
    if (!sessionForm.sessionTitle || !sessionForm.googleMeetLink || !sessionForm.sessionDate || !sessionForm.sessionTime) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const method = editingSession ? 'PUT' : 'POST';
      const body = editingSession
        ? { sessionId: editingSession._id, ...sessionForm }
        : { courseId, ...sessionForm };

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
          description: '',
          googleMeetLink: '',
          sessionDate: '',
          sessionTime: '',
          durationMinutes: 60,
          recordingLink: '',
          notes: '',
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

  const handleEditSession = (session: ClassSession) => {
    setEditingSession(session);
    setSessionForm({
      sessionTitle: session.sessionTitle,
      description: session.description || '',
      googleMeetLink: session.googleMeetLink,
      sessionDate: session.sessionDate.split('T')[0],
      sessionTime: session.sessionTime,
      durationMinutes: session.durationMinutes,
      recordingLink: session.recordingLink || '',
      notes: session.notes || '',
    });
    setShowSessionForm(true);
  };

  if (loading) {
    return (
      <div className="py-12 container mx-auto px-4">
        <div className="animate-pulse h-8 bg-[rgba(255,255,255,0.06)] rounded w-1/4 mb-6" />
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Manage Sessions & Support</h1>
        <p className="text-sm text-[rgba(255,255,255,0.7)]">Course batch scheduling and support contact information</p>
      </div>

      {/* Support Contact Card */}
      <div className="p-6 rounded-lg glass-strong mb-8">
        <h2 className="text-xl font-semibold mb-4">Support Contact</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Instructor Name</label>
            <input
              type="text"
              value={contact.instructorName}
              onChange={(e) => setContact({ ...contact, instructorName: e.target.value })}
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              placeholder="Instructor name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Support Email</label>
            <input
              type="email"
              value={contact.supportEmail}
              onChange={(e) => setContact({ ...contact, supportEmail: e.target.value })}
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              placeholder="support@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Support Phone</label>
            <input
              type="tel"
              value={contact.supportPhone}
              onChange={(e) => setContact({ ...contact, supportPhone: e.target.value })}
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Instructor Email</label>
            <input
              type="email"
              value={contact.instructorEmail || ''}
              onChange={(e) => setContact({ ...contact, instructorEmail: e.target.value })}
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              placeholder="instructor@example.com"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Office Hours</label>
            <input
              type="text"
              value={contact.officeHours || ''}
              onChange={(e) => setContact({ ...contact, officeHours: e.target.value })}
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
              placeholder="e.g., Monday-Friday 9AM-6PM IST"
            />
          </div>
        </div>

        <button onClick={handleSaveContact} className="px-4 py-2 rounded bg-[var(--accent-emerald)] text-black font-semibold hover:opacity-90 transition">
          Save Contact
        </button>
      </div>

      {/* Sessions Section */}
      <div className="p-6 rounded-lg glass-strong">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Class Sessions</h2>
          <button
            onClick={() => {
              setEditingSession(null);
              setSessionForm({
                sessionTitle: '',
                description: '',
                googleMeetLink: '',
                sessionDate: '',
                sessionTime: '',
                durationMinutes: 60,
                recordingLink: '',
                notes: '',
              });
              setShowSessionForm(!showSessionForm);
            }}
            className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition"
          >
            {showSessionForm ? 'Cancel' : '+ Add Session'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showSessionForm && (
          <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.05)] mb-6">
            <h3 className="text-lg font-semibold mb-4">{editingSession ? 'Edit Session' : 'Add New Session'}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Session Title</label>
                <input
                  type="text"
                  value={sessionForm.sessionTitle}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
                  placeholder="e.g., Lecture 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Google Meet Link</label>
                <input
                  type="url"
                  value={sessionForm.googleMeetLink}
                  onChange={(e) => setSessionForm({ ...sessionForm, googleMeetLink: e.target.value })}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Date</label>
                <input
                  type="date"
                  value={sessionForm.sessionDate}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Time</label>
                <input
                  type="time"
                  value={sessionForm.sessionTime}
                  onChange={(e) => setSessionForm({ ...sessionForm, sessionTime: e.target.value })}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Duration (min)</label>
                <input
                  type="number"
                  value={sessionForm.durationMinutes}
                  onChange={(e) => setSessionForm({ ...sessionForm, durationMinutes: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Recording Link (optional)</label>
                <input
                  type="url"
                  value={sessionForm.recordingLink}
                  onChange={(e) => setSessionForm({ ...sessionForm, recordingLink: e.target.value })}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
                  placeholder="YouTube link..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[rgba(255,255,255,0.85)] mb-2">Description</label>
                <textarea
                  value={sessionForm.description}
                  onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none"
                  placeholder="Session details..."
                  rows={2}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={handleAddSession} className="px-4 py-2 rounded bg-[var(--accent-primary)] text-black font-semibold hover:opacity-90 transition">
                {editingSession ? 'Update' : 'Create'}
              </button>
              <button onClick={() => setShowSessionForm(false)} className="px-4 py-2 rounded bg-[rgba(255,255,255,0.03)] text-white hover:bg-[rgba(255,255,255,0.05)] transition">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Sessions List */}
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <div className="py-8 text-center text-[rgba(255,255,255,0.6)]">No sessions created yet</div>
          ) : (
            sessions.map((session) => (
              <div key={session._id} className="p-4 rounded-lg bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)] transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold">{session.sessionTitle}</h4>
                    {session.description && <p className="text-sm text-[rgba(255,255,255,0.6)] mt-1">{session.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditSession(session)}
                      className="px-3 py-1 rounded bg-[rgba(6,182,212,0.12)] text-[var(--accent-primary)] text-sm hover:bg-[rgba(6,182,212,0.2)] transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSession(session._id)}
                      className="px-3 py-1 rounded bg-[rgba(236,72,153,0.12)] text-[var(--accent-tertiary)] text-sm hover:bg-[rgba(236,72,153,0.2)] transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">Date</div>
                    <p className="font-medium">{new Date(session.sessionDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">Time</div>
                    <p className="font-medium">{session.sessionTime}</p>
                  </div>
                  <div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">Duration</div>
                    <p className="font-medium">{session.durationMinutes}m</p>
                  </div>
                  <div>
                    <div className="text-xs text-[rgba(255,255,255,0.6)]">Status</div>
                    <p className="font-medium text-[var(--accent-primary)]">{new Date(session.sessionDate) > new Date() ? 'Upcoming' : 'Completed'}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap">
                  {session.googleMeetLink && (
                    <a href={session.googleMeetLink} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded bg-[rgba(6,182,212,0.12)] text-[var(--accent-primary)] hover:bg-[rgba(6,182,212,0.2)] transition">
                      Join Meet
                    </a>
                  )}
                  {session.recordingLink && (
                    <a href={session.recordingLink} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded bg-[rgba(139,92,246,0.12)] text-[var(--accent-secondary)] hover:bg-[rgba(139,92,246,0.2)] transition">
                      Watch Recording
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
