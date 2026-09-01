'use client';

import { openCounselorModal } from './CounselorModal';

interface EnrollCourseButtonProps {
  courseTitle: string;
  className?: string;
  variant?: 'primary' | 'whatsapp' | 'outline';
  label?: string;
}

export function EnrollCourseButton({
  courseTitle,
  className = '',
  variant = 'primary',
  label,
}: EnrollCourseButtonProps) {
  const handleClick = () => {
    openCounselorModal(courseTitle);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi SSSAM Academy! I am interested in ${courseTitle} at your Sector 14 Gurugram center. Please share the syllabus, discounted fee structure, and next demo class schedule.`
    );
    window.open(`https://wa.me/919217031899?text=${message}`, '_blank');
  };

  if (variant === 'whatsapp') {
    return (
      <button
        onClick={handleWhatsApp}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 shadow-lg shadow-emerald-600/20 transition ${className}`}
      >
        <span>💬 Get Fees on WhatsApp</span>
      </button>
    );
  }

  if (variant === 'outline') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold py-3.5 px-6 transition ${className}`}
      >
        <span>{label || 'Book Free Demo Class'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 shadow-lg shadow-cyan-500/20 transition transform hover:scale-105 ${className}`}
    >
      <span>{label || 'Request Fee Structure & Demo'}</span>
    </button>
  );
}
