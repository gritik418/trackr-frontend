'use client';

import {
    Calendar,
    CheckCircle2,
    FileText,
    Filter,
    GitCommit,
    MessageSquare,
    UserPlus
} from 'lucide-react';

export default function WorkspaceActivityPage() {
  const activities = [
    {
      id: 1,
      user: { name: 'Sarah Chen', avatar: null, initials: 'SC', color: 'bg-emerald-500' },
      type: 'comment',
      action: 'commented on',
      target: 'Homepage Redesign',
      content: 'I think we should adjust the contrast on the hero section. It is a bit hard to read on mobile.',
      time: '2 hours ago',
      icon: MessageSquare,
      iconColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    },
    {
      id: 2,
      user: { name: 'Ritik Gupta', avatar: 'https://github.com/ritikgupta.png', initials: 'RG', color: 'bg-purple-500' },
      type: 'status',
      action: 'changed status of',
      target: 'Mobile App Launch',
      content: { from: 'In Progress', to: 'Done' },
      time: '4 hours ago',
      icon: CheckCircle2,
      iconColor: 'text-green-400 bg-green-400/10 border-green-400/20'
    },
    {
      id: 3,
      user: { name: 'Mike Ross', avatar: null, initials: 'MR', color: 'bg-amber-500' },
      type: 'push',
      action: 'pushed to',
      target: 'main',
      content: 'feat: implement new authentication flow',
      time: 'Yesterday',
      icon: GitCommit,
      iconColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20'
    },
    {
      id: 4,
      user: { name: 'Sarah Chen', avatar: null, initials: 'SC', color: 'bg-emerald-500' },
      type: 'create',
      action: 'created task',
      target: 'Update Privacy Policy',
      time: 'Yesterday',
      icon: FileText,
      iconColor: 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20'
    },
    {
      id: 5,
      user: { name: 'Ritik Gupta', avatar: 'https://github.com/ritikgupta.png', initials: 'RG', color: 'bg-purple-500' },
      type: 'invite',
      action: 'invited',
      target: 'David Miller',
      role: 'Editor',
      time: '2 days ago',
      icon: UserPlus,
      iconColor: 'text-brand bg-brand/10 border-brand/20'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-700">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
           <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">Activity Feed</h2>
           <p className="text-neutral-400 mt-2 text-lg font-light">Stay updated with what&apos;s happening in your workspace.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-medium transition-colors text-neutral-300">
           <Filter size={16} />
           Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Main Timeline */}
         <div className="lg:col-span-2 relative">
             {/* Vertical Line */}
             <div className="absolute left-6 top-4 bottom-4 w-px bg-linear-to-b from-white/10 via-white/5 to-transparent z-0" />

             <div className="space-y-8 relative z-10">
                 {activities.map((item) => (
                    <div key={item.id} className="group relative flex gap-6">
                        {/* Icon Marker */}
                        <div className={`shrink-0 w-12 h-12 rounded-full border flex items-center justify-center shadow-[0_0_15px_-3px_rgba(0,0,0,0.3)] bg-dashboard-bg z-10 ${item.iconColor}`}>
                             <item.icon size={20} />
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 bg-dashboard-card-bg/40 border border-white/5 rounded-2xl p-5 hover:bg-dashboard-card-bg/60 hover:border-white/10 transition-all duration-300 group-hover:translate-x-1">
                             <div className="flex items-start justify-between mb-3">
                                 <div className="flex items-center gap-3">
                                     <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-white overflow-hidden ${item.user.color}`}>
                                         {item.user.avatar ? (
                                             // eslint-disable-next-line @next/next/no-img-element
                                             <img src={item.user.avatar} alt={item.user.name} className="w-full h-full object-cover" />
                                         ) : (
                                             item.user.initials
                                         )}
                                     </div>
                                     <div className="text-sm">
                                         <span className="font-semibold text-white">{item.user.name}</span>
                                         <span className="text-neutral-500 mx-1.5">{item.action}</span>
                                         <span className="font-medium text-brand-hover/90">{item.target}</span>
                                     </div>
                                 </div>
                                 <span className="text-xs text-neutral-500 whitespace-nowrap">{item.time}</span>
                             </div>

                             {/* Context/Content */}
                             {item.type === 'comment' && (
                                 <div className="ml-11 bg-white/5 rounded-xl p-3 border border-white/5 text-sm text-neutral-300 italic relative">
                                     <div className="absolute -top-1.5 left-4 w-3 h-3 bg-dashboard-card-bg border-t border-l border-white/10 transform rotate-45" /> {/* Triangle Arrow */}
                                     &quot;{item.content as string}&quot;
                                 </div>
                             )}

                             {item.type === 'status' && (
                                 <div className="ml-11 flex items-center gap-3 text-sm">
                                     <span className="px-2 py-1 rounded-lg bg-white/5 text-neutral-400 line-through">
                                         {(item.content as any).from}
                                     </span>
                                     <span className="text-neutral-600">→</span>
                                     <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                         {(item.content as any).to}
                                     </span>
                                 </div>
                             )}

                             {item.type === 'push' && (
                                 <div className="ml-11 font-mono text-xs text-neutral-400 flex items-center gap-2">
                                     <GitCommit size={14} className="opacity-50" />
                                     {item.content as string}
                                 </div>
                             )}

                             {item.type === 'invite' && (
                                 <div className="ml-11 text-sm text-neutral-400">
                                     Key: <span className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs">{item.role}</span>
                                 </div>
                             )}
                        </div>
                    </div>
                 ))}
             </div>
         </div>

         {/* Sidebar Stats */}
         <div className="hidden lg:block space-y-6">
             <div className="bg-dashboard-card-bg/30 border border-white/5 rounded-2xl p-6">
                 <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-6">Activity Stats</h3>
                 
                 <div className="space-y-6">
                     <div>
                         <div className="flex justify-between text-sm mb-2">
                             <span className="text-neutral-500">Most Active</span>
                             <span className="text-white font-medium">Ritik Gupta</span>
                         </div>
                         <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div className="w-[70%] h-full bg-brand rounded-full" />
                         </div>
                     </div>

                     <div>
                         <div className="flex justify-between text-sm mb-2">
                             <span className="text-neutral-500">Tasks Completed</span>
                             <span className="text-white font-medium">12 this week</span>
                         </div>
                         <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                             <div className="w-[45%] h-full bg-emerald-500 rounded-full" />
                         </div>
                     </div>
                 </div>
             </div>

             <div className="bg-linear-to-br from-brand/10 to-transparent border border-brand/10 rounded-2xl p-6">
                 <div className="flex items-start gap-4">
                     <div className="p-3 bg-brand/10 rounded-xl text-brand">
                        <Calendar size={20} />
                     </div>
                     <div>
                         <h4 className="font-bold text-white text-lg">Daily Standup</h4>
                         <p className="text-sm text-neutral-400 mt-1">Scheduled for 10:00 AM. Don&apos;t forget to update your status.</p>
                     </div>
                 </div>
             </div>
         </div>

      </div>
    </div>
  );
}
