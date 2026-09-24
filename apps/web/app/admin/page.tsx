import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { insights, projects, leads, projectRequests, consultationRequests } from '@/db/schema';
import { count } from 'drizzle-orm';
import { 
  FileText, 
  FolderGit2, 
  Users, 
  MessageSquare, 
  Calendar,
  ArrowRight
} from 'lucide-react';

export const revalidate = 0; // Fresh metrics on every reload

export default async function AdminDashboardPage() {
  const [[insightsCount], [projectsCount], [leadsCount], [projectReqCount], [consultCount]] = await Promise.all([
    db.select({ value: count() }).from(insights),
    db.select({ value: count() }).from(projects),
    db.select({ value: count() }).from(leads),
    db.select({ value: count() }).from(projectRequests),
    db.select({ value: count() }).from(consultationRequests),
  ]);

  const stats = [
    { name: 'Insights / Articles', count: insightsCount?.value || 0, href: '/admin/insights', icon: FileText, color: 'bg-blue-500' },
    { name: 'Case Studies / Projects', count: projectsCount?.value || 0, href: '/admin/projects', icon: FolderGit2, color: 'bg-teal-500' },
    { name: 'Inbound Leads', count: leadsCount?.value || 0, href: '/admin/leads', icon: Users, color: 'bg-indigo-500' },
    { name: 'Project Requests', count: projectReqCount?.value || 0, href: '/admin/project-requests', icon: MessageSquare, color: 'bg-violet-500' },
    { name: 'Consultation Bookings', count: consultCount?.value || 0, href: '/admin/consultations', icon: Calendar, color: 'bg-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Operations Center</h1>
          <p className="text-slate-400 text-sm mt-1">Manage content publishing, case studies, and incoming enterprise requests.</p>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="bg-slate-800/80 border border-slate-700/60 hover:border-blue-500/50 p-6 rounded-2xl transition-all hover:scale-[1.02] shadow-lg group block"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl ${item.color} text-white shadow-md`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="mt-6">
                  <div className="text-3xl font-bold text-white">{item.count}</div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{item.name}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Management Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Content Publishing</h3>
            <p className="text-slate-400 text-sm">Publish new technical insights or update live engineering case studies.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/admin/insights" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition">
                Manage Insights
              </Link>
              <Link href="/admin/projects" className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition">
                Manage Projects
              </Link>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Public Site Links</h3>
            <p className="text-slate-400 text-sm">Quickly verify published data on the client-facing website.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/insights" target="_blank" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition">
                View /insights ↗
              </Link>
              <Link href="/projects" target="_blank" className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs transition">
                View /projects ↗
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}