'use client';

import { Container, Heading, Text, Button, Input, TextArea } from '@/components/ui';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) return;
    setIsSubmitting(true);

    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          course: formData.course.trim() || 'General Inquiry',
          mode: 'Classroom (Sector 14 Gurugram) / Live Online',
          source: '/#contact',
        }),
      });
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', course: '', message: '' });
    } catch (err) {
      // safe fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Hi SSSAM Academy! I am interested in training at your Sector 14 Gurugram center. Please share batch details.'
    );
    window.open(`https://wa.me/919217031899?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-950">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-cyan-500/20">
              📍 Sector 14, Gurugram Center
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
                label="Full Name *"
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="WhatsApp Mobile Number *"
                placeholder="e.g. 9217031899"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                inputMode="numeric"
                maxLength={10}
                required
              />
              <Input
                label="Course Interested In *"
                placeholder="e.g. Full Stack Development / Data Science"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />
              <Input
                label="Email (Optional)"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-4">
              <TextArea
                label="Message / Career Goals"
                placeholder="Tell us if you want Weekend, Weekday, or Classroom batch in Sector 14 Gurugram"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[160px]"
              />

              {isSubmitted && (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/15 p-3 text-center">
                  <p className="text-xs font-bold text-emerald-300">
                    ✓ Request Received! Counselor will call you shortly.
                  </p>
                </div>
              )}

              <div className="mt-auto space-y-3">
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Submitting...' : 'Request Free Demo & Fee Quote'}
                </Button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <span>💬 Or Chat Directly on WhatsApp</span>
                </button>
                <Text size="sm" className="text-slate-500 text-center">
                  Prefer a direct call? Reach us at <a href="tel:+919217031899" className="text-cyan-400 font-semibold">+91 92170 31899</a>.
                </Text>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
