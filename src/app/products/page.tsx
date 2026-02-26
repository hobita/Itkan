import { prisma } from '@/lib/prisma';
import { ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';
import ProductFilters from '@/components/ProductFilters';

export const dynamic = 'force-dynamic';

interface SearchParams {
    q?: string;
    category?: string;
    brand?: string;
    price?: string;
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams;
    const { q, category, brand, price } = params;

    // Build Prisma where clause dynamically
    const where: Record<string, unknown> = {};

    if (q) {
        where.OR = [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { sku: { contains: q, mode: 'insensitive' } },
        ];
    }

    if (category) {
        where.category = { slug: category };
    }

    if (brand) {
        where.brand = { name: brand };
    }

    if (price) {
        switch (price) {
            case 'under50':
                where.price = { lt: 50 };
                break;
            case '50-150':
                where.price = { gte: 50, lte: 150 };
                break;
            case '150-300':
                where.price = { gte: 150, lte: 300 };
                break;
            case '300plus':
                where.price = { gt: 300 };
                break;
        }
    }

    const [products, categories, brands] = await Promise.all([
        prisma.product.findMany({
            where,
            include: { brand: true, category: true },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.category.findMany({ orderBy: { name: 'asc' } }),
        prisma.brand.findMany({ orderBy: { name: 'asc' } }),
    ]);

    return (
        <main className="products-page container page-content">
            <div className="page-header-simple">
                <h1>
                    {q ? `Results for "${q}"` : 'All Products'}
                </h1>
                <p className="page-subtitle">
                    {products.length} {products.length === 1 ? 'product' : 'products'} found.
                    {q && <Link href="/products" style={{ color: 'var(--primary)', marginLeft: '0.5rem' }}>Clear search</Link>}
                </p>
            </div>

            <div className="products-layout">
                {/* Sidebar Filters — Client Component */}
                <ProductFilters
                    categories={categories}
                    brands={brands}
                    currentCategory={category}
                    currentBrand={brand}
                    currentPrice={price}
                />

                {/* Product Grid */}
                <div className="products-grid">
                    {products.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 2rem', color: '#a1a1aa' }}>
                            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No products found matching your criteria.</p>
                            <Link href="/products" className="btn-primary" style={{ display: 'inline-flex' }}>
                                View All Products
                            </Link>
                        </div>
                    ) : (
                        products.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="product-image-placeholder">
                                    <span className="part-placeholder-icon">🔧</span>
                                </div>
                                <div className="product-card-body">
                                    <span className="product-brand">{product.brand.name}</span>
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-card-footer">
                                        <span className="product-price">${product.price.toFixed(2)}</span>
                                        <span className="view-link">View <ArrowRight size={14} /></span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
