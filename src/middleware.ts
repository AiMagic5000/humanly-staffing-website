import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/candidate(.*)',
  '/employer(.*)',
  '/admin(.*)',
  '/applications(.*)',
  '/profile(.*)',
  '/settings(.*)',
]);

// Public routes matcher - kept for reference/future use
const _isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/jobs(.*)',
  '/about(.*)',
  '/services(.*)',
  '/industries(.*)',
  '/contact(.*)',
  '/blog(.*)',
  '/faq(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/employers(.*)',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
