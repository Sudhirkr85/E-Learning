'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatDateIndia } from '@/utils/helpers';

type CertificateRow = {
  certificateId: string;
  studentName: string;
  studentEmail?: string;
  courseTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  completionDate?: string | null;
  trainingStartDate?: string | null;
  trainingEndDate?: string | null;
  issueDate?: string | null;
  approvedBy?: string | null;
  notes?: string;
  createdAt: string;
};

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState<Record<string, { completionDate: string; startDate: string; endDate: string; notes: string }>>({});

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/certificates');
      const data = await response.json();

      if (response.ok && data.success) {
        setCertificates(data.certificates || []);
        const nextEditing: Record<string, { completionDate: string; startDate: string; endDate: string; notes: string }> = {};
        (data.certificates || []).forEach((certificate: CertificateRow) => {
          nextEditing[certificate.certificateId] = {
            completionDate: certificate.completionDate ? certificate.completionDate.slice(0, 10) : '',
            startDate: certificate.trainingStartDate ? certificate.trainingStartDate.slice(0, 10) : '',
            endDate: certificate.trainingEndDate ? certificate.trainingEndDate.slice(0, 10) : '',
            notes: certificate.notes || '',
          };
        });
        setEditing(nextEditing);
      } else {
        setMessage(data.error || 'Failed to load certificates.');
      }
    } catch (error) {
      console.error('Error loading admin certificates:', error);
      setMessage('Failed to load certificates.');
    } finally {
      setLoading(false);
    }
  };

  const counts = useMemo(() => ({
    pending: certificates.filter(item => item.status === 'pending').length,
    approved: certificates.filter(item => item.status === 'approved').length,
    rejected: certificates.filter(item => item.status === 'rejected').length,
  }), [certificates]);

  const updateCertificate = async (certificateId: string, status: CertificateRow['status']) => {
    const form = editing[certificateId];
    try {
      setMessage('');
      const response = await fetch(`/api/admin/certificates/${certificateId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificateId,
          status,
          approvedBy: 'Admin',
          issueDate: status === 'approved' ? new Date().toISOString() : null,
          completionDate: form?.completionDate ? new Date(form.completionDate).toISOString() : null,
          trainingStartDate: form?.startDate ? new Date(form.startDate).toISOString() : null,
          trainingEndDate: form?.endDate ? new Date(form.endDate).toISOString() : null,
          notes: form?.notes || '',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(`Certificate ${status}.`);
        await fetchCertificates();
      } else {
        setMessage(data.error || 'Unable to update certificate.');
      }
    } catch (error) {
      console.error('Error updating certificate:', error);
      setMessage('Unable to update certificate.');
    }
  };

  if (loading) {
    return <div className="py-12 text-slate-300">Loading certificates...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8bb72]">Admin Certificates</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Review certificate requests</h1>
        <p className="mt-2 text-slate-300">Approve, reject, and set completion details before students can download their certificates.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-slate-950/80 p-4 text-white"><p className="text-sm text-slate-400">Pending</p><p className="mt-2 text-3xl font-semibold">{counts.pending}</p></div>
        <div className="rounded-2xl border border-white/8 bg-slate-950/80 p-4 text-white"><p className="text-sm text-slate-400">Approved</p><p className="mt-2 text-3xl font-semibold">{counts.approved}</p></div>
        <div className="rounded-2xl border border-white/8 bg-slate-950/80 p-4 text-white"><p className="text-sm text-slate-400">Rejected</p><p className="mt-2 text-3xl font-semibold">{counts.rejected}</p></div>
      </div>

      {message ? <div className="rounded-2xl border border-white/8 bg-white/5 p-4 text-sm text-[#f0d48c]">{message}</div> : null}

      <div className="overflow-hidden rounded-[28px] border border-white/8 bg-slate-950/80 shadow-2xl shadow-black/30">
        <div className="overflow-x-auto">
          <table className="min-w-[1080px] w-full text-left text-sm text-slate-200">
            <thead className="border-b border-white/8 bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Completion</th>
                <th className="px-5 py-4">Training Period</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {certificates.map((certificate) => {
                const values = editing[certificate.certificateId] || { completionDate: '', startDate: '', endDate: '', notes: '' };

                return (
                  <tr key={certificate.certificateId} className="align-top">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{certificate.studentName}</p>
                      <p className="mt-1 text-xs text-slate-400">{certificate.studentEmail || 'No email recorded'}</p>
                      <p className="mt-2 font-mono text-xs text-[#f0d48c]">{certificate.certificateId}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{certificate.courseTitle}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${certificate.status === 'approved' ? 'bg-emerald-500/15 text-emerald-300' : certificate.status === 'rejected' ? 'bg-red-500/15 text-red-300' : 'bg-amber-500/15 text-amber-200'}`}>
                        {certificate.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <input
                        type="date"
                        value={values.completionDate}
                        onChange={(event) => setEditing(previous => ({ ...previous, [certificate.certificateId]: { ...values, completionDate: event.target.value } }))}
                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none"
                      />
                      <textarea
                        value={values.notes}
                        onChange={(event) => setEditing(previous => ({ ...previous, [certificate.certificateId]: { ...values, notes: event.target.value } }))}
                        placeholder="Admin notes"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none"
                        rows={2}
                      />
                    </td>
                    <td className="px-5 py-4 space-y-2">
                      <input
                        type="date"
                        value={values.startDate}
                        onChange={(event) => setEditing(previous => ({ ...previous, [certificate.certificateId]: { ...values, startDate: event.target.value } }))}
                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none"
                      />
                      <input
                        type="date"
                        value={values.endDate}
                        onChange={(event) => setEditing(previous => ({ ...previous, [certificate.certificateId]: { ...values, endDate: event.target.value } }))}
                        className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none"
                      />
                    </td>
                    <td className="px-5 py-4">
                      {certificate.status !== 'approved' ? (
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => updateCertificate(certificate.certificateId, 'approved')} className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-emerald-950">Approve</button>
                          <button onClick={() => updateCertificate(certificate.certificateId, 'rejected')} className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-red-950">Reject</button>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-300">Approved</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {certificates.length === 0 ? <div className="p-8 text-center text-slate-400">No certificate requests yet.</div> : null}
      </div>
    </div>
  );
}
