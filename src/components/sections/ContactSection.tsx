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
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              Get in Touch
            </Heading>
            <Text size="lg" color="muted">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            </div>

            <Input
              label="Subject"
              placeholder="What is this about?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="mb-4"
            />

            <TextArea
              label="Message"
              placeholder="Tell us more..."
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="mb-6"
            />

            <Button type="submit" variant="primary" size="lg">
              Send Message
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
