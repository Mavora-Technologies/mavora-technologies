// apps/web/app/admin/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Safely constructs the URL and prevents duplicate /api/api bugs
const getApiUrl = (endpoint: string) => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  baseUrl = baseUrl.replace(/\/+$/, ''); // Remove trailing slashes
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4); // Remove /api if it's already in the env variable
  }
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

export default function AdminUsersPage() {
  const [user, setUser] = useState<any>(null);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN',
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('mavora_admin_token');
    const userData = localStorage.getItem('mavora_admin_user');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      console.error('Failed to parse user data', e);
    }

    fetchAdminUsers(token);
  }, [router]);

  const fetchAdminUsers = async (token: string) => {
    setApiError(null);
    const targetUrl = getApiUrl('/api/users');
    try {
      const response = await fetch(targetUrl, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAdminUsers(data.data || data || []);
      } else {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('mavora_admin_token');
          router.push('/admin/login');
          return;
        }
        const err = await response.json().catch(() => ({}));
        setApiError(err.message || `[Status ${response.status} ${response.statusText}] Failed to fetch admin users`);
      }
    } catch (error: any) {
      console.error('Error fetching admin users:', error);
      setApiError(error.message || `Unable to reach API server at ${targetUrl}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem('mavora_admin_token');

    const targetUrl = getApiUrl('/api/users');
    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'ADMIN',
        });
        if (token) fetchAdminUsers(token);
      } else {
        const err = await response.json().catch(() => ({}));
        alert(err.message || 'Failed to create admin user.');
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
      alert('Network error while creating user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateRole = async (id: string, newRole: string) => {
    const token = localStorage.getItem('mavora_admin_token');
    if (!token) return;

    setActionLoading(id);
    const targetUrl = getApiUrl(`/api/users/${id}/role`);

    try {
      const response = await fetch(targetUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setAdminUsers((prev) =>
          prev.map((item) => (item.id === id ? { ...item, role: newRole } : item))
        );
      } else {
        alert('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin user?')) return;
    const token = localStorage.getItem('mavora_admin_token');
    if (!token) return;

    setActionLoading(id);
    const targetUrl = getApiUrl(`/api/users/${id}`);

    try {
      const response = await fetch(targetUrl, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setAdminUsers((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert('Failed to delete admin user');
      }
    } catch (error) {
      console.error('Error deleting admin user:', error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="text-slate-400 p-6">Loading admin users module...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Authorized Personnel</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage admin users and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => fetchAdminUsers(localStorage.getItem('mavora_admin_token') || '')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors"
          >
            Refresh Data
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + Add Admin User
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {apiError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm flex items-center justify-between">
          <span><strong>API Request Error:</strong> {apiError}</span>
          <button 
            onClick={() => {
              const token = localStorage.getItem('mavora_admin_token');
              if (token) fetchAdminUsers(token);
            }} 
            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-xs font-semibold"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* Admin Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Created</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    {apiError ? 'Unable to load records due to API error.' : 'No admin users found. Click "+ Add Admin User" to add one.'}
                  </td>
                </tr>
              ) : (
                adminUsers.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{item.name || item.fullName || 'N/A'}</td>
                    <td className="px-6 py-4 text-slate-300">{item.email}</td>
                    <td className="px-6 py-4">
                      <select
                        value={item.role || 'ADMIN'}
                        onChange={(e) => handleUpdateRole(item.id, e.target.value)}
                        disabled={actionLoading === item.id}
                        className="px-2.5 py-1 bg-slate-950 border border-cyan-500/30 rounded-lg text-xs font-semibold text-cyan-400 cursor-pointer focus:outline-none focus:border-cyan-500"
                      >
                        <option value="ADMIN" className="bg-slate-900 text-cyan-400">ADMIN</option>
                        <option value="SUPER_ADMIN" className="bg-slate-900 text-purple-400">SUPER_ADMIN</option>
                        <option value="EDITOR" className="bg-slate-900 text-blue-400">EDITOR</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {item.createdAt || item.created_at ? new Date(item.createdAt || item.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(item.id)}
                        disabled={actionLoading === item.id}
                        className="text-red-400 hover:text-red-300 text-xs font-medium px-2.5 py-1.5 bg-red-950/30 hover:bg-red-900/40 border border-red-900/40 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Admin User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Add New Admin User</h3>
              <button 
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@mavora.com"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  <option value="EDITOR">EDITOR</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}