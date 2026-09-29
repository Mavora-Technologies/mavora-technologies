// apps/web/app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';

// Safely constructs the URL and prevents duplicate /api/api bugs
const getApiUrl = (endpoint: string) => {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  baseUrl = baseUrl.replace(/\/+$/, '');
  if (baseUrl.endsWith('/api')) {
    baseUrl = baseUrl.slice(0, -4);
  }
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalLeads: 0, newLeads: 0, totalInsights: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('mavora_admin_token');
    if (!token) return;

    fetchDashboardStats(token);
  }, []);

  const fetchDashboardStats = async (token: string) => {
    try {
      const resLeads = await fetch(getApiUrl('/api/leads'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const resInsights = await fetch(getApiUrl('/api/insights'), {
        headers: { Authorization: `Bearer ${token}` },
      });

      const leadsData = resLeads.ok ? await resLeads.json() : { data: [] };
      const insightsData = resInsights.ok ? await resInsights.json() : { data: [] };

      const leads = leadsData.data || leadsData || [];
      const newLeadsCount = leads.filter((l: any) => l.status === 'NEW').length;
      const insights = insightsData.data || insightsData || [];

      setStats({
        totalLeads: leads.length,
        newLeads: newLeadsCount,
        totalInsights: insights.length,
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading dashboard metrics...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Leads</p>
          <h3 className="text-3xl font-bold text-white mt-2">{stats.totalLeads}</h3>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">New Inquiries</p>
          <h3 className="text-3xl font-bold text-cyan-400 mt-2">{stats.newLeads}</h3>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Published Insights</p>
          <h3 className="text-3xl font-bold text-purple-400 mt-2">{stats.totalInsights}</h3>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-2">System Status</h3>
        <p className="text-sm text-slate-400">
          Connected securely to Mavora Technologies backend API and PostgreSQL database. All systems operational.
        </p>
      </div>
    </div>
  );
}
