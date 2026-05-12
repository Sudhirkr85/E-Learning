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
      className={`bg-white rounded-lg shadow-md ${
        interactive ? 'hover:shadow-lg hover:scale-105 cursor-pointer transition-all duration-200' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
