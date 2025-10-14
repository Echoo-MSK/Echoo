"use client";
import Image from "next/image";
import {Server} from "@/app/servers/types"

interface ServerListProps {
    servers: Server[];
    activeServer: number;
    setActiveServer: (id: number) => void;
    icon: string;
  }
  

const ServerList: React.FC<ServerListProps> = ({ servers, activeServer, setActiveServer, icon }) => {
  return (
    <div className=" h-full w-20 bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-4 space-y-3 overflow-y-auto">
      {servers.map((server) => (
        <button
          key={server.id}
          onClick={() => setActiveServer(server.id)}
          className={`w-10 h-10 rounded-full transition-colors ${
            activeServer === server.id
              ? "bg-indigo-600"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
          title={server.name}
        >
          {server.icon ? (
            <Image
              src={server.icon}
              alt={server.name}
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-xs font-bold">
              {server.name[0].toUpperCase()}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ServerList;
