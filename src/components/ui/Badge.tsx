'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
}

const variants = {
  success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  error: 'bg-red-500/20 text-red-300 border border-red-500/30',
  info: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  default: 'bg-slate-700/50 text-foreground-secondary border border-slate-600/50',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
