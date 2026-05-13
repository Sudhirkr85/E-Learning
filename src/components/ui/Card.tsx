'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export function Card({ children, className = '', onClick, interactive = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl shadow-lg ${
        interactive ? 'hover:shadow-xl hover:scale-105 cursor-pointer group transition-all duration-300' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
