import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: { brand: true, category: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="admin-products">
            <div className="admin-page-header">
                <h1>Manage Products</h1>
                <Link href="/admin/products/new" className="btn-primary btn-small">
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>SKU</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="product-name-cell">{product.name}</td>
                            <td>{product.brand.name}</td>
                            <td>{product.category.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                                <span className={`stock-badge ${product.stock < 20 ? 'low' : 'ok'}`}>
                                    {product.stock}
                                </span>
                            </td>
                            <td><code>{product.sku}</code></td>
                            <td className="actions-cell">
                                <Link href={`/admin/products/${product.id}`} className="action-btn edit" title="Edit">
                                    <Pencil size={14} />
                                </Link>
                                <button className="action-btn delete" title="Delete">
                                    <Trash2 size={14} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
