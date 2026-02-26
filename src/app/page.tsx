import { prisma } from '@/lib/prisma';
import { Search, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import Link from 'next/link';
import HomeSearchForm from '@/components/HomeSearchForm';

export const dynamic = 'force-dynamic';

export default async function Home() {
    const brands = await prisma.brand.findMany({ take: 10, orderBy: { name: 'asc' } });
    const categories = await prisma.category.findMany({ take: 6, orderBy: { name: 'asc' } });

    return (
        <main className="main-content">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span className="text-primary">Premium</span> Auto Parts for<br />
                        Uncompromising Performance
                    </h1>
                    <p className="hero-subtitle">
                        Find the exact fit for your vehicle from our catalog of over 50,000 high-quality parts.
                        Trusted by mechanics and driving enthusiasts.
                    </p>

                    <div className="hero-search">
                        <div className="search-tabs">
                            <button className="tab active">Find by Keyword</button>
                            <button className="tab disabled" title="Coming Soon">Find by Vehicle</button>
                        </div>
                        <HomeSearchForm />
                    </div>
                </div>
            </section>

            {/* Brands Banner */}
            <section className="brands-banner">
                <div className="brands-container">
                    <p className="brands-text">SUPPORTING TOP MANUFACTURERS</p>
                    <div className="brands-scroll">
                        {brands.map((brand) => (
                            <Link href="/products" key={brand.id} className="brand-name">{brand.name}</Link>
                        ))}
                        {/* Duplicated for infinite scroll effect */}
                        {brands.map((brand) => (
                            <Link href="/products" key={`${brand.id}-dup`} className="brand-name">{brand.name}</Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features/Trust Section */}
            <section className="features-section">
                <div className="feature-card">
                    <ShieldCheck size={40} className="feature-icon" />
                    <h3>Quality Guaranteed</h3>
                    <p>All parts meet or exceed OEM specifications with full warranty.</p>
                </div>
                <div className="feature-card">
                    <Truck size={40} className="feature-icon" />
                    <h3>Fast Shipping</h3>
                    <p>Orders placed before 2PM ship the same day across the country.</p>
                </div>
                <div className="feature-card">
                    <Clock size={40} className="feature-icon" />
                    <h3>Expert Support</h3>
                    <p>Our certified mechanics are ready to help you find the right part.</p>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="categories-section">
                <div className="section-header">
                    <h2>Featured Categories</h2>
                    <Link href="/categories" className="view-all">View All <ArrowRight size={16} /></Link>
                </div>
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <Link key={cat.id} href="/products" className="category-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="category-placeholder">
                                <span className="text-4xl text-white opacity-20">{cat.name.charAt(0)}</span>
                            </div>
                            <div className="category-info">
                                <h3>{cat.name}</h3>
                                <span className="category-link">Shop Now <ArrowRight size={14} /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </main>
    );
}
