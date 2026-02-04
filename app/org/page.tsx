'use client';

import { Logo } from '@/components/ui/Logo';
import { ProfileMenu } from '@/components/org/ProfileMenu';
import {
    ArrowRight,
    MapPin,
    Plus,
    Users,
    Search
} from 'lucide-react';
import Link from 'next/link';

// Dummy Data
const ORGANIZATIONS = [
  {
    id: 'org_1',
    name: 'Acme Corp',
    slug: 'acme-corp',
    role: 'Admin',
    members: 12,
    location: 'San Francisco, CA',
    avatarColor: 'bg-blue-500',
  },
  {
    id: 'org_2',
    name: 'Indie Hackers',
    slug: 'indie-hackers',
    role: 'Member',
    members: 4,
    location: 'Remote',
    avatarColor: 'bg-indigo-500',
  },
  {
    id: 'org_3',
    name: 'Design Studio',
    slug: 'design-studio',
    role: 'Viewer',
    members: 8,
    location: 'New York, NY',
    avatarColor: 'bg-pink-500',
  }
];

export default function OrgSelectionPage() {
  return (
    <div className="min-h-screen w-full bg-[#020202] text-white flex flex-col font-sans selection:bg-brand/30 overflow-x-hidden">
      
      {/* Navbar */}
      <header className="h-[72px] border-b border-white/6 flex items-center px-6 lg:px-12 bg-[#020202]/80 backdrop-blur-xl sticky top-0 z-50">
            <Logo size={28} showText={true} />
            <div className="ml-auto flex items-center gap-6">
                {/* Search Placeholder */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/6 text-sm text-neutral-500 hover:border-white/10 transition-colors w-64 cursor-text">
                    <Search size={14} />
                    <span>Search organizations...</span>
                    <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-white/5 border border-white/5">⌘K</span>
                </div>
                
                <div className="h-6 w-px bg-white/10 hidden md:block" />
                
                <ProfileMenu />
            </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative w-full">
        {/* Subtle Background Glows */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-cyan/5 blur-[150px] rounded-full pointer-events-none opacity-60" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none opacity-40" />
        
        <div className="w-full max-w-5xl z-10 space-y-12">
            
            {/* Header Text */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">Select Organization</h1>
                <p className="text-neutral-400 text-lg font-medium max-w-lg mx-auto leading-relaxed">
                    Choose a workspace to continue your work or start a new journey.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Org Cards */}
                {ORGANIZATIONS.map((org) => (
                    <Link 
                        key={org.id} 
                        href={`/org/${org.slug}`}
                        className="group relative bg-[#0A0A0B] border border-white/8 rounded-2xl p-6 transition-all duration-300 hover:border-brand-cyan/40 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.1)] hover:-translate-y-1 overflow-hidden"
                    >
                         {/* Card Highlight Effect */}
                         <div className="absolute inset-0 bg-linear-to-br from-brand-cyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                         <div className="relative z-10 flex justify-between items-start mb-6">
                             <div className={`w-14 h-14 rounded-xl ${org.avatarColor} flex items-center justify-center text-xl font-bold text-white shadow-lg ring-4 ring-bg-dark-0 ring-offset-2 ring-offset-transparent group-hover:ring-offset-brand-cyan/20 transition-all duration-300`}>
                                 {org.name.charAt(0)}
                             </div>
                             <div className="px-3 py-1 rounded-full bg-white/4 border border-white/6 text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:border-brand-cyan/20 group-hover:text-brand-cyan transition-colors">
                                 {org.role}
                             </div>
                         </div>

                         <div className="relative z-10 space-y-2 mb-8">
                             <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1">{org.name}</h3>
                             <p className="text-sm text-neutral-500 flex items-center gap-2 group-hover:text-neutral-400 transition-colors">
                                <MapPin size={13} strokeWidth={2} /> {org.location}
                             </p>
                         </div>

                         <div className="relative z-10 pt-6 border-t border-white/6 flex items-center justify-between text-sm group-hover:border-white/10 transition-colors">
                             <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                 <Users size={14} strokeWidth={2} />
                                 <span className="font-medium">{org.members} members</span>
                             </div>
                             <div className="flex items-center gap-1.5 text-brand-cyan font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                 Enter Workspace <ArrowRight size={14} strokeWidth={2.5} />
                             </div>
                         </div>
                    </Link>
                ))}

                {/* Create New Card */}
                <Link 
                    href="/org/create"
                    className="group relative border border-dashed border-white/10 bg-transparent hover:bg-white/2 hover:border-brand-cyan/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-5 text-center transition-all duration-300"
                >
                    <div className="w-16 h-16 rounded-full bg-white/3 border border-white/5 group-hover:border-brand-cyan/20 group-hover:bg-brand-cyan/10 flex items-center justify-center text-neutral-500 group-hover:text-brand-cyan transition-all duration-300 group-hover:scale-110 shadow-inner">
                        <Plus size={28} strokeWidth={2.5} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">Create Organization</h3>
                        <p className="text-sm text-neutral-500 px-8 leading-snug group-hover:text-neutral-400 transition-colors">Add a new workspace to manage your projects.</p>
                    </div>
                </Link>

            </div>
        </div>
      </main>
    </div>
  );
}

