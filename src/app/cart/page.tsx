import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const cartItems = [
        { id: 1, name: 'High-Performance Brake Calipers (Set of 2)', price: 299.99, quantity: 1, image: 'brake-calipers', brand: 'Brembo' },
        { id: 2, name: 'Synthetic Motor Oil 5W-30', price: 34.50, quantity: 2, image: 'motor-oil', brand: 'Mobil 1' },
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = 15.00;
    const total = subtotal + tax + shipping;

    return (
        <main className="cart-page container page-content">
            <div className="page-header-simple">
                <h1>Shopping Cart</h1>
                <p className="page-subtitle">{cartItems.length} items in your cart</p>
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
                    {cartItems.map(item => (
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
                                    <button className="qty-btn-small">-</button>
                                    <input type="number" defaultValue={item.quantity} className="qty-input-small" />
                                    <button className="qty-btn-small">+</button>
                                </div>
                            </div>
                            <div className="col-total">${(item.price * item.quantity).toFixed(2)}</div>
                            <div className="col-action">
                                <button className="remove-btn" title="Remove Item"><Trash2 size={18} /></button>
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
                        <span>Estimated Tax</span>
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
