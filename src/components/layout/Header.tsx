'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Container, Button } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useUser, useClerk } from '@clerk/nextjs';

export function Header() {
  const { user } = useUser();
  const { signOut } = useClerk();
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
        ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800/50'
        : 'bg-gradient-to-b from-slate-900 to-slate-900/80'
    }`}>
      <Container className="py-4">
        <div className="flex items-center justify-between text-white">
          {/* Logo */}
          <div className="flex flex-col">
            <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-300 transition-all">
                SSSAM Academy
              </span>
            </Link>
            <p className="text-xs text-slate-400 mt-1">
              SMART SOLUTIONS SCHOOL OF AI & MACHINE LEARNING
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            <Link href={ROUTES.HOME} className="text-gray-300 hover:text-cyan-300 transition-colors font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href={ROUTES.COURSES} className="text-gray-300 hover:text-cyan-300 transition-colors font-medium relative group">
              Courses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/#contact" className="text-gray-300 hover:text-cyan-300 transition-colors font-medium relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href={ROUTES.CERTIFICATES}
              className="text-gray-300 hover:text-cyan-300 transition-colors font-medium relative group"
            >
              Certificate
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Auth Buttons & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  href={ROUTES.DASHBOARD}
                  className="text-gray-300 hover:text-cyan-300 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {user.firstName?.[0] || user.emailAddresses?.[0]?.emailAddress?.[0] || 'U'}
                    </div>
                    <span className="hidden sm:inline text-gray-300">
                      {user.firstName || 'User'}
                    </span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-slate-700">
                        <p className="text-sm font-medium text-white">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.emailAddresses?.[0]?.emailAddress}
                        </p>
                      </div>
                      <Link
                        href={ROUTES.DASHBOARD}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={ROUTES.MY_COURSES}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 transition-colors"
                      >
                        My Courses
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut();
                          window.location.href = ROUTES.HOME;
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  href={ROUTES.LOGIN}
                  className="text-gray-300 hover:text-cyan-300 font-medium"
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  href={ROUTES.REGISTER}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-200 px-5 py-2.5 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Start Learning
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/6 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-slate-200"
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
                className="block text-slate-300 hover:text-emerald-200 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href={ROUTES.COURSES} 
                className="block text-slate-300 hover:text-blue-400 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              href="/#contact" 
                className="block text-slate-300 hover:text-blue-400 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href={ROUTES.CERTIFICATES}
              className="block text-slate-300 hover:text-cyan-300 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Certificate
            </Link>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              {user ? (
                <>
                      <div className="px-4 py-2 border-b border-slate-800">
                            <p className="text-sm font-medium text-slate-200">
                              {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {user.emailAddresses?.[0]?.emailAddress}
                        </p>
                      </div>
                      <Link
                        href={ROUTES.DASHBOARD}
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={ROUTES.MY_COURSES}
                        className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Courses
                      </Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      window.location.href = ROUTES.HOME;
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    href={ROUTES.LOGIN} 
                    size="lg" 
                    className="w-full justify-center text-white/90 hover:text-emerald-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary" 
                    href={ROUTES.REGISTER} 
                    size="lg"
                    className="w-full justify-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
