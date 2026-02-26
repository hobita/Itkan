"use client";

import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export default function DeleteProductButton({ productId }: { productId: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

        const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
        if (res.ok) {
            router.refresh();
        } else {
            alert('Failed to delete product.');
        }
    };

    return (
        <button className="action-btn delete" title="Delete" onClick={handleDelete}>
            <Trash2 size={14} />
        </button>
    );
}
