'use client';

import { Container, Heading, Text, Card } from '@/components/ui';
import { Lesson } from '@/types';

interface CurriculumPreviewProps {
  lessons: Lesson[];
}

export function CurriculumPreview({ lessons }: CurriculumPreviewProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Heading level={2} className="mb-4">
            Curriculum Overview
          </Heading>
          <Text size="lg" color="muted" className="mb-12">
            Get a sneak peek at what you'll learn in this course
          </Text>

          <div className="space-y-3">
            {lessons.slice(0, 8).map((lesson, index) => (
              <Card key={lesson.id} className="p-4 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {lesson.title}
                    </h4>
                    {lesson.description && (
                      <Text size="sm" color="muted" className="mb-2">
                        {lesson.description}
                      </Text>
                    )}
                    <Text size="sm" color="muted" className="text-xs">
                      ⏱️ {lesson.duration} minutes
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {lessons.length > 8 && (
            <div className="mt-6 text-center">
              <Text color="muted">
                +{lessons.length - 8} more lessons in the full course
              </Text>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
