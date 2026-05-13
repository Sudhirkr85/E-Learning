'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Container, Button, Heading, Text, Badge } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useState, useRef, useEffect } from 'react';

interface HeroProps {
  course: Course;
}

export function HeroSection({ course }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const meshRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!meshRef.current) return;
      const rect = meshRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden" ref={meshRef}>
      {/* Mesh Background with Cursor Reveal */}
      <div className="absolute inset-0 mesh-background opacity-100" style={{
        backgroundPosition: `${mousePos.x * 0.05}px ${mousePos.y * 0.05}px`,
      }}></div>
      
      {/* Cursor Reveal Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, rgba(6,182,212,0.08) 0%, transparent 70%)`
        }}
      ></div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <Container className="relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            {/* Special Offer Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600/60 to-pink-600/60 border border-red-500/40 text-white px-4 py-2 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm">
              <span className="text-lg">🔥</span>
              SPECIAL OFFER - ONLY ₹9
            </div>

            {/* Main Headline - SEO Optimized */}
            <div className="space-y-4">
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
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge variant="info">
                  📅 {course.batchInfo || 'Next Batch: June 15, 2026'}
                </Badge>
                <Badge variant="success">
                  🎯 {course.level}
                </Badge>
              </div>
              
              {/* Price Highlight */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
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

            <Text size="lg" className="text-foreground-secondary leading-relaxed pt-2">
              {course.description}
            </Text>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                All 6 Courses
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-slate-700/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{course.students.toLocaleString()}+</div>
                <Text size="xs" className="text-foreground-tertiary">Students</Text>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">{course.lessons}</div>
                <Text size="xs" className="text-foreground-tertiary">Lessons</Text>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">{course.rating}</div>
                <Text size="xs" className="text-foreground-tertiary">Rating</Text>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{course.duration}</div>
                <Text size="xs" className="text-foreground-tertiary">Duration</Text>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-6 border-t border-slate-700/50">
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
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl glow-strong">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover object-center"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/0 to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-background px-5 py-3 rounded-xl font-bold shadow-xl animate-bounce">
              🌟 Summer Special
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-3 rounded-xl font-bold shadow-xl">
              📍 Gurugram Based
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
