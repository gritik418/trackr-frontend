'use client';

import {
    Clock,
    MoreVertical,
    Plus,
    Search
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProjectsListPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const projects = [
    {
      id: 'website-redesign',
      title: 'Website Redesign',
      description: 'Revamping the core marketing site with new branding and improved SEO structure.',
      status: 'On Track',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      progress: 65,
      dueDate: 'Mar 15, 2026',
      members: [
        { id: 1, img: 'https://github.com/ritikgupta.png' },
        { id: 2, img: null, initials: 'SC' },
        { id: 3, img: null, initials: 'MJ' },
      ]
    },
    {
      id: 'mobile-app-v2',
      title: 'Mobile App v2.0',
      description: 'Native IOS and Android refresh with dark mode support and performance optimizations.',
      status: 'At Risk',
      statusColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      progress: 42,
      dueDate: 'Apr 02, 2026',
      members: [
        { id: 2, img: null, initials: 'SC' },
        { id: 4, img: null, initials: 'DK' },
      ]
    },
    {
      id: 'q1-marketing',
      title: 'Q1 Marketing Campaign',
      description: 'Social media assets and email sequences for the upcoming product launch.',
      status: 'On Track',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      progress: 12,
      dueDate: 'Feb 28, 2026',
      members: [
        { id: 5, img: null, initials: 'AL' },
      ]
    },
    {
      id: 'internal-dashboard',
      title: 'Internal Analytics',
      description: 'Admin dashboard for tracking user engagement and retention metrics.',
      status: 'Completed',
      statusColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      progress: 100,
      dueDate: 'Jan 30, 2026',
      members: [
        { id: 1, img: 'https://github.com/ritikgupta.png' },
        { id: 3, img: null, initials: 'MJ' },
        { id: 4, img: null, initials: 'DK' },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[0%] w-[500px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[0%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Projects</h2>
          <p className="text-neutral-400 mt-1 text-lg font-light">Manage and track your team's initiatives.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group">
          <Plus size={18} strokeWidth={2.5} />
          <span>New Project</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-neutral-500" size={16} />
            <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full pl-9 pr-4 py-2 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/50 focus:bg-dashboard-card-bg/50 transition-all"
            />
        </div>
        <div className="flex items-center gap-2">
            <select className="px-3 py-2 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-neutral-300 focus:outline-none focus:border-brand/50">
                <option>All Statuses</option>
                <option>On Track</option>
                <option>At Risk</option>
                <option>Completed</option>
            </select>
            <select className="px-3 py-2 bg-dashboard-card-bg/30 border border-dashboard-border rounded-xl text-sm text-neutral-300 focus:outline-none focus:border-brand/50">
                <option>Sort by Date</option>
                <option>Sort by Name</option>
            </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {projects.map((project) => (
            <Link 
                key={project.id} 
                href={`/dashboard/${slug}/projects/${project.id}`}
                className="group p-6 rounded-3xl border border-dashboard-border bg-dashboard-card-bg/40 backdrop-blur-sm hover:bg-dashboard-card-bg/60 hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-300 flex flex-col"
            >
                <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${project.statusColor}`}>
                        {project.status}
                    </span>
                    <button className="text-neutral-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical size={16} />
                    </button>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand transition-colors">{project.title}</h3>
                <p className="text-sm text-neutral-400 line-clamp-2 mb-6 flex-1">{project.description}</p>

                <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-neutral-400 font-medium">Progress</span>
                            <span className="text-white font-bold">{project.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-brand rounded-full transition-all duration-500 ease-out group-hover:bg-brand-hover" 
                                style={{ width: `${project.progress}%` }} 
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        {/* Members */}
                        <div className="flex -space-x-2">
                            {project.members.map((member) => (
                                <div key={member.id} className="w-7 h-7 rounded-full border border-dashboard-card-bg bg-dashboard-card-bg flex items-center justify-center text-[9px] font-bold text-white overflow-hidden ring-2 ring-transparent group-hover:ring-dashboard-card-bg transition-all">
                                    {member.img ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={member.img} alt="User" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-white/10 flex items-center justify-center">{member.initials}</div>
                                    )}
                                </div>
                            ))}
                            {project.members.length > 3 && (
                                <div className="w-7 h-7 rounded-full border border-dashboard-card-bg bg-white/5 flex items-center justify-center text-[9px] font-bold text-neutral-400">
                                    +2
                                </div>
                            )}
                        </div>

                        {/* Due Date */}
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors">
                            <Clock size={12} />
                            {project.dueDate}
                        </div>
                    </div>
                </div>
            </Link>
        ))}

        {/* Create New Card (Optional visual cue) */}
        <button className="rounded-3xl border border-dashed border-white/10 bg-transparent hover:bg-white/5 hover:border-brand/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 min-h-[280px] group text-neutral-500 hover:text-brand">
            <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-brand/10 flex items-center justify-center transition-colors">
                <Plus size={24} />
            </div>
            <span className="font-medium">Create New Project</span>
        </button>

      </div>
    </div>
  );
}
