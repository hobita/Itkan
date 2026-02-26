"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BrandOption { id: string; name: string; }
interface CategoryOption { id: string; name: string; }

export default function NewProductPage() {
    const router = useRouter();
    const [brands, setBrands] = useState<BrandOption[]>([]);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch('/api/brands').then(r => r.json()).then(setBrands);
        fetch('/api/categories').then(r => r.json()).then(setCategories);
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        const form = new FormData(e.currentTarget);
        const data = {
            name: form.get('name'),
            brandId: form.get('brandId'),
            categoryId: form.get('categoryId'),
            price: parseFloat(form.get('price') as string),
            sku: form.get('sku'),
            stock: parseInt(form.get('stock') as string),
            description: form.get('description'),
            features: (form.get('features') as string).split('\n').filter(Boolean),
        };

        const res = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            router.push('/admin/products');
        } else {
            alert('Failed to create product. Please check the fields and try again.');
            setSaving(false);
        }
    }

    return (
        <div className="admin-products">
            <div className="admin-page-header">
                <Link href="/admin/products" className="admin-nav-link" style={{ padding: 0 }}>
                    <ArrowLeft size={18} /> Back to Products
                </Link>
            </div>
            <h1>Add New Product</h1>

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-section">
                    <h2>Product Details</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Product Name *</label>
                            <input name="name" type="text" className="form-input" required placeholder="e.g. High-Performance Brake Calipers" />
                        </div>
                        <div className="form-group">
                            <label>SKU *</label>
                            <input name="sku" type="text" className="form-input" required placeholder="e.g. BR-HC-500" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Brand *</label>
                            <select name="brandId" className="form-select" required>
                                <option value="">Select Brand</option>
                                {brands.map(b => (
                                    <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Category *</label>
                            <select name="categoryId" className="form-select" required>
                                <option value="">Select Category</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Price ($) *</label>
                            <input name="price" type="number" step="0.01" className="form-input" required placeholder="299.99" />
                        </div>
                        <div className="form-group">
                            <label>Stock Quantity *</label>
                            <input name="stock" type="number" className="form-input" required placeholder="50" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" className="form-input" rows={4} placeholder="Product description..."></textarea>
                    </div>

                    <div className="form-group">
                        <label>Features (one per line)</label>
                        <textarea name="features" className="form-input" rows={4} placeholder="6-piston aluminum design&#10;High-temperature red powder coat finish&#10;Direct bolt-on replacement"></textarea>
                    </div>
                </div>

                <button type="submit" className="btn-primary btn-large" disabled={saving} style={{ width: '100%', justifyContent: 'center' }}>
                    {saving ? 'Saving...' : 'Create Product'}
                </button>
            </form>
        </div>
    );
}
