import Link from 'next/link';
import { Container, Text, Divider } from '@/components/ui';
import { ROUTES, SITE_CONFIG } from '@/constants';

const exploreLinks = [
  { label: 'Courses', href: ROUTES.COURSES },
  { label: 'Login', href: ROUTES.LOGIN },
  { label: 'Register', href: ROUTES.REGISTER },
  { label: 'Contact', href: '/#contact' },
];

const contactLinks = [
  { label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { label: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
  { label: 'Gurugram, India' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-slate-950 text-white flex items-center justify-center shadow-sm">
                <span className="font-bold text-lg">SA</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-slate-950">{SITE_CONFIG.name}</div>
                <div className="text-sm text-slate-500">Professional IT training</div>
              </div>
            </div>

            <Text size="sm" className="text-slate-600 max-w-md leading-relaxed">
              Job-focused learning for Indian students with live training, practical projects, and career support.
            </Text>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 text-sm">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
              >
                {SITE_CONFIG.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100"
              >
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-600 transition-colors hover:text-slate-950">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactLinks.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} className="text-slate-600 transition-colors hover:text-slate-950">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-slate-600">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-10 border-slate-200" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Text size="sm" className="text-slate-500">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </Text>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>Based in Gurugram, India</span>
            <span className="hidden md:inline">•</span>
            <span>Available in Hindi & English</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
