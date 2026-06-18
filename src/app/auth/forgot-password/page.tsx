'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mic, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Cute mail/envelope doodle
const ForgotDoodle = () => (
  <svg viewBox="0 0 200 180" fill="none" className="w-48 h-48 mx-auto">
    {/* Envelope body */}
    <rect x="30" y="70" width="140" height="95" rx="6" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Envelope flap */}
    <path d="M30 76l70 52 70-52" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    {/* Envelope bottom lines */}
    <line x1="30" y1="165" x2="90" y2="120" stroke="#94A3B8" strokeWidth="1.2"/>
    <line x1="170" y1="165" x2="110" y2="120" stroke="#94A3B8" strokeWidth="1.2"/>
    {/* Cute face on envelope */}
    <circle cx="95" cy="115" r="2" fill="#334155"/>
    <circle cx="105" cy="115" r="2" fill="#334155"/>
    <path d="M97 121c1.5 1.5 4 1.5 6 0" stroke="#334155" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Stars/sparkles around */}
    <path d="M22 55l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FDE7E9" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M165 45l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#E8E6F6" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M175 100l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#E2EFEB" stroke="#CBD5E1" strokeWidth="1"/>
    {/* Small heart */}
    <path d="M100 42c0-8 15-8 15 0c0 6-15 14-15 14s-15-8-15-14c0-8 15-8 15 0z" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1.2"/>
    {/* Flying lines */}
    <path d="M15 90h15" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
    <path d="M170 90h15" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2"/>
  </svg>
);

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotFormValues) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex items-center justify-center p-6 relative overflow-hidden select-none">

      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-14 w-3 h-3 rounded-full bg-[#FEF5D1] border border-slate-200" />
        <div className="absolute top-20 right-18 w-2 h-2 rounded-full bg-[#E8E6F6] border border-slate-200" />
        <div className="absolute bottom-24 left-20 w-4 h-4 rounded-full bg-[#E2EFEB] border border-slate-200" />
        <div className="absolute bottom-12 right-14 w-3 h-3 rounded-full bg-[#FDE7E9] border border-slate-200" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white border border-slate-200 p-8 rounded-2xl shadow-sm"
      >
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#FEF5D1] border border-slate-200 flex items-center justify-center shadow-sm">
              <Mic className="w-4 h-4 text-slate-700" />
            </div>
            <span className="text-base font-black text-slate-900 tracking-tight">SpeakUp</span>
          </Link>

          {/* Doodle illustration */}
          <ForgotDoodle />

          <h2 className="text-xl font-black text-slate-900 mt-3">Reset password</h2>
          <p className="text-xs text-slate-500 mt-1">We&apos;ll send you a reset link</p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#EDFBF4] border border-emerald-100 text-xs text-emerald-800 leading-relaxed text-center">
              ✅ We&apos;ve sent a password reset link to your email. Please check your inbox.
            </div>
            <Link
              href="/auth/login"
              className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-medium border border-slate-200 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-slate-800 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold border border-slate-900 rounded-xl text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-4 disabled:opacity-50 shadow-sm"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <Link
              href="/auth/login"
              className="w-full py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium border border-slate-200 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </form>
        )}
      </motion.div>
    </div>
  );
}
