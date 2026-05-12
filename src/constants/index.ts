// Site Configuration
export const SITE_CONFIG = {
  name: 'SSSAM Academy',
  description: 'Learn from industry experts and master in-demand skills',
  url: 'https://sssam-academy.com',
  email: 'contact@sssam-academy.com',
  phone: '+1 (555) 123-4567',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:id',
  DASHBOARD: '/dashboard',
  MY_COURSES: '/dashboard/courses',
  LESSON: '/dashboard/lessons/:id',
  CHECKOUT: '/checkout',
  PAYMENT_SUCCESS: '/payment-success',
  PAYMENT_FAILED: '/payment-failed',
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',
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
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'SSSAM Academy transformed my career. The instructors are incredible and the courses are well-structured.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'UI/UX Designer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    content: 'Best platform for learning modern design. Highly recommended!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma Davis',
    title: 'Data Analyst',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
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
