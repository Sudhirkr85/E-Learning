'use client';

import { Container, Heading, Text, Card } from '@/components/ui';
import { TrainerCard } from '@/components/cards';
import { Trainer } from '@/types';
import { ORGANIZATION_STATS } from '@/constants';

interface TrainersProps {
  trainers: Trainer[];
}

export function TrainersSection({ trainers }: TrainersProps) {
  return (
    <section id="trainers" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 relative overflow-hidden">
      {/* Background Pattern with gradients */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      {/* Decorative gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="text-purple-600">👨‍💼</span>
            Experienced Industry Professionals
          </div>
          <Heading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Learn from Certified Experts & Trainers
          </Heading>
          <Text size="lg" color="muted" className="max-w-3xl mx-auto text-lg leading-relaxed">
            Our instructors are certified professionals with 50+ years of combined experience from Infosys, TCS, Wipro, and other leading IT companies. They bring real-world insights and mentorship to help you succeed in your career.
          </Text>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={trainer.id} className="group" style={{ animationDelay: `${index * 100}ms` }}>
              <TrainerCard trainer={trainer} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 backdrop-blur-sm">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {trainers.length}+
            </div>
            <Text size="lg" className="text-gray-700">
              Expert Trainers
            </Text>
            <Text size="sm" color="muted">
              {ORGANIZATION_STATS.studentsTrainedLabel}
            </Text>
          </div>
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 backdrop-blur-sm">
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
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50 backdrop-blur-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {ORGANIZATION_STATS.studentsTrained}
            </div>
            <Text size="lg" className="text-gray-700">
              {ORGANIZATION_STATS.studentsTrainedLabel}
            </Text>
            <Text size="sm" color="muted">
              Placement support available
            </Text>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200/50 backdrop-blur-sm">
            <Heading level={3} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Become Part of Our Team
            </Heading>
            <Text size="lg" color="muted" className="mb-8 max-w-2xl mx-auto">
              Are you an expert looking to teach and mentor the next generation of Indian tech professionals?
            </Text>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get in Touch
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
