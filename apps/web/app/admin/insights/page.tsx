import React from 'react';
import Link from 'next/link';
import { db } from '@/db';
import { insights } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { toggleInsightPublished, deleteInsight } from '@/lib/admin-actions';
import { ArrowLeft, Plus, CheckCircle, Clock, Trash2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminInsightsPage() {
  const allInsights = await db.select().from(insights).orderBy(desc(insights.createdAt));

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <Link href="/admin" className="inline-flex items-center gap-2 text-xs text-blue-400 hover:underline mb-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-extrabold text-white">Manage Insights</h1>
          </div>
          <Link 
            href="/admin/insights/new" 
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Plus className="h-4 w-4" /> Create Article
          </Link>
        </div>

        {/* Insights Table */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {allInsights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No articles found in database. Click "Create Article" to write one.
                  </td>
                </tr>
              ) : (
                allInsights.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-white max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{item.category}</td>
                    <td className="px-6 py-4 text-slate-400">{item.author}</td>
                    <td className="px-6 py-4">
                      {item.published ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle className="h-3 w-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="h-3 w-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {/* Form Server Action to Toggle Published Status */}
                      <form action={async () => {
                        'use server';
                        await toggleInsightPublished(item.id, item.published);
                      }} className="inline-block">
                        <button 
                          type="submit"
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            item.published 
                              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' 
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {item.published ? 'Unpublish' : 'Publish'}
                        </button>
                      </form>

                      {/* Form Server Action to Delete */}
                      <form action={async () => {
                        'use server';
                        await deleteInsight(item.id);
                      }} className="inline-block">
                        <button 
                          type="submit"
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition border border-red-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </form>
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