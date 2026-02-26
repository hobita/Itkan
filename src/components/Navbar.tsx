import Link from 'next/link';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link href="/" className="logo">
                    <span className="logo-text">ITKAN</span>
                    <span className="logo-accent">AUTOMOTIVE</span>
                </Link>

                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search parts by Make, Model, or Keyword..."
                        className="search-input"
                    />
                    <button className="search-button">
                        <Search size={20} />
                    </button>
                </div>

                {/* Navigation Links & Actions */}
                <div className="nav-actions">
                    <Link href="/categories" className="nav-link">Categories</Link>
                    <Link href="/brands" className="nav-link">Brands</Link>
                    <button className="icon-button"><User size={24} /></button>
                    <button className="icon-button cart-button">
                        <ShoppingCart size={24} />
                        <span className="cart-badge">0</span>
                    </button>
                    <button className="icon-button mobile-menu-btn"><Menu size={24} /></button>
                </div>
            </div>
        </nav>
    );
}
