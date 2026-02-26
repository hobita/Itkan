import { prisma } from '@/lib/prisma';
import { getAdminFromCookie } from '@/lib/auth';
import { NextResponse } from 'next/server';

// DELETE an admin (protected, min 1 admin must remain)
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const currentAdmin = await getAdminFromCookie();
    if (!currentAdmin) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check minimum 1 admin
    const adminCount = await prisma.admin.count();
    if (adminCount <= 1) {
        return NextResponse.json({ error: 'Cannot delete the last admin account' }, { status: 400 });
    }

    // Prevent deleting yourself if you're the last admin
    try {
        await prisma.admin.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to delete admin';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
