import { use } from 'react';
import { prisma } from '@/lib/prisma';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const product = use(
        prisma.product.findUnique({
            where: { id: resolvedParams.id },
            include: { brand: true, category: true },
        })
    );

    if (!product) {
        return (
            <main className="container page-content" style={{ textAlign: 'center', paddingTop: '6rem' }}>
                <h1>Product Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <Link href="/products" className="btn-primary" style={{ display: 'inline-flex', marginTop: '1rem' }}>
                    Back to Products
                </Link>
            </main>
        );
    }

    return (
        <main className="product-details-page container page-content mt-8">
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
                <Link href="/">Home</Link> <span className="separator">/</span>
                <Link href="/products">Products</Link> <span className="separator">/</span>
                <Link href={`/categories`}>{product.category.name}</Link> <span className="separator">/</span>
                <span className="current">{product.name}</span>
            </div>

            <div className="product-split">
                {/* Left Column - Images */}
                <div className="product-gallery">
                    <div className="main-image">
                        <span className="part-placeholder-icon">🛠️</span>
                    </div>
                    <div className="image-thumbnails">
                        <div className="thumbnail active"></div>
                        <div className="thumbnail"></div>
                        <div className="thumbnail"></div>
                        <div className="thumbnail"></div>
                    </div>
                </div>

                {/* Right Column - Info & Cart */}
                <div className="product-summary">
                    <div className="brand-badge">{product.brand.name}</div>
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-meta">
                        <div className="product-rating">
                            <div className="stars">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <span className="review-count">4.8 (124 reviews)</span>
                        </div>
                        <span className="sku">SKU: {product.sku}</span>
                    </div>

                    <div className="product-price-section">
                        <span className="product-price-large">${product.price.toFixed(2)}</span>
                        <span className={`stock-status ${product.stock > 0 ? 'in-stock' : ''}`}>
                            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                        </span>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <ul className="product-features">
                        {product.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                        ))}
                    </ul>

                    <div className="add-to-cart-widget">
                        <div className="quantity-selector">
                            <button className="qty-btn">-</button>
                            <input type="number" defaultValue="1" className="qty-input" />
                            <button className="qty-btn">+</button>
                        </div>
                        <button className="btn-primary flex-1 btn-large">
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                    </div>

                    <div className="product-trust-badges">
                        <div className="trust-badge">
                            <Truck size={20} className="trust-icon" />
                            <span>Free Shipping over $100</span>
                        </div>
                        <div className="trust-badge">
                            <RotateCcw size={20} className="trust-icon" />
                            <span>30-Day Easy Returns</span>
                        </div>
                        <div className="trust-badge">
                            <ShieldCheck size={20} className="trust-icon" />
                            <span>Lifetime Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
