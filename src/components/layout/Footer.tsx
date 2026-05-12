'use client';

import Link from 'next/link';
import { Container, Text, Divider } from '@/components/ui';
import { SITE_CONFIG } from '@/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">SA</span>
              </div>
              <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
            </div>
            <Text size="sm" color="muted" className="text-gray-400">
              {SITE_CONFIG.description}
            </Text>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Divider className="border-gray-700" />

        {/* Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text size="sm" color="muted" className="text-gray-400">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </Text>

          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <Text size="sm" color="muted" className="text-gray-400">
            📧 Email: {SITE_CONFIG.email} | 📞 Phone: {SITE_CONFIG.phone}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
