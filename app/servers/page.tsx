"use client";

import { useState, useEffect, useRef } from "react";
import { ChannelList, ChatView, MemberList, ServerList } from "./components";
import { onlineMembers, messages, allChannels as mockChannels } from "./data";

interface Server {
    id: string;
    name: string;
    imageUrl: string | null;
}

const ServersView = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeServerId, setActiveServerId] = useState<string | null>(null);
  
  const [activeChannel, setActiveChannel] = useState("general");
  const [showMembers, setShowMembers] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/server');
        if (response.ok) {
          const data: Server[] = await response.json();
          setServers(data);
          // Automatically select the first server if none is selected
          if (!activeServerId && data.length > 0) {
            setActiveServerId(data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch servers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // We only fetch servers once when the page loads

  const currentServer = servers.find((s) => s.id === activeServerId);
  // We are still using mock data for channels here. This is our next step.
  const channels = currentServer ? mockChannels.filter((c) => c.serverId === 1) : []; 

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full text-white bg-zinc-900">
        <p>Loading Your Universe...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-zinc-900">
      <ServerList 
        servers={servers}
        activeServerId={activeServerId}
        setActiveServerId={setActiveServerId}
      />

      {currentServer ? (
        <>
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
              messageInputRef={useRef<HTMLInputElement>(null)}
              avatar="/default-avatar.png" 
            />
          </div>

          {showMembers && <MemberList onlineMembers={onlineMembers} />}
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-2xl font-semibold text-white">Welcome to Echoo</h2>
            <p className="text-slate-400 mt-2">You're not in any servers yet.</p>
            <p className="text-slate-400">Click the '+' icon to create a new server!</p>
        </div>
      )}
    </div>
  );
};

export default ServersView;