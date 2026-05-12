import { Trainer } from '@/types';

export const trainers: Trainer[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    title: 'Full Stack Developer',
    expertise: 'Web Development, JavaScript, React, Node.js',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'With 10+ years of experience in web development, Alex has trained over 15,000 students.',
    socials: {
      linkedin: 'https://linkedin.com/in/alexjohnson',
      twitter: 'https://twitter.com/alexjohnson',
    },
  },
  {
    id: '2',
    name: 'Sarah Tech',
    title: 'React Specialist',
    expertise: 'React, TypeScript, Frontend Architecture',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Sarah is passionate about building scalable React applications and mentoring developers.',
    socials: {
      linkedin: 'https://linkedin.com/in/sarahtech',
    },
  },
  {
    id: '3',
    name: 'Dr. James Wilson',
    title: 'Data Science Expert',
    expertise: 'Python, Data Science, Machine Learning, Statistics',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    bio: 'PhD in Data Science with experience at leading tech companies.',
    socials: {
      linkedin: 'https://linkedin.com/in/jameswilson',
    },
  },
  {
    id: '4',
    name: 'Emily Designer',
    title: 'UX/UI Designer',
    expertise: 'UI Design, UX Research, Figma, Design Systems',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    bio: 'Award-winning designer who loves creating beautiful and user-friendly interfaces.',
    socials: {
      linkedin: 'https://linkedin.com/in/emilydesigner',
      website: 'https://emilydesigns.com',
    },
  },
  {
    id: '5',
    name: 'Mike Flutter',
    title: 'Mobile Developer',
    expertise: 'Flutter, Dart, Mobile Development, Firebase',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    bio: 'Building beautiful cross-platform mobile apps with Flutter for 5+ years.',
    socials: {
      linkedin: 'https://linkedin.com/in/mikeflutter',
    },
  },
];

export const getTrainerById = (id: string): Trainer | undefined => {
  return trainers.find(trainer => trainer.id === id);
};
