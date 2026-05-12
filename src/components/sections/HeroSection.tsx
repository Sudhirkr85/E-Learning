'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import { Container, Button, Heading, Text, Badge } from '@/components/ui';
import { ROUTES } from '@/constants';

interface HeroProps {
  course: Course;
}

export function HeroSection({ course }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <Container className="relative z-10 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            {/* Special Offer Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
              <span className="text-yellow-300">🔥</span>
              SPECIAL OFFER - ONLY ₹9
            </div>

            {/* Main Headline - SEO Optimized */}
            <div className="space-y-4">
              <Heading level={1} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Master Full Stack Web Development
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mt-2">
                  AI-Powered Training for Indian Tech Professionals
                </span>
              </Heading>
              
              {/* Batch Info */}
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500 text-white font-bold px-3 py-1">
                  {course.batchInfo || 'Next Batch: June 15, 2026'}
                </Badge>
                <Badge className="bg-purple-500 text-white font-bold px-3 py-1">
                  {course.level}
                </Badge>
              </div>
              
              {/* Price Highlight */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-green-400">₹{course.price}</span>
                  <span className="text-xl text-gray-400 line-through">₹{course.originalPrice?.toLocaleString('en-IN')}</span>
                </div>
                <Badge className="bg-green-500 text-white font-bold px-3 py-1">
                  {Math.round(((course.originalPrice! - course.price) / course.originalPrice!) * 100)}% OFF
                </Badge>
              </div>
            </div>

            <Text size="lg" className="text-gray-300 text-lg leading-relaxed">
              {course.description}
            </Text>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                href={`/courses/${course.slug}`} 
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Start Learning for ₹{course.price}
              </Button>
              <Button 
                variant="outline" 
                href={ROUTES.COURSES} 
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 hover:border-blue-300 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                All 6 Courses
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">{course.students.toLocaleString()}+</div>
                </div>
                <Text size="sm" className="text-gray-300 font-medium">Students Trained</Text>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 13a3 3 0 105 0H5a3 3 0 00-3-3h6V7a1 1 0 100-2H4a4 4 0 000 8h1v3a3 3 0 003 3h8a1 1 0 100-2h-8a1 1 0 00-1 1v-1h5a4 4 0 000-8z" />
                  </svg>
                  <div className="text-2xl md:text-3xl font-bold text-blue-400">{course.lessons}</div>
                </div>
                <Text size="sm" className="text-gray-300 font-medium">Expert Lessons</Text>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400">{course.rating}</div>
                </div>
                <Text size="sm" className="text-gray-300 font-medium">Avg. Rating</Text>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00-.293.707l-.707.707a1 1 0 101.414 1.414L9 9.414V6z" clipRule="evenodd" />
                  </svg>
                  <div className="text-2xl md:text-3xl font-bold text-purple-400">{course.duration}</div>
                </div>
                <Text size="sm" className="text-gray-300 font-medium">Duration</Text>
              </div>
            </div>

            {/* Trust Indicators - India Specific */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-sm font-semibold text-gray-300 mb-3">Why Choose SSSAM Academy?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/30 border border-green-400">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Certified Trainers with 50+ Years Experience
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/30 border border-green-400">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  95% Placement Success Rate
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/30 border border-green-400">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Live Classes + Lifetime Recordings
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/30 border border-green-400">
                    <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  UPI / Cards / Net Banking / EMI
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image */}
          <div className="relative">
            <div className="relative h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
              Summer Special
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
              Gurugram Based
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
