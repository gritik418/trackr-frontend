'use client';

import {
    Calendar,
    Check,
    ChevronDown,
    Circle,
    ListFilter,
    Search,
    SlidersHorizontal
} from 'lucide-react';
import { useState } from 'react';

export default function WorkspaceTasksPage() {
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

  const tasks = [
    {
      id: 1,
      title: 'Design initial wireframes for dashboard',
      description: 'Create high-fidelity mockups for the main overview screen including widget layouts.',
      project: 'Website Redesign',
      status: 'In Progress',
      priority: 'High',
      dueDate: 'Today',
      projectColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      id: 2,
      title: 'Setup production database schema',
      description: 'Define tables for users, workspaces, and projects with proper relationships and indexes.',
      project: 'Mobile App Launch',
      status: 'To Do',
      priority: 'Urgent',
      dueDate: 'Tommorow',
      projectColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      id: 3,
      title: 'Draft email copy for Q1 campaign',
      description: 'Write 3 variants of the welcome email to test subject lines and CTAs.',
      project: 'Q1 Marketing',
      status: 'In Review',
      priority: 'Medium',
      dueDate: 'Feb 12',
      projectColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    },
    {
      id: 4,
      title: 'Fix navigation bug on mobile Safari',
      description: 'Menu drawer does not close when clicking outside on iOS devices.',
      project: 'Website Redesign',
      status: 'In Progress',
      priority: 'High',
      dueDate: 'Feb 14',
      projectColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      id: 5,
      title: 'Prepare monthly analytics report',
      description: 'Compile engagement metrics and user growth stats for the stakeholder meeting.',
      project: 'Internal Analytics',
      status: 'Done',
      priority: 'Low',
      dueDate: 'Feb 10',
      projectColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    }
  ];

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden animate-in fade-in duration-700">
       
       {/* Sidebar Filters */}
       <div className="w-64 border-r border-white/5 pr-6 hidden lg:flex flex-col gap-8 overflow-y-auto pt-2">
          
          {/* Projects Filter */}
          <div>
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Projects</h3>
                  <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-neutral-500">4</span>
              </div>
              <div className="space-y-1">
                  {['Website Redesign', 'Mobile App Launch', 'Q1 Marketing', 'Internal Analytics'].map((p) => (
                      <label key={p} className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all group">
                          <div className="relative flex items-center justify-center">
                              <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-brand checked:border-brand transition-colors" />
                              <Check size={10} className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                          </div>
                          <span className="truncate">{p}</span>
                      </label>
                  ))}
              </div>
          </div>

          {/* Status Filter */}
          <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Status</h3>
              <div className="space-y-1">
                  {['To Do', 'In Progress', 'In Review', 'Done'].map((s) => (
                      <label key={s} className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all group">
                           <div className="relative flex items-center justify-center">
                              <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-brand checked:border-brand transition-colors" />
                              <Check size={10} className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                          </div>
                          <span>{s}</span>
                      </label>
                  ))}
              </div>
          </div>

          {/* Priority Filter */}
          <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">Priority</h3>
              <div className="space-y-1">
                  {['Urgent', 'High', 'Medium', 'Low'].map((p) => (
                      <label key={p} className="flex items-center gap-3 p-2 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all group">
                          <div className="relative flex items-center justify-center">
                              <input type="checkbox" className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-brand checked:border-brand transition-colors" />
                              <Check size={10} className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                          </div>
                          <span>{p}</span>
                      </label>
                  ))}
              </div>
          </div>
       </div>

       {/* Main Content */}
       <div className="flex-1 flex flex-col pl-0 lg:pl-6 min-w-0">
          
          {/* Header */}
          <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">My Tasks</h2>
              <p className="text-neutral-400 text-sm">You have 12 open tasks across 4 projects.</p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 relative z-10">
              <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 text-neutral-500" size={16} />
                  <input 
                      type="text" 
                      placeholder="Search tasks..." 
                      className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all"
                  />
              </div>
              <div className="flex items-center gap-2">
                  <button className="px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-neutral-400 hover:text-white transition-all flex items-center gap-2 hover:bg-white/10">
                      <ListFilter size={16} />
                      <span>Group By</span>
                      <ChevronDown size={14} className="opacity-50" />
                  </button>
                  <button className="px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-neutral-400 hover:text-white transition-all flex items-center gap-2 hover:bg-white/10">
                      <SlidersHorizontal size={16} />
                      <span>Sort</span>
                  </button>
              </div>
          </div>

          {/* Task List */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 pb-10">
              
              {/* Group: Today */}
              <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand shadow-[0_0_8px_rgba(0,216,230,0.6)]"></span>
                      Today
                      <span className="text-neutral-500 font-normal ml-1 text-xs">2 tasks</span>
                  </h3>
                  <div className="space-y-3">
                      {tasks.filter(t => t.dueDate === 'Today' || t.dueDate === 'Tommorow').map((task) => (
                           <TaskItem key={task.id} task={task} />
                      ))}
                  </div>
              </div>

               {/* Group: Upcoming */}
               <div>
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-4 pl-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                      Upcoming
                      <span className="text-neutral-500 font-normal ml-1 text-xs">3 tasks</span>
                  </h3>
                  <div className="space-y-3">
                      {tasks.filter(t => t.dueDate !== 'Today' && t.dueDate !== 'Tommorow').map((task) => (
                           <TaskItem key={task.id} task={task} />
                      ))}
                  </div>
              </div>

          </div>

       </div>
    </div>
  );
}

function TaskItem({ task }: { task: any }) {
    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Done': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'In Review': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            default: return 'bg-white/5 text-neutral-400 border-white/10';
        }
    };

    return (
        <div className="group relative flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-dashboard-card-bg/40 hover:bg-dashboard-card-bg/80 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-300 cursor-pointer overflow-hidden">
            {/* Left Accent Border on Hover */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Checkbox */}
            <div className="shrink-0 pt-1">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                    task.status === 'Done' 
                    ? 'bg-brand border-brand' 
                    : 'border-white/20 bg-transparent group-hover:border-brand/50'
                }`}>
                    {task.status === 'Done' && <Check size={12} className="text-black" strokeWidth={3} />}
                </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                {/* Meta Row */}
                <div className="flex items-center flex-wrap gap-2">
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${task.projectColor}`}>
                         {task.project}
                     </span>
                     
                     <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getStatusColor(task.status)}`}>
                         {task.status}
                     </span>

                     {task.priority === 'Urgent' && (
                         <span className="text-[10px] font-bold text-red-400 flex items-center gap-1 ml-auto">
                             <Circle size={6} fill="currentColor" /> Urgent
                         </span>
                     )}
                </div>

                {/* Content */}
                <div>
                    <h4 className={`text-base font-semibold text-white group-hover:text-brand transition-colors line-clamp-1 ${task.status === 'Done' ? 'line-through text-neutral-500 decoration-neutral-600' : ''}`}>
                        {task.title}
                    </h4>
                    <p className={`text-sm text-neutral-500 line-clamp-1 mt-0.5 font-light ${task.status === 'Done' ? 'opacity-50' : ''}`}>
                        {task.description}
                    </p>
                </div>
            </div>

            {/* Right Side Actions/Meta */}
            <div className="flex flex-col items-end gap-3 shrink-0 pl-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors bg-white/5 px-2 py-1 rounded-lg">
                    <Calendar size={12} />
                    <span>{task.dueDate}</span>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                     <div className="w-7 h-7 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-[10px] text-brand font-bold">
                        RG
                    </div>
                </div>
            </div>
        </div>
    )
}
