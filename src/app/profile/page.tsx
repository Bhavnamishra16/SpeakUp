'use client';

import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { useUserStore } from '../../store/useUserStore';
import { useSessionStore } from '../../store/useSessionStore';
import { 
  User, 
  Award, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Mail, 
  Sliders, 
  Trash2, 
  Check, 
  Unlock, 
  Lock,
  Star,
  Zap,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ProfileHeroDoodle = () => (
  <svg viewBox="0 0 260 200" fill="none" className="w-full h-full max-h-48">
    {/* Stand / Floor */}
    <path d="M40 150q10-5 20 0t20 0t20 0t20 0t20 0t20 0t20 0t20 0" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>

    {/* Character */}
    <path d="M65 145c0-16 10-26 22-26s22 10 22 26" fill="#EEECFB" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="87" cy="103" r="16" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Hair */}
    <path d="M70 100c0-10 8-16 17-16s17 6 17 16" fill="#475569"/>
    {/* Glasses */}
    <circle cx="79" cy="103" r="3.5" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <circle cx="91" cy="103" r="3.5" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <line x1="82.5" y1="103" x2="87.5" y2="103" stroke="#475569" strokeWidth="1.1"/>
    <path d="M81 109c1.5 1 4 1 5.5 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Arms holding Award */}
    <path d="M70 125c5 5 15 5 20 0" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

    {/* Big Trophy (Right side) */}
    <rect x="155" y="75" width="30" height="40" rx="3" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Trophy handles */}
    <path d="M155 85c-8 0-8 15 0 15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M185 85c8 0 8 15 0 15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Trophy stem & base */}
    <path d="M170 115v15" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <rect x="150" y="130" width="40" height="10" rx="2" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Star inside trophy */}
    <path d="M170 85l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1"/>

    {/* Floating speech bubble with congrats */}
    <path d="M120 50c0-10 20-10 20 0 0 5-8 7-11 7l-3 3 1-3" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1"/>
    <path d="M126 47h8" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>

    {/* Sparkles */}
    <path d="M220 55l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M25 80l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#E2EFEB" stroke="#CBD5E1" strokeWidth="1"/>
  </svg>
);

