'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Server, Bot, Trophy, Cog } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

// Define the User type
interface User {
  username: string;
  imageUrl: string | null;
}

// NavItem component
const NavItem = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string; }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}>
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export default function Sidebar({ user }: { user: User }) {
  return (
    <aside className="w-72 bg-[#1e1f22] text-white flex flex-col h-screen p-4">
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-6">
        <UserButton afterSignOutUrl="/" />
        <div className="flex-grow">
          <p className="font-bold text-white">{user.username}</p>
          <p className="text-xs text-gray-400">@{user.username.toLowerCase().replace(/\s+/g, '')}</p>
        </div>
        <Cog size={20} className="text-gray-400 hover:text-white cursor-pointer" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider px-4 mb-1">Navigation</h3>
        <NavItem href="/dashboard" icon={Home} label="Home" />
        <NavItem href="/dashboard/friends" icon={Users} label="Friends" />
        <NavItem href="/servers" icon={Server} label="Servers" />
        <NavItem href="/dashboard/contests" icon={Trophy} label="Contests" />
        <NavItem href="#" icon={Bot} label="AI Chat" />
      </nav>
    </aside>
  );
}