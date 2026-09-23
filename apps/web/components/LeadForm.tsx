'useState';
import React, { useState } from 'react';
export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: 'Web Development',
    message: '',
  });

  const [status, setStatus] = useState<{
    loading: boolean;
    success?: string;
    error?: string;
  }>({ loading: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setStatus({
        loading: false,
        success: 'Thank you! Your message has been received. We will be in touch shortly.',
      });

      // Clear form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: 'Web Development',
        message: '',
      });
    } catch (err: any) {
      setStatus({ loading: false, error: err.message || 'Something went wrong.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl bg-slate-900 p-6 text-white shadow-lg">
      <h3 className="text-xl font-semibold">Start a Project with Mavora</h3>

      {status.success && <div className="rounded bg-emerald-600/20 p-3 text-emerald-400">{status.success}</div>}
      {status.error && <div className="rounded bg-rose-600/20 p-3 text-rose-400">{status.error}</div>}

      <div>
        <label className="block text-sm font-medium">Full Name *</label>
        <input
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Work Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Service Needed *</label>
        <select
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Web Development">Web Development</option>
          <option value="Custom Software Architecture">Custom Software Architecture</option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Project Message</label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-1 w-full rounded border border-slate-700 bg-slate-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="w-full rounded bg-indigo-600 py-2.5 font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
      >
        {status.loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}