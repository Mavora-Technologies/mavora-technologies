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
  return `${baseUrl}${endpoint}`;
};

export default function AdminUsersPage() {
  const [user, setUser] = useState<any>(null);
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    try {
      // DYNAMIC URL APPLIED HERE
      const targetUrl = getApiUrl('/api/users');
      const response = await fetch(targetUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setAdminUsers(data.data || data || []);
      } else {
        console.error('Failed to fetch admin users:', response.status);
      }
    } catch (error) {
      console.error('Error fetching admin users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading admin users...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Authorized Personnel</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage admin users and permissions</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors">
          + Add Admin User
        </button>
      </div>

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
              </tr>
            </thead>
            <tbody>
              {adminUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No admin users found.
                  </td>
                </tr>
              ) : (
                adminUsers.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                    <td className="px-6 py-4 text-slate-300">{item.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {item.createdAt || item.created_at ? new Date(item.createdAt || item.created_at).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}