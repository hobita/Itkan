import { prisma } from '@/lib/prisma';
import { ArrowRight, Filter } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await prisma.product.findMany({
        include: { brand: true, category: true },
        orderBy: { createdAt: 'desc' },
    });

    const categories = await prisma.category.findMany();
    const brands = await prisma.brand.findMany();

    return (
        <main className="products-page container page-content">
            <div className="page-header-simple">
                <h1>All Products</h1>
                <p className="page-subtitle">Browse our full catalog of premium automotive parts.</p>
            </div>

            <div className="products-layout">
                {/* Sidebar */}
                <aside className="filter-sidebar">
                    <h3><Filter size={18} /> Filters</h3>

                    <div className="filter-group">
                        <label>Category</label>
                        <select className="filter-select">
                            <option value="">All Categories</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.slug}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Brand</label>
                        <select className="filter-select">
                            <option value="">All Brands</option>
                            {brands.map((b) => (
                                <option key={b.id} value={b.name}>{b.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Price Range</label>
                        <select className="filter-select">
                            <option>Any</option>
                            <option>Under $50</option>
                            <option>$50 - $150</option>
                            <option>$150 - $300</option>
                            <option>$300+</option>
                        </select>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="products-grid">
                    {products.map((product) => (
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
                    ))}
                </div>
            </div>
        </main>
    );
}
