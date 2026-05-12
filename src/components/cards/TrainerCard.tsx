'use client';

import { Trainer } from '@/types';
import { Card, Text, Heading } from '@/components/ui';

interface TrainerCardProps {
  trainer: Trainer;
}

const avatarGradients: { [key: string]: string } = {
  'AS': 'from-blue-500 to-cyan-500',
  'PS': 'from-purple-500 to-pink-500',
  'VP': 'from-green-500 to-blue-500',
  'NG': 'from-orange-500 to-red-500',
  'RK': 'from-indigo-500 to-purple-500',
};

export function TrainerCard({ trainer }: TrainerCardProps) {
  const gradientClass = avatarGradients[trainer.image] || 'from-slate-500 to-slate-600';
  
  return (
    <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-lg h-full flex flex-col">
      {/* Avatar Container with Glassmorphism */}
      <div className={`relative w-full h-48 bg-gradient-to-br ${gradientClass} overflow-hidden flex items-center justify-center`}>
        {/* Blur effect background */}
        <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
        
        {/* Avatar Circle with Initials */}
        <div className={`relative z-10 w-24 h-24 rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 border-4 border-white/30`}>
          <span className="text-4xl font-bold">{trainer.image}</span>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Expertise Badge */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-gray-800 text-center line-clamp-1">
            {trainer.expertise.split(',')[0]}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Name and Title */}
        <div className="text-center mb-3">
          <Heading level={4} className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {trainer.name}
          </Heading>
          <Text size="sm" color="muted" className="font-medium text-gray-600">
            {trainer.title}
          </Text>
        </div>

        {/* Bio */}
        <Text size="sm" color="secondary" className="text-gray-700 line-clamp-3 mb-4 text-center leading-relaxed flex-grow">
          {trainer.bio}
        </Text>

        {/* Social Links */}
        {trainer.socials && (
          <div className="flex gap-3 justify-center items-center pt-4 border-t border-gray-200">
            {trainer.socials.linkedin && (
              <a
                href={trainer.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
            {trainer.socials.twitter && (
              <a
                href={trainer.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-sky-100 to-sky-200 text-sky-600 rounded-full flex items-center justify-center hover:from-sky-600 hover:to-sky-700 hover:text-white transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Twitter Profile"
                title="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            )}
            {trainer.socials.website && (
              <a
                href={trainer.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:from-gray-600 hover:to-gray-700 hover:text-white transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="Website"
                title="Website"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
