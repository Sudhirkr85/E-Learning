'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Container, Button, Heading, Text, Badge } from '@/components/ui';
import { ROUTES } from '@/constants';
import { getNextMonthlyBatchDateString } from '@/lib/batch';
import { useState, useRef, useEffect } from 'react';

interface HeroProps {
  course: Course;
}

export function HeroSection({ course }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

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

    // Initialize particles
    const particleCount = 80;
    const particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
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

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
        ctx.fill();

        // Draw connections to nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Draw connections to mouse
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(147, 51, 234, ${0.3 * (1 - distance / 150)})`;
          ctx.lineWidth = 0.8;
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
    <section className="relative bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden">
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <Container className="relative z-10 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4">
            {/* Special Offer Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/60 to-pink-600/60 border border-red-500/40 text-white px-4 py-2 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm">
              <span className="text-lg">🔥</span>
              SPECIAL OFFER - ONLY ₹9
            </div>

            {/* Main Headline - SEO Optimized */}
            <div className="space-y-3">
              <Heading level={1} className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
                Master Full Stack
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Web Development
                </span>
              </Heading>

              {/* Subheading */}
              <Text size="lg" className="text-foreground-secondary font-medium">
                AI-Powered Training for Indian Tech Professionals
              </Text>

              {/* Batch Info */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Badge variant="info">
                  📅 {getNextMonthlyBatchDateString()}
                </Badge>
                <Badge variant="success">
                  🎯 {course.level}
                </Badge>
              </div>

              {/* Price Highlight */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    ₹{course.price}
                  </span>
                  <span className="text-lg text-foreground-tertiary line-through">
                    ₹{course.originalPrice?.toLocaleString('en-IN')}
                  </span>
                </div>
                <Badge variant="warning">
                  Save {Math.round(((course.originalPrice! - course.price) / course.originalPrice!) * 100)}%
                </Badge>
              </div>
            </div>

            <Text size="lg" className="text-foreground-secondary leading-relaxed pt-1">
              {course.description}
            </Text>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                variant="primary"
                href={`/courses/${course.slug}`}
                size="lg"
                className="group"
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Start Learning Now
              </Button>
              <Button
                variant="outline"
                href={ROUTES.COURSES}
                size="lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                All  Courses
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-700/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{course.students.toLocaleString()}+</div>
                <Text size="sm" className="text-foreground-tertiary text-xs">Students</Text>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">{course.lessons}</div>
                <Text size="sm" className="text-foreground-tertiary text-xs">Lessons</Text>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">{course.rating}</div>
                <Text size="sm" className="text-foreground-tertiary text-xs">Rating</Text>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{course.duration}</div>
                <Text size="sm" className="text-foreground-tertiary text-xs">Duration</Text>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-3 border-t border-slate-700/50">
              {[
                '✓ Certified Trainers (5+ Years XP)',
                '✓ 95% Placement Success',
                '✓ Live Classes + Lifetime Access',
                '✓ UPI/Cards/EMI Available'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground-secondary">
                  <span className="text-emerald-400 font-bold">{item.split(' ')[0]}</span>
                  {item.substring(2)}
                </div>
              ))}
            </div>
          </div>

          {/* Featured Image Section */}
          <div className="hidden lg:block relative">
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/20 bg-[#020617]">

              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 z-0" />

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={900}
                  height={700}
                  priority
                  className="w-full h-full object-contain rounded-2xl z-10"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20 pointer-events-none" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-background px-5 py-3 rounded-xl font-bold shadow-xl animate-bounce z-30">
              🌟 Summer Special
            </div>

          </div>
        </div>
      </Container>
    </section >
  );
}
