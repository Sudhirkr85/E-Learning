'use client';

import { Container, Heading, Text, Card } from '@/components/ui';
import { Lesson } from '@/types';

interface CurriculumPreviewProps {
  lessons: Lesson[];
}

export function CurriculumPreview({ lessons }: CurriculumPreviewProps) {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Spider-web background */}
      <div className="absolute inset-0 opacity-35" style={{
        backgroundImage: `
          linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.055) 25%, rgba(6, 182, 212, 0.055) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.055) 75%, rgba(6, 182, 212, 0.055) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, 0.055) 25%, rgba(139, 92, 246, 0.055) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, 0.055) 75%, rgba(139, 92, 246, 0.055) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '50px 50px',
      }} />
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto">
          <Heading level={2} className="mb-4 text-white">
            Curriculum Overview
          </Heading>
          <Text size="lg" color="muted" className="mb-12 text-slate-400">
            Get a sneak peek at what you'll learn in this course
          </Text>

          <div className="space-y-3">
            {lessons.slice(0, 8).map((lesson, index) => (
              <Card key={lesson.id} className="p-4 border border-slate-700 bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-semibold border border-cyan-500/50">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">
                      {lesson.title}
                    </h4>
                    {lesson.description && (
                      <Text size="sm" color="muted" className="mb-2 text-slate-400">
                        {lesson.description}
                      </Text>
                    )}
                    <Text size="sm" color="muted" className="text-xs text-slate-500">
                      ⏱️ {lesson.duration} minutes
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {lessons.length > 8 && (
            <div className="mt-6 text-center">
              <Text color="muted" className="text-slate-400">
                +{lessons.length - 8} more lessons in the full course
              </Text>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
