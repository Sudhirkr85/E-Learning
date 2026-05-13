'use client';

import { createElement } from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const sizes = {
  1: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
  2: 'text-4xl md:text-5xl font-bold tracking-tight',
  3: 'text-3xl md:text-4xl font-bold',
  4: 'text-2xl md:text-3xl font-bold',
  5: 'text-xl md:text-2xl font-semibold',
  6: 'text-lg md:text-xl font-semibold',
};

export function Heading({ level = 2, children, className = '' }: HeadingProps) {
  const sizeClass = sizes[level];

  return createElement(
    `h${level}`,
    { className: `text-foreground ${sizeClass} ${className}` },
    children
  );
}
