'use client';

import {
  Boxes,
  Briefcase,
  Edit,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function OrgWorkspacesPage() {
  const workspaces = [
    {
      id: '1',
      name: 'Engineering',
      slug: 'engineering',
      members: 12,
      projects: 5,
      description: 'Main engineering workspace for core product development and infrastructure.'
    },
    {
      id: '2',
      name: 'Marketing',
      slug: 'marketing',
      members: 5,
      projects: 12,
      description: 'Marketing campaigns, assets, content calendar, and social media planning.'
    },
    {
      id: '3',
      name: 'Design',
      slug: 'design',
      members: 8,
      projects: 3,
      description: 'Product design, UI/UX research, and brand creative assets.'
    },
    {
      id: '4',
      name: 'Sales',
      slug: 'sales',
      members: 15,
      projects: 2,
      description: 'Lead generation tracking, CRM integration, and sales collateral.'
    }
  ];

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">Workspaces</h2>
          <p className="text-org-item-text mt-2 text-lg font-light">Manage and organize your team's workspaces.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group">
          <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
          Create Workspace
        </button>
      </div>

      {/* Filters/Search Bar */}
      <div className="relative z-10">
         <div className="relative max-w-md">
            <Search className="absolute left-4 top-3.5 text-neutral-500" size={18} />
            <input 
              type="text" 
              placeholder="Search workspaces..." 
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all"
            />
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {workspaces.map((ws) => (
          <div key={ws.id} className="group relative p-6 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 hover:border-brand/20 hover:bg-org-card-bg/80 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 flex flex-col h-full cursor-pointer">
            
            <div className="flex items-start justify-between mb-4">
               <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={22} className="text-white/80 group-hover:text-brand transition-colors" />
               </div>
               <div className="relative z-20" ref={openMenuId === ws.id ? menuRef : null}>
                  <button 
                    onClick={(e) => toggleMenu(e, ws.id)}
                    className={`p-2 rounded-lg transition-colors ${openMenuId === ws.id ? 'bg-white/10 text-white' : 'text-neutral-500 hover:bg-white/5 hover:text-white'}`}
                  >
                      <MoreVertical size={18} />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === ws.id && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-bg-dark-1 border border-white/10 rounded-xl shadow-xl shadow-black/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="p-1">
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left">
                              <Edit size={14} />
                              Edit Workspace
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left">
                              <Trash2 size={14} />
                              Delete
                          </button>
                        </div>
                    </div>
                  )}
               </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">{ws.name}</h3>
            <p className="text-org-item-text text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">{ws.description}</p>

            <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 border-t border-white/5 pt-4 mt-auto">
               <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>{ws.members} Members</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <Boxes size={14} />
                  <span>{ws.projects} Projects</span>
               </div>
            </div>

             {/* Clickable Overlay */}
             <Link href={`/dashboard/${ws.slug}`} className="absolute inset-0 rounded-3xl ring-0 focus:ring-2 ring-brand/50 outline-none"></Link>
          </div>
        ))}
        
        {/* New Workspace Placeholder Card */}
        <button className="group relative p-6 rounded-3xl border border-dashed border-white/10 hover:border-brand/40 hover:bg-brand/5 transition-all duration-300 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[240px]">
           <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-brand/10 flex items-center justify-center transition-colors duration-300">
              <Plus size={32} className="text-neutral-500 group-hover:text-brand transition-colors duration-300" />
           </div>
           <div>
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand transition-colors">Create New Workspace</h3>
              <p className="text-sm text-neutral-500 max-w-[200px]">Add a new workspace to organize your next big project.</p>
           </div>
        </button>
      </div>
    </div>
  );
}
