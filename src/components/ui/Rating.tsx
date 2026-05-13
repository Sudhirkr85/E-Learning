'use client';

interface RatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Rating({ rating, reviews, size = 'md', className = '' }: RatingProps) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`${iconSize} ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-slate-600'}`}>
            ★
          </span>
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-sm text-foreground-tertiary">
          {rating.toFixed(1)} ({reviews.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
