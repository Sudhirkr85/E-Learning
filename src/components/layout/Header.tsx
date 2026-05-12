'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container, Button } from '@/components/ui';
import { ROUTES } from '@/constants';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-white shadow-sm'
    }`}>
      <Container className="py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-xl">SA</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline group-hover:text-blue-600 transition-colors">
              SSSAM Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href={ROUTES.HOME} 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href={ROUTES.COURSES} 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Courses
            </Link>
            <a 
              href="#trainers" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#trainers');
              }}
            >
              Trainers
            </a>
            <a 
              href="#faq" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#faq');
              }}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
            >
              Contact
            </a>
          </nav>

          {/* Auth Buttons & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              href={ROUTES.LOGIN}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Button>
            <Button 
              variant="primary" 
              href={ROUTES.REGISTER}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
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
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="pt-4 pb-6 space-y-4">
            <Link 
              href={ROUTES.HOME} 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href={ROUTES.COURSES} 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <a 
              href="#trainers" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#trainers');
              }}
            >
              Trainers
            </a>
            <a 
              href="#faq" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#faq');
              }}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
            >
              Contact
            </a>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              <Button 
                variant="ghost" 
                href={ROUTES.LOGIN} 
                size="lg" 
                className="w-full justify-center text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Button>
              <Button 
                variant="primary" 
                href={ROUTES.REGISTER} 
                size="lg"
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-md hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
