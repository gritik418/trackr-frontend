'use client';

import React from 'react';
import { 
  Layers, 
  Users, 
  CheckSquare, 
  ShieldCheck, 
  Activity, 
  FolderTree 
} from 'lucide-react';

const features = [
  {
    title: 'Workspace-First Design',
    description: 'Work happens inside dedicated spaces. Organizations provide the structure, but workspaces provide the focus.',
    icon: FolderTree,
    color: 'text-brand bg-brand/10 border-brand/20'
  },
  {
    title: 'Hierarchical Permissions',
    description: 'Explicit roles at both Organization and Workspace levels ensure everyone has the right access.',
    icon: ShieldCheck,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
  },
  {
    title: 'Task Lifecycle',
    description: 'Full audit history for every unit of work. From creation to deployment, every move is tracked.',
    icon: CheckSquare,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    title: 'Organization Control',
    description: 'Top-level containers for teams. Manage billing, members, and multiple workspaces from one hub.',
    icon: Users,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  },
  {
    title: 'Categorized Workflows',
    description: 'Group tasks by categories unique to each workspace. Standardize your operations without friction.',
    icon: Layers,
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
  },
  {
    title: 'Real-time Activity',
    description: 'Append-only activity logs provide an immutable timeline of your project progression.',
    icon: Activity,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white/2 border-y border-white/5 relative overflow-hidden animate-fade-in [animation-delay:200ms]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-0 right-[-20%] w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-0 left-[-20%] w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Built for the modern workspace.</h3>
          <p className="text-lg text-neutral-400 mt-6 leading-relaxed">
            Aligning strictly with your team's hierarchy and execution units. Trackr isn't just a task list; it's an operating system for work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="p-8 rounded-3xl bg-bg-dark-1 border border-white/5 hover:border-white/15 hover:bg-white/3 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-brand transition-colors">{feature.title}</h4>
              <p className="text-neutral-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
