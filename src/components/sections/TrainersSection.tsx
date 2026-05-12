'use client';

import { Container, Heading, Text, Card } from '@/components/ui';
import { TrainerCard } from '@/components/cards';
import { Trainer } from '@/types';

interface TrainersProps {
  trainers: Trainer[];
}

export function TrainersSection({ trainers }: TrainersProps) {
  return (
    <section id="trainers" className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="text-purple-600">👨‍🏫</span>
            Expert Instructors
          </div>
          <Heading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Learn from Industry Leaders
          </Heading>
          <Text size="lg" color="muted" className="max-w-3xl mx-auto text-lg leading-relaxed">
            Our trainers are seasoned professionals with real-world experience, bringing you the latest insights and best practices from the tech industry.
          </Text>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div key={trainer.id} className="group">
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {trainers.length}+
            </div>
            <Text size="lg" className="text-gray-700">
              Expert Trainers
            </Text>
            <Text size="sm" color="muted">
              Across multiple domains
            </Text>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              50+
            </div>
            <Text size="lg" className="text-gray-700">
              Years Combined Experience
            </Text>
            <Text size="sm" color="muted">
              In tech industry
            </Text>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              10,000+
            </div>
            <Text size="lg" className="text-gray-700">
              Students Trained
            </Text>
            <Text size="sm" color="muted">
              Successfully placed
            </Text>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <Heading level={3} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Become an Instructor
            </Heading>
            <Text size="lg" color="muted" className="mb-8 max-w-2xl mx-auto">
              Join our team of expert instructors and share your knowledge with thousands of eager learners worldwide.
            </Text>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Apply to Teach
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
