'use client';

import { useId } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className = '', id, ...props }: TextAreaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-foreground-secondary mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full px-4 py-3 bg-background-secondary border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-foreground placeholder-foreground-tertiary ${
          error ? 'border-red-500/50' : 'border-slate-700/50'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-red-400/80 text-sm mt-1">{error}</p>}
    </div>
  );
}
