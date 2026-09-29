'use client';

import { useEffect, useState } from 'react';

export default function AdminInsightsPage() {
  const [user, setUser] = useState<any>(null);
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Software Engineering',
    author: '',
    cover_image: '',
    published: true,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mavora_admin_token');
    const userData = localStorage.getItem('mavora_admin_user');

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setFormData((prev) => ({ ...prev, author: parsedUser.name || '' }));
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }

    if (!token) {
      setLoading(false);
      return;
    }

    fetchInsights(token);
  }, []);

  const fetchInsights = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/insights', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setInsights(data.data || []);
      } else {
        console.error('Failed to fetch insights:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInsight = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem('mavora_admin_token');

    try {
      const response = await fetch('http://localhost:5000/api/insights', {
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
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          category: 'Software Engineering',
          author: user?.name || '',
          cover_image: '',
          published: true,
        });
        if (token) fetchInsights(token);
      } else {
        const err = await response.json();
        alert(err.message || 'Failed to create insight.');
      }
    } catch (error) {
      console.error('Error creating insight:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading insights module...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Action Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Published & Draft Articles</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage your blog posts and technology insights</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          + New Article
        </button>
      </div>

      {/* Insights Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-950/50 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-medium">Title / Slug</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {insights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No articles found. Click "+ New Article" to publish one.
                  </td>
                </tr>
              ) : (
                insights.map((item) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 font-mono">/{item.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {typeof item.author === 'object' ? item.author?.name : item.author}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${item.published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                        {item.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {item.createdAt || item.created_at
                        ? new Date(item.createdAt || item.created_at).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Insight Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Create New Insight Article</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInsight} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setFormData({ ...formData, title, slug });
                  }}
                  placeholder="e.g. The Future of AI Automation in East Africa"
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
                  placeholder="future-of-ai-automation"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Cloud & IT">Cloud & IT</option>
                    <option value="Digital Transformation">Digital Transformation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Excerpt (Summary)</label>
                <textarea
                  required
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Short description displayed on cards..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase mb-1">Content (Markdown / HTML)</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full body content of the article..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-cyan-500"
                />
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
                  {submitting ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}