export interface SeoModifier {
  modifier: string;
  label: string;
  headlinePrefix: string;
  intentSignal: string;
  ctaText: string;
  badge: string;
  metaAdjective: string;
}

export const seoModifiers: SeoModifier[] = [
  { modifier: 'best',           label: 'Best',           headlinePrefix: 'Best',           intentSignal: 'quality-focused learners', ctaText: 'Join the Best-Rated Program',     badge: '⭐ Top Rated',              metaAdjective: 'best' },
  { modifier: 'top',            label: 'Top',            headlinePrefix: 'Top',            intentSignal: 'most reputable institutes', ctaText: 'Enroll in a Top-Ranked Course',   badge: '🏆 Top Ranked',             metaAdjective: 'top' },
  { modifier: 'online',         label: 'Online',         headlinePrefix: 'Online',         intentSignal: 'study from home remotely', ctaText: 'Start Learning Online Today',     badge: '💻 100% Online',            metaAdjective: 'online' },
  { modifier: 'offline',        label: 'Offline',        headlinePrefix: 'Offline',        intentSignal: 'classroom based learning', ctaText: 'Join Classroom Training Now',     badge: '🏫 Classroom Training',     metaAdjective: 'offline' },
  { modifier: 'affordable',     label: 'Affordable',     headlinePrefix: 'Affordable',     intentSignal: 'budget-conscious students', ctaText: 'Get Affordable Training Now',     badge: '💰 Best Value',             metaAdjective: 'affordable' },
  { modifier: 'certified',      label: 'Certified',      headlinePrefix: 'Certified',      intentSignal: 'certificate-backed training', ctaText: 'Get Certified — Enroll Now',   badge: '📜 Certificate Included',   metaAdjective: 'certified' },
  { modifier: 'near-me',        label: 'Near Me',        headlinePrefix: 'Local',          intentSignal: 'near location training',   ctaText: 'Find Training Near You',          badge: '📍 Near You',               metaAdjective: 'local' },
  { modifier: 'weekend',        label: 'Weekend',        headlinePrefix: 'Weekend',        intentSignal: 'working professionals',    ctaText: 'Enroll in Weekend Batch',         badge: '📅 Weekend Batch',          metaAdjective: 'weekend' },
  { modifier: 'evening',        label: 'Evening',        headlinePrefix: 'Evening',        intentSignal: 'students with day jobs',   ctaText: 'Join Evening Batch Today',        badge: '🌙 Evening Batch',          metaAdjective: 'evening' },
  { modifier: 'morning',        label: 'Morning',        headlinePrefix: 'Morning',        intentSignal: 'early morning learners',   ctaText: 'Join Morning Batch Today',        badge: '🌅 Morning Batch',          metaAdjective: 'morning' },
  { modifier: 'fast-track',     label: 'Fast Track',     headlinePrefix: 'Fast Track',     intentSignal: 'quick course completion',  ctaText: 'Join Fast Track Program',         badge: '⚡ Fast Track',             metaAdjective: 'fast-track' },
  { modifier: 'crash-course',   label: 'Crash Course',   headlinePrefix: 'Crash Course',   intentSignal: 'rapid skill building',     ctaText: 'Enroll in Crash Course Now',      badge: '🚀 Crash Course',           metaAdjective: 'crash course' },
  { modifier: 'job-oriented',   label: 'Job Oriented',   headlinePrefix: 'Job-Oriented',   intentSignal: 'placement-focused learners', ctaText: 'Get Job-Ready Training',        badge: '💼 Job Guaranteed Focus',   metaAdjective: 'job-oriented' },
  { modifier: 'free-demo',      label: 'Free Demo',      headlinePrefix: 'Free Demo',      intentSignal: 'try before enrolling',     ctaText: 'Book Free Demo Class',            badge: '🆓 Free Demo Available',    metaAdjective: 'free demo' },
  { modifier: 'classroom',      label: 'Classroom',      headlinePrefix: 'Classroom',      intentSignal: 'in-person classroom training', ctaText: 'Join Classroom Batch',        badge: '🏫 Classroom Based',        metaAdjective: 'classroom' },
  { modifier: 'short-term',     label: 'Short Term',     headlinePrefix: 'Short Term',     intentSignal: 'quick intensive programs', ctaText: 'Enroll in Short-Term Course',     badge: '⏱ Short Duration',         metaAdjective: 'short-term' },
  { modifier: 'placement',      label: 'Placement',      headlinePrefix: 'Placement',      intentSignal: 'job placement guarantee',  ctaText: 'Get Placement Assistance Now',    badge: '💼 With Placement Support', metaAdjective: 'placement-focused' },
];

export const getSeoModifier = (modifier: string): SeoModifier | undefined =>
  seoModifiers.find((m) => m.modifier === modifier);

export const getSeoModifierPaths = () =>
  seoModifiers.map((m) => m.modifier);