"use client";

import { useEffect, useState } from "react";

import api from "./services/api";
import socket from "./services/socket";

import Navbar from "./components/Navbar";
import FeedList from "./components/FeedList";

export default function HomePage() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH FEEDS
  const fetchFeeds = async () => {
    try {
      const response = await api.get("/feed");

      setFeeds(response.data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();

    // SOCKET LISTENER
    socket.on("new-feed", (newFeed) => {

      setFeeds((prev) => {

        // PREVENT DUPLICATES
        const exists = prev.find(
          (feed) => feed.id === newFeed.id
        );

        if (exists) return prev;

        return [newFeed, ...prev];
      });
    });

    return () => {
      socket.off("new-feed");
    };

  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        
        <div className="mb-10">
          
          <h2 className="text-4xl font-bold mb-3">
            Live Feed Updates
          </h2>

          <p className="text-slate-400">
            Realtime coaching announcements powered by Socket.IO
          </p>

        </div>

        {loading ? (
          <div className="text-slate-400">
            Loading feeds...
          </div>
        ) : (
          <FeedList feeds={feeds} />
        )}

      </div>
    </div>
  );
}