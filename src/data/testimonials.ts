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
    title: 'Full Stack Developer',
    content: 'The AI Full Stack course at SSSAM Academy completely transformed my career. The instructors are amazing and the curriculum is up-to-date with industry standards. I landed my dream job within 2 months of completion!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Patel',
    title: 'UI/UX Designer',
    content: 'I was skeptical about online courses, but SSSAM Academy exceeded all my expectations. The practical projects and mentorship helped me build a strong portfolio. Highly recommend!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    rating: 5,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    title: 'Data Scientist',
    content: 'The Data Science course provided me with the exact skills needed for the industry. The ₹9 offer was incredible value for money. Thank you SSSAM Academy for making quality education affordable!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    rating: 5,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    title: 'Mobile Developer',
    content: 'The Flutter course was comprehensive and well-structured. The instructors were always available to help and the community support was fantastic. I now work as a mobile developer!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    rating: 5,
  },
  {
    id: '5',
    name: 'Vikram Singh',
    title: 'React Developer',
    content: 'SSSAM Academy\'s React course helped me transition from a junior to senior developer role. The advanced patterns and best practices taught here are invaluable.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    rating: 5,
  },
  {
    id: '6',
    name: 'Anjali Nair',
    title: 'Frontend Developer',
    content: 'The ₹9 introductory offer was too good to pass up! The course quality is exceptional and I learned more in 3 months than I did in a year of self-study.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
    rating: 5,
  },
];
