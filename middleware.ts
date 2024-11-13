import { NextRequest, NextResponse } from 'next/server';

// Define routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];

export function middleware(req: NextRequest) {
  // Check for the token in cookies (or headers, if you prefer)
  const token = req.cookies.get('auth_token');

  // If the request path is a protected route and there's no token, redirect to login
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'],
};
