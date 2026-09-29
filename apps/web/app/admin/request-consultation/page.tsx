// apps/web/app/admin/consultations/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Normalizes API base URL and endpoints to prevent double slashes or duplicated /api prefixes
const getApiUrl = (endpoint: string) => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  // Trim trailing slashes
  baseUrl = baseUrl.replace(/\/+$/, '');
  
  // If NEXT_PUBLIC_API_URL already contains /api, strip it to prevent /api/api
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }
  
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

export default function AdminConsultationRequestsPage() {
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
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

    fetchConsultationRequests(token);
  }, [router]);

  const fetchConsultationRequests = async (token: string) => {
    setApiError(null);
    const targetUrl = getApiUrl('/api/consultations');

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('mavora_admin_token');
          router.push('/admin/login');
          return;
        }
        throw new Error(`[Status ${response.status} ${response.statusText}] Failed to fetch from ${targetUrl}`);
      }

      const resData = await response.json();
      const rawList = resData.data || resData || [];
      
      setRequests(Array.isArray(rawList) ? rawList : []);
    } catch (error: any) {
      console.error('Error fetching consultation requests:', error);
      setApiError(error.message || `Unable to reach API server at ${targetUrl}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const token = localStorage.getItem('mavora_admin_token');
    if (!token) return;

    setActionLoading(id);
    const targetUrl = getApiUrl(`/api/consultations/${id}/status`);

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
        setRequests((prev) =>
          prev.map((req) => (req.id === id ? { ...req, status: newStatus, consultationType: newStatus, consultation_type: newStatus } : req))
        );
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultation request?')) return;
    const token = localStorage.getItem('mavora_admin_token');
    if (!token) return;

    setActionLoading(id);
    const targetUrl = getApiUrl(`/api/consultations/${id}`);

    try {
      const response = await fetch(targetUrl, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setRequests((prev) => prev.filter((req) => req.id !== id));
      } else {
        alert('Failed to delete request');
      }
    } catch (error) {
      console.error('Error deleting consultation:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const exportToCSV = () => {
    if (requests.length === 0) {
      alert('No consultation requests available to export.');
      return;
    }

    const headers = ['ID', 'Full Name', 'Company', 'Email', 'Phone', 'Topic / Message', 'Status', 'Requested Date'];
    const rows = requests.map((r) => {
      const clientName = r.fullName || r.full_name || r.name || '';
      const company = r.companyName || r.company_name || r.company || '';
      const email = r.workEmail || r.work_email || r.email || '';
      const phone = r.phone || '';
      const topic = r.discussionTopics || r.discussion_topics || r.topic || r.message || '';
      const status = r.status || r.consultationType || r.consultation_type || 'PENDING';
      const createdDate = r.createdAt || r.created_at || '';

      return [
        r.id,
        `"${clientName}"`,
        `"${company}"`,
        `"${email}"`,
        `"${phone}"`,
        `"${topic.replace(/"/g, '""')}"`,
        status,
        createdDate,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mavora_consultations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'CONFIRMED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'COMPLETED': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'CANCELLED': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  if (loading) {
    return <div className="text-slate-400 p-6">Loading consultation requests module...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Consultation Requests</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage scheduled and requested client consultations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => fetchConsultationRequests(localStorage.getItem('mavora_admin_token') || '')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors"
          >
            Refresh Data
          </button>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Export to CSV
          </button>
        </div>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center justify-between">
          <span><strong>API Request Error:</strong> {apiError}</span>
          <button 
            onClick={() => {
              const token = localStorage.getItem('mavora_admin_token');
              if (token) fetchConsultationRequests(token);
            }} 
            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-xs font-semibold"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* Consultation Requests Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Client / Company</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Topic / Message</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Requested Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    {apiError ? 'Unable to load records due to API error.' : 'No consultation requests found in the database.'}
                  </td>
                </tr>
              ) : (
                requests.map((item) => {
                  const clientName = item.fullName || item.full_name || item.name || 'N/A';
                  const company = item.companyName || item.company_name || item.company;
                  const email = item.workEmail || item.work_email || item.email || 'N/A';
                  const phone = item.phone;
                  const topic = item.discussionTopics || item.discussion_topics || item.topic || item.message || '—';
                  const currentStatus = item.status || item.consultationType || item.consultation_type || 'PENDING';
                  const createdDate = item.createdAt || item.created_at;

                  return (
                    <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{clientName}</div>
                        {company && <div className="text-xs text-slate-500 mt-1">{company}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div>{email}</div>
                        {phone && <div className="text-xs text-slate-500 mt-1">{phone}</div>}
                      </td>
                      <td className="px-6 py-4 text-slate-300 max-w-xs truncate" title={topic}>
                        {topic}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={currentStatus}
                          onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                          disabled={actionLoading === item.id}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border bg-slate-950 cursor-pointer ${getStatusColor(
                            currentStatus
                          )}`}
                        >
                          <option value="PENDING" className="bg-slate-900 text-yellow-400">PENDING</option>
                          <option value="CONFIRMED" className="bg-slate-900 text-blue-400">CONFIRMED</option>
                          <option value="COMPLETED" className="bg-slate-900 text-green-400">COMPLETED</option>
                          <option value="CANCELLED" className="bg-slate-900 text-red-400">CANCELLED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {createdDate ? `${new Date(createdDate).toLocaleDateString()} ${new Date(createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '—'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteRequest(item.id)}
                          disabled={actionLoading === item.id}
                          className="text-red-400 hover:text-red-300 text-xs font-medium px-2.5 py-1.5 bg-red-950/30 hover:bg-red-900/40 border border-red-900/40 rounded-lg transition-colors disabled:opacity-50"
                        >
                          Delete
                        </button>
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