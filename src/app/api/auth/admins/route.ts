import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';
import { hashPassword } from '@/lib/password';
import { NextResponse } from 'next/server';

// GET all admins (protected)
export async function GET() {
    const currentAdmin = await getAdminFromCookie();
    if (!currentAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const admins = await prisma.admin.findMany({
        select: { id: true, username: true, role: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(admins);
}

// POST create new admin (protected)
export async function POST(request: Request) {
    const currentAdmin = await getAdminFromCookie();
    if (!currentAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
        }

        const existing = await prisma.admin.findUnique({ where: { username } });
        if (existing) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
        }

        const hashed = await hashPassword(password);
        const admin = await prisma.admin.create({
            data: { username, password: hashed },
            select: { id: true, username: true, role: true, createdAt: true },
        });

        return NextResponse.json(admin, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create admin';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
