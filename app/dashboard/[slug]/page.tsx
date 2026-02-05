'use client';

import { useParams } from 'next/navigation';

const WorkspaceDashboardPage=() => {
  const params = useParams();
  const slug = params?.slug as string || 'Workspace';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[0%] w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[0%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Welcome / Header */}
      <div className="relative">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Good morning, Ritik</h1>
        <p className="text-neutral-400">Here's what's happening in <span className="text-white font-medium capitalize">{slug}</span> today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
         {[
           { label: 'Total Tasks', value: '12', trend: '+2', trendLabel: 'vs yesterday', color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
           { label: 'In Progress', value: '5', trend: '0', trendLabel: 'vs yesterday', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
           { label: 'Completed', value: '24', trend: '+8', trendLabel: 'this week', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
           { label: 'Overdue', value: '2', trend: '-1', trendLabel: 'vs yesterday', color: 'text-rose-400', bg: 'bg-rose-400/10' },
         ].map((stat, i) => (
           <div key={i} className="p-5 rounded-2xl border border-dashboard-border bg-dashboard-card-bg/50 backdrop-blur-sm hover:bg-dashboard-card-bg transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm text-dashboard-item-text font-medium">{stat.label}</p>
                <span className={`text-[10px] font-bold ${stat.color} ${stat.bg} px-2 py-0.5 rounded-full`}>{stat.trend}</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform block origin-left duration-300">{stat.value}</span>
                <p className="text-xs text-neutral-500 mt-1">{stat.trendLabel}</p>
              </div>
           </div>
         ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
         
         {/* My Tasks */}
         <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">My Tasks</h2>
                <button className="text-xs font-medium text-brand-cyan hover:text-brand-cyan/80 transition-colors">View All</button>
            </div>
            
            <div className="border border-dashboard-border rounded-2xl overflow-hidden bg-dashboard-card-bg/30 backdrop-blur-sm">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="flex items-center gap-4 p-4 border-b border-dashboard-border last:border-0 hover:bg-dashboard-item-bg-hover transition-colors cursor-pointer group">
                     {/* Checkbox */}
                     <div className="w-5 h-5 rounded border border-dashboard-border group-hover:border-brand/50 flex items-center justify-center transition-colors">
                        <div className="w-3 h-3 rounded-[2px] bg-brand opacity-0 group-hover:opacity-20 transition-opacity" />
                     </div>
                     
                     {/* Content */}
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-brand transition-colors truncate">Update landing page assets</p>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] px-1.5 py-px rounded bg-dashboard-item-bg text-dashboard-item-text border border-dashboard-border">Marketing</span>
                            <span className="text-xs text-neutral-500">Duet Today</span>
                        </div>
                     </div>

                     {/* Avatar */}
                     <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand to-blue-600 p-[1px]">
                        <div className="w-full h-full rounded-full bg-dashboard-card-bg flex items-center justify-center">
                            <span className="text-[10px] font-bold text-white">RG</span>
                        </div>
                     </div>
                 </div>
               ))}
            </div>
         </div>
         
         {/* Sidebar Widgets */}
         <div className="space-y-6">
            
            {/* Recently Viewed */}
            <div className="space-y-4">
                <h2 className="text-base font-semibold text-white">Recently Viewed</h2>
                 <div className="border border-dashboard-border rounded-2xl p-4 bg-dashboard-card-bg/30 backdrop-blur-sm space-y-3">
                     {[1, 2].map((i) => (
                        <div key={i} className="flex gap-3 items-center p-3 rounded-xl hover:bg-dashboard-item-bg-hover transition-colors cursor-pointer group">
                            <div className="w-10 h-10 rounded-lg bg-dashboard-item-bg flex items-center justify-center text-dashboard-item-text group-hover:text-white transition-colors">
                                <span className="text-lg">🎨</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Q1 Marketing Plan</p>
                                <p className="text-xs text-neutral-500 truncate">Edited 2h ago</p>
                            </div>
                        </div>
                     ))}
                 </div>
            </div>

            {/* Team Activity */}
            <div className="space-y-4">
                <h2 className="text-base font-semibold text-white">Team Activity</h2>
                 <div className="border border-dashboard-border rounded-2xl p-4 bg-dashboard-card-bg/30 backdrop-blur-sm space-y-4">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 relative pl-4">
                            <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-white/10" />
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                <span className="text-white font-medium">Sarah</span> commented on <span className="text-brand-cyan hover:underline cursor-pointer">Homepage Redesign</span>
                                <span className="block text-[10px] text-neutral-600 mt-1">10 min ago</span>
                            </p>
                        </div>
                     ))}
                 </div>
            </div>

         </div>
      </div>

    </div>
    </div>
  );
}

export default WorkspaceDashboardPage;