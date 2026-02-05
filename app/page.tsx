'use client';

import { Footer } from '@/components/common/Footer';
import { Navbar } from '@/components/common/Navbar';
import { Features } from '@/components/marketing/Features';
import { Hero } from '@/components/marketing/Hero';
import { resolveRedirectPath } from '@/lib/utils';
import { useUser } from '@/providers/AuthProvider';
import { ArrowRight, Globe, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const {isAuthenticated,isLoading,user} = useUser();
  const router = useRouter();
  
    const handleRedirect = () => {
      if(user){
        router.push(resolveRedirectPath(user));
      }
    }

  return (
    <div className="min-h-screen bg-bg-dark-0 text-white selection:bg-brand/30 overflow-x-hidden animate-fade-in">
      <Navbar />
      
      <main>
        <Hero />

        {/* Bento Grid Proof Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
             <div className="mb-20 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
                Engineered for <span className="text-brand">scale</span>.
              </h2>
              <p className="text-xl text-neutral-400 font-medium leading-relaxed">
                Trackr is built on a foundation of performance and security, designed to handle the most demanding workflows with ease.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
              {/* Card 1: Enterprise Grade (Large span) */}
              <div className="md:col-span-2 relative group overflow-hidden rounded-[2.5rem] bg-bg-dark-1 border border-white/5 p-10 flex flex-col justify-end hover:border-white/10 transition-colors">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-brand/20 transition-colors duration-500"></div>
                
                <div className="relative z-10">
                   <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Shield className="text-white" size={32} />
                   </div>
                   <h3 className="text-3xl font-bold mb-4">Enterprise Grade Security</h3>
                   <p className="text-neutral-400 font-medium text-lg max-w-lg">
                      Permissions enforced at the database level. Granular access controls ensure your data stays secure while your team moves fast.
                   </p>
                </div>
              </div>

               {/* Card 2: Aurora Aesthetic (Vertical) */}
               <div className="md:col-span-1 relative group overflow-hidden rounded-[2.5rem] bg-bg-dark-1 border border-white/5 p-10 flex flex-col justify-between hover:border-white/10 transition-colors">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-bg-dark-0/50 to-transparent z-10"></div>
                  
                  <div className="relative z-10 flex justify-between items-start">
                     <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                        <Sparkles className="text-purple-400" size={28} />
                     </div>
                  </div>

                  <div className="relative z-20">
                    <h3 className="text-2xl font-bold mb-3">Aurora Design</h3>
                    <p className="text-neutral-400 font-medium text-sm">
                      A UI that feels like magic. Fluid animations and glassmorphism.
                    </p>
                  </div>

                  {/* Visual Element Placeholder */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/20 blur-[50px] animate-pulse rounded-full"></div>
               </div>

                {/* Card 3: Global Network (Regular) */}
               <div className="md:col-span-3 relative group overflow-hidden rounded-[2.5rem] bg-bg-dark-1 border border-white/5 p-12 flex flex-col md:flex-row items-center gap-12 hover:border-white/10 transition-colors">
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/2 to-transparent bg-size-[200%_100%] animate-[shimmer_5s_infinite]"></div>
                  
                  <div className="flex-1 relative z-10 order-2 md:order-1">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-6">
                        Global Edge Network
                     </div>
                     <h3 className="text-3xl md:text-4xl font-bold mb-6">Connect across continents.</h3>
                      <p className="text-neutral-400 font-medium text-lg max-w-xl">
                        A distributed architecture ensures low-latency access for your entire team, no matter where they are located. Real-time updates sync instantly.
                      </p>
                  </div>

                  <div className="flex-1 relative z-10 flex justify-center order-1 md:order-2">
                     <div className="relative w-64 h-64">
                        <div className="absolute inset-0 bg-brand/20 blur-[80px] rounded-full animate-pulse"></div>
                        <Globe className="text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" size={256} strokeWidth={0.5} />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <Features />

        {/* CTA Section */}
        <section className="py-32 relative animate-fade-in [animation-delay:400ms]">
          <div className="absolute inset-0 bg-brand/3 skew-y-3 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
              Ready to ship <span className="italic text-brand">faster?</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-12 font-medium">
              Join thousands of high-performance teams already using Trackr to manage their complex workflows.
            </p>
           {(!isAuthenticated && !isLoading) ? <Link 
              href="/signup" 
              className="inline-flex cursor-pointer items-center gap-3 px-12 py-6 bg-white text-bg-dark-0 font-bold rounded-3xl text-xl hover:bg-brand hover:scale-105 transition-all shadow-2xl"
            >
              Get Started for Free
              <ArrowRight size={24} />
            </Link>: 
            <button onClick={handleRedirect} className="inline-flex cursor-pointer items-center gap-3 px-12 py-6 bg-white text-bg-dark-0 font-bold rounded-3xl text-xl hover:bg-brand hover:scale-105 transition-all shadow-2xl">
              Go to Dashboard
              </button>}
            <p className="mt-8 text-neutral-600 font-bold uppercase tracking-widest text-xs">
  Built for teams • Designed for real workflows
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
