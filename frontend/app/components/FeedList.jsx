"use client";

import FeedCard from "./FeedCard";

export default function FeedList({ feeds }) {
  if (!feeds.length) {
    return (
      <div className="text-center py-20 text-slate-500">
        No feeds available
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {feeds.map((feed) => (
        <FeedCard key={feed.id} feed={feed} />
      ))}
    </div>
  );
}