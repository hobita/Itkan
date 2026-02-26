import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <h2 className="logo">
                        <span className="logo-text">ITKAN</span><span className="logo-accent">ADMIN</span>
                    </h2>
                </div>
                <nav className="admin-nav">
                    <Link href="/admin" className="admin-nav-link">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link href="/admin/products" className="admin-nav-link">
                        <Package size={18} /> Products
                    </Link>
                    <Link href="/admin/orders" className="admin-nav-link">
                        <ShoppingCart size={18} /> Orders
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
