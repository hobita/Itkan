"use client";

import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const subtotal = 368.99;
    const tax = 29.52;
    const shipping = 15.00;
    const total = 413.51;

    return (
        <main className="checkout-page container page-content">
            <div className="page-header-simple text-center">
                <h1>Secure Checkout</h1>
                <p className="page-subtitle flex items-center justify-center gap-2">
                    <ShieldCheck size={18} className="text-primary" />
                    256-bit Encrypted Transaction
                </p>
            </div>

            <div className="checkout-layout">
                {/* Left Form Section */}
                <div className="checkout-form-container">
                    <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>

                        {/* Contact Info */}
                        <section className="form-section">
                            <h2>1. Contact Information</h2>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" className="form-input" placeholder="you@example.com" required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" className="form-input" placeholder="+1 (555) 000-0000" />
                            </div>
                        </section>

                        {/* Shipping Address */}
                        <section className="form-section">
                            <h2>2. Shipping Address</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-input" required />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-input" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Street Address</label>
                                <input type="text" className="form-input" required />
                            </div>
                            <div className="form-row form-row-3">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" className="form-input" required />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <select className="form-select" required>
                                        <option value="">Select State</option>
                                        <option value="CA">California</option>
                                        <option value="NY">New York</option>
                                        <option value="TX">Texas</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>ZIP Code</label>
                                    <input type="text" className="form-input" required />
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
                                <input type="text" className="form-input font-mono" placeholder="0000 0000 0000 0000" />
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

                    </form>
                </div>

                {/* Right Summary Section */}
                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-items-list border-b border-border pb-4 mb-4">
                        <div className="summary-item-mini">
                            <span className="part-placeholder-icon text-xl mr-3">🔧</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold truncate max-w-[150px]">High-Performance Brake Calipers (Set of 2)</p>
                                <p className="text-xs text-zinc-400">Qty: 1</p>
                            </div>
                            <span className="text-sm font-semibold">$299.99</span>
                        </div>
                        <div className="summary-item-mini mt-3">
                            <span className="part-placeholder-icon text-xl mr-3">🔧</span>
                            <div className="flex-1">
                                <p className="text-sm font-semibold truncate max-w-[150px]">Synthetic Motor Oil 5W-30</p>
                                <p className="text-xs text-zinc-400">Qty: 2</p>
                            </div>
                            <span className="text-sm font-semibold">$69.00</span>
                        </div>
                    </div>

                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    <div className="summary-total">
                        <span>Total to Pay</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button className="btn-primary w-full btn-large text-center justify-center mt-6">
                        Complete Purchase <ArrowRight size={20} />
                    </button>

                    <p className="secure-note">
                        <ShieldCheck size={14} className="text-primary" />
                        Payments are securely processed by Stripe. We do not store your full card details.
                    </p>
                </div>
            </div>
        </main>
    );
}
