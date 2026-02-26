import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes (but NOT /admin/login)
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('itkan_admin_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        const decoded = await verifyToken(token);
        if (!decoded) {
            // Invalid/expired token — clear it and redirect
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.set('itkan_admin_token', '', { maxAge: 0, path: '/' });
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
