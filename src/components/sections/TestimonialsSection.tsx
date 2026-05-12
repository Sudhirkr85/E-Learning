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
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4">
            What Our Students Say
          </Heading>
          <Text size="lg" color="muted" className="max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with SSSAM Academy
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              title={testimonial.title}
              content={testimonial.content}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
