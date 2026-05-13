'use client';

import { Card, Heading, Text } from '@/components/ui';

interface TestimonialCardProps {
  name: string;
  title: string;
  content: string;
  image: string;
  rating: number;
}

export function TestimonialCard({ name, title, content, image, rating }: TestimonialCardProps) {
  return (
    <Card className="p-6 bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-blue-100 text-6xl font-serif opacity-50">
        "
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-6 h-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <Text size="sm" color="secondary" className="mb-4 italic text-gray-700 leading-relaxed relative z-10">
        "{content}"
      </Text>

      {/* Author */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <Text className="font-bold text-gray-900 text-base">
            {name}
          </Text>
          <Text size="sm" color="muted" className="text-gray-600">
            {title}
          </Text>
        </div>
      </div>
    </Card>
  );
}
