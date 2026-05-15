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
    content: 'SSSAM Academy’s AI Full Stack training helped me build a strong GitHub portfolio and launch my career quickly. The Gurugram campus and placement mentoring made it easy to get interview-ready.',
    image: '/images/testimonials/student-1.webp',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Verma',
    title: 'Data Scientist',
    content: 'The Data Science course gave me live project experience with Python and ML. I gained confidence for campus placements and real IT roles in Delhi NCR.',
    image: '/images/testimonials/student-2.webp',
    rating: 5,
  },
  {
    id: '3',
    name: 'Amit Gupta',
    title: 'Digital Marketing Specialist',
    content: 'Working on live campaigns and SEO projects helped me secure a digital marketing role. The support in Hindi and English was a big help.',
    image: '/images/testimonials/student-1.webp',
    rating: 5,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    title: 'Cloud Engineer',
    content: 'The cloud and deployment modules are practical and aligned with Indian IT hiring. I was able to apply the lab work directly to real job requirements.',
    image: '/images/testimonials/student-2.webp',
    rating: 5,
  },
  {
    id: '5',
    name: 'Vikram Singh',
    title: 'Cyber Security Analyst',
    content: 'I joined as a fresher and built strong security skills through ethical hacking labs. The course helped me move into a security analyst role with confidence.',
    image: '/images/testimonials/student-1.webp',
    rating: 5,
  },
  {
    id: '6',
    name: 'Anjali Nair',
    title: 'Full Stack Developer',
    content: 'The live sessions, AI tools, and placement guidance made this training worth it. It was the perfect learning option during my college summer break.',
    image: '/images/testimonials/student-2.webp',
    rating: 5,
  },
];
