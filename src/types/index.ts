// Course Related Types
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  instructor: string;
  instructorImage: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lessons: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner to Advanced';
  category: string;
  featured: boolean;
  status: 'published' | 'coming-soon' | 'draft';
  sections: CourseSection[];
  curriculum: Lesson[];
  tags: string[];
  batchInfo?: string;
  nextBatch?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseSection {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  duration: number; // in minutes
  order: number;
  completed?: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'pdf' | 'link' | 'document';
}

// User Related Types
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile extends User {
  purchasedCourses: string[]; // Course IDs
  wishlist: string[];
  bio?: string;
  phone?: string;
  location?: string;
}

export interface InstructorProfile extends User {
  bio: string;
  expertise: string[];
  rating: number;
  reviews: number;
  students: number;
  courses: string[]; // Course IDs
}

// Enrollment Related Types
export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progress: number; // percentage 0-100
  lessonProgress: Record<string, boolean>; // lesson id -> completed
}

// Payment Related Types
export interface Payment {
  id: string;
  studentId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'razorpay' | 'stripe';
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  createdAt: string;
  updatedAt: string;
}

// Cart Related Types
export interface CartItem {
  courseId: string;
  course: Course;
  quantity: number;
  addedAt: string;
}

// Trainer/Instructor Card Type
export interface Trainer {
  id: string;
  name: string;
  title: string;
  expertise: string;
  image: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

// FAQ Type
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Contact Inquiry Type
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: string;
}

// Admin Related Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  createdAt: string;
  lastLogin?: string;
}

// Coupon Related Types
export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  applicableCourses?: string[]; // Course IDs, empty means all courses
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Lesson Management Types
export interface LessonLink {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  type: 'youtube' | 'google_meet' | 'other';
  url: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
