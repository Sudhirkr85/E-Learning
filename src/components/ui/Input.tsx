'use client';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground-secondary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 bg-background-secondary border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-foreground placeholder-foreground-tertiary ${
            error ? 'border-red-500/50' : 'border-slate-700/50'
          } ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
        {icon && <div className="absolute left-3 top-3.5 text-foreground-tertiary">{icon}</div>}
      </div>
      {error && <p className="text-red-400/80 text-sm mt-1">{error}</p>}
    </div>
  );
}
