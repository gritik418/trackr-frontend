'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings,
  Users,
  Building2,
  CreditCard,
  LogOut,
  ShieldAlert
} from 'lucide-react';

const getNavigation = (slug: string) => [
  { name: 'General Settings', href: `/org/${slug}/settings`, icon: Settings },
  { name: 'Members', href: `/org/${slug}/members`, icon: Users },
  { name: 'Workspaces', href: `/org/${slug}/workspaces`, icon: Building2 },
  { name: 'Billing', href: `/org/${slug}/billing`, icon: CreditCard },
  { name: 'Danger Zone', href: `/org/${slug}/danger`, icon: ShieldAlert },
];

export function OrgSidebar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const navigation = getNavigation(slug);

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-bg-dark-1 border-r border-white/5 hidden lg:block">
      <div className="flex flex-col h-full">
        {/* Logo & Org Name */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center border border-brand/20">
              <Building2 className="text-brand" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white">Acme Corp</span>
              <span className="text-xs text-neutral-500">Organization Admin</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-brand/10 text-brand border border-brand/20' 
                    : 'text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-brand' : 'group-hover:text-white transition-colors'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 mt-auto border-t border-white/5 space-y-2">
           <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={20} className="rotate-180" />
            Return to Workspace
          </Link>
        </div>
      </div>
    </aside>
  );
}
