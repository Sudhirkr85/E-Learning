import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes for students
const isStudentPublicRoute = createRouteMatcher([
  '/',
  '/login',
  '/register',
  '/courses',
  '/courses/(.*)',
  '/checkout',
  '/checkout/(.*)',
  '/payment-failed',
  '/api/courses(.*)',
  '/api/razorpay(.*)',
  '/api/student(.*)',
  '/api/user(.*)',
]);

// Define admin routes that don't need auth
const isAdminPublicRoute = createRouteMatcher([
  '/admin/login',
  '/api/admin/login',
]);

// Define all admin routes
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)',
]);

const ADMIN_SESSION_COOKIE = 'admin_session';

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  // Handle admin routes separately
  if (isAdminRoute(req)) {
    // For admin login page and API, allow access
    if (isAdminPublicRoute(req)) {
      return NextResponse.next();
    }

    // For other admin routes, check admin session cookie
    const adminSessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE);
    
    if (!adminSessionCookie) {
      // Redirect to admin login if not authenticated
      if (pathname.startsWith('/api/admin/')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
  }

  // Handle student authentication
  // Handle authenticated user accessing auth pages
  if (userId && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Handle unauthenticated user accessing protected student routes
  if (!userId && !isStudentPublicRoute(req)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
