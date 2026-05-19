"use client";

import { useEffect, useState } from "react";

import socket from "../services/socket";

export default function LiveBadge() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {

    // INITIAL STATUS
    setConnected(socket.connected);

    // CONNECT EVENT
    socket.on("connect", () => {
      setConnected(true);
    });

    // DISCONNECT EVENT
    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };

  }, []);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
      ${
        connected
          ? "bg-emerald-500/10 border-emerald-500/20"
          : "bg-red-500/10 border-red-500/20"
      }`}
    >
      
      <div
        className={`w-3 h-3 rounded-full animate-pulse
        ${
          connected
            ? "bg-emerald-400"
            : "bg-red-400"
        }`}
      />

      <span
        className={`text-sm font-medium
        ${
          connected
            ? "text-emerald-300"
            : "text-red-300"
        }`}
      >
        {connected
          ? "Connected"
          : "Reconnecting..."}
      </span>

    </div>
  );
}