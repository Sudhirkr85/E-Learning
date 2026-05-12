import { Course } from '@/types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Master Full Stack Web Development',
    slug: 'master-full-stack-web-development',
    description: 'Learn to build complete web applications from frontend to backend using modern technologies.',
    shortDescription: 'Complete guide to full stack development',
    thumbnail: '/images/courses/course-main.webp',
    instructor: 'Alex Johnson',
    instructorImage: '/images/trainers/trainer-1.webp',
    price: 4999,
    originalPrice: 9999,
    rating: 4.8,
    reviews: 2456,
    students: 15420,
    duration: '24 weeks',
    lessons: 156,
    level: 'Beginner',
    category: 'Web Development',
    featured: true,
    status: 'published',
    tags: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
    sections: [
      {
        id: '1',
        title: 'Introduction to Web Development',
        description: 'Basics of web development',
        lessons: [],
      },
      {
        id: '2',
        title: 'Frontend Development with React',
        description: 'Learn React from basics to advanced',
        lessons: [],
      },
      {
        id: '3',
        title: 'Backend Development with Node.js',
        description: 'Build scalable backend APIs',
        lessons: [],
      },
    ],
    curriculum: [
      {
        id: '1',
        title: 'Getting Started with Web Development',
        description: 'Introduction to the web stack',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 45,
        order: 1,
      },
      {
        id: '2',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the basics of HTML and CSS',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 60,
        order: 2,
      },
      {
        id: '3',
        title: 'JavaScript Essentials',
        description: 'Master JavaScript programming',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 75,
        order: 3,
      },
    ],
    createdAt: '2024-01-01',
    updatedAt: '2024-05-12',
  },
  {
    id: '2',
    title: 'React Advanced Patterns',
    slug: 'react-advanced-patterns',
    description: 'Deep dive into advanced React patterns and best practices.',
    shortDescription: 'Advanced React development techniques',
    thumbnail: '/images/courses/course-coming-soon.webp',
    instructor: 'Sarah Tech',
    instructorImage: '/images/trainers/trainer-2.webp',
    price: 3999,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 1823,
    students: 10542,
    duration: '12 weeks',
    lessons: 98,
    level: 'Advanced',
    category: 'Web Development',
    featured: false,
    status: 'coming-soon',
    tags: ['React', 'Hooks', 'TypeScript'],
    sections: [
      {
        id: '1',
        title: 'Advanced Component Patterns',
        lessons: [],
      },
      {
        id: '2',
        title: 'State Management Solutions',
        lessons: [],
      },
    ],
    curriculum: [
      {
        id: '1',
        title: 'Understanding React Hooks',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 50,
        order: 1,
      },
    ],
    createdAt: '2024-02-01',
    updatedAt: '2024-05-12',
  },
  {
    id: '3',
    title: 'Data Science with Python',
    slug: 'data-science-with-python',
    description: 'Learn data science fundamentals and advanced techniques using Python.',
    shortDescription: 'Master data science and analytics',
    thumbnail: '/images/courses/course-coming-soon.webp',
    instructor: 'Dr. James Wilson',
    instructorImage: '/images/trainers/trainer-3.webp',
    price: 5999,
    originalPrice: 11999,
    rating: 4.7,
    reviews: 1245,
    students: 8756,
    duration: '16 weeks',
    lessons: 124,
    level: 'Intermediate',
    category: 'Data Science',
    featured: false,
    status: 'coming-soon',
    tags: ['Python', 'Data Analysis', 'Machine Learning'],
    sections: [
      {
        id: '1',
        title: 'Python Fundamentals',
        lessons: [],
      },
      {
        id: '2',
        title: 'Data Analysis with Pandas',
        lessons: [],
      },
    ],
    curriculum: [
      {
        id: '1',
        title: 'Setting Up Python Environment',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 40,
        order: 1,
      },
    ],
    createdAt: '2024-03-01',
    updatedAt: '2024-05-12',
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    slug: 'ui-ux-design-principles',
    description: 'Create beautiful and intuitive user interfaces using modern design principles.',
    shortDescription: 'Professional UI/UX design course',
    thumbnail: '/images/courses/course-coming-soon.webp',
    instructor: 'Emily Designer',
    instructorImage: '/images/trainers/trainer-1.webp',
    price: 3499,
    rating: 4.8,
    reviews: 956,
    students: 6234,
    duration: '10 weeks',
    lessons: 82,
    level: 'Beginner',
    category: 'UI/UX Design',
    featured: false,
    status: 'coming-soon',
    tags: ['Figma', 'Design', 'UX Research'],
    sections: [
      {
        id: '1',
        title: 'Design Fundamentals',
        lessons: [],
      },
    ],
    curriculum: [
      {
        id: '1',
        title: 'Introduction to Design',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 35,
        order: 1,
      },
    ],
    createdAt: '2024-04-01',
    updatedAt: '2024-05-12',
  },
  {
    id: '5',
    title: 'Mobile Development with Flutter',
    slug: 'mobile-development-with-flutter',
    description: 'Build cross-platform mobile applications using Flutter and Dart.',
    shortDescription: 'Cross-platform mobile development',
    thumbnail: '/images/courses/course-coming-soon.webp',
    instructor: 'Mike Flutter',
    instructorImage: '/images/trainers/trainer-2.webp',
    price: 4499,
    rating: 4.6,
    reviews: 734,
    students: 5123,
    duration: '14 weeks',
    lessons: 110,
    level: 'Intermediate',
    category: 'Mobile Development',
    featured: false,
    status: 'coming-soon',
    tags: ['Flutter', 'Dart', 'Mobile'],
    sections: [
      {
        id: '1',
        title: 'Flutter Basics',
        lessons: [],
      },
    ],
    curriculum: [
      {
        id: '1',
        title: 'Getting Started with Flutter',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 50,
        order: 1,
      },
    ],
    createdAt: '2024-05-01',
    updatedAt: '2024-05-12',
  },
];

export const getFeaturedCourse = (): Course | undefined => {
  return courses.find(course => course.featured);
};

export const getComingSoonCourses = (): Course[] => {
  return courses.filter(course => course.status === 'coming-soon');
};

export const getPublishedCourses = (): Course[] => {
  return courses.filter(course => course.status === 'published');
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};
