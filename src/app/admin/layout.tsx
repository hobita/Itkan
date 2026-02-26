"use client";

import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h2 className="logo">
                        <span className="logo-text">ITKAN</span><span className="logo-accent">ADMIN</span>
                    </h2>
                </div>
                <nav className="admin-nav">
                    <Link href="/admin" className={`admin-nav-link ${pathname === '/admin' ? 'active' : ''}`}>
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link href="/admin/products" className={`admin-nav-link ${pathname.startsWith('/admin/products') ? 'active' : ''}`}>
                        <Package size={18} /> Products
                    </Link>
                    <Link href="/admin/orders" className={`admin-nav-link ${pathname.startsWith('/admin/orders') ? 'active' : ''}`}>
                        <ShoppingCart size={18} /> Orders
                    </Link>
                    <Link href="/admin/settings" className={`admin-nav-link ${pathname === '/admin/settings' ? 'active' : ''}`}>
                        <Settings size={18} /> Admin Accounts
                    </Link>
                </nav>
                <div className="admin-sidebar-footer">
                    <Link href="/" className="admin-nav-link back-link">
                        <ArrowLeft size={18} /> Back to Store
                    </Link>
                </div>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
