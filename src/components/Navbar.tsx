"use client";

import Link from 'next/link';
import { ShoppingCart, User, Menu } from 'lucide-react';
import SearchBar from './SearchBar';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const items = useCartStore((state) => state.items);

    // Calculate total quantity of all items in cart
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    // Prevent hydration mismatch by only rendering the badge on the client
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <Link href="/" className="logo">
                    <span className="logo-text">ITKAN</span>
                    <span className="logo-accent">AUTOMOTIVE</span>
                </Link>

                {/* Search Bar */}
                <SearchBar />

                {/* Navigation Links & Actions */}
                <div className="nav-actions">
                    <Link href="/categories" className="nav-link">Categories</Link>
                    <Link href="/brands" className="nav-link">Brands</Link>
                    <Link href="/admin" className="icon-button" title="Admin Dashboard"><User size={24} /></Link>
                    <Link href="/cart" className="icon-button cart-button">
                        <ShoppingCart size={24} />
                        {mounted && totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </Link>
                    <button className="icon-button mobile-menu-btn"><Menu size={24} /></button>
                </div>
            </div>
        </nav>
    );
}
