// Site Configuration
export const SITE_CONFIG = {
  name: 'SSSAM Academy',
  fullName: 'Smart Solutions School of AI & Machine Learning',
  description: 'Professional AI-powered IT training from Gurugram with live classes, real projects, and placement-focused career support.',
  url: 'https://sssamacademy.tech',
  mainWebsiteUrl: 'https://sssamacademy.com',
  email: 'info@sssamacademy.com',
  phone: '+91 9217031899',
  address: 'M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14, Gurugram, Haryana 122001',
  mapsUrl: 'https://maps.google.com/?q=M24+Ground+Floor+Near+SBI+Bank+Old+DLF+Colony+Sector+14+Gurugram+122001',
  linkedin: 'https://www.linkedin.com/company/sssamacademy/',
  instagram: 'https://www.instagram.com/sssamacademy/',
  youtube: 'https://www.youtube.com/@codingwithsudhir',
};

export { ORGANIZATION_STATS } from './organization-stats';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:id',
  DASHBOARD: '/dashboard',
  MY_COURSES: '/dashboard/courses',
  CERTIFICATES: '/dashboard/certificates',
  LESSON: '/dashboard/lessons/:id',
  CHECKOUT: '/checkout',
  PAYMENT_SUCCESS: '/payment-success',
  PAYMENT_FAILED: '/payment-failed',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
  ADMIN_CERTIFICATES: '/admin/certificates',
};

// Course Status
export const COURSE_STATUS = {
  PUBLISHED: 'published',
  COMING_SOON: 'coming-soon',
  DRAFT: 'draft',
} as const;

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
} as const;

// Course Categories
export const COURSE_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'UI/UX Design',
  'Business',
  'Marketing',
  'Personal Development',
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Full Stack Developer',
    image: '/images/testimonials/student-1.webp',
    content: 'SSSAM Academy transformed my career. The instructors are incredible and the courses are well-structured.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'UI/UX Designer',
    image: '/images/testimonials/student-2.webp',
    content: 'Best platform for learning modern design. Highly recommended!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma Davis',
    title: 'Data Analyst',
    image: '/images/testimonials/student-1.webp',
    content: 'The data science course was comprehensive and practical. Now I work as a data analyst!',
    rating: 5,
  },
];

// Features
export const FEATURES = [
  {
    title: 'Learn from Experts',
    description: 'Industry-leading instructors with years of experience',
    icon: '👨‍🏫',
  },
  {
    title: 'Flexible Learning',
    description: 'Learn at your own pace, anytime, anywhere',
    icon: '⏰',
  },
  {
    title: 'Certification',
    description: 'Earn certificates upon course completion',
    icon: '🎓',
  },
  {
    title: 'Community Support',
    description: 'Join a vibrant community of learners',
    icon: '👥',
  },
];