export default function UserProfile() {
  const { profile, updateProfile, resetStats } = useUserStore();
  const { sessions, clearHistory } = useSessionStore();
  const router = useRouter();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [dailyGoal, setDailyGoal] = useState(profile.dailyGoalMinutes);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      dailyGoalMinutes: Number(dailyGoal)
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to permanently clear all practice history and reset your statistics?")) {
      clearHistory();
      resetStats();
      setName('Alex Carter');
      setEmail('alex@example.com');
      setDailyGoal(5);
    }
  };

  // Achievements unlocking algorithms based on local statistics
  const checkUnlocked = (id: string) => {
    switch (id) {
      case 'ach_first':
        return sessions.length > 0;
      case 'ach_streak':
        return profile.streak >= 3;
      case 'ach_eloquent':
        return sessions.some(s => (s.evaluation?.scores.overall || 0) >= 8.5);
      case 'ach_vocab':
        return sessions.some(s => (s.evaluation?.scores.vocabulary || 0) >= 8.5);
      case 'ach_clean':
        return sessions.some(s => s.evaluation?.fillerWords.totalCount === 0);
      case 'ach_veteran':
        return profile.totalSpeakingTime >= 1200; // 20 minutes
      default:
        return false;
    }
  };

  const achievements = [
    {
      id: 'ach_first',
      title: 'Speaking Spark',
      desc: 'Complete your first impromptu, debate, or interview session.',
      icon: <Zap className="w-5 h-5 text-indigo-700" />,
      color: 'bg-[#E8E6F6]'
    },
    {
      id: 'ach_streak',
      title: 'Streak Master',
      desc: 'Maintain an active speaking practice streak of 3+ days.',
      icon: <Flame className="w-5 h-5 text-orange-600" />,
      color: 'bg-[#FEF5D1]'
    },
    {
      id: 'ach_eloquent',
      title: 'Eloquent Orator',
      desc: 'Achieve an overall Gemini AI evaluation rating of 8.5+ out of 10.',
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      color: 'bg-[#FEF5D1]'
    },
    {
      id: 'ach_vocab',
      title: 'Vocab Architect',
      desc: 'Get a vocabulary score rating of 8.5+ in any speech.',
      icon: <Award className="w-5 h-5 text-purple-700" />,
      color: 'bg-[#E8E6F6]'
    },
    {
      id: 'ach_clean',
      title: 'Filler Eliminator',
      desc: 'Record a speech session with absolutely zero hesitation words.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      color: 'bg-[#E2EFEB]'
    },
    {
      id: 'ach_veteran',
      title: 'Speaking Champion',
      desc: 'Spend over 20 total minutes practice speaking in the arena.',
      icon: <TrendingUp className="w-5 h-5 text-rose-600" />,
      color: 'bg-[#FDE7E9]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 w-full min-h-screen pb-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 pt-10 flex flex-col gap-10">
          
          {/* Header */}
          <section className="flex items-end justify-between gap-8 pb-10 border-b border-slate-200">
            <div className="flex flex-col gap-4 flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Speaking Profile</p>
              <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight flex items-start gap-3">
                <User className="w-8 h-8 text-indigo-500 mt-1 shrink-0 animate-pulse" />
                Profile & Settings
              </h1>
              <p className="text-slate-500 text-sm max-w-sm">
                Manage your user statistics parameters, daily practice targets, and unlocked awards.
              </p>
            </div>
            {/* Hero doodle */}
            <div className="w-64 h-52 shrink-0 hidden md:block">
              <ProfileHeroDoodle />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Form Settings */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  Account Details
                </h2>
 
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      Coach Nickname
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 transition-all shadow-sm"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 transition-all shadow-sm"
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">
                      Daily Speaking Goal (min)
                    </label>
                    <select
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 transition-all shadow-sm"
                    >
                      <option value={1}>1 Minute</option>
                      <option value={3}>3 Minutes</option>
                      <option value={5}>5 Minutes</option>
                      <option value={10}>10 Minutes</option>
                      <option value={20}>20 Minutes</option>
                    </select>
                  </div>
 
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FEF5D1] hover:bg-yellow-50 text-slate-900 font-extrabold border border-slate-200 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm active:translate-y-[1px] transition-all cursor-pointer mt-2"
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        Settings Saved!
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </form>
              </div>
 
              {/* Session Management */}
              <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
                  <LogOut className="w-4 h-4 text-indigo-500" />
                  Session Management
                </h2>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">
                  You are currently signed in as <span className="font-black text-slate-800">{profile.name}</span>.
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-bold border border-slate-900 rounded-xl text-xs shadow-sm active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>

              {/* Danger Zone */}
              <div className="glass-card bg-white border border-red-200 rounded-3xl p-6 shadow-md space-y-4">
                <h2 className="font-extrabold text-sm text-red-500 flex items-center gap-2 border-b border-red-200 pb-3">
                  <Trash2 className="w-4 h-4" />
                  Danger Zone
                </h2>
                <p className="text-[11px] text-slate-500 leading-normal font-semibold">
                  Resetting all statistics will delete all your speaker transcripts, debate histories, and local streak caches. This is irreversible.
                </p>
                <button
                  onClick={handleClearHistory}
                  className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold border border-red-200 rounded-xl text-xs shadow-sm active:translate-y-[1px] transition-all cursor-pointer"
                >
                  Clear History and Reset
                </button>
              </div>
            </div>

            {/* Right Column: Achievements grid */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                Speaker Badges & Achievements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((ach) => {
                  const unlocked = checkUnlocked(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-5 rounded-2xl border transition-all duration-350 flex items-start gap-4 relative overflow-hidden ${
                        unlocked
                          ? 'bg-white border-slate-200 shadow-sm'
                          : 'bg-white/40 border-slate-200 opacity-60 grayscale'
                      }`}
                    >
                      {/* Locked/Unlocked absolute icon */}
                      <div className="absolute top-3 right-3 text-slate-450">
                        {unlocked ? <Unlock className="w-3.5 h-3.5 text-indigo-500" /> : <Lock className="w-3.5 h-3.5" />}
                      </div>

                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        unlocked ? `${ach.color} border-slate-200` : 'bg-slate-100 border-slate-100'
                      }`}>
                        {ach.icon}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-black text-sm text-slate-900">{ach.title}</h4>
                        <p className="text-xs text-slate-600 leading-normal font-bold">
                          {ach.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
