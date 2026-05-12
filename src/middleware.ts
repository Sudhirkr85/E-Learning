import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes for students
const isStudentPublicRoute = createRouteMatcher([
  '/',
  '/login',
  '/register',
  '/courses',
  '/courses/(.*)',
  '/api/(?!admin)(.*)',
]);

// Define admin routes
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
  '/api/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  // Handle admin routes separately
  if (isAdminRoute(req)) {
    // For admin login page, allow access
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // For other admin routes, check admin session (handled by server components)
    return NextResponse.next();
  }

  // Handle student authentication
  // Handle authenticated user accessing auth pages
  if (userId && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
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
