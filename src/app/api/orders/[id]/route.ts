import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await request.json();

        if (!data.status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 });
        }

        const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
        if (!validStatuses.includes(data.status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const order = await prisma.order.update({
            where: { id },
            data: { status: data.status },
        });

        return NextResponse.json(order);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update order';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
