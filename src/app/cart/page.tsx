"use client";

import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();

    // Prevent hydration mismatch
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const subtotal = getSubtotal();
    const tax = subtotal * 0.08;
    const shipping = subtotal > 0 ? 15.00 : 0;
    const total = subtotal + tax + shipping;

    if (items.length === 0) {
        return (
            <main className="cart-page container page-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem 2rem', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h1 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Looks like you haven't added any automotive parts to your cart yet.</p>
                    <Link href="/products" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
                        Start Shopping
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page container page-content">
            <div className="page-header-simple">
                <h1>Shopping Cart</h1>
                <p className="page-subtitle">{items.length} unique {items.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>

            <div className="cart-layout">
                <div className="cart-items">
                    {/* Header Row */}
                    <div className="cart-header hidden-mobile">
                        <div className="col-product">Product</div>
                        <div className="col-price">Price</div>
                        <div className="col-qty">Quantity</div>
                        <div className="col-total">Total</div>
                        <div className="col-action"></div>
                    </div>

                    {/* Cart Items */}
                    {items.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="col-product">
                                <div className="cart-item-image">
                                    <span className="part-placeholder-icon text-2xl">🔧</span>
                                </div>
                                <div className="cart-item-details">
                                    <span className="cart-item-brand">{item.brand}</span>
                                    <Link href={`/products/${item.id}`} className="cart-item-name">
                                        {item.name}
                                    </Link>
                                </div>
                            </div>
                            <div className="col-price">${item.price.toFixed(2)}</div>
                            <div className="col-qty">
                                <div className="quantity-selector-small">
                                    <button className="qty-btn-small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                        className="qty-input-small"
                                    />
                                    <button className="qty-btn-small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                            </div>
                            <div className="col-total">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="col-action">
                                <button className="remove-btn" title="Remove Item" onClick={() => removeItem(item.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Estimated Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Estimated Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="summary-total">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link href="/checkout" className="btn-primary w-full btn-large text-center justify-center mt-6">
                        Proceed to Checkout <ArrowRight size={20} />
                    </Link>
                    <div className="continue-shopping">
                        <Link href="/products">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
