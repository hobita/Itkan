import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const products = await prisma.product.findMany({
        include: { brand: true, category: true },
        orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const product = await prisma.product.create({
            data: {
                name: data.name,
                brandId: data.brandId,
                categoryId: data.categoryId,
                price: data.price,
                sku: data.sku,
                stock: data.stock,
                description: data.description || '',
                features: data.features || [],
                images: [],
            },
        });
        return NextResponse.json(product, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to create product';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
