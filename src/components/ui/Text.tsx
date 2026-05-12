'use client';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
  color?: 'primary' | 'secondary' | 'muted';
}

const sizes = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
};

const colors = {
  primary: 'text-gray-900',
  secondary: 'text-gray-700',
  muted: 'text-gray-500',
};

export function Text({ children, className = '', size = 'base', color = 'secondary' }: TextProps) {
  return (
    <p className={`${sizes[size]} ${colors[color]} ${className}`}>
      {children}
    </p>
  );
}
