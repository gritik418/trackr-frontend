'use client';

import { InviteWorkspaceMemberModal } from '@/components/dashboard/InviteWorkspaceMemberModal';
import {
  CheckCircle2,
  Clock,
  Mail,
  MoreVertical,
  Search,
  Shield,
  Trash2,
  UserPlus,
  Users
} from 'lucide-react';
import { useState } from 'react';

export default function WorkspaceMembersPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const members = [
    {
      id: '1',
      name: 'Ritik Gupta',
      email: 'ritik@trackr.so',
      role: 'Workspace Admin',
      status: 'active',
      avatar: 'https://github.com/ritikgupta.png',
      joinedAt: 'Jan 2024'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah@trackr.so',
      role: 'Editor',
      status: 'active',
      avatar: null,
      joinedAt: 'Feb 2024'
    },
    {
      id: '3',
      name: 'Mike Ross',
      email: 'mike@trackr.so',
      role: 'Viewer',
      status: 'active',
      avatar: null,
      joinedAt: 'Feb 2024'
    }
  ];

  const invites = [
    {
      id: 'inv_1',
      email: 'david@design.co',
      role: 'Editor',
      sentAt: '2 days ago',
      status: 'pending'
    }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">Workspace Members</h2>
          <p className="text-neutral-400 mt-2 text-lg font-light">Manage access to this workspace.</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
        >
          <UserPlus size={18} strokeWidth={2.5} />
          Invite Member
        </button>
      </div>

      <InviteWorkspaceMemberModal 
        isOpen={isInviteModalOpen} 
        onClose={() => setIsInviteModalOpen(false)} 
      />

       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          <div className="p-5 rounded-2xl bg-dashboard-card-bg/40 border border-white/5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Users size={24} />
             </div>
             <div>
                <p className="text-sm text-neutral-500 font-medium">Total Members</p>
                <p className="text-2xl font-bold text-white">{members.length}</p>
             </div>
          </div>
          <div className="p-5 rounded-2xl bg-dashboard-card-bg/40 border border-white/5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                <CheckCircle2 size={24} />
             </div>
             <div>
                <p className="text-sm text-neutral-500 font-medium">Active Now</p>
                <p className="text-2xl font-bold text-white">2</p>
             </div>
          </div>
          <div className="p-5 rounded-2xl bg-dashboard-card-bg/40 border border-white/5 flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Clock size={24} />
             </div>
             <div>
                <p className="text-sm text-neutral-500 font-medium">Pending Invites</p>
                <p className="text-2xl font-bold text-white">{invites.length}</p>
             </div>
          </div>
       </div>

      {/* Main Content Card */}
      <div className="relative z-10 rounded-3xl bg-dashboard-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 overflow-hidden flex flex-col min-h-[500px]">
         
         {/* Toolbar */}
         <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Tabs */}
            <div className="flex p-1 bg-white/5 rounded-xl self-start">
               <button 
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'active' ? 'bg-white/10 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
               >
                  Active Members
               </button>
               <button 
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'pending' ? 'bg-white/10 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
               >
                  Pending Invites
               </button>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
               <Search className="absolute left-3 top-2.5 text-neutral-500" size={16} />
               <input 
                  type="text" 
                  placeholder="Search members..." 
                  className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/30 focus:bg-white/10 transition-all"
               />
            </div>
         </div>

         {/* List */}
         <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-white/5 bg-white/2">
                     <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">User</th>
                     <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role</th>
                     <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                     <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Joined</th>
                     <th className="px-6 py-4 w-10"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {activeTab === 'active' ? (
                     members.map((member) => (
                        <tr key={member.id} className="group hover:bg-white/2 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold text-sm overflow-hidden shrink-0">
                                    {member.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        getInitials(member.name)
                                    )}
                                 </div>
                                 <div>
                                    <div className="text-sm font-medium text-white group-hover:text-brand transition-colors">{member.name}</div>
                                    <div className="text-xs text-neutral-500">{member.email}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                 member.role === 'Workspace Admin' 
                                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                                    : 'bg-white/5 text-neutral-400 border-white/10'
                              }`}>
                                 {member.role === 'Workspace Admin' && <Shield size={10} />}
                                 {member.role}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                 <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                 Active
                              </span>
                           </td>
                           <td className="px-6 py-4 text-sm text-neutral-500 text-right font-mono">
                              {member.joinedAt}
                           </td>
                           <td className="px-6 py-4 text-right">
                              <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                 <MoreVertical size={16} />
                              </button>
                           </td>
                        </tr>
                     ))
                  ) : (
                     invites.map((invite) => (
                        <tr key={invite.id} className="group hover:bg-white/2 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 shrink-0">
                                    <Mail size={16} />
                                 </div>
                                 <div>
                                    <div className="text-sm font-medium text-white">{invite.email}</div>
                                    <div className="text-xs text-neutral-500">Invitation sent</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-neutral-400 border border-white/10">
                                 {invite.role}
                              </span>
                           </td>
                           <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                 Pending
                              </span>
                           </td>
                           <td className="px-6 py-4 text-sm text-neutral-500 text-right font-mono">
                              {invite.sentAt}
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                                 <button className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Revoke Invite">
                                    <Trash2 size={16} />
                                 </button>
                                 <button className="p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Resend">
                                    <Clock size={16} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
            
            {/* Empty State Helper (Hidden if data exists) */}
            {activeTab === 'pending' && invites.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Mail size={24} className="text-neutral-500" />
                    </div>
                    <h3 className="text-white font-bold mb-1">No pending invites</h3>
                    <p className="text-neutral-500 text-sm">Invite members to collaborate with your team.</p>
                </div>
            )}
         </div>
      </div>
    </div>
  );
}
