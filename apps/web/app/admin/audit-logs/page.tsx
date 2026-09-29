// apps/web/app/admin/audit-logs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Safely constructs the URL and prevents duplicate /api/api bugs
const getApiUrl = (endpoint: string) => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  baseUrl = baseUrl.replace(/\/+$/, '');
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }
  return `${baseUrl}${endpoint}`;
};

export default function AdminAuditLogsPage() {
  const [user, setUser] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
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

    fetchAuditLogs(token);
  }, [router]);

  const fetchAuditLogs = async (token: string) => {
    try {
      // DYNAMIC URL APPLIED HERE
      const targetUrl = getApiUrl('/api/audit-logs');
      const response = await fetch(targetUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        // Removed any dummy data fallbacks - strictly using DB data
        setLogs(data.data || []);
      } else {
        console.error('Failed to fetch audit logs:', response.status);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    if (!action) return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    const upper = action.toUpperCase();
    if (upper.includes('DELETE') || upper.includes('REVOKE')) return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (upper.includes('CREATE') || upper.includes('ADD')) return 'bg-green-500/10 text-green-400 border-green-500/20';
    if (upper.includes('UPDATE') || upper.includes('EDIT')) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    if (upper.includes('LOGIN') || upper.includes('AUTH')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
  };

  if (loading) {
    return <div className="text-slate-400">Loading audit logs module...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">System Audit Logs</h2>
          <p className="text-xs text-slate-400 mt-0.5">Secure record stream and historical administrator actions</p>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
          Secure Record Stream
        </span>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Activity Trail</h3>
          <p className="text-xs text-slate-400">Showing historical administrator actions</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Performed By</th>
                <th className="px-6 py-4 font-medium">Target / Details</th>
                <th className="px-6 py-4 font-medium">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No audit logs recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  // Cleaned up to use exact DB fields without arbitrary fallbacks
                  const adminName = log.adminName || log.performedBy || 'System';
                  const adminEmail = log.adminEmail || log.email || '';

                  return (
                    <tr key={log.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold font-mono border ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{adminName}</div>
                        {adminEmail && <div className="text-xs text-slate-500 mt-0.5">{adminEmail}</div>}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-300">
                        {log.details || log.target || '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {new Date(log.createdAt || log.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}