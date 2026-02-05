'use client';

import { APP_DOMAIN } from '@/constants/index';
import {
   Building2,
   Lock,
   Mail,
   ShieldAlert,
   Upload
} from 'lucide-react';

export default function OrgSettingsPage() {

  return (
    <div className="space-y-10 flex flex-col flex-1 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
      
      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">Settings</h2>
        <p className="text-org-item-text mt-2 text-lg font-light">Manage your organization details, billing, and member access.</p>
      </div>

      <div className="grid gap-8">
        
        {/* General Information Card */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 pb-2">
              <Building2 size={20} className="text-brand" />
              <h3 className="text-lg font-semibold text-white">General Information</h3>
           </div>
           
           <div className="relative z-10 p-8 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 space-y-8">
              {/* Logo Upload */}
              <div className="flex items-center gap-6">
                 <div className="w-24 h-24 relative rounded-2xl bg-linear-to-br from-brand/20 to-purple-600/20 flex items-center justify-center border border-dashed border-white/10 hover:border-brand/50 transition-colors cursor-pointer group">
                    <span className="text-2xl font-bold text-brand">AC</span>
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition-opacity">
                       <Upload size={24} className="text-white/80" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-white font-medium">Organization Logo</h4>
                    <p className="text-sm text-org-item-text max-w-sm">
                      Recommended size 400x400px. JPG, PNG and GIF allowed.
                    </p>
                    <div className="flex gap-3">
                       <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-transparent hover:border-white/5">
                         Upload
                       </button>
                       <button className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-lg text-sm font-medium transition-colors">
                         Remove
                       </button>
                    </div>
                 </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2 flex flex-col">
                   <label className="text-sm font-semibold text-org-item-text">Organization Name</label>
                   <div className="input-field-wrapper">
                     <input 
                       type="text" 
                       defaultValue="Acme Corp" 
                       className="w-full px-4 py-2.5 bg-org-sidebar-bg rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600"
                     />
                   </div>
                 </div>

                 <div className="space-y-2 flex flex-col">
                   <label htmlFor='slug' className="text-sm font-semibold text-org-item-text">Organization Slug</label>
                   <div className="input-field-wrapper relative flex items-center px-4! bg-org-sidebar-bg rounded-xl">
                     <label htmlFor="slug" className='h-full w-full opacity-0 absolute'></label>
                     <span className="text-neutral-500 text-sm whitespace-nowrap">{APP_DOMAIN}/org/</span>
                     <input 
                     id='slug'
                     name='slug'
                       type="text" 
                       defaultValue="acme-corp" 
                       className="w-full py-2.5 bg-transparent text-white outline-none ml-1 placeholder:text-neutral-600"
                     />
                   </div>
                 </div>

                 <div className="space-y-2 flex flex-col md:col-span-2">
                   <label className="text-sm font-semibold text-org-item-text">Contact Email</label>
                   <div className="input-field-wrapper">
                     <div className="relative">
                        <Mail size={16} className="absolute left-4 top-3.5 text-neutral-500" />
                        <input 
                          type="email" 
                          defaultValue="admin@acmecorp.com" 
                          className="w-full pl-10 pr-4 py-2.5 bg-org-sidebar-bg rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600"
                        />
                     </div>
                   </div>
                   <p className="text-xs text-neutral-500">We'll use this for billing and security alerts.</p>
                 </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-white/5">
                  <button className="px-6 py-2 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all">
                    Save Changes
                  </button>
              </div>
           </div>
        </section>

        {/* Security & Access */}
        {/* <section className="space-y-4">
           <div className="flex items-center gap-2 pb-2 border-b border-org-border/40">
              <Lock size={20} className="text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Security & Access</h3>
           </div>
           
           <div className="relative z-10 p-8 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 shadow-xl shadow-black/10 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h4 className="text-white font-medium">SSO Enforcement</h4>
                    <p className="text-sm text-org-item-text">Require all members to log in with Single Sign-On (Google/Microsoft).</p>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                 </label>
              </div>
              
              <div className="border-t border-org-border/40 my-4" />

              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h4 className="text-white font-medium">Domain Restriction</h4>
                    <p className="text-sm text-org-item-text">Only allow invites to emails from <b>@acmecorp.com</b>.</p>
                 </div>
                 <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                 </label>
              </div>
           </div>
        </section> */}

        {/* Danger Zone */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 pb-2">
              <ShieldAlert size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-red-500">Danger Zone</h3>
           </div>
           
           <div className="p-6 rounded-2xl bg-red-500/2 border border-red-500/10 space-y-6">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <h4 className="text-white font-medium">Delete Organization</h4>
                    <p className="text-sm text-red-200/60">Permanently remove this organization and all its data. This action is irreversible.</p>
                 </div>
                 <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold transition-colors">
                   Delete Organization
                 </button>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
