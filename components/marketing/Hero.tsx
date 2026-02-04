'use client';

import Link from 'next/link';
import { ArrowRight, Shield, Zap, Globe, Network } from 'lucide-react';
import { APP_CONFIG } from '@/constants/app';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden perspective-[2000px]">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border text-brand text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in animate-slide-up hover:bg-white/10 border-brand/40 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            v{APP_CONFIG.VERSION} is now live
          </div>

          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] animate-fade-in animate-slide-up [animation-delay:100ms] drop-shadow-2xl">
            <span className="bg-linear-to-b from-white via-white to-white/50 bg-clip-text text-transparent">Track </span>
            <span className="bg-linear-to-r from-brand via-cyan-400 to-indigo-500 bg-clip-text text-transparent italic pr-2">Everything.</span>
            <br className="hidden md:block" />
            <span className="bg-linear-to-b from-white via-white to-white/50 bg-clip-text text-transparent">Deliver </span>
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-brand bg-clip-text text-transparent italic">Anything.</span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-slide-up [animation-delay:200ms] font-medium text-balance">
            The workspace-first task engine built for teams who value speed, precision, and absolute clarity in every workflow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in animate-slide-up [animation-delay:300ms]">
            <Link 
              href="/signup" 
              className="group relative w-full sm:w-auto px-10 py-5 bg-brand text-bg-dark-0 font-bold rounded-2xl text-lg shadow-[0_0_40px_var(--color-brand)]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative">Start for Free</span>
              <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
            </Link>
            
          </div>
        </div>

        {/* 3D Dashboard Preview */}
        <div className="relative mx-auto w-full max-w-6xl animate-fade-in [animation-delay:500ms] group perspective-[2000px]">
           <div className="relative rounded-3xl bg-bg-dark-1 border border-white/10 p-2 shadow-2xl transform-gpu transition-transform duration-700 ease-out hover:rotate-x-2 md:rotate-x-12 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(var(--color-brand-rgb),0.1)]">
              {/* Screen Glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-brand/20 to-purple-600/20 rounded-4xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Mock UI Container */}
              <div className="relative rounded-2xl bg-bg-dark-0 overflow-hidden aspect-16/10 border border-white/5">
                 {/* Header Mock */}
                 <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-bg-dark-1/50">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <div className="h-6 w-32 bg-white/5 rounded-md"></div>
                 </div>
                 
                 {/* Content Mock */}
                 <div className="p-6 grid grid-cols-4 gap-6 h-full">
                    {/* Sidebar */}
                    <div className="col-span-1 border-r border-white/5 pr-6 space-y-4">
                       <div className="h-8 w-full bg-brand/10 rounded-lg border border-brand/20"></div>
                       <div className="h-4 w-3/4 bg-white/5 rounded-md"></div>
                       <div className="h-4 w-1/2 bg-white/5 rounded-md"></div>
                       <div className="h-4 w-2/3 bg-white/5 rounded-md"></div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-span-3 space-y-6">
                       <div className="flex justify-between">
                          <div className="h-8 w-48 bg-white/5 rounded-lg"></div>
                          <div className="flex gap-2">
                             <div className="h-8 w-8 rounded-full bg-white/5"></div>
                             <div className="h-8 w-8 rounded-full bg-brand/20"></div>
                          </div>
                       </div>
                       
                       {/* Kanban Board Mock */}
                       <div className="grid grid-cols-3 gap-4 h-64">
                          <div className="bg-bg-dark-1 rounded-xl p-4 border border-white/5 space-y-3">
                             <div className="h-2 w-16 bg-white/10 rounded-full mb-4"></div>
                             <div className="h-24 bg-white/5 rounded-lg border border-white/5 p-3">
                                <div className="h-3 w-12 bg-green-500/20 rounded-full mb-2"></div>
                                <div className="h-2 w-full bg-white/10 rounded-full mb-2"></div>
                                <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                             </div>
                             <div className="h-20 bg-white/5 rounded-lg border border-white/5"></div>
                          </div>
                          <div className="bg-bg-dark-1 rounded-xl p-4 border border-white/5 space-y-3">
                             <div className="h-2 w-16 bg-white/10 rounded-full mb-4"></div>
                             <div className="h-32 bg-white/5 rounded-lg border border-white/5 p-3 relative overflow-hidden group/card">
                                 <div className="absolute inset-0 bg-brand/5"></div>
                                 <div className="h-3 w-12 bg-brand/20 rounded-full mb-2"></div>
                                 <div className="h-2 w-full bg-brand/10 rounded-full mb-2"></div>
                                 <div className="h-2 w-2/3 bg-brand/10 rounded-full"></div>
                             </div>
                          </div>
                          <div className="bg-bg-dark-1 rounded-xl p-4 border border-white/5 space-y-3">
                             <div className="h-2 w-16 bg-white/10 rounded-full mb-4"></div>
                             <div className="h-24 bg-white/5 rounded-lg border border-white/5"></div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Social Proof / Badges */}
        <div className="mt-24 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale animate-fade-in [animation-delay:600ms]">
          <div className="flex items-center justify-center gap-2 group cursor-default hover:opacity-100 transition-opacity">
            <Shield className="text-white" size={24} />
            <span className="font-bold text-lg tracking-tighter">TRUSTED SECURE</span>
          </div>
          <div className="flex items-center justify-center gap-2 group cursor-default hover:opacity-100 transition-opacity">
            <Zap className="text-white" size={24} />
            <span className="font-bold text-lg tracking-tighter">ULTRA FAST</span>
          </div>
          <div className="flex items-center justify-center gap-2 group cursor-default hover:opacity-100 transition-opacity">
            <Globe className="text-white" size={24} />
            <span className="font-bold text-lg tracking-tighter">GLOBAL OPS</span>
          </div>
          <div className="flex items-center justify-center gap-2 group cursor-default hover:opacity-100 transition-opacity">
            <Network className="text-white" size={24} />
            <span className="font-bold text-lg tracking-tighter text-white">HIERARCHICAL OPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
