export interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    title: 'Full Stack Developer at Infosys',
    content: 'The AI Full Stack Summer Training at SSSAM Academy was life-changing! Being from Gurugram, the offline classes and placement support helped me land a job at Infosys. The instructors are industry experts and the curriculum is perfect for Indian IT companies.',
    image: '/images/testimonials/student-1.webp',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Verma',
    title: 'Data Scientist at TCS',
    content: 'I joined the Data Science course during college placement season. The practical projects with Power BI and Python helped me crack TCS interview. The ₹9 launch offer was amazing value for money. Thank you SSSAM Academy!',
    image: '/images/testimonials/student-2.webp',
    rating: 5,
  },
  {
    id: '3',
    name: 'Amit Gupta',
    title: 'Digital Marketing Lead',
    content: 'The Digital Marketing course gave me hands-on experience with real campaigns. The Hindi + English support was perfect for me. Now I\'m leading marketing campaigns for multiple brands. Best decision for my career!',
    image: '/images/testimonials/student-1.webp',
    rating: 5,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    title: 'AWS Cloud Engineer',
    content: 'The AWS Cloud Computing course prepared me for AWS certification. The trainers have real industry experience and the lab sessions were invaluable. I got placed through SSSAM Academy\'s placement drive!',
    image: '/images/testimonials/student-2.webp',
    rating: 5,
  },
  {
    id: '5',
    name: 'Vikram Singh',
    title: 'Cyber Security Analyst',
    content: 'Coming from a non-IT background, I was worried about learning Cyber Security. But the trainers at SSSAM Academy made everything so simple. The ethical hacking practical sessions were amazing. Got placed in a MNC!',
    image: '/images/testimonials/student-1.webp',
    rating: 5,
  },
  {
    id: '6',
    name: 'Anjali Nair',
    title: 'Full Stack Developer',
    content: 'The summer training program was perfect for my college break. The MERN stack training with AI integration helped me stand out in campus placements. The flexible payment options with UPI made it easy for my parents.',
    image: '/images/testimonials/student-2.webp',
    rating: 5,
  },
];
