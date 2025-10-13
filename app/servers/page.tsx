import Link from 'next/link';
import { ArrowLeft, Wifi } from 'lucide-react';

const ServerCard = ({ name, members, imageUrl }: { name: string, members: number, imageUrl: string }) => (
  <div className="bg-slate-800 rounded-lg overflow-hidden group transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
      <div className="flex items-center text-sm text-slate-400">
        <Wifi size={14} className="mr-2 text-green-400" />
        <span>{members.toLocaleString()} Members Online</span>
      </div>
      <button className="w-full mt-4 bg-cyan-500 text-white font-semibold py-2 rounded-lg hover:bg-cyan-600 transition-colors">
        Join Server
      </button>
    </div>
  </div>
);

export default function ServersPage() {
  const servers = [
    { name: 'Next.js Devs', members: 1253, imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80' },
    { name: 'AI Enthusiasts', members: 874, imageUrl: 'https://images.unsplash.com/photo-1620712943543-26fc76334419?w=500&q=80' },
    { name: 'Tailwind CSS Fans', members: 2319, imageUrl: 'https://images.unsplash.com/photo-1644911491636-09ac3a1b2414?w=500&q=80' },
  ];

  return (
    <div className="min-h-screen bg-[#0f111a] p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white transition-colors group">
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold">Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mt-4">Discover Servers</h1>
          <p className="text-slate-400 mt-2">Join communities to chat, hang out, and make new friends.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servers.map(server => (
            <ServerCard key={server.name} {...server} />
          ))}
        </div>
      </div>
    </div>
  );
}