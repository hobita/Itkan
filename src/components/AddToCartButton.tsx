"use client";

import { useCartStore } from '@/store/cart';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

// Using exact types from Prisma/API response
interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    brand: { name: string };
}

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            brand: product.brand.name,
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 2000); // Reset button text after 2s
    };

    if (product.stock === 0) {
        return (
            <button className="btn-primary btn-large disabled" disabled style={{ width: '100%', justifyContent: 'center' }}>
                Out of Stock
            </button>
        );
    }

    return (
        <button
            className="btn-primary btn-large"
            onClick={handleAdd}
            style={{ width: '100%', justifyContent: 'center', backgroundColor: added ? '#10b981' : undefined }}
        >
            {added ? 'Added to Cart!' : 'Add to Cart'} <ShoppingCart size={20} style={{ marginLeft: '8px' }} />
        </button>
    );
}
