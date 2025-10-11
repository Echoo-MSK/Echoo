import React from 'react';
import { Filter } from 'lucide-react';

export default function Navbar() {
  return (
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
                <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">AI Co-Pilot</span>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-xs text-green-400">Online</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}
