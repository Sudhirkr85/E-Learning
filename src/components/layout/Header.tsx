'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container, Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SA</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">
              SSSAM Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href={ROUTES.HOME} className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href={ROUTES.COURSES} className="text-gray-700 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <a href="#trainers" className="text-gray-700 hover:text-blue-600 transition-colors">
              Trainers
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" href={ROUTES.LOGIN}>
              Login
            </Button>
            <Button variant="primary" href={ROUTES.REGISTER}>
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            <Link href={ROUTES.HOME} className="block text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href={ROUTES.COURSES} className="block text-gray-700 hover:text-blue-600">
              Courses
            </Link>
            <a href="#trainers" className="block text-gray-700 hover:text-blue-600">
              Trainers
            </a>
            <a href="#faq" className="block text-gray-700 hover:text-blue-600">
              FAQ
            </a>
            <a href="#contact" className="block text-gray-700 hover:text-blue-600">
              Contact
            </a>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" href={ROUTES.LOGIN} size="sm" className="w-full">
                Login
              </Button>
              <Button variant="primary" href={ROUTES.REGISTER} size="sm" className="w-full">
                Register
              </Button>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
