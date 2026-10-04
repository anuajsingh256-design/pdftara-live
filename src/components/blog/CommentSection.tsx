'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Comment = { text: string; date?: string };

export function CommentSection({
  slug,
  initialComments,
}: {
  slug: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = text.trim();
    if (!clean) return;

    setLoading(true);
    setError('');

    try {
      // Latest comments lao, naya jodo, wapas save karo
      const { data: row, error: readErr } = await supabase
        .from('posts')
        .select('comments')
        .eq('slug', slug)
        .single();
      if (readErr) throw readErr;

      const existing: Comment[] = Array.isArray(row?.comments) ? row.comments : [];
      const newComment: Comment = { text: clean, date: new Date().toISOString() };
      const updated = [...existing, newComment];

      const { error: updErr } = await supabase
        .from('posts')
        .update({ comments: updated })
        .eq('slug', slug);
      if (updErr) throw updErr;

      setComments(updated);
      setText('');
    } catch (err) {
      console.error(err);
      setError('Comment post nahi ho paya. Thodi der baad try karein.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-28">
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-3xl font-[1000] text-[#0f172a] tracking-tight">
          Discussion ({comments.length})
        </h3>
        <div className="flex-1 h-[1px] bg-slate-100"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-50 p-8 md:p-14 rounded-[3.5rem] border border-slate-100 shadow-inner mb-16"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="Write your comment here..."
          className="w-full p-8 rounded-[2rem] border-2 border-slate-200 bg-white h-48 mb-8 outline-none focus:border-blue-500 transition-all text-xl resize-none shadow-sm"
        ></textarea>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#0f172a] text-white px-16 py-5 rounded-full font-black hover:bg-blue-600 transition-all hover:shadow-2xl active:scale-95 uppercase tracking-widest text-[10px] disabled:opacity-60"
          >
            {loading ? 'Posting...' : 'Post Comment 🚀'}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.slice().reverse().map((c, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-blue-200 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-black text-blue-600 text-sm italic">@Guest_User</span>
                <span className="text-[10px] text-slate-300 font-bold uppercase">
                  {c.date
                    ? new Date(c.date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Just now'}
                </span>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed font-medium">"{c.text}"</p>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-300 italic py-10">
            Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
