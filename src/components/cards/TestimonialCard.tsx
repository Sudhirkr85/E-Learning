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
    <Card className="p-6">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <Text size="sm" color="secondary" className="mb-4 italic">
        "{content}"
      </Text>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
          {/* Avatar placeholder */}
        </div>
        <div>
          <Text className="font-semibold text-gray-900">
            {name}
          </Text>
          <Text size="sm" color="muted">
            {title}
          </Text>
        </div>
      </div>
    </Card>
  );
}
