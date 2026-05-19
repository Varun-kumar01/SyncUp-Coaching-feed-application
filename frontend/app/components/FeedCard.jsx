"use client";

import { formatDistanceToNow } from "date-fns";

export default function FeedCard({ feed }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10">
      
      {/* TOP GLOW */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-500" />

      <div className="flex items-center justify-between mb-5">
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />

          <span className="text-xs text-emerald-300 font-medium">
            LIVE UPDATE
          </span>
        </div>

      </div>

      <h2 className="text-2xl font-bold mb-3 text-white">
        {feed.title}
      </h2>

      <p className="text-slate-300 leading-relaxed mb-6">
        {feed.message}
      </p>

      <div className="text-sm text-slate-500">
        {formatDistanceToNow(new Date(feed.created_at), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
}