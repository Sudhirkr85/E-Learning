export interface SeoLocation {
  city: string;
  label: string;
  state: string;
  region: string;
  altNames?: string[];
}

export const seoLocations: SeoLocation[] = [
  // Delhi NCR - Core Hubs (25 Locations)
  { city: 'gurgaon', label: 'Gurgaon', state: 'Haryana', region: 'NCR', altNames: ['Gurugram'] },
  { city: 'gurugram', label: 'Gurugram', state: 'Haryana', region: 'NCR', altNames: ['Gurgaon'] },
  { city: 'delhi', label: 'Delhi', state: 'Delhi', region: 'NCR' },
  { city: 'south-delhi', label: 'South Delhi', state: 'Delhi', region: 'NCR' },
  { city: 'north-delhi', label: 'North Delhi', state: 'Delhi', region: 'NCR' },
  { city: 'east-delhi', label: 'East Delhi', state: 'Delhi', region: 'NCR' },
  { city: 'west-delhi', label: 'West Delhi', state: 'Delhi', region: 'NCR' },
  { city: 'central-delhi', label: 'Central Delhi', state: 'Delhi', region: 'NCR' },
  { city: 'dwarka', label: 'Dwarka', state: 'Delhi', region: 'NCR' },
  { city: 'rohini', label: 'Rohini', state: 'Delhi', region: 'NCR' },
  { city: 'pitampura', label: 'Pitampura', state: 'Delhi', region: 'NCR' },
  { city: 'saket', label: 'Saket', state: 'Delhi', region: 'NCR' },
  { city: 'lajpat-nagar', label: 'Lajpat Nagar', state: 'Delhi', region: 'NCR' },
  { city: 'connaught-place', label: 'Connaught Place', state: 'Delhi', region: 'NCR' },
  { city: 'janakpuri', label: 'Janakpuri', state: 'Delhi', region: 'NCR' },
  { city: 'laxmi-nagar', label: 'Laxmi Nagar', state: 'Delhi', region: 'NCR' },
  { city: 'noida', label: 'Noida', state: 'Uttar Pradesh', region: 'NCR' },
  { city: 'noida-sector-62', label: 'Noida Sector 62', state: 'Uttar Pradesh', region: 'NCR' },
  { city: 'noida-sector-18', label: 'Noida Sector 18', state: 'Uttar Pradesh', region: 'NCR' },
  { city: 'greater-noida', label: 'Greater Noida', state: 'Uttar Pradesh', region: 'NCR' },
  { city: 'ghaziabad', label: 'Ghaziabad', state: 'Uttar Pradesh', region: 'NCR' },
  { city: 'faridabad', label: 'Faridabad', state: 'Haryana', region: 'NCR' },
  { city: 'cyber-city-gurgaon', label: 'Cyber City Gurgaon', state: 'Haryana', region: 'NCR' },
  { city: 'sector-14-gurgaon', label: 'Sector 14 Gurgaon', state: 'Haryana', region: 'NCR' },
  { city: 'sohna-road-gurgaon', label: 'Sohna Road Gurgaon', state: 'Haryana', region: 'NCR' },

  // Tier 1 Major Tech & Metro Cities (15 Locations)
  { city: 'bangalore', label: 'Bangalore', state: 'Karnataka', region: 'South India', altNames: ['Bengaluru'] },
  { city: 'hyderabad', label: 'Hyderabad', state: 'Telangana', region: 'South India' },
  { city: 'pune', label: 'Pune', state: 'Maharashtra', region: 'West India' },
  { city: 'mumbai', label: 'Mumbai', state: 'Maharashtra', region: 'West India' },
  { city: 'chennai', label: 'Chennai', state: 'Tamil Nadu', region: 'South India' },
  { city: 'kolkata', label: 'Kolkata', state: 'West Bengal', region: 'East India' },
  { city: 'ahmedabad', label: 'Ahmedabad', state: 'Gujarat', region: 'West India' },
  { city: 'chandigarh', label: 'Chandigarh', state: 'Punjab', region: 'North India' },
  { city: 'jaipur', label: 'Jaipur', state: 'Rajasthan', region: 'North India' },
  { city: 'lucknow', label: 'Lucknow', state: 'Uttar Pradesh', region: 'North India' },
  { city: 'indore', label: 'Indore', state: 'Madhya Pradesh', region: 'Central India' },
  { city: 'bhopal', label: 'Bhopal', state: 'Madhya Pradesh', region: 'Central India' },
  { city: 'nagpur', label: 'Nagpur', state: 'Maharashtra', region: 'West India' },
  { city: 'patna', label: 'Patna', state: 'Bihar', region: 'East India' },
  { city: 'kochi', label: 'Kochi', state: 'Kerala', region: 'South India' },

  // Key Emerging Tech & Educational Hubs (10 Locations)
  { city: 'coimbatore', label: 'Coimbatore', state: 'Tamil Nadu', region: 'South India' },
  { city: 'bhubaneswar', label: 'Bhubaneswar', state: 'Odisha', region: 'East India' },
  { city: 'vizag', label: 'Visakhapatnam', state: 'Andhra Pradesh', region: 'South India' },
  { city: 'surat', label: 'Surat', state: 'Gujarat', region: 'West India' },
  { city: 'vadodara', label: 'Vadodara', state: 'Gujarat', region: 'West India' },
  { city: 'ranchi', label: 'Ranchi', state: 'Jharkhand', region: 'East India' },
  { city: 'dehradun', label: 'Dehradun', state: 'Uttarakhand', region: 'North India' },
  { city: 'kanpur', label: 'Kanpur', state: 'Uttar Pradesh', region: 'North India' },
  { city: 'meerut', label: 'Meerut', state: 'Uttar Pradesh', region: 'NCR' },
  { city: 'agra', label: 'Agra', state: 'Uttar Pradesh', region: 'North India' },
];

export const getSeoLocation = (city: string): SeoLocation | undefined =>
  seoLocations.find((loc) => loc.city === city);

export const getSeoLocationPaths = () => seoLocations.map((loc) => loc.city);