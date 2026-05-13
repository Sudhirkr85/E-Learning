'use client';

import { useState } from 'react';
import { Container, Heading, Text, Card } from '@/components/ui';
import { FAQ } from '@/types';

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.02%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')]"></div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span className="text-orange-600">❓</span>
              Common Questions Answered
            </div>
            <Heading level={2} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              FAQs About SSSAM Academy Courses
            </Heading>
            <Text className="max-w-3xl mx-auto text-lg leading-8 text-slate-600 font-medium">
              Learn about our training programs, enrollment process, payment options, placement support, and online learning experience. Get answers to help you choose the right course for your career goals.
            </Text>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left group hover:bg-gray-50 transition-all duration-200"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${openId === faq.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                      }`}>
                      {index + 1}
                    </div>
                    <Text className="font-semibold text-gray-900 text-base md:text-lg leading-tight">
                      {faq.question}
                    </Text>
                  </div>
                  <div className={`ml-4 transition-all duration-300 ${openId === faq.id ? 'rotate-180 text-blue-600' : 'text-gray-400'
                    }`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-96' : 'max-h-0'
                  }`}>
                  <div className="px-6 md:px-8 py-5 md:py-6 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-100">
                    <Text color="secondary" className="text-gray-700 leading-relaxed text-base">
                      {faq.answer}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white">
              <Heading level={3} className="text-2xl md:text-3xl font-bold mb-4">
                Still Have Questions?
              </Heading>
              <Text size="lg" className="text-orange-100 mb-8 max-w-2xl mx-auto">
                Our support team is here to help you with any questions about courses, enrollment, or your learning journey.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Contact Support
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a
                  href="tel:+1234567890"
                  className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
                >
                  Call Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
