"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { useKeyPress } from "@/app/hooks/useKeyPress";
import {
  servers,
  allChannels,
  messages,
  onlineMembers,
} from "@/app/servers/data";
import {
  ServerList,
  ChannelList,
  ChatView,
  MemberList,
} from "@/app/servers/components";

// import Channel from "@/app/servers/components/ChannelList";

const ServersView = () => {
  const router = useRouter();
  const [activeServer, setActiveServer] = useState(servers[0].id);
  const [activeChannel, setActiveChannel] = useState("general");
  const [showMembers, setShowMembers] = useState(true);
  const messageInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

  useKeyPress("k", (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      messageInputRef.current?.focus();
    }
  });

  useKeyPress("/", (e) => {
    e.preventDefault();
    messageInputRef.current?.focus();
  });

  const currentServer = servers.find((s) => s.id === activeServer);
  const channels = allChannels.filter((c) => c.serverId === activeServer);

  return (
    <div className="flex h-screen bg-zinc-900 text-zinc-100 dark-scroll">
      {/* Glassy Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-zinc-900/70 backdrop-blur-md border-b border-zinc-800 z-50 flex items-center px-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors text-sm font-medium"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </button>
      </div>

      <div className="pt-12 w-full flex">
        <ServerList
          servers={servers}
          activeServer={activeServer}
          setActiveServer={setActiveServer}
          icon="server" // Replace "server" with the appropriate icon string if needed
        />

        <ChannelList
          currentServer={currentServer}
          channels={channels}
          activeChannel={activeChannel}
          setActiveChannel={setActiveChannel}
        />

        <div className="flex-1 flex flex-col">
          <ChatView
            activeChannel={activeChannel}
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            messages={messages}
            messageInputRef={messageInputRef}
            avatar="/default-avatar.png" 
          />
        </div>

        {showMembers && <MemberList onlineMembers={onlineMembers} />}
      </div>
    </div>
  );
};

export default ServersView;
