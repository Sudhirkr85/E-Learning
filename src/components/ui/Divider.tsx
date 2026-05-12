'use client';

interface DividerProps {
  className?: string;
}

export function Divider({ className = '' }: DividerProps) {
  return <div className={`border-b border-gray-200 ${className}`} />;
}
