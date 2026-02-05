'use client';

import React from 'react';
import { CreditCard, Construction } from 'lucide-react';

export default function BillingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-brand shadow-2xl">
        <CreditCard size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Billing & Subscription</h2>
        <p className="text-neutral-500 max-w-sm mx-auto">
          Manage your subscription plans and invoices. Our payment integration is currently being finalized.
        </p>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest">
        <Construction size={14} />
        Under Construction
      </div>
    </div>
  );
}
