import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What courses are available at SSSAM Academy Gurugram?',
    answer: 'We offer AI-first IT courses in Gurugram including Full Stack Development, Data Science training, Cyber Security course, and Digital Marketing institute programs with live projects and placement support.',
    category: 'Courses',
  },
  {
    id: '2',
    question: 'Do you offer a Full Stack Development course in Gurgaon?',
    answer: 'Yes. Our Full Stack Development course is available for Gurgaon students and Delhi NCR learners with practical web development, AI tools, and career coaching.',
    category: 'Courses',
  },
  {
    id: '3',
    question: 'What does the Data Science training include?',
    answer: 'Data Science training includes Python, machine learning, data analytics, real-world datasets and portfolio projects designed for hiring managers in Gurugram and Delhi NCR.',
    category: 'Courses',
  },
  {
    id: '4',
    question: 'Is placement support included in the Cyber Security course?',
    answer: 'Yes. Our Cyber Security course in Gurugram includes placement assistance, resume review, interview practice, and employer introductions for Delhi NCR security roles.',
    category: 'Placement',
  },
  {
    id: '5',
    question: 'What makes SSSAM Academy an AI training institute?',
    answer: 'We use AI-first teaching methods, project-based labs, and AI productivity tools across courses so students learn modern IT workflows and employer-ready skills.',
    category: 'Courses',
  },
  {
    id: '6',
    question: 'Can I join online if I am outside Gurugram?',
    answer: 'Yes. We offer live online sessions for students across Delhi NCR and India, plus in-person support at our Gurugram training center.',
    category: 'Learning',
  },
  {
    id: '7',
    question: 'How does placement support work at the institute?',
    answer: 'Placement support includes mock interviews, resume preparation, live project portfolios, and employer referrals for Gurugram and Gurgaon job opportunities.',
    category: 'Placement',
  },
  {
    id: '8',
    question: 'Are there weekend batches for working professionals?',
    answer: 'Yes. We offer flexible weekend and evening batches in Gurugram for working professionals seeking AI training, Full Stack Development, Data Science or Cyber Security courses.',
    category: 'Courses',
  },
  {
    id: '9',
    question: 'Do you provide a Digital Marketing institute program?',
    answer: 'Yes. Our Digital Marketing institute program covers SEO, Google Ads, social media, analytics, and digital campaign planning for Delhi NCR business and career growth.',
    category: 'Courses',
  },
  {
    id: '10',
    question: 'How can I visit the Gurugram training center?',
    answer: 'Visit us at M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14, Gurugram. You can also call +91 92170 31899 or request a callback on our website.',
    category: 'Location',
  },
];

export const getFAQsByCategory = (category: string): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};

export const getFAQCategories = (): string[] => {
  const categories = faqs
    .map(faq => faq.category)
    .filter((category): category is string => category !== undefined);
  return [...new Set(categories)];
};
