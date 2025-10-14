"use client";
import React, { useEffect } from "react";
import { Send, X, Bot } from "lucide-react";

export default function AiChatWindow() {
  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      const chatWindow = document.getElementById("ai-chat-window");
      const aiButton = document.getElementById("ai-button");
      if (
        chatWindow &&
        !chatWindow.contains(event.target as Node) &&
        !aiButton?.contains(event.target as Node)
      ) {
        chatWindow.classList.add("hidden");
      }
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, []);

  return (
    <div
      id="ai-chat-window"
      className="hidden fixed right-6 bottom-20 w-96 h-[480px] rounded-2xl shadow-[0_0_20px_rgba(56,189,248,0.3)] border border-cyan-400/30 
                 backdrop-blur-md bg-slate-900/60 text-white flex flex-col overflow-hidden 
                 animate-slide-in z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-cyan-400/30 bg-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.6)]">
            <Bot size={18} className="text-white" />
          </div>
          <h3 className="text-sm font-semibold tracking-wide text-cyan-300">
            Echoo AI Assistant
          </h3>
        </div>
        <button
          className="p-1 rounded-md hover:bg-slate-700/50 transition"
          onClick={() =>
            document.getElementById("ai-chat-window")?.classList.add("hidden")
          }
        >
          <X size={16} />
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-800/30">
        <div className="flex items-start gap-3">
          <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-xl px-3 py-2 max-w-[80%]">
            <p className="text-cyan-100">
              Hello! 👋 I'm your AI assistant. How can I help you today?
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-3 border-t border-cyan-400/30 bg-slate-800/40">
        <div className="flex items-center gap-2 bg-slate-900/70 rounded-xl px-3 py-2 border border-cyan-500/40 focus-within:border-cyan-400/80 transition">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-slate-400"
          />
          <button className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_10px_rgba(56,189,248,0.5)] transition">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
