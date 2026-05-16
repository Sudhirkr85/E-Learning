// Format currency
export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Format time to 12-hour India format (e.g., "10:30 AM")
export const formatTimeIndia = (time: string, date?: string): string => {
  if (!time) return '';
  const datePart = date || new Date().toISOString().split('T')[0];
  const dt = new Date(`${datePart}T${time}`);
  try {
    return new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }).format(dt).toLowerCase();
  } catch (e) {
    return dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  }
};

// Format date to '2 May 2026' (day numeric, short month, year)
export const formatDateIndia = (date: string | Date): string => {
  if (!date) return '';
  const dt = typeof date === 'string' ? new Date(date) : date;
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(dt);
  } catch (e) {
    const day = dt.getDate();
    const month = dt.toLocaleString('en-IN', { month: 'short' });
    const year = dt.getFullYear();
    return `${day} ${month} ${year}`;
  }
};

// Calculate progress percentage
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePasswordStrength = (password: string): {
  isStrong: boolean;
  feedback: string[];
} => {
  const feedback: string[] = [];

  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push('Add at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    feedback.push('Add at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    feedback.push('Add at least one number');
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push('Add at least one special character');
  }

  return {
    isStrong: feedback.length === 0,
    feedback,
  };
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
