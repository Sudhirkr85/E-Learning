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
    <section id="faq" className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              Frequently Asked Questions
            </Heading>
            <Text size="lg" color="muted">
              Find answers to common questions about our courses
            </Text>
          </div>

          <div className="space-y-3">
            {faqs.map(faq => (
              <Card key={faq.id} className="border border-gray-200">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  <Text className="font-semibold">{faq.question}</Text>
                  <span className={`text-2xl transition-transform ${openId === faq.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openId === faq.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <Text color="secondary">{faq.answer}</Text>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
