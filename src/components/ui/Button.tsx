'use client';

import { ReactNode } from 'react';

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
  primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-300',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-gray-400',
  ghost: 'text-blue-600 hover:bg-blue-50 disabled:text-gray-400',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
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
  const baseStyles = 'font-semibold transition-colors duration-200 inline-flex items-center justify-center';
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];
  const disabledStyles = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
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
