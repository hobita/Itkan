import { Search, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
                            <button className="tab active">Find by Vehicle</button>
                            <button className="tab">Find by Part #</button>
                        </div>
                        <div className="search-form">
                            <select className="search-select">
                                <option>Make</option>
                                <option>Toyota</option>
                                <option>Nissan</option>
                                <option>Mazda</option>
                                <option>Hyundai</option>
                                <option>Kia</option>
                            </select>
                            <select className="search-select">
                                <option>Model</option>
                            </select>
                            <select className="search-select">
                                <option>Year</option>
                            </select>
                            <Link href="/products" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                Find Parts <Search size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Banner */}
            <section className="brands-banner">
                <div className="brands-container">
                    <p className="brands-text">SUPPORTING TOP MANUFACTURERS</p>
                    <div className="brands-scroll">
                        {['MAZDA', 'TOYOTA', 'NISSAN', 'HYUNDAI', 'KIA', 'FORD', 'SUZUKI', 'MITSUBISHI', 'ISUZU', 'MG'].map((brand) => (
                            <span key={brand} className="brand-name">{brand}</span>
                        ))}
                        {/* Duplicated for infinite scroll effect */}
                        {['MAZDA', 'TOYOTA', 'NISSAN', 'HYUNDAI', 'KIA', 'FORD', 'SUZUKI', 'MITSUBISHI', 'ISUZU', 'MG'].map((brand, i) => (
                            <span key={`${brand}-dup`} className="brand-name">{brand}</span>
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
                    {['Engine Components', 'Brake Systems', 'Suspension & Steering', 'Filters & Fluids', 'Electrical & Lighting', 'Body Parts'].map((cat) => (
                        <Link key={cat} href="/products" className="category-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="category-placeholder"></div>
                            <div className="category-info">
                                <h3>{cat}</h3>
                                <span className="category-link">Shop Now <ArrowRight size={14} /></span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </main>
    );
}
