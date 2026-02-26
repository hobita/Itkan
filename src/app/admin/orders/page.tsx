import { prisma } from '@/lib/prisma';
import { Clock, CheckCircle, Truck, PackageCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

const statusIcons: Record<string, React.ReactNode> = {
    PENDING: <Clock size={16} className="status-icon pending" />,
    PROCESSING: <CheckCircle size={16} className="status-icon processing" />,
    SHIPPED: <Truck size={16} className="status-icon shipped" />,
    DELIVERED: <PackageCheck size={16} className="status-icon delivered" />,
};

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="admin-orders">
            <div className="admin-page-header">
                <h1>Manage Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="no-data-card">
                    <p>No orders yet. Once customers start purchasing, their orders will appear here.</p>
                </div>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td><code>{order.id.slice(-8)}</code></td>
                                <td>{order.customerEmail}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                        {statusIcons[order.status]} {order.status}
                                    </span>
                                </td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
