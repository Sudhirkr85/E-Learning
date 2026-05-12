import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/login',
  '/register',
  '/courses',
  '/courses/(.*)',
  '/api(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Get auth state
  const { userId } = await auth();
  
  // Handle authenticated user accessing auth pages
  if (userId && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Handle unauthenticated user accessing protected routes
  if (!userId && !isPublicRoute(req)) {
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
