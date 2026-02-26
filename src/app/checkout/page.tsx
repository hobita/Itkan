"use client";

import { ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
    const { items, getSubtotal, clearCart } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    // Form state
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const subtotal = getSubtotal();
    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 15.00;
    const total = subtotal + tax + shipping;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0 || submitting) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerEmail: email,
                    items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
                }),
            });

            if (!res.ok) throw new Error('Failed to place order');

            const order = await res.json();
            setOrderId(order.id);
            clearCart();
            setOrderPlaced(true);
        } catch {
            alert('Something went wrong placing your order. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Order confirmation screen
    if (orderPlaced) {
        return (
            <main className="checkout-page container page-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem', background: 'var(--bg-card, #18181b)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <CheckCircle size={64} style={{ color: '#4ade80', marginBottom: '1.5rem' }} />
                    <h1 style={{ marginBottom: '0.5rem' }}>Order Confirmed!</h1>
                    <p style={{ color: '#a1a1aa', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                        Thank you for your purchase. Your order has been placed and is being processed.
                    </p>
                    <p style={{ fontFamily: 'monospace', color: '#71717a', fontSize: '0.875rem', marginBottom: '2rem' }}>
                        Order ID: {orderId.slice(-8).toUpperCase()}
                    </p>
                    <Link href="/products" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
                        Continue Shopping
                    </Link>
                </div>
            </main>
        );
    }

    // Empty cart redirect
    if (items.length === 0) {
        return (
            <main className="checkout-page container page-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div style={{ maxWidth: '400px', margin: '0 auto', padding: '3rem 2rem', background: '#18181b', borderRadius: '12px', border: '1px solid var(--border)' }}>
                    <h1 style={{ marginBottom: '1rem' }}>Your Cart is Empty</h1>
                    <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>Add some parts before checking out.</p>
                    <Link href="/products" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%' }}>
                        Browse Products
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page container page-content">
            <div className="page-header-simple text-center">
                <h1>Secure Checkout</h1>
                <p className="page-subtitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--primary)' }} />
                    256-bit Encrypted Transaction
                </p>
            </div>

            <div className="checkout-layout">
                {/* Left Form Section */}
                <div className="checkout-form-container">
                    <form className="checkout-form" onSubmit={handleSubmit}>

                        {/* Contact Info */}
                        <section className="form-section">
                            <h2>1. Contact Information</h2>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="form-input" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section className="form-section">
                            <h2>2. Shipping Address</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-input" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-input" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Street Address</label>
                                <input type="text" className="form-input" required value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="form-row form-row-3">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-input" required value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input type="text" className="form-input" required value={state} onChange={(e) => setState(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>ZIP Code</label>
                                    <input type="text" className="form-input" required value={zip} onChange={(e) => setZip(e.target.value)} />
                                </div>
                            </div>
                        </section>

                        {/* Payment Info */}
                        <section className="form-section">
                            <h2>3. Payment Method</h2>
                            <div className="payment-methods">
                                <label className="payment-method selected">
                                    <input type="radio" name="payment" defaultChecked />
                                    Credit Card
                                </label>
                                <label className="payment-method">
                                    <input type="radio" name="payment" />
                                    PayPal
                                </label>
                            </div>

                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" className="form-input" placeholder="0000 0000 0000 0000" style={{ fontFamily: 'monospace' }} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expiration (MM/YY)</label>
                                    <input type="text" className="form-input" placeholder="MM/YY" />
                                </div>
                                <div className="form-group">
                                    <label>Security Code (CVC)</label>
                                    <input type="text" className="form-input" placeholder="123" />
                                </div>
                            </div>
                        </section>

                        {/* Submit button visible on mobile */}
                        <button
                            type="submit"
                            className="btn-primary btn-large"
                            disabled={submitting}
                            style={{ width: '100%', justifyContent: 'center', display: 'flex', marginTop: '1rem' }}
                        >
                            {submitting ? 'Processing...' : 'Complete Purchase'} <ArrowRight size={20} />
                        </button>
                    </form>
                </div>

                {/* Right Summary Section */}
                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        {items.map((item) => (
                            <div key={item.id} className="summary-item-mini" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '1.25rem', opacity: 0.5 }}>🔧</span>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{item.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#a1a1aa', margin: 0 }}>Qty: {item.quantity}</p>
                                </div>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="summary-total">
                        <span>Total to Pay</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <p className="secure-note" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#71717a', fontSize: '0.75rem', marginTop: '1.5rem' }}>
                        <ShieldCheck size={14} style={{ color: 'var(--primary)' }} />
                        Payments are securely processed. We do not store your full card details.
                    </p>
                </div>
            </div>
        </main>
    );
}
