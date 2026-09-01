import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = 'admin_session';

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Always allow public routes, sitemap, robots, api/inquiry, courses
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/api/inquiry') ||
    pathname.startsWith('/courses') ||
    pathname === '/' ||
    pathname === '/verify-certificate'
  ) {
    return NextResponse.next();
  }

  // Handle admin routes protection
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (pathname === '/admin/login' || pathname === '/api/admin/login') {
      return NextResponse.next();
    }

    const adminSessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE);
    if (!adminSessionCookie) {
      if (pathname.startsWith('/api/admin/')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
