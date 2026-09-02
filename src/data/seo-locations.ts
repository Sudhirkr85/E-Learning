export interface LocationFaq {
  question: string;
  answer: string;
}

export interface SeoLocation {
  city: string;
  label: string;
  state: string;
  region: string;
  landmark: string;
  nearestMetro: string;
  commuteGuide: string;
  localIntro: string;
  altNames?: string[];
  locationFaqs: LocationFaq[];
}

export const seoLocations: SeoLocation[] = [
  {
    city: 'sector-14-gurgaon',
    label: 'Sector 14 Gurugram',
    state: 'Haryana',
    region: 'Gurugram (Sector 14 Campus)',
    landmark: 'M24 Ground Floor, Near SBI Bank, Old DLF Colony, Sector 14 Main Market',
    nearestMetro: 'MG Road & IFFCO Chowk Metro Stations (Yellow Line - 7 mins away)',
    commuteGuide: 'Located right in the educational hub of Sector 14 Gurugram. Direct auto and shared cab connectivity from IFFCO Chowk, MG Road Metro, and Gurgaon Old Bus Stand (3 mins).',
    localIntro: 'Our primary offline training center and AC computer lab is based in Sector 14 Gurugram. Students and working professionals from Old DLF, Sector 12, Sector 15, and Palam Vihar can walk in for hands-on daily classroom batches, 1-on-1 mentor code reviews, and live lab practice.',
    altNames: ['Sector 14 Gurgaon', 'Old DLF Sector 14'],
    locationFaqs: [
      {
        question: 'Where exactly is the SSSAM Academy classroom center in Sector 14 Gurugram?',
        answer: 'Our Sector 14 center is at M24 Ground Floor, Old DLF Colony, right near SBI Bank and the Sector 14 Main Market. It is fully equipped with high-speed AC computer labs and interactive projection systems.',
      },
      {
        question: 'Can I visit the Sector 14 center for a free in-person demo class?',
        answer: 'Yes, our Sector 14 campus hosts daily free demo classes and career counseling sessions from 9:00 AM to 7:00 PM. You can visit the lab and interact directly with senior trainers.',
      },
      {
        question: 'What are the batch timings available at the Sector 14 campus?',
        answer: 'We offer flexible Morning (8 AM - 11 AM), Afternoon (2 PM - 5 PM), Evening (6 PM - 9 PM) weekday batches, plus dedicated Saturday-Sunday weekend batches for working professionals.',
      },
    ],
  },
  {
    city: 'gurugram',
    label: 'Gurugram',
    state: 'Haryana',
    region: 'Gurugram Millennium City',
    landmark: 'Central Gurugram (Minutes from Cyber City & Golf Course Road)',
    nearestMetro: 'HUDA City Centre / Millennium City Centre Metro (Yellow Line)',
    commuteGuide: 'Easily accessible across Millennium City via Delhi Metro Yellow Line, Rapid Metro, and the Delhi-Gurgaon Expressway (NH-48).',
    localIntro: 'Gurugram is India’s premier AI and tech hub, hosting thousands of multinational engineering teams. SSSAM Academy provides Gurugram tech aspirants with high-intensity practical training and direct referral access to 120+ local tech hiring partners across Cyber Hub, Udyog Vihar, and Golf Course Extension.',
    altNames: ['Gurgaon', 'Gurugram Tech Hub'],
    locationFaqs: [
      {
        question: 'How does SSSAM Academy connect Gurugram students with local tech hiring partners?',
        answer: 'We have direct tie-ups with 120+ IT startups and multinational corporations across Cyber City, Udyog Vihar, and Golf Course Road that actively recruit our trained graduates for software engineering and analytics roles.',
      },
      {
        question: 'Are classroom or hybrid learning options available in Gurugram?',
        answer: 'Yes! Gurugram learners can attend physical classroom batches at our Sector 14 lab or choose blended hybrid mode (live online theory + weekend lab coding sessions).',
      },
      {
        question: 'Do you offer weekend batches for professionals working in Gurugram tech parks?',
        answer: 'Yes, we run intensive Saturday and Sunday batches with flexible 4-hour modules specifically designed for working IT professionals and corporate engineers looking to upskill.',
      },
    ],
  },
  {
    city: 'gurgaon',
    label: 'Gurgaon',
    state: 'Haryana',
    region: 'Gurgaon City',
    landmark: 'Sector 14 Institutional Area (Near Gurgaon Bus Stand)',
    nearestMetro: 'IFFCO Chowk & Sikanderpur Metro Interchange',
    commuteGuide: 'Conveniently connected to Old Gurgaon, Railway Station Road, and New Gurgaon via Mehrauli-Gurgaon Road and Delhi-Jaipur Highway.',
    localIntro: 'Whether you reside in Old Gurgaon or newly developed sectors, SSSAM Academy offers a central, accessible technology institute with 100% practical assignments, daily doubt resolution, and career mentoring for freshers and college students.',
    altNames: ['Gurugram'],
    locationFaqs: [
      {
        question: 'Is SSSAM Academy accessible from Old Gurgaon and New Gurgaon sectors?',
        answer: 'Yes, our Sector 14 institute is centrally situated between Old and New Gurgaon, accessible within 10-15 minutes from Sector 4/7/9, Sector 23, Sector 31, and Sohna Road.',
      },
      {
        question: 'Are there scholarship programs available for Gurgaon college students?',
        answer: 'Yes, we provide merit-based and early-admission scholarships of up to 40% off tuition fees for college students from Gurgaon universities and engineering institutes.',
      },
      {
        question: 'What placement assistance is provided to Gurgaon candidates?',
        answer: 'Our placement team provides complete technical interview prep, resume optimization, portfolio building on GitHub, and direct interview scheduling with companies across NCR.',
      },
    ],
  },
  {
    city: 'cyber-city-gurgaon',
    label: 'Cyber City Gurugram',
    state: 'Haryana',
    region: 'DLF Cyber City / Phase 2 & 3',
    landmark: 'DLF Cyber Hub & Building 9/10 Tech Corridor',
    nearestMetro: 'Phase 2 & Phase 3 Rapid Metro (Direct connect to Sikanderpur)',
    commuteGuide: 'Just 8 minutes via Rapid Metro / auto from DLF Cyber City to our Sector 14 training center. Perfect for post-shift evening and weekend upskilling.',
    localIntro: 'Surrounded by Fortune 500 tech firms and software consulting majors in DLF Cyber City, SSSAM Academy equips working professionals and ambitious freshers with production-grade AI, Full Stack, Data Analytics, and Cloud skills that match contemporary corporate job requirements.',
    altNames: ['DLF Cyber City', 'Cyber Hub Gurgaon'],
    locationFaqs: [
      {
        question: 'Can employees working in Cyber City join evening batches after work hours?',
        answer: 'Yes! We have specialized 7:00 PM to 9:00 PM weekday evening batches allowing corporate employees in Cyber City to attend classes immediately after their office shifts.',
      },
      {
        question: 'How far is the training lab from DLF Cyber City?',
        answer: 'Our Sector 14 lab is less than 3.5 km from DLF Cyber Hub (approx. 8 minutes drive or a quick auto ride from Sikanderpur / Phase 2 Metro).',
      },
      {
        question: 'Are courses aligned with technical roles in Cyber City MNCs?',
        answer: 'Yes, our curriculum is engineered by senior developers working in top product companies, focusing on modern architectures, cloud deployment, and AI-assisted workflows.',
      },
    ],
  },
  {
    city: 'mg-road-gurgaon',
    label: 'MG Road Gurugram',
    state: 'Haryana',
    region: 'MG Road / Sikanderpur Corridor',
    landmark: 'MG Road Central Mall Corridor',
    nearestMetro: 'MG Road Metro Station (Yellow Line)',
    commuteGuide: '5 minutes direct drive or e-rickshaw ride from MG Road Metro station to Sector 14 Old DLF Colony.',
    localIntro: 'Learners commuting along the MG Road commercial corridor can easily access our computer lab and classroom facilities for daily project reviews, mentor guidance, and networking with fellow developers.',
    altNames: ['MG Road Gurgaon'],
    locationFaqs: [
      {
        question: 'How do I reach the training institute from MG Road Metro Station?',
        answer: 'Exit towards MG Road West / Sector 14. Shared autos, e-rickshaws, and cabs reach our M24 Old DLF Colony center in under 5 minutes.',
      },
      {
        question: 'Can I access lab systems outside scheduled lecture hours?',
        answer: 'Yes, enrolled students get dedicated high-speed workstation access in our computer labs for project development and self-study throughout the day.',
      },
      {
        question: 'Do courses include live client projects?',
        answer: 'Every module requires building real-world, deployable web and analytics applications that students publish on GitHub to showcase to prospective employers.',
      },
    ],
  },
  {
    city: 'delhi',
    label: 'Delhi',
    state: 'Delhi',
    region: 'Delhi National Capital Region',
    landmark: 'Delhi NCR Connected Hub',
    nearestMetro: 'Direct Yellow Line Metro Connectivity to Gurugram',
    commuteGuide: 'Direct Yellow Line Delhi Metro connects Central, North, and South Delhi directly to Gurugram (IFFCO Chowk / MG Road) within 35-45 minutes.',
    localIntro: 'For students across Delhi, SSSAM Academy provides live interactive online classes with comprehensive weekend lab access at our Gurugram campus. Delhi students receive full placement referrals, portfolio reviews, and mock interview coaching.',
    altNames: ['Delhi NCR', 'New Delhi'],
    locationFaqs: [
      {
        question: 'Can Delhi residents attend online with weekend campus visits?',
        answer: 'Yes! Many Delhi students attend interactive live online sessions on weekdays and come to our Gurugram center on weekends for collaborative coding and doubt sessions.',
      },
      {
        question: 'How does Yellow Line metro connectivity work for Delhi students?',
        answer: 'The Yellow Line connects Rajiv Chowk, Kashmere Gate, Central Secretariat, and AIIMS directly to MG Road and IFFCO Chowk without any train changes.',
      },
      {
        question: 'Are placement referrals provided across Delhi NCR companies?',
        answer: 'Yes, our recruitment partners span Noida, Delhi, and Gurugram, giving Delhi candidates access to hiring drives across the entire NCR region.',
      },
    ],
  },
  {
    city: 'south-delhi',
    label: 'South Delhi',
    state: 'Delhi',
    region: 'South Delhi Corridor',
    landmark: 'Saket, Hauz Khas & Malviya Nagar Vicinity',
    nearestMetro: 'Saket, Hauz Khas & Qutab Minar Metro (Yellow Line)',
    commuteGuide: 'Quick 20-25 minute commute via Yellow Line Metro from Saket/Hauz Khas directly to MG Road / Sector 14 Gurugram.',
    localIntro: 'Students and graduates from South Delhi colleges (IIT Delhi area, South Campus, Saket, Malviya Nagar) choose SSSAM Academy for practical, industry-focused tech curricula and direct industry mentorship that goes beyond theoretical college syllabi.',
    altNames: ['South Delhi NCR'],
    locationFaqs: [
      {
        question: 'How fast is the commute from South Delhi to SSSAM Academy?',
        answer: 'From Saket, Qutab Minar, or Chhatarpur Metro, it takes just 18-22 minutes on the Yellow Line to reach MG Road / IFFCO Chowk, followed by a 3-minute auto to Sector 14.',
      },
      {
        question: 'Are weekend masterclasses available for South Delhi college students?',
        answer: 'Yes, we offer specialized Saturday and Sunday batches ideal for university students looking to build production portfolios during their semester breaks.',
      },
      {
        question: 'What technical certifications are awarded upon course completion?',
        answer: 'Graduates receive an industry-recognized Certificate of Completion with a unique verification ID that can be authenticated on our online portal.',
      },
    ],
  },
  {
    city: 'noida',
    label: 'Noida',
    state: 'Uttar Pradesh',
    region: 'Noida / Greater Noida Tech Hub',
    landmark: 'Noida Sector 62 & Sector 18 Tech Zone',
    nearestMetro: 'Botanical Garden & Magenta Line Interchange / Blue Line',
    commuteGuide: 'Accessible via Magenta Line Metro interchange to Yellow Line (Hauz Khas), or through our 100% live interactive online classroom platform.',
    localIntro: 'For developers and freshers based in Noida and Greater Noida, SSSAM Academy offers structured live online training led by industry practitioners, complete with daily instructor Q&A, recorded session archives, and placement coordination across NCR tech parks.',
    altNames: ['Noida Tech Corridor', 'Noida Sector 62'],
    locationFaqs: [
      {
        question: 'How do students in Noida attend SSSAM Academy programs?',
        answer: 'Noida students primarily enroll in our live interactive online batches with daily 1-on-1 mentor support, while having the flexibility to visit the Gurugram lab on weekends for hackathons.',
      },
      {
        question: 'Are job placement opportunities available in Noida IT companies?',
        answer: 'Yes, our 120+ hiring partner network includes prominent software firms and analytics consultancies situated across Noida Sector 62, Sector 125, and Expressway tech hubs.',
      },
      {
        question: 'Do online students get the same doubt clearing as classroom students?',
        answer: 'Yes, online batches feature live screen sharing, dedicated Discord/WhatsApp mentor channels, and daily scheduled 1-on-1 doubt clearing slots.',
      },
    ],
  },
  {
    city: 'faridabad',
    label: 'Faridabad',
    state: 'Haryana',
    region: 'Faridabad / NCR Industrial Corridor',
    landmark: 'Bata Chowk & Neelam Flyover Vicinity',
    nearestMetro: 'Faridabad Violet Line & Direct Gurgaon-Faridabad Highway',
    commuteGuide: '25-30 minute drive via Gurgaon-Faridabad Expressway (Pali Road) directly into Sector 14 Gurugram.',
    localIntro: 'Aspirants from Faridabad seeking modern AI and software engineering careers leverage our convenient proximity via the Gurgaon-Faridabad Road to access Gurugram’s high-growth tech hiring ecosystem and modern coding labs.',
    altNames: ['Faridabad NCR'],
    locationFaqs: [
      {
        question: 'What is the fastest route from Faridabad to the Sector 14 training center?',
        answer: 'The direct Gurgaon-Faridabad Expressway connects NIT Faridabad / Badkhal to Sector 14 Gurugram in approximately 25-30 minutes by personal vehicle or direct bus service.',
      },
      {
        question: 'Are there weekend-only batches for commuters from Faridabad?',
        answer: 'Yes, our Saturday-Sunday weekend batches are highly popular among Faridabad engineering students and working professionals.',
      },
      {
        question: 'Can Faridabad students pay in flexible installments?',
        answer: 'Yes, we offer easy EMI and monthly installment payment plans with up to 40% scholarship discounts based on merit counseling.',
      },
    ],
  },
];

export const getSeoLocation = (city: string): SeoLocation | undefined =>
  seoLocations.find((loc) => loc.city === city);

export const getSeoLocationPaths = () => seoLocations.map((loc) => loc.city);