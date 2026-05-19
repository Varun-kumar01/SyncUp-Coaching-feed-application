"use client";

import LiveBadge from "./LiveBadge";

export default function Navbar() {
  return (
    <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div>
          <h1 className="text-2xl font-bold">
            SYNCUP LIVE
          </h1>

          <p className="text-slate-400 text-sm">
            Realtime Coaching Feed
          </p>
        </div>

        <LiveBadge />
      </div>
    </div>
  );
}