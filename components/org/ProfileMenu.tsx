'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/providers/AuthProvider';
import { logout } from '@/features/auth/api';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '??';
  };

  const handleLogout = async () => {
    try {
      await logout();
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-white/5 transition-colors group outline-none"
      >
        <div className="w-9 h-9 rounded-full bg-linear-to-tr from-brand to-brand-secondary p-[2px] ring-2 ring-transparent group-hover:ring-brand/20 transition-all">
          <div className="w-full h-full rounded-full bg-bg-dark-1 flex items-center justify-center overflow-hidden">
             <span className="font-bold text-xs text-white tracking-tighter">{getInitials(user?.name)}</span>
          </div>
        </div>
        
        <div className="text-left hidden lg:block">
            <p className="text-sm font-semibold text-white leading-none">{user?.name}</p>
            <p className="text-[11px] text-neutral-500 leading-none mt-1 truncate max-w-[120px]">{user?.email}</p>
        </div>

        <ChevronDown 
          size={14} 
          className={cn(
            "text-neutral-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[#0A0A0B] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
           
           {/* Section 1: User Info (Mobile only) */}
           <div className="px-4 py-3 border-b border-white/5 lg:hidden">
              <p className="text-sm font-semibold text-white">{user?.name}</p>
              <p className="text-xs text-neutral-400">{user?.email}</p>
           </div>

           {/* Section 2: Account Links */}
           <div className="p-1.5">
              <Link 
                href="/account"
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors font-medium group"
              >
                  <User size={16} className="text-neutral-500 group-hover:text-brand-cyan transition-colors" />
                  Profile
              </Link>
              <Link 
                href="/account/settings"
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors font-medium group"
              >
                  <Settings size={16} className="text-neutral-500 group-hover:text-brand-cyan transition-colors" />
                  Settings
              </Link>
              <Link 
                href="/account/billing"
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors font-medium group"
              >
                  <CreditCard size={16} className="text-neutral-500 group-hover:text-brand-cyan transition-colors" />
                  Billing
              </Link>
           </div>

           <div className="my-1 border-t border-white/5 mx-2" />

            {/* Section 3: Logout */}
            <div className="p-1.5">
               <button 
                 onClick={handleLogout}
                 className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors font-medium group"
               >
                   <LogOut size={16} className="text-red-500/70 group-hover:text-red-500 transition-colors" />
                   Log Out
               </button>
            </div>
        </div>
      )}
    </div>
  );
}
