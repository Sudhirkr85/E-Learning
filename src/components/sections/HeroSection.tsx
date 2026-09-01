'use client';

import Link from 'next/link';
import { Course } from '@/types';
import { Container, Heading, Text, Badge } from '@/components/ui';
import { openCounselorModal } from '@/components/ui/CounselorModal';
import { ROUTES } from '@/constants';
import { getNextMonthlyBatchLabel } from '@/lib/batch';
import { useRef, useEffect } from 'react';

interface HeroProps {
  course?: Course;
}

export function HeroSection({ course }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hi SSSAM Academy! I want to inquire about upcoming IT & AI classroom batches at your Sector 14 Gurugram center. Please share demo class details.'
    );
    window.open(`https://wa.me/919217031899?text=${message}`, '_blank');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = 80;
    const particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
      });
    }

    particlesRef.current = particles;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.55)';
        ctx.fill();

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 * (1 - distance / 130)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 170) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(147, 51, 234, ${0.45 * (1 - distance / 170)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden border-b border-slate-800/60">
      {/* Dynamic Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.95 }}
      />

      {/* Atmospheric Glow */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 pt-8 pb-14 md:pt-12 md:pb-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Location Pill */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-200 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md shadow-xl">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>📍 Sector 14 Gurugram Center • 2026 Admissions Open</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Top <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">AI & IT Training</span> Institute in Gurugram
            </Heading>

            <Text size="lg" className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-normal">
              Master <strong>Full Stack Web Dev, Data Science, Power BI, Cyber Security & Digital Marketing</strong> with hands-on classroom batches at Sector 14 Gurugram & 100% placement assistance.
            </Text>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1 text-xs sm:text-sm text-slate-300 font-medium">
            <span className="bg-slate-900/90 border border-slate-700 px-3.5 py-1.5 rounded-xl shadow">⭐ 4.9/5 Rating (2,840+ Alumni)</span>
            <span className="bg-slate-900/90 border border-slate-700 px-3.5 py-1.5 rounded-xl shadow">🏫 AC Labs & Dedicated Systems</span>
            <span className="bg-slate-900/90 border border-slate-700 px-3.5 py-1.5 rounded-xl shadow">💼 100% Placement Support</span>
            <span className="bg-slate-900/90 border border-slate-700 px-3.5 py-1.5 rounded-xl shadow">📅 Weekday & Weekend Batches</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 max-w-lg mx-auto">
            <button
              onClick={() => openCounselorModal('General IT Career Counseling')}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-7 rounded-xl shadow-xl shadow-cyan-500/25 transition transform hover:scale-105 text-base"
            >
              <span>🎓 Book Free Demo Class</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-7 rounded-xl shadow-xl shadow-emerald-600/25 transition transform hover:scale-105 text-base"
            >
              <span>💬 Chat on WhatsApp</span>
            </button>
          </div>

          <div className="pt-2">
            <Link
              href={ROUTES.COURSES}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 font-medium transition underline underline-offset-4"
            >
              <span>Explore all 80+ Specialized IT & Digital Marketing Courses →</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-8 border-t border-slate-800/80">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">2,800+</div>
              <div className="text-xs text-slate-400 mt-1">Students Trained</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">₹4.5 - ₹18 LPA</div>
              <div className="text-xs text-slate-400 mt-1">Salary Packages</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-purple-400">120+</div>
              <div className="text-xs text-slate-400 mt-1">Hiring Partners</div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-yellow-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Placement Assistance</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
