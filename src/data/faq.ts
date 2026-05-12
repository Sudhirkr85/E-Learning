import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What courses are currently available?',
    answer: 'We currently offer courses in Web Development, Mobile Development, Data Science, UI/UX Design, and more. Check our courses page for the full list and upcoming programs.',
    category: 'Courses',
  },
  {
    id: '2',
    question: 'Do I get a certificate after completing a course?',
    answer: 'Yes! After successfully completing any course, you will receive a digital certificate that can be shared on LinkedIn and other professional platforms.',
    category: 'Certificates',
  },
  {
    id: '3',
    question: 'Can I access courses on mobile devices?',
    answer: 'Absolutely! Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktops.',
    category: 'Access',
  },
  {
    id: '4',
    question: 'What is the refund policy?',
    answer: 'We offer a 30-day money-back guarantee if you are not satisfied with the course. No questions asked!',
    category: 'Payment',
  },
  {
    id: '5',
    question: 'How long do I have access to the course?',
    answer: 'Once you purchase a course, you have lifetime access to all the course materials and future updates.',
    category: 'Access',
  },
  {
    id: '6',
    question: 'Are there prerequisites for the courses?',
    answer: 'Most courses are designed for beginners. Some advanced courses may require basic knowledge. Check the course details page for specific prerequisites.',
    category: 'Courses',
  },
  {
    id: '7',
    question: 'Do you offer group discounts?',
    answer: 'Yes! We offer special discounts for group purchases. Please contact our sales team for more information.',
    category: 'Payment',
  },
  {
    id: '8',
    question: 'How can I interact with instructors?',
    answer: 'You can post questions in the course forums, and instructors typically respond within 24-48 hours. We also offer optional live Q&A sessions.',
    category: 'Support',
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
