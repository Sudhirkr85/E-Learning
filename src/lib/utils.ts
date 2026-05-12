// Common class names for styling
export const cn = (...classes: (string | undefined | boolean)[]): string => {
  return classes
    .filter((c) => typeof c === 'string')
    .join(' ')
    .split(' ')
    .filter(Boolean)
    .join(' ');
};

// Get initials from name
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};
