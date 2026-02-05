'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Building2, 
  Plus, 
  Users, 
  RefreshCcw, 
  Layout, 
  ArrowRight,
  ShieldCheck,
  Rocket
} from 'lucide-react';
import { useUser } from '@/providers/AuthProvider';
import Link from 'next/link';

export default function NoWorkspacesPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  const currentOrg = user?.organizations?.find((o: any) => o.id === slug);
  const isAdmin = currentOrg?.role === 'OWNER' || currentOrg?.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 selection:bg-brand/10">
      <div className="max-w-[540px] w-full animate-in fade-in zoom-in duration-700 slide-in-from-bottom-8">
        
        {/* Main Card */}
        <div className="bg-white rounded-[32px] border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 md:p-14 relative overflow-hidden">
          
          {/* Subtle Accent Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -ml-16 -mb-16 blur-3xl opacity-50" />

          {/* Icon/Illustration Area */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              {/* Animated outer circles */}
              <div className="absolute inset-0 scale-150 animate-pulse bg-brand/5 rounded-full" />
              <div className="absolute inset-0 scale-125 bg-brand/10 rounded-full" />
              
              <div className="relative w-24 h-24 bg-white border border-neutral-100 rounded-[24px] flex items-center justify-center shadow-sm">
                <Building2 size={40} className="text-brand opacity-90" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white border-4 border-white">
                  <Plus size={16} strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
              You’re part of the organization
            </h1>
            <p className="text-neutral-500 text-lg leading-relaxed max-w-sm mx-auto font-medium">
              You haven’t been added to any workspace yet. Once an admin adds you, your work will appear here.
            </p>
          </div>

          {/* Role-Aware Actions */}
          <div className="mt-12 space-y-4">
            {isAdmin ? (
              <div className="space-y-4">
                <button 
                  onClick={() => router.push(`/org/${slug}/workspaces/new`)}
                  className="w-full group relative overflow-hidden flex items-center justify-center gap-2 bg-brand text-white text-base font-bold py-4 px-6 rounded-2xl shadow-xl shadow-brand/20 hover:shadow-brand/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <Plus size={20} strokeWidth={2.5} />
                  <span>Create workspace</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                </button>
                
                <button 
                  onClick={() => router.push(`/org/${slug}/members`)}
                  className="w-full flex items-center justify-center gap-2 bg-white text-neutral-600 border border-neutral-200 text-base font-semibold py-4 px-6 rounded-2xl hover:bg-neutral-50 hover:border-neutral-300 transition-all active:scale-[0.99]"
                >
                  <Users size={18} />
                  <span>Invite members</span>
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center gap-3 p-5 bg-neutral-50 border border-neutral-100 rounded-2xl">
                  <ShieldCheck size={20} className="text-neutral-400 shrink-0" />
                  <p className="text-sm text-neutral-600 font-medium text-left leading-snug">
                    Please ask an admin to add you to a workspace so you can start collaborating.
                  </p>
                </div>
                
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full flex items-center justify-center gap-2 text-brand font-bold py-2 hover:opacity-80 transition-all group"
                >
                  <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span>Refresh status</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer info/link */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Link 
            href="/"
            className="text-neutral-400 text-sm font-medium hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5"
          >
            Return to home
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
