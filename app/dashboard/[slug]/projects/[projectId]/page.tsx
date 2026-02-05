'use client';

import {
    Calendar,
    Filter,
    Layout,
    List,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    Share2
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params?.projectId as string;
  const projectTitle = projectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const [activeTab, setActiveTab] = useState('board');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Layout },
    { id: 'board', label: 'Board', icon: Layout },
    { id: 'list', label: 'List', icon: List },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-neutral-500',
      tasks: [
        { id: 1, title: 'Research competitors', tag: 'Strategy', members: [1] },
        { id: 2, title: 'Draft content strategy', tag: 'Content', members: [2] },
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-500',
      tasks: [
        { id: 3, title: 'Design homepage hero', tag: 'Design', members: [1, 3], image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&auto=format&fit=crop&q=60' },
        { id: 4, title: 'Setup project repo', tag: 'Dev', members: [3] },
      ]
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'bg-amber-500',
      tasks: [
        { id: 5, title: 'Component library structure', tag: 'Dev', members: [1, 2, 3] },
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-emerald-500',
      tasks: [
        { id: 6, title: 'Kickoff meeting', tag: 'Meeting', members: [1, 2, 3, 4] },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] animate-in fade-in duration-700">
       {/* Header */}
       <div className="flex flex-col gap-6 mb-6">
          <div className="flex items-start justify-between">
              <div>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                      <span>Projects</span>
                      <span>/</span>
                      <span className="text-white">{projectTitle}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">{projectTitle}</h1>
              </div>
              <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 mr-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-dark-0 bg-neutral-800 flex items-center justify-center text-xs text-white">
                                {i === 1 ? 'RG' : i === 2 ? 'SC' : 'MJ'}
                            </div>
                        ))}
                        <button className="w-8 h-8 rounded-full border-2 border-bg-dark-0 bg-white/10 flex items-center justify-center text-xs text-white hover:bg-white/20 transition-colors">
                            <Plus size={14} />
                        </button>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-colors">
                      <Share2 size={16} />
                      Share
                  </button>
                  <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <MoreHorizontal size={20} />
                  </button>
              </div>
          </div>

          {/* Navigation & Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-1">
              {/* Tabs */}
              <div className="flex items-center gap-1">
                  {tabs.map((tab) => (
                      <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                              activeTab === tab.id 
                                  ? 'text-white' 
                                  : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/5'
                          }`}
                      >
                          <tab.icon size={16} />
                          {tab.label}
                          {activeTab === tab.id && (
                              <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-brand rounded-full" />
                          )}
                      </button>
                  ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                   <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />
                   <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                       <Filter size={16} />
                       Filter
                   </button>
                   <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
                       <Calendar size={16} />
                       Date
                   </button>
                   <div className="relative">
                       <Search className="absolute left-2.5 top-2 text-neutral-600" size={14} />
                       <input 
                          type="text" 
                          placeholder="Search tasks..." 
                          className="pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-brand/30 w-40 hover:w-60 transition-all duration-300"
                       />
                   </div>
                   <button className="ml-2 px-3 py-1.5 bg-brand text-bg-dark-0 text-sm font-bold rounded-lg hover:bg-brand-hover transition-colors flex items-center gap-1.5">
                       <Plus size={16} />
                       New Task
                   </button>
              </div>
          </div>
       </div>

       {/* Kanban Board */}
       <div className="-mx-4 sm:mx-0 flex-1 overflow-x-auto pb-4">
           {activeTab === 'board' && (
               <div className="flex gap-6 min-w-[1000px] px-4 sm:px-0 h-full">
                   {columns.map((column) => (
                       <div key={column.id} className="flex-1 min-w-[280px] flex flex-col gap-4">
                           {/* Column Header */}
                           <div className="flex items-center justify-between px-1">
                               <div className="flex items-center gap-2">
                                   <div className={`w-2 h-2 rounded-full ${column.color}`} />
                                   <h3 className="text-sm font-bold text-white">{column.title}</h3>
                                   <span className="text-xs text-neutral-500 font-mono">{column.tasks.length}</span>
                               </div>
                               <button className="text-neutral-600 hover:text-white transition-colors">
                                   <Plus size={16} />
                               </button>
                           </div>

                           {/* Task List */}
                           <div className="flex-1 bg-white/2 rounded-2xl p-2 border border-white/5 space-y-3">
                               {column.tasks.map((task) => (
                                   <div key={task.id} className="bg-dashboard-card-bg/60 border border-white/5 p-4 rounded-xl shadow-sm hover:border-brand/30 hover:shadow-lg transition-all cursor-grab group relative overflow-hidden">
                                       {/* Hover Effect */}
                                       <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                       
                                       {task.image && (
                                           <div className="mb-3 rounded-lg overflow-hidden h-32 relative">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                               <img src={task.image} alt="Task cover" className="w-full h-full object-cover" />
                                           </div>
                                       )}

                                       <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                                                    {task.tag}
                                                </span>
                                                <button className="text-neutral-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal size={14} />
                                                </button>
                                            </div>
                                            
                                            <h4 className="text-sm font-medium text-white leading-snug mb-3">
                                                {task.title}
                                            </h4>

                                            <div className="flex items-center justify-between">
                                                <div className="flex -space-x-1.5">
                                                    {task.members.map((m) => (
                                                        <div key={m} className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[8px] text-white">
                                                            {m === 1 ? 'RG' : m === 2 ? 'SC' : 'MJ'}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-neutral-600">
                                                    <List size={12} />
                                                    <span>0/3</span>
                                                </div>
                                            </div>
                                       </div>
                                   </div>
                               ))}
                               <button className="w-full py-2 flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-dashed border-transparent hover:border-white/10 opacity-70 hover:opacity-100">
                                   <Plus size={16} />
                                   Add Task
                               </button>
                           </div>
                       </div>
                   ))}
               </div>
           )}
           {activeTab !== 'board' && (
               <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
                   <Layout size={48} className="mb-4 opacity-20" />
                   <p>This view is under development.</p>
               </div>
           )}
       </div>
    </div>
  );
}
