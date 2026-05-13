'use client';

interface DividerProps {
  className?: string;
}

export function Divider({ className = '' }: DividerProps) {
  return <div className={`border-b border-slate-700/50 ${className}`} />;
}
