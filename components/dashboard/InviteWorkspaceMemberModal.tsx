'use client';

import { Check, ChevronDown, Mail, Shield, X, Eye, Edit3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface InviteWorkspaceMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type WorkspaceRole = 'Viewer' | 'Editor' | 'Workspace Admin';

export function InviteWorkspaceMemberModal({ isOpen, onClose }: InviteWorkspaceMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<WorkspaceRole>('Viewer');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setEmail('');
      setRole('Viewer');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-dashboard-card-bg border border-dashboard-border rounded-3xl shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-300 transform"
      >
        {/* Abstract Background - Different color scheme for Workspace */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/5 blur-[60px] rounded-full" />
        </div>

        <div className="relative z-10 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Invite to Workspace</h2>
                    <p className="text-neutral-500 text-sm mt-1">Add collaborators to this specific workspace.</p>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">
                        Email Address
                    </label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-brand transition-colors pointer-events-none">
                            <Mail size={18} />
                        </div>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="colleague@example.com" 
                            className="w-full pl-11 pr-4 py-3.5 bg-dashboard-item-bg border border-dashboard-border rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/50 focus:bg-dashboard-card-bg transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2 relative" ref={dropdownRef}>
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">
                        Workspace Role
                    </label>
                    <button
                        type="button"
                        onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)} 
                        className="w-full flex items-center justify-between px-4 py-3.5 bg-dashboard-item-bg border border-dashboard-border rounded-xl text-white hover:bg-dashboard-card-bg transition-all outline-none focus:border-brand/50 text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                                {role === 'Workspace Admin' && <Shield size={16} />}
                                {role === 'Editor' && <Edit3 size={16} />}
                                {role === 'Viewer' && <Eye size={16} />}
                            </div>
                            <div>
                                <span className="block font-medium text-sm">{role}</span>
                                <span className="block text-xs text-neutral-500">
                                    {role === 'Workspace Admin' ? 'Can manage workspace settings & members.' : 
                                     role === 'Editor' ? 'Can create and edit projects.' : 
                                     'Read-only access to projects.'}
                                </span>
                            </div>
                        </div>
                        <ChevronDown size={18} className={`text-neutral-500 transition-transform ${isRoleDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isRoleDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 p-1.5 bg-dashboard-sidebar-bg border border-dashboard-border rounded-xl shadow-xl shadow-black/50 z-20 animate-in fade-in zoom-in-95 duration-200">
                            
                            <button
                                type="button" 
                                onClick={() => { setRole('Viewer'); setIsRoleDropdownOpen(false); }}
                                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                        <Eye size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Viewer</div>
                                        <div className="text-xs text-neutral-500">Read-only access.</div>
                                    </div>
                                </div>
                                {role === 'Viewer' && <Check size={16} className="text-emerald-400" />}
                            </button>

                            <button
                                type="button" 
                                onClick={() => { setRole('Editor'); setIsRoleDropdownOpen(false); }}
                                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                                        <Edit3 size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Editor</div>
                                        <div className="text-xs text-neutral-500">Can create projects.</div>
                                    </div>
                                </div>
                                {role === 'Editor' && <Check size={16} className="text-blue-400" />}
                            </button>

                            <button 
                                type="button"
                                onClick={() => { setRole('Workspace Admin'); setIsRoleDropdownOpen(false); }}
                                className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 text-brand flex items-center justify-center">
                                        <Shield size={16} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-white">Workspace Admin</div>
                                        <div className="text-xs text-neutral-500">Full workspace access.</div>
                                    </div>
                                </div>
                                {role === 'Workspace Admin' && <Check size={16} className="text-brand" />}
                            </button>
                        </div>
                    )}
                </div>

                <div className="pt-2">
                    <button 
                        type="submit"
                        disabled={isSending || !email}
                        className="w-full py-3.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {isSending ? (
                            <>
                                <span className="w-4 h-4 rounded-full border-2 border-bg-dark-0/30 border-t-bg-dark-0 animate-spin" />
                                Sending Invite...
                            </>
                        ) : (
                            <>
                                Send Invitation
                                <Mail size={18} className="opacity-60" />
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
}
