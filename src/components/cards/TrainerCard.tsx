'use client';

import Image from 'next/image';
import { Trainer } from '@/types';
import { Card, Text, Heading } from '@/components/ui';

interface TrainerCardProps {
  trainer: Trainer;
}

export function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <Card className="overflow-hidden text-center">
      {/* Image */}
      <div className="relative w-full h-64 bg-gray-200">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <Heading level={4} className="mb-1">
          {trainer.name}
        </Heading>
        <Text size="sm" color="muted" className="mb-3">
          {trainer.title}
        </Text>

        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <Text size="sm" color="primary" className="font-medium">
            Expertise
          </Text>
          <Text size="sm" color="secondary" className="mt-1">
            {trainer.expertise}
          </Text>
        </div>

        <Text size="sm" color="secondary" className="mb-4 line-clamp-3">
          {trainer.bio}
        </Text>

        {/* Social Links */}
        {trainer.socials && (
          <div className="flex gap-2 justify-center">
            {trainer.socials.linkedin && (
              <a
                href={trainer.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                in
              </a>
            )}
            {trainer.socials.twitter && (
              <a
                href={trainer.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                𝕏
              </a>
            )}
            {trainer.socials.website && (
              <a
                href={trainer.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-800"
              >
                🌐
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
