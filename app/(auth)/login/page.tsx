'use client';

import { Logo } from '@/components/ui/Logo';
import { APP_CONFIG } from '@/constants';
import { login } from '@/features/auth/api';
import loginSchema from '@/lib/validations/auth/login.schema';
import { LoginDto } from '@/types/auth/login.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, Command, Eye, EyeOff, Layout, Lock, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        identifier: '',
        password: '',
    }
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      await login(data);
      toast.success("Welcome back!");
      router.push('/');
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Failed to login";
        
        if (error.response?.data?.errors) {
             Object.keys(error.response.data.errors).forEach((key) => {
                setError(key as keyof LoginDto, {
                  type: 'server',
                  message: error.response.data.errors[key],
                });
             });
        }
        toast.error(Array.isArray(message) ? message[0] : message);
    }
  };
  
  return (
    <div className="min-h-screen w-full flex bg-bg-dark-0 text-white selection:bg-brand/30">
      
      {/* LEFT COLUMN: VISUAL / CONTEXT */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12 border-r border-white/5 bg-bg-dark-1">
        
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
           <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-brand/5 rounded-full blur-[60px] animate-bounce duration-10000"></div>
        </div>

        {/* Branding */}
        <Logo size={48} />

        {/* Main Content */}
        <div className="relative z-10 max-w-lg mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-brand mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            v{APP_CONFIG.VERSION}
          </div>
          
          <h1 className="text-5xl font-medium tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-white to-white/50">
            Ship products <br/>
            faster than ever.
          </h1>
          
          <div className="space-y-6">
            {[
              { title: "Lightning Fast", desc: "Built for speed with 50ms interactions.", icon: Command },
              { title: "Team Sync", desc: "Real-time updates with zero latency.", icon: Layout },
              { title: "About Our Service", desc: "The complete toolkit for planning, tracking, and shipping software.", icon: Sparkles }
            ].map(({ title, desc, icon: Icon }, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-default">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                  <Icon size={20} className="text-brand group-hover:text-brand/80 transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">{title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof - Removed per user request */}
        <div className="relative z-10 pt-12">
          <p className="text-sm text-neutral-500 mb-4 font-mono uppercase tracking-widest opacity-60">© {APP_CONFIG.YEAR} {APP_CONFIG.NAME}</p>
        </div>
      </div>

      {/* RIGHT COLUMN: LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-bg-dark-0 relative">
        <div className="w-full max-w-[400px] z-10">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-2 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">Welcome back</h2>
            <p className="text-neutral-500 font-medium">
              Enter your credentials to access your workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className={`transition-all duration-200 ${focusedField === 'identifier' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Email or Username
              </label>
              <div className={focusedField === 'identifier' ? 'input-field-focused' : 'input-field-wrapper'}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register('identifier')}
                    type="text"
                    placeholder="Email or username"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    onFocus={() => setFocusedField('identifier')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'identifier' ? 'icon-active' : 'icon-default'}`} size={18} />
                </div>
              </div>
              {errors.identifier && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.identifier.message}</p>}
            </div>

            <div className={`transition-all duration-200 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-brand hover:text-brand/80 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className={focusedField === 'password' ? 'input-field-focused' : 'input-field-wrapper'}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'password' ? 'icon-active' : 'icon-default'}`} size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 icon-default icon-hover transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group cursor-pointer relative overflow-hidden rounded-xl bg-brand px-4 py-3.5 text-sm font-bold text-bg-dark-0 shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98] outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-bg-dark-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent z-10" />
              
              <div className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign in
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
             <div className="h-px flex-1 bg-white/10"></div>
             <span className="text-xs text-neutral-500 uppercase tracking-widest">Or continue with</span>
             <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex cursor-pointer items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all group">
               <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" className="fill-google-blue"/>
                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" className="fill-google-green"/>
                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" className="fill-google-yellow"/>
                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" className="fill-google-red"/>
               </svg>
               <span className="text-sm font-medium text-neutral-300">Google</span>
             </button>
             <button className="flex cursor-pointer items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all group">
               <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               <span className="text-sm font-medium text-neutral-300">GitHub</span>
             </button>
          </div>
          
          <p className="text-center font-semibold text-sm text-neutral-500 mt-10">
            Don&apos;t have an account?{' '}
            <Link href="signup" className="font-semibold text-brand hover:text-brand/80 transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
