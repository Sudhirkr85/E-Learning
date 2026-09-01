'use client';

import { useState, useEffect } from 'react';
import { seoTopics } from '@/data/seo-topics';

interface CounselorModalProps {
  initialCourse?: string;
}

export function CounselorModal({ initialCourse = '' }: CounselorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredMode, setPreferredMode] = useState('Classroom Training (Sector 14 Gurugram)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.course) {
        setSelectedCourse(e.detail.course);
      }
      setIsSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener('open-counselor-modal', handleOpen);
    return () => window.removeEventListener('open-counselor-modal', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) return;
    setLoading(true);

    try {
      // Send inquiry to server
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName || 'Prospect Student',
          phone: phoneNumber,
          course: selectedCourse || 'General IT Course Inquiry',
          mode: preferredMode,
          source: window.location.pathname,
          createdAt: new Date().toISOString(),
        }),
      }).catch(() => {});
    } catch (err) {
      // Continue anyway to provide immediate student assistance
    }

    setLoading(false);
    setIsSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const courseText = selectedCourse || 'IT Training';
    const message = encodeURIComponent(
      `Hi SSSAM Academy! My name is ${fullName || 'Student'}. I am interested in ${courseText} (${preferredMode}) at your Sector 14 Gurugram Center. Please share fee structure & demo batch timings.`
    );
    window.open(`https://wa.me/919217031899?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900 shadow-2xl shadow-cyan-500/10 p-6 sm:p-8 text-white">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-lg transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Our Senior Course Counselor will call you at <span className="text-cyan-400 font-semibold">{phoneNumber}</span> shortly with discounted fee structure and demo class passes.
            </p>

            <button
              onClick={handleWhatsAppRedirect}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition text-base"
            >
              <span>💬 Chat on WhatsApp with Counselor Now</span>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 text-xs text-slate-400 hover:text-slate-200"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                📍 Gurugram Sector 14 Center
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Up to 40% Off
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1">
              Talk to Senior Counselor
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Get detailed syllabus, demo class schedule, batch timings, and discounted fee quotes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  WhatsApp / Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Interested Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="">-- Select Course --</option>
                  {seoTopics.map((t) => (
                    <option key={t.topic} value={t.label}>
                      {t.icon} {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Preferred Learning Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredMode('Classroom Training (Sector 14 Gurugram)')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                      preferredMode.includes('Classroom')
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    🏫 Classroom (Sector 14)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredMode('Live Online Interactive Batch')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                      preferredMode.includes('Online')
                        ? 'border-cyan-500 bg-cyan-500/20 text-cyan-200'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    💻 Live Online Batch
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 py-3.5 font-bold text-white shadow-lg shadow-cyan-500/20 transition text-sm disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Request Free Counseling & Demo Class'}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <a
                href="tel:+919217031899"
                className="hover:text-cyan-300 flex items-center gap-1.5"
              >
                📞 Call: +91 92170 31899
              </a>
              <button
                onClick={handleWhatsAppRedirect}
                className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5"
              >
                💬 WhatsApp Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Global trigger function to open modal from any button
export function openCounselorModal(courseName?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-counselor-modal', {
        detail: { course: courseName || '' },
      })
    );
  }
}
