'use client';

import { createElement } from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const sizes = {
  1: 'text-4xl md:text-5xl font-bold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-bold',
  4: 'text-xl md:text-2xl font-bold',
  5: 'text-lg md:text-xl font-semibold',
  6: 'text-base md:text-lg font-semibold',
};

export function Heading({ level = 2, children, className = '' }: HeadingProps) {
  const sizeClass = sizes[level];

  return createElement(
    `h${level}`,
    { className: `text-gray-900 ${sizeClass} ${className}` },
    children
  );
}
