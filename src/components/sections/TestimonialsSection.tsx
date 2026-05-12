'use client';

import { Container, Heading, Text } from '@/components/ui';
import { TestimonialCard } from '@/components/cards';

interface TestimonialData {
  id: string;
  name: string;
  title: string;
  image: string;
  content: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

export function TestimonialsSection({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="text-green-600">💬</span>
            Student Success Stories
          </div>
          <Heading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Students Say
          </Heading>
          <Text size="lg" color="muted" className="max-w-3xl mx-auto text-lg leading-relaxed">
            Join thousands of students who have transformed their careers with SSSAM Academy. Read their success stories and experiences.
          </Text>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`transform transition-all duration-500 hover:scale-105`} style={{ animationDelay: `${index * 100}ms` }}>
              <TestimonialCard
                name={testimonial.name}
                title={testimonial.title}
                content={testimonial.content}
                image={testimonial.image}
                rating={testimonial.rating}
              />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <Heading level={3} className="text-2xl md:text-3xl font-bold mb-8">
            Trusted by Thousands of Learners
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <Text size="lg" className="text-blue-100">
                Average Rating
              </Text>
              <Text size="sm" className="text-blue-200">
                Based on 2,500+ reviews
              </Text>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <Text size="lg" className="text-blue-100">
                Success Rate
              </Text>
              <Text size="sm" className="text-blue-200">
                Students achieving goals
              </Text>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <Text size="lg" className="text-blue-100">
                Countries
              </Text>
              <Text size="sm" className="text-blue-200">
                Global student community
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
