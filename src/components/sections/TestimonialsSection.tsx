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
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-40 right-20 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="text-green-600">⭐</span>
            Success Stories from Indian Students
          </div>
          <Heading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            See How Our Graduates Achieved Their Goals
          </Heading>
          <Text size="lg" color="muted" className="max-w-3xl mx-auto text-lg leading-relaxed">
            Join 15,000+ Indian students who have successfully launched their tech careers with SSSAM Academy. Discover real success stories, placements, and salary increments from our alumni across leading IT companies.
          </Text>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="transform transition-all duration-500 hover:scale-105" style={{ animationDelay: `${index * 100}ms` }}>
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

        {/* Stats Section with Glassmorphism */}
        <div className="bg-gradient-to-br from-blue-700 via-purple-700 to-blue-800 rounded-3xl p-8 md:p-14 text-white text-center shadow-2xl border border-blue-400/30 backdrop-blur-xl">
          <Heading level={3} className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12">
            Why Indian Students Trust SSSAM Academy
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl font-bold mb-3 text-cyan-400">4.9/5</div>
              <div className="text-lg font-semibold text-blue-100 mb-1">
                Highest Rating
              </div>
              <Text size="sm" className="text-blue-200">
                From 2,500+ student reviews
              </Text>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl font-bold mb-3 text-emerald-400">15,000+</div>
              <div className="text-lg font-semibold text-blue-100 mb-1">
                Successful Placements
              </div>
              <Text size="sm" className="text-blue-200">
                In Infosys, TCS, Wipro & more
              </Text>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-5xl font-bold mb-3 text-yellow-400">95%</div>
              <div className="text-lg font-semibold text-blue-100 mb-1">
                Success Rate
              </div>
              <Text size="sm" className="text-blue-200">
                Career advancement achieved
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
