'use client';

import { Bell } from 'lucide-react';
import { ProfileMenu } from './ProfileMenu';

export function OrgHeader() {
  return (
    <header className="h-16 border-b border-white/5 bg-bg-dark-1/50 backdrop-blur-xl sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-medium text-neutral-400">Organization Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
          <Bell size={18} />
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}
