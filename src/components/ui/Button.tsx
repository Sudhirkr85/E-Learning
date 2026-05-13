'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const variants = {
  primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold shadow-lg hover:shadow-xl active:shadow-md',
  secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold shadow-lg hover:shadow-xl active:shadow-md',
  outline: 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 disabled:border-slate-600 disabled:text-slate-600 font-semibold transition-all',
  ghost: 'text-foreground-secondary hover:text-cyan-400 hover:bg-cyan-500/5 disabled:text-foreground-tertiary font-medium transition-colors',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-base rounded-lg',
  lg: 'px-6 py-3.5 text-lg rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  href,
}: ButtonProps) {
  const baseStyles = 'font-semibold inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed';
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
