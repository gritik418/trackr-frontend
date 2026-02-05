'use client';

import {
  Building2,
  CreditCard,
  Layout,
  ScrollText,
  Settings,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoChevronBackOutline } from 'react-icons/io5';

const getNavigation = (slug: string) => [
  { name: 'Overview', href: `/org/${slug}`, icon: Layout },
  { name: 'Workspaces', href: `/org/${slug}/workspaces`, icon: Building2 },
  { name: 'Members', href: `/org/${slug}/members`, icon: Users },
  { name: 'Billing', href: `/org/${slug}/billing`, icon: CreditCard },
  { name: 'Audit Logs', href: `/org/${slug}/logs`, icon: ScrollText },
  { name: 'Settings', href: `/org/${slug}/settings`, icon: Settings },
];

export function OrgSidebar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const navigation = getNavigation(slug);

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-org-sidebar-bg border-r border-org-border hidden lg:block">
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
        <nav className="flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-brand/10 text-brand border border-brand/20' 
                    : 'text-org-item-text hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-brand' : 'group-hover:text-white transition-colors'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 mt-auto border-t border-org-border space-y-2">
           <Link href="/org" className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
            <IoChevronBackOutline size={18}  />
            Return to Control Deck
          </Link>
        </div>
      </div>
    </aside>
  );
}
