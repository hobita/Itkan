import { prisma } from '@/lib/prisma';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Settings, Disc, Zap, Activity, ShieldAlert, Cpu } from 'lucide-react';

export const dynamic = 'force-dynamic';

const iconMap: Record<string, React.ReactNode> = {
    Settings: <Settings size={36} />,
    Disc: <Disc size={36} />,
    Zap: <Zap size={36} />,
    Activity: <Activity size={36} />,
    ShieldAlert: <ShieldAlert size={36} />,
    Cpu: <Cpu size={36} />,
};

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        include: { _count: { select: { products: true } } },
    });

    return (
        <main className="categories-page container page-content">
            <div className="page-header-simple">
                <h1>Parts Categories</h1>
                <p className="page-subtitle">Browse our complete selection of automotive parts organized by vehicle system.</p>
            </div>

            <div className="categories-grid-full">
                {categories.map((cat) => (
                    <Link key={cat.id} href="/products" className="category-card-full" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="cat-icon-wrap">
                            {iconMap[cat.icon] || <Settings size={36} />}
                        </div>
                        <h3>{cat.name}</h3>
                        <p className="cat-count">{cat._count.products} products</p>
                        <span className="cat-link">Browse <ArrowRight size={14} /></span>
                    </Link>
                ))}
            </div>
        </main>
    );
}
