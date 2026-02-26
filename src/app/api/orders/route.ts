import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.customerEmail || !data.items || data.items.length === 0) {
            return NextResponse.json({ error: 'Email and at least one item are required' }, { status: 400 });
        }

        // Calculate total from items
        const total = data.items.reduce(
            (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
            0
        );

        const order = await prisma.order.create({
            data: {
                customerEmail: data.customerEmail,
                total,
                status: 'PENDING',
            },
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create order';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET() {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(orders);
}
