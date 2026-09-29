// apps/web/app/admin/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminProjectsPage() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    industry: '',
    client: '',
    challenge: '',
    solution: '',
    results: '',
    cover_image: '',
    technologies: '',
    featured: false,
  });
  const [submitting, setSubmitting] = useState(false);
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

    fetchProjects(token);
  }, [router]);

  const extractProjectsArray = (data: any): any[] => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.projects)) return data.projects;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.data?.projects)) return data.data.projects;
    return [];
  };

  const fetchProjects = async (token: string) => {
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const projectList = extractProjectsArray(data);
        setProjects(projectList);
      } else {
        const err = await response.json().catch(() => ({}));
        setErrorMsg(err.message || `API returned status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setErrorMsg('Failed to connect to the backend server. Verify the backend API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem('mavora_admin_token');

    const payload = {
      ...formData,
      technologies: formData.technologies
        ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowCreateModal(false);
        setFormData({
          title: '',
          slug: '',
          description: '',
          industry: '',
          client: '',
          challenge: '',
          solution: '',
          results: '',
          cover_image: '',
          technologies: '',
          featured: false,
        });
        if (token) fetchProjects(token);
      } else {
        const err = await response.json().catch(() => ({}));
        alert(err.message || 'Failed to create project.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Network error while creating project.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading projects module...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Showcase Projects</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage portfolio items, client case studies, and live implementations</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + New Project
        </button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm flex items-center justify-between">
          <span>{errorMsg}</span>
          <button 
            onClick={() => {
              const token = localStorage.getItem('mavora_admin_token');
              if (token) fetchProjects(token);
            }} 
            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-xs font-semibold"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Project / Slug</th>
                <th className="px-6 py-4 font-medium">Industry</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Featured Status</th>
                <th className="px-6 py-4 font-medium">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No projects found. Click "+ New Project" to add one.
                  </td>
                </tr>
              ) : (
                projects.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 font-mono">/{item.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      {item.industry ? (
                        <span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded text-xs font-medium">
                          {item.industry}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {item.client || <span className="text-slate-500">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${item.featured ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                        {item.featured ? 'Featured' : 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {item.createdAt || item.created_at ? new Date(item.createdAt || item.created_at).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Add New Showcase Project</h3>
              <button 
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setFormData({ ...formData, title, slug });
                  }}
                  placeholder="Enter project title"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">URL Slug</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="project-url-slug"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    placeholder="e.g. Fintech, Healthcare"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Client Name</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Description</label>
                <textarea
                  required
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed project summary..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Challenge</label>
                  <textarea
                    rows={2}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Client's core problem..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Solution</label>
                  <textarea
                    rows={2}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    placeholder="Technical implementation..."
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Results & Impact</label>
                <textarea
                  rows={2}
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  placeholder="Measurable outcomes..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  placeholder="/images/projects/cover.jpg"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, Node.js, PostgreSQL"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="featured" className="text-sm text-slate-300">Feature this project on the portfolio showcase</label>
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
                  {submitting ? 'Saving Project...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}