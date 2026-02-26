"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface Product {
    id: string;
    name: string;
    brandId: string;
    categoryId: string;
    price: number;
    sku: string;
    stock: number;
    description: string;
    features: string[];
}

interface Brand { id: string; name: string }
interface Category { id: string; name: string }

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [product, setProduct] = useState<Product | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form fields
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState(0);
    const [sku, setSku] = useState('');
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');

    useEffect(() => {
        Promise.all([
            fetch(`/api/products/${id}`).then(r => r.json()),
            fetch('/api/brands').then(r => r.json()),
            fetch('/api/categories').then(r => r.json()),
        ]).then(([prod, b, c]) => {
            setProduct(prod);
            setBrands(b);
            setCategories(c);

            // Pre-fill form
            setName(prod.name);
            setBrandId(prod.brandId);
            setCategoryId(prod.categoryId);
            setPrice(prod.price);
            setSku(prod.sku);
            setStock(prod.stock);
            setDescription(prod.description);
            setFeatures(prod.features?.join('\n') || '');
            setLoading(false);
        });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const res = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                brandId,
                categoryId,
                price: Number(price),
                sku,
                stock: Number(stock),
                description,
                features: features.split('\n').map(f => f.trim()).filter(Boolean),
            }),
        });

        if (res.ok) {
            router.push('/admin/products');
            router.refresh();
        } else {
            const data = await res.json();
            alert(data.error || 'Failed to update product');
        }

        setSaving(false);
    };

    if (loading) {
        return (
            <div className="admin-form-page">
                <p style={{ color: '#a1a1aa' }}>Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="admin-form-page">
                <p style={{ color: '#ef4444' }}>Product not found.</p>
            </div>
        );
    }

    return (
        <div className="admin-form-page">
            <div className="admin-page-header">
                <h1>Edit Product</h1>
            </div>

            <form className="admin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Brand</label>
                        <select className="form-select" value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
                            <option value="">Select Brand</option>
                            {brands.map((b) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select className="form-select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Price ($)</label>
                        <input type="number" step="0.01" className="form-input" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                    </div>
                    <div className="form-group">
                        <label>SKU</label>
                        <input type="text" className="form-input" value={sku} onChange={(e) => setSku(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input type="number" className="form-input" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
                    </div>
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-input" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Features (one per line)</label>
                    <textarea className="form-input" rows={4} value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Premium quality&#10;Easy installation&#10;1-year warranty" />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn-primary" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" className="btn-outline" onClick={() => router.push('/admin/products')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
