import { Trainer } from '@/types';

export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Ankit Sharma',
    title: 'Full Stack Developer',
    expertise: 'Web Development, JavaScript, React, Node.js',
    image: 'AS',
    bio: 'With 10+ years of experience in full stack development, Ankit has trained over 10,000 students on modern web technologies.',
    socials: {
      linkedin: 'https://linkedin.com/in/ankitsharma',
      twitter: 'https://twitter.com/ankitsharma',
    },
  },
  {
    id: '2',
    name: 'Priya Sharma',
    title: 'Data Analyst Expert',
    expertise: 'Power BI, Data Analysis, SQL, Analytics',
    image: 'PS',
    bio: 'Priya specializes in business intelligence and has helped hundreds of analysts land jobs in top Indian companies.',
    socials: {
      linkedin: 'https://linkedin.com/in/priyasharma',
    },
  },
  {
    id: '3',
    name: 'Dr. Vijay Patel',
    title: 'Data Science & AI Expert',
    expertise: 'Python, Machine Learning, AI, Data Science',
    image: 'VP',
    bio: 'PhD in Data Science with experience at leading tech companies. Passionate about teaching ML to aspiring professionals.',
    socials: {
      linkedin: 'https://linkedin.com/in/vijaypatel',
    },
  },
  {
    id: '4',
    name: 'Amit Singh',
    title: 'Cybersecurity Specialist',
    expertise: 'Ethical Hacking, Network Security, Penetration Testing',
    image: 'AS',
    bio: 'Certified ethical hacker with 8+ years in cybersecurity. Trains professionals for CEH and other security certifications.',
    socials: {
      linkedin: 'https://linkedin.com/in/amitsingh',
      website: 'https://amitsinghsecurity.com',
    },
  },
  {
    id: '5',
    name: 'Neha Gupta',
    title: 'Digital Marketing Specialist',
    expertise: 'SEO, Google Ads, Social Media, Digital Strategy',
    image: 'NG',
    bio: 'Award-winning digital marketer helping brands and professionals master online marketing strategies.',
    socials: {
      linkedin: 'https://linkedin.com/in/nehagupta',
    },
  },
  {
    id: '6',
    name: 'Rajesh Kumar',
    title: 'Senior Full Stack Developer',
    expertise: 'Web Development, System Architecture, DevOps',
    image: 'RK',
    bio: 'Experienced full stack developer with expertise in building scalable applications for Indian startups and enterprises.',
    socials: {
      linkedin: 'https://linkedin.com/in/rajeshkumar',
    },
  },
];

export const getTrainerById = (id: string): Trainer | undefined => {
  return trainers.find(trainer => trainer.id === id);
};
