"use client";

import { useState } from "react";

import api from "../services/api";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/feed", {
        title,
        message,
      });

      setTitle("");
      setMessage("");

      alert("Feed published successfully");

    } catch (error) {
      console.log(error);

      alert("Failed to publish");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8">
        
        <h1 className="text-3xl font-bold mb-8">
          Create Feed Update
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          
          <div>
            <label className="block mb-2 text-slate-300">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter feed title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Message
            </label>

            <textarea
              rows={5}
              placeholder="Enter feed message"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold hover:opacity-90 transition"
          >
            {loading
              ? "Publishing..."
              : "Publish Feed"}
          </button>

        </form>
      </div>
    </div>
  );
}