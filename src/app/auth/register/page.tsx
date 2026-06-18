'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mic, Eye, EyeOff, Lock, Mail, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../../store/useUserStore';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

// Cute guy writing/creating doodle
const RegisterDoodle = () => (
  <svg viewBox="0 0 200 230" fill="none" className="w-full h-full max-h-52">
    <ellipse cx="100" cy="220" rx="55" ry="8" fill="#E8E6F6" />
    {/* Body */}
    <path d="M65 168c0-20 10-35 35-35s35 15 35 35v45H65z" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Head */}
    <circle cx="100" cy="110" r="28" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Hair */}
    <path d="M72 106c0-16 12-28 28-28s28 12 28 28" fill="#334155" stroke="#334155" strokeWidth="1"/>
    {/* Eyes */}
    <circle cx="91" cy="110" r="2.5" fill="#334155"/>
    <circle cx="109" cy="110" r="2.5" fill="#334155"/>
    {/* Glasses */}
    <circle cx="91" cy="110" r="6" stroke="#334155" strokeWidth="1.2" fill="none"/>
    <circle cx="109" cy="110" r="6" stroke="#334155" strokeWidth="1.2" fill="none"/>
    <line x1="97" y1="110" x2="103" y2="110" stroke="#334155" strokeWidth="1.2"/>
    {/* Smile */}
    <path d="M95 120c2.5 3 7.5 3 10 0" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Cheeks */}
    <ellipse cx="83" cy="117" rx="4" ry="2.5" fill="#FDE7E9"/>
    <ellipse cx="117" cy="117" rx="4" ry="2.5" fill="#FDE7E9"/>
    {/* Arms with pencil */}
    <path d="M135 165c8-5 18-2 15 8" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Pencil */}
    <rect x="148" y="145" width="6" height="22" rx="1" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.2" transform="rotate(30 148 145)"/>
    <path d="M148 145l3-5 3 5z" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1" transform="rotate(30 148 145)"/>
    {/* Notepad */}
    <rect x="60" y="175" width="50" height="40" rx="3" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.2"/>
    <line x1="68" y1="185" x2="103" y2="185" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    <line x1="68" y1="193" x2="95" y2="193" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    <line x1="68" y1="201" x2="103" y2="201" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    {/* Sparkles */}
    <path d="M155 80l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M40 90l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#E8E6F6" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M38 160l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FDE7E9" stroke="#CBD5E1" strokeWidth="1"/>
  </svg>
);

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const updateProfile = useUserStore((state) => state.updateProfile);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    setLoading(true);
    setTimeout(() => {
      updateProfile({
        name: data.name,
        email: data.email,
        streak: 1,
        lastPracticeDate: new Date().toISOString().split('T')[0],
      });
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex items-center justify-center p-6 relative overflow-hidden select-none">

      {/* Background decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-12 w-3 h-3 rounded-full bg-[#FEF5D1] border border-slate-200" />
        <div className="absolute top-28 right-16 w-2 h-2 rounded-full bg-[#E8E6F6] border border-slate-200" />
        <div className="absolute bottom-24 left-20 w-4 h-4 rounded-full bg-[#E2EFEB] border border-slate-200" />
        <div className="absolute bottom-16 right-14 w-3 h-3 rounded-full bg-[#FDE7E9] border border-slate-200" />
      </div>

      <div className="w-full max-w-4xl flex items-center gap-12">

        {/* Left: Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-sm relative flex-shrink-0"
        >
          <div className="text-center mb-7">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#FEF5D1] border border-slate-200 flex items-center justify-center shadow-sm">
                <Mic className="w-4 h-4 text-slate-700" />
              </div>
              <span className="text-base font-black text-slate-900 tracking-tight">SpeakUp</span>
            </Link>
            <h2 className="text-xl font-black text-slate-900">Create your account</h2>
            <p className="text-xs text-slate-500 mt-1">Start your AI speaking journey today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-slate-800 transition-all"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-slate-800 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-slate-800 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold border border-slate-900 rounded-xl text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-5 disabled:opacity-50 shadow-sm"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-100" />
            <span className="flex-shrink mx-4 text-slate-400 text-[10px] uppercase tracking-wider">Or join with</span>
            <div className="flex-grow border-t border-slate-100" />
          </div>

          <button className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-medium border border-slate-200 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <GithubIcon className="w-4 h-4 text-slate-800" />
            GitHub
          </button>

          <p className="text-center text-xs text-slate-400 mt-5">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-500 hover:text-indigo-700 font-semibold transition-colors">
              Log in
            </Link>
          </p>
        </motion.div>

        {/* Right: Doodle illustration */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:flex flex-col items-center gap-6 flex-1"
        >
          <RegisterDoodle />
          <div className="text-center space-y-1.5">
            <p className="text-2xl font-black text-slate-900 tracking-tight">Join thousands</p>
            <p className="text-sm text-slate-500">Improve your speaking with daily AI coaching.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
