"use client";

import { useRouter } from 'next/navigation';

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
    const router = useRouter();

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        const res = await fetch(`/api/orders/${orderId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });

        if (res.ok) {
            router.refresh();
        } else {
            alert('Failed to update order status');
        }
    };

    return (
        <select
            className="filter-select"
            defaultValue={currentStatus}
            onChange={handleChange}
            style={{ minWidth: '140px', padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
        >
            <option value="PENDING">PENDING</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
        </select>
    );
}
