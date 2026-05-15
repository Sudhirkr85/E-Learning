import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What courses are available at SSSAM Academy Gurugram?',
    answer: 'We offer job-oriented AI and IT courses such as AI Full Stack Development, Data Science with Python, Cyber Security, and Digital Marketing. Our Gurugram center in Sector 14 provides live practical training, project mentorship, and placement-focused learning.',
    category: 'Courses',
  },
  {
    id: '2',
    question: 'Do you provide placement assistance?',
    answer: 'Yes. We support placement preparation with resume review, mock interviews, live project portfolios, and employer connections in Gurugram, Delhi NCR, and across India. Many students secure roles at leading IT companies and startups.',
    category: 'Placement',
  },
  {
    id: '3',
    question: 'What payment methods are available?',
    answer: 'We accept all Indian payment options including UPI, credit/debit cards, net banking, and easy EMI plans. Flexible installments are available for premium programs to make learning affordable.',
    category: 'Payment',
  },
  {
    id: '4',
    question: 'Are the classes online or offline?',
    answer: 'We offer both online and offline classes at our Gurugram center in Old DLF Colony, Sector 14. Choose weekday evenings or weekend batches with live interaction and recorded sessions for anytime revision.',
    category: 'Learning',
  },
  {
    id: '5',
    question: 'Is the course content relevant to Indian IT industry?',
    answer: 'Yes. Our curriculum is designed by Gurugram industry experts and updated for Indian IT hiring trends. You learn practical skills, AI tools, and real projects that recruiters in software, data, and security roles value.',
    category: 'Courses',
  },
  {
    id: '6',
    question: 'Do I get a certificate after completion?',
    answer: 'Yes. You earn a certificate from SSSAM Academy that highlights your hands-on project experience and AI-enabled training, and can be shared directly on LinkedIn and job applications.',
    category: 'Certificates',
  },
  {
    id: '7',
    question: 'What is the refund policy?',
    answer: 'We offer a 7-day refund guarantee if you are not satisfied. For full-term programs, we also provide easy refund options within the first week of enrollment, depending on the course terms.',
    category: 'Payment',
  },
  {
    id: '8',
    question: 'Is support available in Hindi?',
    answer: 'Absolutely. We provide bilingual support in Hindi and English so you can learn comfortably. Our trainers and support staff in Gurugram are fluent in both languages.',
    category: 'Support',
  },
  {
    id: '9',
    question: 'Are there any prerequisites for the courses?',
    answer: 'Most programs are beginner-friendly and designed for college students, freshers, and career switchers. If a course has advanced modules, we include foundation lessons so you can start confidently.',
    category: 'Courses',
  },
  {
    id: '10',
    question: 'Do you offer discounts for college students?',
    answer: 'Yes. We offer student discounts, seasonal launch offers, and group pricing for college teams. Contact our Gurugram admissions team for current offers and scholarships.',
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
