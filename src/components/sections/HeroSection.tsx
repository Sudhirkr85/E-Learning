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
              LIMITED TIME OFFER
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <Heading level={1} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Master AI Full Stack
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Development
                </span>
              </Heading>
              
              {/* Price Highlight */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-green-400">₹9</span>
                  <span className="text-xl text-gray-400 line-through">₹9,999</span>
                </div>
                <Badge className="bg-green-500 text-white font-bold px-3 py-1">
                  99% OFF
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
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  Enroll Now for ₹9
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
              <Button 
                variant="outline" 
                href={ROUTES.COURSES} 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold py-4 px-8 rounded-lg transition-all duration-200"
              >
                View Curriculum
              </Button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{course.students.toLocaleString()}+</div>
                <Text size="sm" className="text-gray-400">Students</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{course.lessons}</div>
                <Text size="sm" className="text-gray-400">Lessons</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{course.rating}</div>
                <Text size="sm" className="text-gray-400">Rating</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{course.duration}</div>
                <Text size="sm" className="text-gray-400">Duration</Text>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 pt-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Money-back Guarantee
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lifetime Access
              </span>
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
              Bestseller
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
              {course.level}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
