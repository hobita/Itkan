import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BrandsPage() {
    const brands = await prisma.brand.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { name: 'asc' },
    });

    return (
        <main className="brands-page container page-content">
            <div className="page-header-simple">
                <h1>Our Brands</h1>
                <p className="page-subtitle">We partner with the world&apos;s most trusted automotive parts manufacturers.</p>
            </div>

            <div className="brands-grid-full">
                {brands.map((brand) => (
                    <Link key={brand.id} href="/products" className="brand-card-full" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2 className="brand-card-name">{brand.name}</h2>
                        <p className="brand-card-tagline">{brand.tagline}</p>
                        <div className="brand-card-footer">
                            <span className="brand-product-count">{brand._count.products} products</span>
                            <span className="brand-link">Shop <ArrowRight size={14} /></span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
