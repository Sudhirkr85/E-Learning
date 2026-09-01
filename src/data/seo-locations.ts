export interface SeoLocation {
  city: string;
  label: string;
  state: string;
  region: string;
  altNames?: string[];
}

export const seoLocations: SeoLocation[] = [
  // ── GURUGRAM / GURGAON MICRO-HUBS (25 Primary Offline Locations) ────────────
  { city: 'sector-14-gurgaon', label: 'Sector 14 Gurgaon', state: 'Haryana', region: 'Gurugram (Sector 14 Center)', altNames: ['Sector 14 Gurugram'] },
  { city: 'old-dlf-gurgaon', label: 'Old DLF Colony Gurgaon', state: 'Haryana', region: 'Gurugram', altNames: ['Old DLF Sector 14'] },
  { city: 'gurgaon', label: 'Gurgaon', state: 'Haryana', region: 'Gurugram', altNames: ['Gurugram'] },
  { city: 'gurugram', label: 'Gurugram', state: 'Haryana', region: 'Gurugram', altNames: ['Gurgaon'] },
  { city: 'cyber-city-gurgaon', label: 'Cyber City Gurgaon', state: 'Haryana', region: 'Gurugram', altNames: ['DLF Cyber City'] },
  { city: 'mg-road-gurgaon', label: 'MG Road Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'sohna-road-gurgaon', label: 'Sohna Road Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'golf-course-road', label: 'Golf Course Road Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'golf-course-extension', label: 'Golf Course Extension Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'dlf-phase-1', label: 'DLF Phase 1 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'dlf-phase-2', label: 'DLF Phase 2 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'dlf-phase-3', label: 'DLF Phase 3 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'dlf-phase-4', label: 'DLF Phase 4 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'dlf-phase-5', label: 'DLF Phase 5 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'palam-vihar', label: 'Palam Vihar Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'udyog-vihar', label: 'Udyog Vihar Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'manesar-gurgaon', label: 'IMT Manesar Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'dwarka-expressway', label: 'Dwarka Expressway Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'sector-29-gurgaon', label: 'Sector 29 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'sector-44-gurgaon', label: 'Sector 44 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'sector-48-gurgaon', label: 'Sector 48 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'sector-56-gurgaon', label: 'Sector 56 Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'huda-city-centre', label: 'HUDA City Centre Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'iffco-chowk', label: 'IFFCO Chowk Gurgaon', state: 'Haryana', region: 'Gurugram' },
  { city: 'sushant-lok', label: 'Sushant Lok Gurgaon', state: 'Haryana', region: 'Gurugram' },

  // ── DELHI KEY LOCAL HUBS (18 Locations) ───────────────────────────────────────
  { city: 'delhi', label: 'Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'south-delhi', label: 'South Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'saket', label: 'Saket Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'lajpat-nagar', label: 'Lajpat Nagar Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'connaught-place', label: 'Connaught Place Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'janakpuri', label: 'Janakpuri Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'laxmi-nagar', label: 'Laxmi Nagar Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'dwarka-delhi', label: 'Dwarka Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'rohini', label: 'Rohini Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'pitampura', label: 'Pitampura Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'karol-bagh', label: 'Karol Bagh Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'hauz-khas', label: 'Hauz Khas Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'nehru-place', label: 'Nehru Place Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'malviya-nagar', label: 'Malviya Nagar Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'preet-vihar', label: 'Preet Vihar Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'punjabi-bagh', label: 'Punjabi Bagh Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'patel-nagar', label: 'Patel Nagar Delhi', state: 'Delhi', region: 'Delhi NCR' },
  { city: 'uttam-nagar', label: 'Uttam Nagar Delhi', state: 'Delhi', region: 'Delhi NCR' },

  // ── NOIDA & NCR ADJACENT HUBS (7 Locations) ──────────────────────────────────
  { city: 'noida', label: 'Noida', state: 'Uttar Pradesh', region: 'Delhi NCR' },
  { city: 'noida-sector-62', label: 'Noida Sector 62', state: 'Uttar Pradesh', region: 'Delhi NCR' },
  { city: 'noida-sector-18', label: 'Noida Sector 18', state: 'Uttar Pradesh', region: 'Delhi NCR' },
  { city: 'greater-noida', label: 'Greater Noida', state: 'Uttar Pradesh', region: 'Delhi NCR' },
  { city: 'ghaziabad', label: 'Ghaziabad', state: 'Uttar Pradesh', region: 'Delhi NCR' },
  { city: 'faridabad', label: 'Faridabad', state: 'Haryana', region: 'Delhi NCR' },
  { city: 'ballabhgarh', label: 'Ballabhgarh', state: 'Haryana', region: 'Delhi NCR' },
];

export const getSeoLocation = (city: string): SeoLocation | undefined =>
  seoLocations.find((loc) => loc.city === city);

export const getSeoLocationPaths = () => seoLocations.map((loc) => loc.city);