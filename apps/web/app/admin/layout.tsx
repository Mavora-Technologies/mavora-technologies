// apps/web/app/admin/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name?: string; role?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip protection check on the login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

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
    } finally {
      setLoading(false);
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('mavora_admin_token');
    localStorage.removeItem('mavora_admin_user');
    router.push('/admin/login');
  };

  // Render raw children for the login page without the admin sidebar/header shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading Admin Portal...
      </div>
    );
  }

  const getPageTitle = () => {
    if (pathname?.includes('/dashboard')) return 'Dashboard Overview';
    if (pathname?.includes('/leads')) return 'Leads Management';
    if (pathname?.includes('/request-consultation')) return 'Consultation Requests';
    if (pathname?.includes('/projects')) return 'Projects Showcase';
    if (pathname?.includes('/insights')) return 'Insights & Blog Management';
    if (pathname?.includes('/users')) return 'Admin Users';
    if (pathname?.includes('/audit-logs')) return 'System Audit Logs';
    return 'Admin Portal';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white tracking-wide">Mavora Portal</h2>
          <p className="text-xs text-cyan-400 mt-1 uppercase font-semibold">{user?.role || 'Admin'}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a
            href="/admin/dashboard"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/dashboard'
                ? 'bg-cyan-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Dashboard
          </a>
          <a
            href="/admin/leads"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/leads'
                ? 'bg-cyan-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Leads & Requests
          </a>
          <a
            href="/admin/request-consultation"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/request-consultation'
                ? 'bg-cyan-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Consultations
          </a>
          <a
            href="/admin/projects"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/projects'
                ? 'bg-cyan-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Projects Showcase
          </a>
          <a
            href="/admin/insights"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/insights'
                ? 'bg-cyan-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Insights / Blog
          </a>
          <a
            href="/admin/users"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/users'
                ? 'bg-cyan-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Admin Users
          </a>
          <a
            href="/admin/audit-logs"
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/admin/audit-logs'
                ? 'bg-cyan-600 text-white'
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            Audit Logs
          </a>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-950/40 hover:bg-red-900/50 border border-red-800/50 rounded-lg text-red-300 text-xs font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-300">
              Welcome back, <strong className="text-white">{user?.name || 'Administrator'}</strong>
            </span>
          </div>
        </header>

        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}