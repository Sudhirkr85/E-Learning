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
  primary: 'text-foreground',
  secondary: 'text-foreground-secondary',
  muted: 'text-foreground-tertiary',
};

export function Text({ children, className = '', size = 'base', color = 'secondary' }: TextProps) {
  return (
    <p className={`${sizes[size]} ${colors[color]} ${className}`}>
      {children}
    </p>
  );
}
