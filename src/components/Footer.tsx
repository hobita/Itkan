import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">

                    {/* Brand & Intro */}
                    <div className="footer-brand">
                        <h2 className="logo">
                            <span className="logo-text">ITKAN</span><span className="logo-accent">AUTOMOTIVE</span>
                        </h2>
                        <p className="footer-desc">
                            Your premium destination for high-quality automotive parts. Trusted by professionals and enthusiasts alike.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><Facebook size={20} /></a>
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                            <a href="#" className="social-link"><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/categories">All Categories</Link></li>
                            <li><Link href="/brands">Supported Brands</Link></li>
                            <li><Link href="/contact">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="footer-links">
                        <h3>Customer Service</h3>
                        <ul>
                            <li><Link href="/shipping">Shipping Policy</Link></li>
                            <li><Link href="/returns">Returns & Refunds</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><MapPin size={18} /> 6 Rue De Sfax, Ben Arous 2013</li>
                            <li><Phone size={18} /> 98 350 115</li>
                            <li><Mail size={18} /> contact@itkanauto.com</li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ITKAN Automotive. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
