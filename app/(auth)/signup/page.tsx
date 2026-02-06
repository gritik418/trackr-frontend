'use client';

import { Logo } from '@/components/ui/Logo';
import { APP_CONFIG } from '@/constants';
import { signup } from '@/features/auth/api';
import { useAuth } from '@/features/auth/hooks';
import signupSchema from '@/lib/validations/auth/signup.schema';
import { SignupDto } from '@/types/auth/signup.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { BarChart3, CheckCircle2, ChevronRight, Eye, EyeOff, Lock, Mail, ShieldCheck, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();
  

  const { data: user, isLoading: isAuthLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupDto>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }
  });

  useEffect(() => {
    if (user && !isAuthLoading) {
      router.replace('/');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pending_email');
    if (pendingEmail) {
      router.push('/verify-email');
    }
  }, []);

  const onSubmit = async (data: SignupDto) => {
    try {
       await signup(data);
       localStorage.setItem('pending_email', data.email);
        toast.success("Account created! Please check your email to verify your account.");
        router.push('/verify-email');
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Failed to create account";
        
        if (error.response?.data?.errors) {
             Object.keys(error.response.data.errors).forEach((key) => {
                setError(key as keyof SignupDto, {
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

        {/* Footer */}
        <div className="relative z-10 pt-12">
          <p className="text-sm text-neutral-500 mb-4 font-mono uppercase tracking-widest opacity-60">© {APP_CONFIG.YEAR} {APP_CONFIG.NAME}</p>
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className={`transition-all duration-200 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Full Name
              </label>
              <div className={focusedField === 'name' ? 'input-field-focused' : 'input-field-wrapper'}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'name' ? 'icon-active' : 'icon-default'}`} size={18} />
                </div>
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.name.message}</p>}
            </div>

            {/* Username */}
            <div className={`transition-all duration-200 ${focusedField === 'username' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Username
              </label>
              <div className={focusedField === 'username' ? 'input-field-focused' : 'input-field-wrapper'}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register('username')}
                    type="text"
                    placeholder="johndoe"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors font-mono font-bold ${focusedField === 'username' ? 'icon-active' : 'icon-default'}`}>@</span>
                </div>
              </div>
              {errors.username && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.username.message}</p>}
            </div>

            {/* Email */}
            <div className={`transition-all duration-200 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Email Address
              </label>
              <div className={focusedField === 'email' ? 'input-field-focused' : 'input-field-wrapper'}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'email' ? 'icon-active' : 'icon-default'}`} size={18} />
                </div>
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className={`transition-all duration-200 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Password
              </label>
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

            {/* Confirm Password */}
            <div className={`transition-all duration-200 ${focusedField === 'passwordConfirmation' ? 'scale-[1.02]' : ''}`}>
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-widest ml-1 mb-2 block">
                Confirm Password
              </label>
              <div className={focusedField === 'passwordConfirmation' ? 'input-field-focused' : 'input-field-wrapper'}>
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register('passwordConfirmation')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl"
                    onFocus={() => setFocusedField('passwordConfirmation')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <CheckCircle2 className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'passwordConfirmation' ? 'icon-active' : 'icon-default'}`} size={18} />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 icon-default icon-hover transition-colors focus:outline-none"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {errors.passwordConfirmation && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{errors.passwordConfirmation.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isAuthLoading || isSubmitting}
              className="w-full group cursor-pointer relative overflow-hidden rounded-xl bg-brand px-4 py-3.5 text-sm font-bold text-bg-dark-0 shadow-lg shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98] outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-bg-dark-0 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent z-10" />
              
              <div className="relative flex items-center justify-center gap-2">
                {isAuthLoading || isSubmitting ? (
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
            <Link href="/login" className="font-semibold text-brand hover:text-brand/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
