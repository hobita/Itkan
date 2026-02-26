import { prisma } from '@/lib/prisma';
import OrderStatusSelect from '@/components/OrderStatusSelect';

export const dynamic = 'force-dynamic';

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
                                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
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
