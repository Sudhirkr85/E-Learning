import Link from 'next/link';
import { Container, Text, Divider } from '@/components/ui';
import { ROUTES, SITE_CONFIG, ORGANIZATION_STATS } from '@/constants';

const exploreLinks = [
  { label: 'All Courses', href: ROUTES.COURSES },
  { label: 'Official Portal (sssamacademy.com)', href: 'https://sssamacademy.com', external: true },
  { label: 'Sector 14 Center', href: '/#contact' },
  { label: 'About Institute', href: '/#about' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const contactLinks = [
  { label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { label: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  { label: 'Gurugram, India' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800/60">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.08)]">
                <span className="font-bold text-lg">SA</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{SITE_CONFIG.name}</div>
                <div className="text-sm text-slate-400">{SITE_CONFIG.fullName}</div>
              </div>
            </div>

            <Text size="sm" className="text-slate-400 max-w-md leading-relaxed">
              Premium AI-first training from Sector 14, Gurugram. Live practical classes, placement-driven projects, and career support for India’s next generation of IT professionals.
            </Text>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm text-slate-300">
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-3">
                <div className="text-cyan-300 font-semibold">{ORGANIZATION_STATS.packageRange}</div>
                <div className="text-slate-500">{ORGANIZATION_STATS.packageRangeLabel}</div>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-3">
                <div className="text-cyan-300 font-semibold">{ORGANIZATION_STATS.collegePartners}</div>
                <div className="text-slate-500">{ORGANIZATION_STATS.collegePartnersLabel}</div>
              </div>
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-3">
                <div className="text-cyan-300 font-semibold">{ORGANIZATION_STATS.hiringNetwork}</div>
                <div className="text-slate-500">{ORGANIZATION_STATS.hiringNetworkLabel}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <p>{SITE_CONFIG.address}</p>
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-100"
              >
                <span>Open Google Maps</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-slate-400">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-cyan-300 font-medium"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-5">
              Contact & Social
            </h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="transition-colors hover:text-white">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="transition-colors hover:text-white">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Divider className="my-10 border-slate-800" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-slate-500">
          <Text size="sm">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </Text>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/privacy-policy" className="hover:text-cyan-300 transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-cyan-300 transition">Terms & Conditions</Link>
            <span className="hidden md:inline">•</span>
            <span>Sector 14 Gurugram</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
