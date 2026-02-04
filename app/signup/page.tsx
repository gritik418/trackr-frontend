'use client';

import { SignupDto } from '@/types/auth/signup.interface';
import { BarChart3, CheckCircle2, ChevronRight, Eye, EyeOff, Lock, Mail, ShieldCheck, User, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';


type SignupErrors = Partial<SignupDto>

export default function SignupPage() {
  const [formData, setFormData] = useState<SignupDto>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<SignupErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrors({});
    setIsLoading(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full flex bg-bg-dark-0 text-white selection:bg-indigo-500/30">
      
      {/* LEFT COLUMN: VISUAL / CONTEXT */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/5 bg-bg-dark-1">
        
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
           <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[60px] animate-bounce duration-10000"></div>
        </div>

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-4">
           <Image src="/logo.png" alt="Trackr" width={48} height={48} className="rounded-xl shadow-2xl shadow-indigo-500/20" />
           <span className="text-2xl font-bold tracking-tighter">Trackr.</span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-indigo-400 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Join the beta
          </div>
          
          <h1 className="text-5xl font-medium tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Start shipping <br/>
            in minutes.
          </h1>
          
          <div className="space-y-6">
            {[
              { title: "Workflow Automation", desc: "Automate repetitive tasks with ease.", icon: Zap },
              { title: "Deep Insights", desc: "Real-time analytics for your projects.", icon: BarChart3 },
              { title: "Enterprise Security", desc: "Proper encryption and access control.", icon: ShieldCheck }
            ].map(({ title, desc, icon: Icon }, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-default">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <Icon size={20} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">{title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-12">
          <p className="text-sm text-neutral-500 mb-4 font-mono uppercase tracking-widest opacity-60">© 2026 Trackr Inc.</p>
        </div>
      </div>

      {/* RIGHT COLUMN: SIGNUP FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-bg-dark-0 relative overflow-y-auto">
        <div className="w-full max-w-[400px] z-10 py-10">
          
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">Create account</h2>
            <p className="text-neutral-500 font-medium">
              Start managing your projects efficiently.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className={`transition-all duration-200 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Full Name
              </label>
              <div className={`relative group rounded-xl transition-all duration-300 ${focusedField === 'name' ? 'p-px bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite]' : 'p-px bg-white/10 hover:bg-white/20'}`}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'name' ? 'text-indigo-400' : 'text-neutral-600'}`} size={18} />
                </div>
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.name}</p>}
            </div>

            {/* Username */}
            <div className={`transition-all duration-200 ${focusedField === 'username' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Username
              </label>
              <div className={`relative group rounded-xl transition-all duration-300 ${focusedField === 'username' ? 'p-px bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite]' : 'p-px bg-white/10 hover:bg-white/20'}`}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors font-mono font-bold ${focusedField === 'username' ? 'text-indigo-400' : 'text-neutral-600'}`}>@</span>
                </div>
              </div>
              {errors.username && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className={`transition-all duration-200 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Email Address
              </label>
              <div className={`relative group rounded-xl transition-all duration-300 ${focusedField === 'email' ? 'p-px bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite]' : 'p-px bg-white/10 hover:bg-white/20'}`}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'text-indigo-400' : 'text-neutral-600'}`} size={18} />
                </div>
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className={`transition-all duration-200 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Password
              </label>
              <div className={`relative group rounded-xl transition-all duration-300 ${focusedField === 'password' ? 'p-px bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite]' : 'p-px bg-white/10 hover:bg-white/20'}`}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'password' ? 'text-indigo-400' : 'text-neutral-600'}`} size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-indigo-400 transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className={`transition-all duration-200 ${focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Confirm Password
              </label>
              <div className={`relative group rounded-xl transition-all duration-300 ${focusedField === 'confirmPassword' ? 'p-px bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-size-[200%_100%] animate-[shimmer_2s_linear_infinite]' : 'p-px bg-white/10 hover:bg-white/20'}`}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <CheckCircle2 className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'confirmPassword' ? 'text-indigo-400' : 'text-neutral-600'}`} size={18} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-indigo-400 transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group cursor-pointer relative overflow-hidden rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-[0.98] outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-bg-dark-0 mt-4"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent z-10" />
              
              <div className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </div>
            </button>
          </form>
          
          <p className="text-center font-semibold text-sm text-neutral-500 mt-10">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
