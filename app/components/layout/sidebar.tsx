import React from 'react';
import { 
    Home, 
    Users, 
    Server, 
    Bot, 
    Trophy, 
    Settings, 
    Plus,
    Dot, 
    Icon
} from 'lucide-react';

const Profile = () => (
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">Profile</h2>
            <span className="text-xs text-green-400">
                {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span> */}
                <span className="animaterelative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
        </div>
        <div className="flex items-center space-x-3">
            <img 
                src="https://placehold.co/40x40/6366f1/FFFFFF?text=NS" 
                alt="Nova Sera" 
                className="w-10 h-10 rounded-full border-2 border-slate-700"
            />
            <div className="flex-grow">
                <p className="font-semibold text-white">Nova Sera</p>
                <p className="text-xs text-slate-400">@nova.ops</p>
            </div>
            <button className="text-slate-400 hover:text-white p-2 rounded-md hover:bg-slate-700 transition-colors">
                <Settings size={20} />
            </button>
        </div>
    </div>
);

type NavItemProps = {
    icon: React.ComponentType<{ size?: number }>;
    label: string;
    count?: number;
    live?: boolean;
    active?: boolean;
};

const NavItem = ({ icon: Icon, label, count, live, active }: NavItemProps) => (
    <a href="#" className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active 
        ? 'bg-slate-700/50 text-white shadow-[0_0_15px_rgba(71,85,105,0.5)]' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}>
        <div className="flex items-center space-x-3">
            <Icon size={20} />
            <span>{label}</span>
        </div>
        {count && <span className="bg-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>}
        {live && <span className="text-xs text-red-500 font-semibold">Live</span>}
        {active && <span className="text-xs text-slate-500 font-semibold">Now</span>}
    </a>
);

type ChannelItemProps = {
    name: string;
    count: number;
    status: 'online' | 'offline';
};

const ChannelItem = ({ name, count, status }: ChannelItemProps) => (
    <a href="#" className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors group">
        <div className="flex items-center space-x-3">
            <span className={`w-2 h-2 rounded-full ${
                status === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            <span className="text-sm text-slate-300 group-hover:text-white">{name}</span>
        </div>
        <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full group-hover:bg-slate-600 group-hover:text-white">{count}</span>
    </a>
);


export default function Sidebar() {
    return (
        <div className="w-64 bg-slate-900 text-white flex flex-col h-screen font-sans border-r border-slate-800">
            <Profile />
            
            <div className="px-4 py-2">
                <h3 className="text-xs uppercase text-slate-500 font-semibold tracking-wider mb-2">Navigation</h3>
                <nav className="space-y-1">
                    <NavItem icon={Home} label="Home" active />
                    <NavItem icon={Users} label="Friends" />
                    <NavItem icon={Server} label="Servers" count={12} />
                    <NavItem icon={Bot} label="AI Chat" />
                    <NavItem icon={Trophy} label="Contests" live />
                </nav>
            </div>

            <div className="flex-grow px-4 py-2 mt-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-2">
                     <h3 className="text-xs uppercase text-slate-500 font-semibold tracking-wider">Servers & Channels</h3>
                     <button className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-700 transition-colors">
                        <Plus size={20} />
                    </button>
                </div>
                <div className="space-y-1">
                    <ChannelItem name="Campus Connect" count={5} status="online" />
                    <ChannelItem name="Shivam" count={12} status="online" />
                    
                </div>
            </div>
        </div>
    );
}

