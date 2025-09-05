import { NextResponse, type NextRequest } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/about', '/how-it-works', '/auth', '/cards', '/logo', '/loyalty-club', '/yacht-results']

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Allow API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // For now, allow all other routes (we'll add auth later)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     * - api routes (to avoid interfering with API calls)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 