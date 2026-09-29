// apps/web/app/admin/leads/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Sanitize URL to remove any trailing slashes automatically
const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const API_BASE_URL = rawApiUrl.replace(/\/$/, '');

export default function AdminLeadsPage() {
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
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
    
    fetchLeads(token);
  }, [router]);

  const fetchLeads = async (token?: string) => {
    const authToken = token || localStorage.getItem('mavora_admin_token');
    const targetUrl = `${API_BASE_URL}/api/leads`;
    try {
      const response = await fetch(targetUrl, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch (err) {
        // Response body was empty or not JSON
      }

      if (response.ok) {
        setLeads(data.data || []);
      } else {
        console.error(`❌ API Error [Status ${response.status}] from ${targetUrl}:`, data);
        if (response.status === 401 || response.status === 403) {
          alert('Admin session expired or unauthorized. Please log in again.');
          localStorage.removeItem('mavora_admin_token');
          router.push('/admin/login');
        } else {
          alert(`Failed to load leads (Status ${response.status}): ${data.message || response.statusText}`);
        }
      }
    } catch (error) {
      console.error(`Network or connection error fetching from ${targetUrl}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const token = localStorage.getItem('mavora_admin_token');
    setActionLoading(id);
    const targetUrl = `${API_BASE_URL}/api/leads/${id}/status`;
    try {
      const response = await fetch(targetUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
      } else {
        alert('Failed to update lead status.');
      }
    } catch (error) {
      console.error(`Error updating status at ${targetUrl}:`, error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    const token = localStorage.getItem('mavora_admin_token');
    const targetUrl = `${API_BASE_URL}/api/leads/${id}`;
    try {
      const response = await fetch(targetUrl, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
      } else {
        alert('Failed to delete lead.');
      }
    } catch (error) {
      console.error(`Error deleting lead at ${targetUrl}:`, error);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      alert('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Full Name', 'Company', 'Email', 'Phone', 'Service', 'Status', 'Source', 'Created At'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName || ''}"`,
      `"${l.company || ''}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.service || ''}"`,
      l.status,
      `"${l.source || ''}"`,
      l.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mavora_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'CONTACTED': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'QUALIFIED': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'PROPOSAL': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'WON': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'LOST': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  if (loading) {
    return <div className="text-slate-400 p-6">Loading leads module...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent Inquiries</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage customer leads and service requests from your database</p>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Export to CSV
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Name / Company</th>
                <th className="px-6 py-4 font-medium">Contact Info</th>
                <th className="px-6 py-4 font-medium">Service Requested</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No leads found in the database.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{lead.fullName}</div>
                      {lead.company && <div className="text-xs text-slate-500 mt-1">{lead.company}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div>{lead.email}</div>
                      {lead.phone && <div className="text-xs text-slate-500 mt-1">{lead.phone}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-200">{lead.service}</div>
                      {lead.message && (
                        <div className="text-xs text-slate-400 mt-1 italic truncate max-w-xs" title={lead.message}>
                          "{lead.message}"
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        disabled={actionLoading === lead.id}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border bg-slate-950 cursor-pointer ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="PROPOSAL">PROPOSAL</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="text-red-400 hover:text-red-300 text-xs font-medium px-2.5 py-1.5 bg-red-950/30 hover:bg-red-900/40 border border-red-900/40 rounded-lg transition-colors"
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
    </div>
  );
}