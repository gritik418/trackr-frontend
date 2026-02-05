'use client';

import {
    Calendar,
    ChevronDown,
    Download,
    Filter,
    Search,
    ShieldAlert
} from 'lucide-react';

export default function OrgLogsPage() {
  const logs = [
    {
      id: 'log_1',
      user: { name: 'Ritik Gupta', email: 'ritik@trackr.so', avatar: 'https://github.com/ritikgupta.png' },
      action: 'Updated billing settings',
      resource: 'Business Plan',
      date: 'Feb 5, 2026 10:23 AM',
      ip: '192.168.1.1'
    },
    {
      id: 'log_2',
      user: { name: 'Sarah Chen', email: 'sarah@trackr.so', avatar: null },
      action: 'Invited new member',
      resource: 'david@design.co',
      date: 'Feb 4, 2026 2:15 PM',
      ip: '10.0.0.42'
    },
    {
      id: 'log_3',
      user: { name: 'Ritik Gupta', email: 'ritik@trackr.so', avatar: 'https://github.com/ritikgupta.png' },
      action: 'Created workspace',
      resource: 'Marketing',
      date: 'Feb 4, 2026 9:30 AM',
      ip: '192.168.1.1'
    },
    {
      id: 'log_4',
      user: { name: 'System', email: 'system@trackr.so', avatar: null },
      action: 'Automatic backup',
      resource: 'Database Snapshot',
      date: 'Feb 4, 2026 12:00 AM',
      ip: 'Internal'
    },
    {
      id: 'log_5',
      user: { name: 'Mike Ross', email: 'mike@trackr.so', avatar: null },
      action: 'Deleted project',
      resource: 'Q1 Campaign',
      date: 'Feb 3, 2026 4:45 PM',
      ip: '172.16.0.5'
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
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">Audit Logs</h2>
        <p className="text-org-item-text mt-2 text-lg font-light">Monitor activity and security events across your organization.</p>
      </div>

      <div className="relative z-10 space-y-4">
         
         {/* Filters Toolbar */}
         <div className="p-1.5 bg-white/5 border border-white/5 rounded-2xl flex flex-col md:flex-row gap-2">
            
            {/* Search */}
            <div className="relative flex-1">
               <Search className="absolute left-3 top-2.5 text-neutral-500" size={16} />
               <input 
                  type="text" 
                  placeholder="Search logs..." 
                  className="w-full pl-9 pr-4 py-2 bg-transparent rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-all"
               />
            </div>

            <div className="h-full w-px bg-white/10 hidden md:block my-1" />

            {/* Filter Actions */}
            <div className="flex items-center gap-2 px-1">
                <button className="px-3 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <Calendar size={16} />
                    <span>Date Range</span>
                    <ChevronDown size={14} className="opacity-50" />
                </button>
                <button className="px-3 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <Filter size={16} />
                    <span>Event Type</span>
                    <ChevronDown size={14} className="opacity-50" />
                </button>
                <button className="px-3 py-2 flex items-center gap-2 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors ml-auto md:ml-0">
                    <Download size={16} />
                    <span>Export</span>
                </button>
            </div>
         </div>

         {/* Logs Table */}
         <div className="rounded-3xl border border-white/5 bg-org-card-bg/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Resource</th>
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">IP Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {logs.map((log) => (
                            <tr key={log.id} className="group hover:bg-white/2 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 text-xs font-bold overflow-hidden shrink-0">
                                            {log.user.avatar ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={log.user.avatar} alt={log.user.name} className="w-full h-full object-cover" />
                                            ) : log.user.name === 'System' ? (
                                                <ShieldAlert size={14} />
                                            ) : (
                                                getInitials(log.user.name)
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-white">{log.user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-neutral-300">{log.action}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <code className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-brand/80">
                                        {log.resource}
                                    </code>
                                </td>
                                <td className="px-6 py-4 text-right text-sm text-neutral-500 font-mono">
                                    {log.date}
                                </td>
                                <td className="px-6 py-4 text-right text-sm text-neutral-600 font-mono">
                                    {log.ip}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-white/5 bg-white/2 flex justify-between items-center text-xs text-neutral-500">
                <span>Showing 5 of 248 events</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 disabled:opacity-50 transition-colors">Previous</button>
                    <button className="px-3 py-1.5 rounded-lg border border-white/5 hover:bg-white/5 disabled:opacity-50 transition-colors">Next</button>
                </div>
            </div>
         </div>

      </div>
    </div>
  );
}
