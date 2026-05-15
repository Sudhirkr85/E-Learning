'use client';

import { Container, Heading, Text, Button, Input, TextArea } from '@/components/ui';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-950">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-cyan-500/20">
              Contact SSSAM Academy
            </div>
            <Heading level={2} className="mb-4 text-white">
              Speak with our Gurugram career team
            </Heading>
            <Text size="lg" color="muted" className="text-slate-400">
              Ready to join India’s best AI-powered IT training institute? Share your goals and we will guide you on the best batch, course, and placement path.
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] rounded-[2rem] border border-cyan-500/10 bg-slate-900/90 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Subject"
                placeholder="What do you want to learn?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-4">
              <TextArea
                label="Message"
                placeholder="Tell us about your goals or current experience"
                rows={8}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="min-h-[200px]"
              />
              <div className="mt-auto">
                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Submit Inquiry
                </Button>
                <Text size="sm" className="mt-3 text-slate-500">
                  We respond quickly in Hindi & English. Prefer a call? Reach us at +91 92170 31899.
                </Text>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
