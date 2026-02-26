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

            <div className="brands-grid">
                {brands.map((brand) => (
                    <Link key={brand.id} href="/products" className="brand-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="brand-logo-placeholder">
                            <span className="brand-text-lg">{brand.name}</span>
                        </div>
                        <div className="brand-info">
                            <p className="brand-tagline">{brand.tagline}</p>
                            <div className="brand-footer">
                                <span className="part-count">{brand._count.products} products</span>
                                <span className="view-link">Shop <ArrowRight size={14} /></span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
