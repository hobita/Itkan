import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { verifyPassword } from '@/lib/password';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        const admin = await prisma.admin.findUnique({ where: { username } });
        if (!admin) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const valid = await verifyPassword(password, admin.password);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = await signToken({ id: admin.id, username: admin.username, role: admin.role });

        const response = NextResponse.json({ success: true, username: admin.username, role: admin.role });
        response.cookies.set('itkan_admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/',
        });

        return response;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Login failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
