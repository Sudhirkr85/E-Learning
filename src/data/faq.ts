import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What courses are available at SSSAM Academy Gurugram?',
    answer: 'We offer job-oriented IT courses including AI Full Stack Development, Data Science with Python, Digital Marketing, AWS Cloud Computing, and Cyber Security. All courses are designed for Indian students with placement support.',
    category: 'Courses',
  },
  {
    id: '2',
    question: 'Do you provide placement assistance?',
    answer: 'Yes! We provide 100% placement assistance with resume building, interview preparation, mock interviews, and connections to top IT companies in Gurugram and Delhi NCR. Many students get placed in companies like Infosys, TCS, and Wipro.',
    category: 'Placement',
  },
  {
    id: '3',
    question: 'What payment methods are available?',
    answer: 'We accept all Indian payment methods including UPI, Credit/Debit Cards, Net Banking, and easy EMI options. You can also pay in installments for premium courses.',
    category: 'Payment',
  },
  {
    id: '4',
    question: 'Are the classes online or offline?',
    answer: 'We offer both online and offline classes at our Gurugram center in Old DLF, Sector 14. You can choose flexible weekend batches or weekday evening batches based on your schedule.',
    category: 'Learning',
  },
  {
    id: '5',
    question: 'Is the course content relevant to Indian IT industry?',
    answer: 'Absolutely! Our curriculum is designed by industry experts from top Indian IT companies. We focus on practical skills that Indian employers are looking for, including latest technologies and real-world projects.',
    category: 'Courses',
  },
  {
    id: '6',
    question: 'Do I get a certificate after completion?',
    answer: 'Yes, you receive an industry-recognized certificate from SSSAM Academy. Our certificates are valued by Indian employers and can be shared on LinkedIn and other professional platforms.',
    category: 'Certificates',
  },
  {
    id: '7',
    question: 'What is the refund policy?',
    answer: 'We offer a 7-day money-back guarantee if you\'re not satisfied with the course. For premium courses, we also provide easy refund options within the first week of enrollment.',
    category: 'Payment',
  },
  {
    id: '8',
    question: 'Is support available in Hindi?',
    answer: 'Yes! We provide bilingual support in both Hindi and English. Our instructors and support staff are fluent in both languages to ensure better understanding for all Indian students.',
    category: 'Support',
  },
  {
    id: '9',
    question: 'Are there any prerequisites for the courses?',
    answer: 'Most courses are designed for beginners and college students. Basic computer knowledge is sufficient. For advanced courses, we provide prerequisite modules to help you get started.',
    category: 'Courses',
  },
  {
    id: '10',
    question: 'Do you offer discounts for college students?',
    answer: 'Yes! We have special student discounts, summer training offers, and group enrollment discounts. Contact our counseling team for current offers and scholarship programs.',
    category: 'Payment',
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
