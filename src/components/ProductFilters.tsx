"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';

interface FilterProps {
    categories: { id: string; name: string; slug: string }[];
    brands: { id: string; name: string }[];
    currentCategory?: string;
    currentBrand?: string;
    currentPrice?: string;
}

export default function ProductFilters({ categories, brands, currentCategory, currentBrand, currentPrice }: FilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/products?${params.toString()}`);
    };

    return (
        <aside className="products-sidebar">
            <h3><Filter size={18} /> Filters</h3>

            <div className="filter-group">
                <label>Category</label>
                <select
                    className="filter-select"
                    value={currentCategory || ''}
                    onChange={(e) => updateFilter('category', e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Brand</label>
                <select
                    className="filter-select"
                    value={currentBrand || ''}
                    onChange={(e) => updateFilter('brand', e.target.value)}
                >
                    <option value="">All Brands</option>
                    {brands.map((b) => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Price Range</label>
                <select
                    className="filter-select"
                    value={currentPrice || ''}
                    onChange={(e) => updateFilter('price', e.target.value)}
                >
                    <option value="">Any</option>
                    <option value="under50">Under $50</option>
                    <option value="50-150">$50 - $150</option>
                    <option value="150-300">$150 - $300</option>
                    <option value="300plus">$300+</option>
                </select>
            </div>

            {(currentCategory || currentBrand || currentPrice) && (
                <button
                    className="btn-outline"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                    onClick={() => router.push('/products')}
                >
                    Clear All Filters
                </button>
            )}
        </aside>
    );
}
