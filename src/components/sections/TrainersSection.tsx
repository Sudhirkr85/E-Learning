'use client';

import { Container, Heading, Text, Card } from '@/components/ui';
import { TrainerCard } from '@/components/cards';
import { Trainer } from '@/types';

interface TrainersProps {
  trainers: Trainer[];
}

export function TrainersSection({ trainers }: TrainersProps) {
  return (
    <section id="trainers" className="py-16 md:py-24 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="mb-4">
            Meet Our Expert Trainers
          </Heading>
          <Text size="lg" color="muted" className="max-w-2xl mx-auto">
            Learn from industry professionals with years of experience
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {trainers.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </Container>
    </section>
  );
}
