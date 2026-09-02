'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { openCounselorModal } from '@/components/ui/CounselorModal';
import { ROUTES } from '@/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/95 backdrop-blur-md shadow-xl border-b border-slate-800'
          : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/40'
      }`}
    >
      {/* Top Local Gurugram Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-b border-cyan-500/20 py-1.5 px-4 text-center text-xs text-slate-300">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>📍 Gurugram Center: <strong>Sector 14 (Old DLF Colony)</strong> • Admissions Open for 2026 Batches</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <a href="tel:+919217031899" className="hover:text-cyan-400 font-semibold flex items-center gap-1">
              📞 +91 92170 31899
            </a>
            <span>•</span>
            <span className="text-emerald-400 font-medium">100% Placement Support</span>
          </div>
        </div>
      </div>

      <Container className="py-3.5">
        <div className="flex items-center justify-between text-white">
          {/* Logo */}
          <div className="flex flex-col">
            <Link href={ROUTES.HOME} className="flex items-center gap-2.5 group">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
                SSSAM Academy
              </span>
            </Link>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              School of AI & Advanced IT Training
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <Link href={ROUTES.HOME} className="text-slate-300 hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href={ROUTES.COURSES} className="text-slate-300 hover:text-cyan-400 transition-colors">
              All Courses
            </Link>
            <a
              href="https://sssamacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:text-cyan-200 transition-colors font-semibold"
            >
              Main Portal (sssamacademy.com) ↗
            </a>
            <Link href="/#contact" className="text-slate-300 hover:text-cyan-400 transition-colors">
              Center Location
            </Link>
          </nav>

          {/* Action CTAs (Call & Book Demo) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919217031899"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-cyan-500/50 transition"
            >
              <span>📞 +91 92170 31899</span>
            </a>
            <button
              onClick={() => openCounselorModal('General IT Course Inquiry')}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold px-4 py-2.5 shadow-lg shadow-cyan-500/20 transition transform hover:scale-105"
            >
              🎓 Book Free Demo Class
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-slate-800' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="space-y-3 text-sm pb-2">
            <Link
              href={ROUTES.HOME}
              className="block text-slate-300 hover:text-cyan-400 py-1.5 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={ROUTES.COURSES}
              className="block text-slate-300 hover:text-cyan-400 py-1.5 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              All Courses
            </Link>
            <a
              href="https://sssamacademy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-cyan-300 hover:text-cyan-200 py-1.5 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Main Portal (sssamacademy.com) ↗
            </a>
            <Link
              href="/#contact"
              className="block text-slate-300 hover:text-cyan-400 py-1.5 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sector 14 Gurugram Center
            </Link>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <a
                href="tel:+919217031899"
                className="w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200"
              >
                📞 Call: +91 92170 31899
              </a>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openCounselorModal('General IT Course Inquiry');
                }}
                className="w-full text-center py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
              >
                🎓 Book Free Demo Class
              </button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
