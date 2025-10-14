"use client";

import React, { useEffect } from "react";
import { Filter, Bot } from "lucide-react";
import AiChatWindow from "./AiDrawer";

interface User {
  id: string; 
  clerkId: string;
   username: string; 
   imageUrl: string | null; 
   createdAt: Date | null; 
}

interface NavbarProps {
  user: User;
  isAiDrawerOpen: boolean;
  setIsAiDrawerOpen: (isOpen: boolean) => void;
}

export default function Navbar({ user,  }: NavbarProps) {
  // Attach click event to open chat using DOM manipulation
  useEffect(() => {
    const aiButton = document.getElementById("ai-button");
    const chatWindow = document.getElementById("ai-chat-window");

    if (aiButton && chatWindow) {
      aiButton.addEventListener("click", () => {
        chatWindow.classList.toggle("hidden");
      });
    }

    return () => {
      aiButton?.removeEventListener("click", () => {
        chatWindow?.classList.toggle("hidden");
      });
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <div>
            <h1 className="text-xl font-bold text-white">Echoo</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
              <span>Unified Feed</span>
              <Filter size={16} />
            </button>
            <div className="w-px h-6 bg-slate-700" />

            {/* AI Button */}
            <button
              id="ai-button"
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <Bot size={18} /> <span>AI</span>
            </button>

            <div className="w-px h-6 bg-slate-700" />

            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs text-green-400">Online</span>
            </div>

            <div className="w-px h-6 bg-slate-700" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white">
                {user.username}
              </span>
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={`Profile picture for ${user.username}`}
                  className="w-8 h-8 rounded-full"
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Chat Window */}
      <AiChatWindow />
    </>
  );
}
