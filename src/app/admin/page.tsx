import { prisma } from '@/lib/prisma';
import { Package, ShoppingCart, DollarSign, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [productCount, orderCount, brands, lowStockProducts] = await Promise.all([
        prisma.product.count(),
        prisma.order.count(),
        prisma.brand.count(),
        prisma.product.findMany({ where: { stock: { lt: 20 } }, orderBy: { stock: 'asc' }, take: 5 }),
    ]);

    // Calculate total revenue from orders
    const orders = await prisma.order.findMany();
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    return (
        <div className="admin-dashboard">
            <h1>Dashboard Overview</h1>

            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="stat-icon blue"><Package size={24} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{productCount}</span>
                        <span className="stat-label">Total Products</span>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon green"><ShoppingCart size={24} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{orderCount}</span>
                        <span className="stat-label">Total Orders</span>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon gold"><DollarSign size={24} /></div>
                    <div className="stat-info">
                        <span className="stat-value">${totalRevenue.toFixed(2)}</span>
                        <span className="stat-label">Total Revenue</span>
                    </div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-icon purple"><Package size={24} /></div>
                    <div className="stat-info">
                        <span className="stat-value">{brands}</span>
                        <span className="stat-label">Brands</span>
                    </div>
                </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="admin-section">
                <h2><AlertTriangle size={20} className="text-warning" /> Low Stock Alerts</h2>
                {lowStockProducts.length === 0 ? (
                    <p className="no-data">All products are well-stocked! 🎉</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>SKU</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lowStockProducts.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td><code>{p.sku}</code></td>
                                    <td><span className="stock-badge low">{p.stock} left</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
