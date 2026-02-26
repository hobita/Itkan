import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const data = await request.json();

        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                brandId: data.brandId,
                categoryId: data.categoryId,
                price: data.price,
                sku: data.sku,
                stock: data.stock,
                description: data.description || '',
                features: data.features || [],
            },
        });

        return NextResponse.json(product);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to update product';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.product.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to delete product';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: { brand: true, category: true },
        });
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch product';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
