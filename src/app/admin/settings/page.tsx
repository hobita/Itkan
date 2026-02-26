"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Users, ShieldCheck } from 'lucide-react';

interface Admin {
    id: string;
    username: string;
    role: string;
    createdAt: string;
}

export default function AdminSettingsPage() {
    const router = useRouter();
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [creating, setCreating] = useState(false);

    const fetchAdmins = async () => {
        const res = await fetch('/api/auth/admins');
        if (res.ok) {
            const data = await res.json();
            setAdmins(data);
        }
        setLoading(false);
    };

    useEffect(() => { fetchAdmins(); }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);

        const res = await fetch('/api/auth/admins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: newUsername, password: newPassword }),
        });

        if (res.ok) {
            setNewUsername('');
            setNewPassword('');
            setShowForm(false);
            fetchAdmins();
        } else {
            const data = await res.json();
            alert(data.error || 'Failed to create admin');
        }

        setCreating(false);
    };

    const handleDelete = async (id: string, username: string) => {
        if (!confirm(`Are you sure you want to remove admin "${username}"? This cannot be undone.`)) return;

        const res = await fetch(`/api/auth/admins/${id}`, { method: 'DELETE' });
        if (res.ok) {
            fetchAdmins();
        } else {
            const data = await res.json();
            alert(data.error || 'Failed to delete admin');
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="admin-settings">
                <p style={{ color: '#a1a1aa' }}>Loading...</p>
            </div>
        );
    }

    return (
        <div className="admin-settings">
            <div className="admin-page-header">
                <h1><Users size={24} /> Admin Accounts</h1>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn-primary btn-small" onClick={() => setShowForm(!showForm)}>
                        <Plus size={16} /> Add Admin
                    </button>
                    <button className="btn-outline btn-small" onClick={handleLogout} style={{ borderColor: '#ef4444', color: '#ef4444' }}>
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Add Admin Form */}
            {showForm && (
                <div style={{ background: '#18181b', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Create New Admin</h3>
                    <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
                            <label>Username</label>
                            <input type="text" className="form-input" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required placeholder="e.g. john" />
                        </div>
                        <div className="form-group" style={{ flex: 1, minWidth: '200px' }}>
                            <label>Password (min 6 chars)</label>
                            <input type="password" className="form-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} placeholder="••••••••" />
                        </div>
                        <button type="submit" className="btn-primary" disabled={creating} style={{ height: '42px' }}>
                            {creating ? 'Creating...' : 'Create'}
                        </button>
                    </form>
                </div>
            )}

            {/* Admins Table */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td style={{ fontWeight: 600 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck size={16} style={{ color: 'var(--primary)' }} />
                                    {admin.username}
                                </div>
                            </td>
                            <td>
                                <span className={`stock-badge ok`}>{admin.role}</span>
                            </td>
                            <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="action-btn delete"
                                    title={admins.length <= 1 ? 'Cannot delete the last admin' : `Delete ${admin.username}`}
                                    onClick={() => handleDelete(admin.id, admin.username)}
                                    disabled={admins.length <= 1}
                                    style={{ opacity: admins.length <= 1 ? 0.3 : 1 }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p style={{ color: '#71717a', fontSize: '0.8rem', marginTop: '1rem' }}>
                ⚠️ At least one admin account must remain at all times.
            </p>
        </div>
    );
}
