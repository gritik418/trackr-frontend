'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Building2, 
  Globe, 
  Link as LinkIcon, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  Layout,
  Type
} from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '@/components/ui/Logo';
import { CreateOrganizationDto } from '@/types/organization/organization.interface';
import createOrganizationSchema from '@/lib/validations/organization/create-organization.schema';

export default function CreateOrgPage() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrganizationDto>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      slug: '',
      websiteUrl: '',
      logoUrl: '',
      description: '',
    },
  });

  const name = watch('name');


useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [name, setValue]);

  const onSubmit = async (data: CreateOrganizationDto) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden bg-bg-dark-0 font-sans selection:bg-brand/30">
      
      {/* Left Panel: Content & Context (Hidden on mobile) */}
      <div className="hidden lg:flex w-5/12 bg-bg-dark-1 border-r border-white/5 relative flex-col p-12 justify-between overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-linear(circle_at_top_right,var(--tw-linear-stops))] from-white/5 via-bg-dark-1 to-bg-dark-1 opacity-100 pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <Logo size={40} />
        </div>

        <div className="relative z-10 max-w-md">
           <div className="mb-8 p-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-secondary backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand"></span>
              Organization Setup
            </div>
          <h2 className="text-4xl font-bold mb-6 text-white tracking-tight leading-tight">
            Create a home for your <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-brand-secondary">team's best work.</span>
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-10">
            Establish your organization to manage dedicated workspaces, members, and billing in one centralized hub.
          </p>
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest opacity-50">Included Features</h3>
            <ul className="grid gap-4">
              {[
                { title: "Centralized Billing", desc: "Manage subscriptions in one place" },
                { title: "Role-Based Access", desc: "Granular permissions for every member" },
                { title: "Unified Audit Logs", desc: "Track activity across all workspaces" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center group-hover:bg-brand/20 group-hover:scale-110 transition-all duration-300">
                    <CheckCircle2 className="text-brand w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-white font-medium text-sm">{item.title}</span>
                    <span className="block text-neutral-500 text-xs mt-0.5">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/5">
          <div className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Trackr Inc.
          </div>
           <div className="flex gap-4 text-xs text-neutral-500">
             <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms</Link>
           </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-6 lg:p-24 relative overflow-y-auto">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-full h-[500px] bg-linear-to-b from-brand/5 to-transparent opacity-20 pointer-events-none"></div>

        <div className="w-full max-w-lg space-y-10 relative z-10">
          
          <div className="lg:hidden text-center mb-10">
            <Logo size={40} className="mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white tracking-tight">Create Organization</h1>
            <p className="text-neutral-400 mt-2">Get started by setting up your organization profile.</p>
          </div>

          <div className="hidden lg:block mb-8">
             <h1 className="text-2xl font-bold text-white mb-2">Configure Profile</h1>
             <p className="text-neutral-500">Enter your organization details below.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-6">
               {/* Organization Name */}
              <div className="group space-y-2">

                 <div className="flex items-end justify-between">
                   <label htmlFor="name" className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1 group-focus-within:text-brand transition-colors">
                    Organization Name
                  </label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full">
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none group-focus-within:text-brand transition-colors">
                    <Building2 size={18} />
                  </div>
                  <input
                    {...register('name')}
                    id="name"
                    type="text"
                    placeholder="e.g. Acme Corp"
                    className={clsx(
                      "w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-all duration-300",
                      errors.name 
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-red-500/5" 
                        : "border-white/5 hover:border-white/10 focus:border-brand/50 focus:ring-brand/50 focus:bg-brand/5"
                    )}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-400 flex items-center gap-1.5 ml-1 animate-slide-up">
                    <AlertCircle size={12} /> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div className="group space-y-2">
                <div className="flex items-end justify-between">
                   <label htmlFor="slug" className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1 group-focus-within:text-brand transition-colors">
                    Organization URL
                  </label>
                  <span className="text-[10px] text-neutral-600 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                    Unique Identifier
                  </span>
                </div>
                
                <div className={clsx(
                  "flex items-center relative px-4 py-4 bg-white/5 border rounded-2xl text-neutral-500 transition-all duration-300",
                  errors.slug
                     ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/20 bg-red-500/5"
                     : "border-white/5 hover:border-white/10 focus-within:border-brand/50 focus-within:ring-1 focus-within:ring-brand/50 focus-within:bg-brand/5"
                )}>
                     <label htmlFor="slug" className="absolute border border-red-400 w-full top-0 left-0 opacity-0 cursor-text h-full">
                    Logo URL
                  </label>
                  <Layout size={18} className="mr-3 text-neutral-500 group-focus-within:text-brand transition-colors" />
                  <span className="mr-0.5 text-neutral-500 select-none font-mono text-sm">trackr.app/org/</span>
                  <input
                    {...register('slug')}
                    id="slug"
                    type="text"
                    placeholder="acme-corp"
                    className="bg-transparent text-white placeholder:text-neutral-600 focus:outline-none w-full border-none p-0 focus:ring-0 font-mono text-sm"
                  />
                </div>
                 {errors.slug && (
                  <p className="text-xs text-red-400 flex items-center gap-1.5 ml-1 animate-slide-up">
                    <AlertCircle size={12} /> {errors.slug.message}
                  </p>
                )}
              </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Website URL */}
                <div className="group space-y-2">
                 <div className="flex items-end justify-between">
                   <label htmlFor="websiteUrl" className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1 group-focus-within:text-brand transition-colors">
                    Website
                  </label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full">
                  </span>
                </div>

                  <div className="relative">
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none group-focus-within:text-brand transition-colors">
                        <Globe size={18} />
                     </div>
                     <input
                      {...register('websiteUrl')}
                      id="websiteUrl"
                      type="url"
                      placeholder="acme.com"
                       className={clsx(
                        "w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-all duration-300",
                         errors.websiteUrl
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/5 hover:border-white/10 focus:border-brand/50 focus:ring-brand/50 focus:bg-brand/5"
                      )}
                    />
                  </div>
                   {errors.websiteUrl && (
                    <p className="text-xs text-red-400 flex items-center gap-1.5 ml-1 animate-slide-up">
                      <AlertCircle size={12} /> {errors.websiteUrl.message}
                    </p>
                  )}
                </div>

                 {/* Logo URL */}
                <div className="group space-y-2">
                     <div className="flex items-end justify-between">
                   <label htmlFor="logoUrl" className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1 group-focus-within:text-brand transition-colors">
                    Logo URL
                  </label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full">
                  </span>
                </div>

                  <div className="relative">
                     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none group-focus-within:text-brand transition-colors">
                        <LinkIcon size={18} />
                     </div>
                     <input
                      {...register('logoUrl')}
                      id="logoUrl"
                      type="url"
                      placeholder="https://..."
                       className={clsx(
                        "w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-all duration-300",
                         errors.logoUrl
                          ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                          : "border-white/5 hover:border-white/10 focus:border-brand/50 focus:ring-brand/50 focus:bg-brand/5"
                      )}
                    />
                  </div>
                   {errors.logoUrl && (
                    <p className="text-xs text-red-400 flex items-center gap-1.5 ml-1 animate-slide-up">
                      <AlertCircle size={12} /> {errors.logoUrl.message}
                    </p>
                  )}
                </div>
             </div>

             {/* Description */}
            <div className="group space-y-2">
                <div className="flex items-end justify-between">
                   <label htmlFor="description" className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1 group-focus-within:text-brand transition-colors">
                    Description
                  </label>
                  <span className="text-[10px] px-2 py-0.5 rounded-full">
                  </span>
                </div>

              <div className="relative">
                 <div className="absolute left-4 top-4 text-neutral-500 pointer-events-none group-focus-within:text-brand transition-colors">
                    <Type size={18} />
                 </div>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={3}
                  placeholder="Brief description of your organization..."
                  className={clsx(
                    "w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-all duration-300 resize-none",
                    errors.description
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-white/5 hover:border-white/10 focus:border-brand/50 focus:ring-brand/50 focus:bg-brand/5"
                  )}
                />
              </div>
               {errors.description && (
                <p className="text-xs text-red-400 flex items-center gap-1.5 ml-1 animate-slide-up">
                  <AlertCircle size={12} /> {errors.description.message}
                </p>
              )}
            </div>

            <div className="pt-6 flex flex-col-reverse md:flex-row gap-4">
              <Link href="/dashboard" className="flex-1 py-4 px-6 bg-white/5 border border-white/5 text-neutral-400 font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all text-center text-sm">
                Cancel
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-[2] py-4 px-6 bg-linear-to-r from-brand to-brand-hover text-bg-dark-0 font-bold rounded-2xl shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Configuring Organization...' : (
                  <>
                    Create Organization
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
