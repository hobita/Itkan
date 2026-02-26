"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HomeSearchForm() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/products?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-form" style={{ display: 'flex', gap: '8px', zIndex: 10 }}>
            <input
                type="text"
                className="search-input"
                placeholder="e.g. Brake Pads, Oil Filter, Spark Plugs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '4px', border: 'none' }}
                required
            />
            <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                Find Parts <Search size={18} style={{ marginLeft: '8px' }} />
            </button>
        </form>
    );
}
