'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserStore } from '../../store/useUserStore';
import { useSessionStore } from '../../store/useSessionStore';
import Navigation from '../../components/Navigation';
import { Session } from '../../types';
import { 
  Flame, 
  Clock, 
  ArrowRight, 
  BrainCircuit, 
  ChevronRight,
  Bookmark,
  Sparkles,
  MessageSquare,
  Users,
  Award,
  CheckCircle,
  RefreshCw,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGemini } from '../../hooks/useGemini';

// Large illustrative doodle of a student speaking/presenting
const HeroDoodle = () => (
  <svg viewBox="0 0 280 320" fill="none" className="w-full h-full max-h-72">
    {/* Body */}
    <path d="M90 230c0-28 14-48 50-48s50 20 50 48v65H90z" fill="#E8E6F6" stroke="#1E293B" strokeWidth="1.8"/>
    {/* Neck */}
    <rect x="124" y="175" width="22" height="20" rx="4" fill="#fff" stroke="#1E293B" strokeWidth="1.5"/>
    {/* Head */}
    <circle cx="135" cy="148" r="35" fill="#fff" stroke="#1E293B" strokeWidth="1.8"/>
    {/* Curly hair */}
    <path d="M100 138c0-20 14-35 35-35s35 15 35 35c0 6-4 9-9 9s-5-7-9-7-5 7-10 7-5-4-10-4-8 5-9-5z" fill="#1E293B"/>
    {/* Eyes */}
    <circle cx="124" cy="148" r="3.5" fill="#1E293B"/>
    <circle cx="146" cy="148" r="3.5" fill="#1E293B"/>
    {/* Glasses */}
    <circle cx="124" cy="148" r="9" stroke="#1E293B" strokeWidth="1.5" fill="none"/>
    <circle cx="146" cy="148" r="9" stroke="#1E293B" strokeWidth="1.5" fill="none"/>
    <line x1="133" y1="148" x2="137" y2="148" stroke="#1E293B" strokeWidth="1.5"/>
    <line x1="115" y1="145" x2="108" y2="142" stroke="#1E293B" strokeWidth="1.5"/>
    <line x1="155" y1="145" x2="162" y2="142" stroke="#1E293B" strokeWidth="1.5"/>
    {/* Smile */}
    <path d="M127 159c3 4 10 4 16 0" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Cheeks */}
    <ellipse cx="113" cy="155" rx="6" ry="3.5" fill="#FDE7E9" opacity="0.7"/>
    <ellipse cx="157" cy="155" rx="6" ry="3.5" fill="#FDE7E9" opacity="0.7"/>
    {/* Left arm holding mic */}
    <path d="M90 240c-18 0-30 8-22 22" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Mic */}
    <rect x="54" y="248" width="12" height="22" rx="6" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1.5"/>
    <path d="M48 262c0 9 6 15 12 15s12-6 12-15" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <line x1="60" y1="277" x2="60" y2="288" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="53" y1="288" x2="67" y2="288" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Right arm gesture */}
    <path d="M180 240c18-5 28 5 20 18" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round"/>
    {/* Floating speech bubble 1 */}
    <path d="M175 130c0-16 30-16 30 0 0 9-12 14-18 14l-4 6 1-6" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1.5"/>
    <path d="M183 122h14" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M185 128h10" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Floating speech bubble 2 */}
    <path d="M45 165c0-12 25-12 25 0 0 7-10 11-16 11l-3 5 1-5" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.5"/>
    <path d="M53 160h9M54 165h7" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Like icon bubble */}
    <path d="M200 180c0-10 20-10 20 0 0 7-8 10-12 10l-3 4 1-4" fill="#FDE7E9" stroke="#1E293B" strokeWidth="1.5"/>
    <path d="M208 175l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FDE7E9" stroke="#1E293B" strokeWidth="0.8"/>
    {/* Sparkles */}
    <path d="M220 100l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1"/>
    <path d="M40 200l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1"/>
    <path d="M240 230l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1"/>
    {/* Squiggly accent line */}
    <path d="M210 270q5-5 10 0t10 0t10 0" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

// Tiny inline doodles for arena cards
const TopicDoodle = () => (
  <svg viewBox="0 0 160 120" fill="none" className="w-full h-28 transition-transform group-hover:scale-105 duration-300">
    {/* Background pastel accent blobs */}
    <path d="M40 30c20-15 45-10 65 5s25 35 15 50s-45 20-65 10s-35-50-15-65z" fill="#FEF5D1" opacity="0.8" />
    <path d="M95 50c15-10 30 5 25 20s-20 20-30 10s-10-20 5-30z" fill="#EEECFB" opacity="0.9" />
    
    {/* Whiteboard / Presentation board */}
    <rect x="25" y="20" width="70" height="50" rx="4" stroke="#1E293B" strokeWidth="2" fill="white" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="35" y1="70" x2="30" y2="100" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <line x1="85" y1="70" x2="90" y2="100" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <line x1="60" y1="70" x2="60" y2="90" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Content on Whiteboard (graphs/ideas) */}
    <path d="M35 55l12-12l10 6l18-18" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="47" cy="43" r="3" fill="#1E293B" />
    <circle cx="57" cy="49" r="3" fill="#1E293B" />
    <circle cx="75" cy="31" r="3" fill="#1E293B" />
    
    {/* Topic Coach character (pointing) */}
    {/* Shirt */}
    <path d="M100 95c0-12 8-20 22-20s22 8 22 20v8h-44z" fill="#E8E6F6" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Head */}
    <circle cx="122" cy="53" r="11" fill="white" stroke="#1E293B" strokeWidth="2" />
    {/* Hair */}
    <path d="M111 50c1-6 6-9 11-9s11 3 11 9c0 2-2 4-4 4s-3-3-7-3s-7 3-11-1z" fill="#1E293B" />
    {/* Arm pointing */}
    <path d="M108 80c-6-4-12-12-18-8" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Hand pointing */}
    <circle cx="88" cy="71" r="2.5" fill="white" stroke="#1E293B" strokeWidth="1.5" />
    
    {/* Floating idea bulb / sparkles */}
    <path d="M85 15h10M90 10v10" stroke="#FEF5D1" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M135 32l2 4l4 2l-4 2l-2 4l-2-4l-4-2l4-2z" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1" />
    <circle cx="15" cy="80" r="1.5" fill="#94A3B8" />
    <path d="M140 85q3-3 6 0t6 0" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

const DebateDoodle = () => (
  <svg viewBox="0 0 160 120" fill="none" className="w-full h-28 transition-transform group-hover:scale-105 duration-300">
    {/* Background color blobs */}
    <path d="M25 60c0-20 20-30 40-20s30 20 20 40s-20 30-40 20s-20-20-20-40z" fill="#FDE7E9" opacity="0.9" />
    <path d="M95 65c0-20 20-35 40-25s25 25 15 40s-25 25-40 15s-15-10-15-30z" fill="#EEECFB" opacity="0.9" />
    
    {/* Left Speaker */}
    <path d="M20 105c0-10 6-18 18-18s18 8 18 18h-36z" fill="#fff" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="38" cy="67" r="10" fill="white" stroke="#1E293B" strokeWidth="2" />
    <path d="M28 65c1-5 5-8 10-8s10 3 10 8c0 1-1 3-3 3s-3-2-7-2s-7 2-10-1z" fill="#1E293B" />
    <path d="M48 48c0-12 18-15 32-4s12 18 2 22l-4 6l1-6c-12 0-31-6-31-18z" fill="white" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M58 43h14M58 50h8" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    {/* Right Speaker */}
    <path d="M140 105c0-10-6-18-18-18s-18 8-18 18h36z" fill="#fff" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="122" cy="67" r="10" fill="white" stroke="#1E293B" strokeWidth="2" />
    <path d="M112 65c1-5 5-8 10-8s10 3 10 8c0 1-1 3-3 3s-3-2-7-2s-7 2-10-1z" fill="#1E293B" />
    <path d="M112 48c0-12-18-15-32-4s-12 18-2 22l4 6l-1-6c12 0 31-6 31-18z" fill="white" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M92 43h14M98 50h8" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    {/* Collision / Sparkle effect in center */}
    <path d="M80 18l1.5 3l3 1.5l-3 1.5l-1.5 3l-1.5-3l-3-1.5l3-1.5z" fill="#FDE7E9" stroke="#1E293B" strokeWidth="1" />
    <path d="M15 25l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#EEECFB" stroke="#94A3B8" strokeWidth="0.8" />
  </svg>
);

const InterviewDoodle = () => (
  <svg viewBox="0 0 160 120" fill="none" className="w-full h-28 transition-transform group-hover:scale-105 duration-300">
    {/* Background color blobs */}
    <path d="M35 55c0-22 30-32 50-22s22 30 12 50s-30 22-50 12s-12-18-12-40z" fill="#EDFBF4" opacity="0.9" />
    <path d="M100 45c12-12 24 0 20 15s-15 20-25 10s-7-13 5-25z" fill="#FEF5D1" opacity="0.9" />
    
    {/* Laptop screen and base */}
    <rect x="55" y="45" width="50" height="36" rx="3" fill="white" stroke="#1E293B" strokeWidth="2" />
    <path d="M45 81h70l4 6H41l4-6z" fill="#fff" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    {/* Avatar profile inside laptop screen */}
    <circle cx="80" cy="58" r="6" fill="white" stroke="#1E293B" strokeWidth="1.5" />
    <path d="M72 70c0-4 5-6 8-6s8 2 8 6v2H72v-2z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.5" />
    
    {/* Interviewer Checklist Clipboard (Floating on left) */}
    <rect x="18" y="25" width="28" height="38" rx="2" fill="white" stroke="#1E293B" strokeWidth="2" transform="rotate(-8 32 44)" />
    <rect x="27" y="21" width="10" height="5" rx="1" fill="#1E293B" transform="rotate(-8 32 44)" />
    <line x1="23" y1="33" x2="38" y2="31" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="39" x2="35" y2="37" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="45" x2="30" y2="44" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M36 43l2 2l4-4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* Sparkle and floating dots */}
    <path d="M125 35l1.5 3l3 1.5l-3 1.5l-1.5 3l-1.5-3l-3-1.5l3-1.5z" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1" />
    <circle cx="135" cy="75" r="2" fill="#94A3B8" />
    <circle cx="15" cy="85" r="1.5" fill="#94A3B8" />
    <path d="M115 85q4-4 8 0t8 0" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

const GDDoodle = () => (
  <svg viewBox="0 0 160 120" fill="none" className="w-full h-28 transition-transform group-hover:scale-105 duration-300">
    {/* Background color blobs */}
    <path d="M45 50c0-20 30-25 45-15s25 25 15 40s-30 25-45 15s-15-20-15-40z" fill="#FFFAEB" opacity="0.9" />
    
    {/* Brainstorming Table */}
    <ellipse cx="80" cy="88" rx="48" ry="12" fill="white" stroke="#1E293B" strokeWidth="2" />
    
    {/* Three Group Participants */}
    <path d="M30 85c0-10 6-16 14-16s14 6 14 16v4H30z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="44" cy="54" r="8" fill="white" stroke="#1E293B" strokeWidth="2" />
    <path d="M37 52c1-3 5-3 6 0" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    <path d="M66 80c0-12 8-18 18-18s18 6 18 18v6H66z" fill="#E8E6F6" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="84" cy="46" r="9" fill="white" stroke="#1E293B" strokeWidth="2" />
    <path d="M76 43c1-4 6-4 8 0" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    <path d="M102 85c0-10 6-16 14-16s14 6 14 16v4H102z" fill="#FDE7E9" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="116" cy="54" r="8" fill="white" stroke="#1E293B" strokeWidth="2" />
    <path d="M109 52c1-3 5-3 6 0" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />

    {/* Overlapping speech bubbles */}
    <path d="M50 34c0-5 8-5 8 0c0 3-3 4-5 4l-2 3l1-3" fill="#EEECFB" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M100 34c0-5-8-5-8 0c0 3 3 4 5 4l2 3l-1-3" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M78 26c0-6 10-6 10 0c0 3-4 5-6 5l-2 3l1-3" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Floating sparkles */}
    <path d="M135 25l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FFFAEB" stroke="#94A3B8" strokeWidth="0.8" />
    <circle cx="18" cy="40" r="1.5" fill="#94A3B8" />
  </svg>
);

export default function Dashboard() {
  const { profile, careerReport, setCareerReport } = useUserStore();
  const { sessions, toggleSaveSession } = useSessionStore();
  const { loading: aiReportLoading, getCareerReport } = useGemini();
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [todayMins, setTodayMins] = useState(0);

  const handleGenerateReport = async () => {
    try {
      const report = await getCareerReport(sessions);
      setCareerReport(report);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysSessions = sessions.filter(s => s.timestamp.split('T')[0] === today);
    const sumMins = todaysSessions.reduce((acc, curr) => acc + (curr.durationActual / 60), 0);
    setTodayMins(Math.round(sumMins * 10) / 10);
  }, [sessions]);

  const goalPercentage = Math.min(100, Math.round((todayMins / profile.dailyGoalMinutes) * 100));

  const arenas = [
    { name: 'AI Topic Coach', href: '/practice/topic', doodle: <TopicDoodle />, color: 'hover:bg-[#EEECFB]' },
    { name: 'Debate Duel', href: '/practice/debate', doodle: <DebateDoodle />, color: 'hover:bg-[#FDF0F2]' },
    { name: 'Mock Interview', href: '/practice/interview', doodle: <InterviewDoodle />, color: 'hover:bg-[#EDFBF4]' },
    { name: 'Group Discussion', href: '/practice/gd', doodle: <GDDoodle />, color: 'hover:bg-[#FFFAEB]' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 w-full pb-16 pt-10">
        <div className="max-w-5xl mx-auto px-8 flex flex-col gap-14">

          {/* ── HERO: Welcome + Doodle ── */}
          <section className="flex items-end justify-between gap-8 pb-10 border-b border-slate-200">
            <div className="flex flex-col gap-4 flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Dashboard</p>
              <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Welcome back,<br />
                <span className="text-indigo-500">{profile.name}!</span>
              </h1>
              <p className="text-slate-500 text-base max-w-md">
                Here&apos;s your daily coaching report. Keep practicing to reach your goals.
              </p>

              {/* Stats inline — no boxes */}
              <div className="flex items-center gap-10 mt-4">
                <div>
                  <p className="text-3xl font-black text-slate-900">{todayMins}<span className="text-base font-semibold text-slate-400 ml-1">/ {profile.dailyGoalMinutes}m</span></p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Today&apos;s Practice</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-3xl font-black text-slate-900 flex items-center gap-1.5">
                    {profile.streak}
                    <Flame className="w-6 h-6 text-orange-400 fill-orange-400" />
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Day Streak</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-3xl font-black text-slate-900">
                    {Math.floor(profile.totalSpeakingTime / 60)}<span className="text-base font-semibold text-slate-400 ml-1">min</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Total Speaking</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-3xl font-black text-slate-900">{goalPercentage}<span className="text-base font-semibold text-slate-400">%</span></p>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">Daily Goal</p>
                </div>
              </div>
            </div>

            {/* Hero doodle */}
            <div className="w-72 h-72 shrink-0 hidden md:block">
              <HeroDoodle />
            </div>
          </section>

          {/* ── SPEAKING ARENA ── */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Choose your Arena</h2>
              <span className="text-xs text-slate-400">4 modes available</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {arenas.map((arena) => (
                <Link
                  key={arena.name}
                  href={arena.href}
                  className={`group glass-card flex flex-col items-stretch gap-3 p-5 rounded-2xl ${arena.color} cursor-pointer`}
                >
                  <div className="flex-1 flex items-center justify-center">
                    {arena.doodle}
                  </div>
                  <div className="text-center md:text-left mt-2">
                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-slate-900 leading-tight">{arena.name}</h3>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all mt-auto self-start" />
                </Link>
              ))}
            </div>
          </section>

          {/* ── DIVIDER ── */}
          <div className="h-px bg-slate-200" />

          {/* ── RECENT SESSIONS ── */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Sessions</h2>
              <Link href="/topics" className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold flex items-center gap-0.5 transition-colors">
                View all <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {sessions.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center border border-dashed border-slate-200 rounded-2xl">
                No sessions yet. Start with <Link href="/practice/topic" className="text-indigo-500 hover:underline">AI Topic Coach</Link>!
              </p>
            ) : (
              <div className="flex flex-col divide-y divide-slate-100">
                {sessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className="flex items-center justify-between py-4 cursor-pointer hover:bg-white/60 transition-all rounded-lg px-3 -mx-3 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        session.type === 'public_speaking' ? 'bg-[#EEECFB] text-indigo-500' :
                        session.type === 'debate' ? 'bg-[#FDF0F2] text-rose-500' :
                        session.type === 'interview' ? 'bg-[#EDFBF4] text-emerald-500' :
                        'bg-[#FFFAEB] text-amber-500'
                      }`}>
                        {session.type === 'public_speaking' ? <Sparkles className="w-3.5 h-3.5" /> :
                         session.type === 'debate' ? <MessageSquare className="w-3.5 h-3.5" /> :
                         session.type === 'interview' ? <Award className="w-3.5 h-3.5" /> :
                         <Users className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 truncate max-w-xs">{session.topic}</p>
                        <p className="text-xs text-slate-400 mt-0.5" suppressHydrationWarning>
                          {new Date(session.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      {session.evaluation?.scores.overall && (
                        <span className="text-sm font-bold text-slate-700 tabular-nums">
                          {session.evaluation.scores.overall}/10
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSaveSession(session.id); }}
                        className={`transition-colors ${session.saved ? 'text-amber-500' : 'text-slate-200 group-hover:text-slate-400'}`}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── DIVIDER ── */}
          <div className="h-px bg-slate-200" />

          {/* ── AI CAREER COACH ── */}
          <section className="flex flex-col gap-5 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-500" />
                AI Career Coach
              </h2>
            </div>

            {careerReport ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-500 mb-2">Weekly Highlights</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{careerReport.weeklyReport}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-purple-500 mb-2">Monthly Forecast</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{careerReport.monthlyReport}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                      <span>Communication Growth</span>
                      <span className="font-bold text-slate-800">{careerReport.growthScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-700" style={{ width: `${careerReport.growthScore}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                      <span>Leadership Index</span>
                      <span className="font-bold text-slate-800">{careerReport.leadershipCommunication}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full transition-all duration-700" style={{ width: `${careerReport.leadershipCommunication}%` }} />
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateReport}
                    disabled={aiReportLoading || sessions.length === 0}
                    className="mt-2 w-full py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${aiReportLoading ? 'animate-spin' : ''}`} />
                    {aiReportLoading ? 'Analyzing...' : 'Re-Analyze'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 py-6 border border-dashed border-slate-200 rounded-2xl px-6">
                <p className="text-sm text-slate-500 flex-1 leading-relaxed">
                  Generate your AI Career Coach report to receive weekly highlights, communication forecasts, and growth metrics based on all your sessions.
                </p>
                <button
                  onClick={handleGenerateReport}
                  disabled={aiReportLoading || sessions.length === 0}
                  className="shrink-0 px-6 py-2.5 bg-slate-900 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {aiReportLoading ? (
                    <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...</>
                  ) : (
                    <><BrainCircuit className="w-4 h-4" /> Generate Report</>
                  )}
                </button>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* ── Session Detail Slide-Over ── */}
      <AnimatePresence>
        {selectedSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end"
            onClick={() => setSelectedSession(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-full max-w-lg bg-white border-l border-slate-200 h-full shadow-2xl overflow-y-auto p-7 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    selectedSession.type === 'public_speaking' ? 'bg-[#EEECFB] text-indigo-600' :
                    selectedSession.type === 'debate' ? 'bg-[#FDF0F2] text-rose-500' :
                    selectedSession.type === 'interview' ? 'bg-[#EDFBF4] text-emerald-600' :
                    'bg-[#FFFAEB] text-amber-600'
                  }`}>
                    {selectedSession.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(selectedSession.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveSession(selectedSession.id)}
                    className={`p-1.5 rounded-lg transition-colors ${selectedSession.saved ? 'text-amber-500' : 'text-slate-300 hover:text-slate-600'}`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                  <button onClick={() => setSelectedSession(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedSession.topic}</h3>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Duration</p>
                    <p className="text-sm font-bold text-slate-900">{selectedSession.durationActual}s</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Fillers</p>
                    <p className="text-sm font-bold text-slate-900">{selectedSession.evaluation?.fillerWords.totalCount || 0}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Score</p>
                    <p className="text-sm font-bold text-emerald-600">{selectedSession.evaluation?.scores.overall ? `${selectedSession.evaluation.scores.overall}/10` : 'N/A'}</p>
                  </div>
                </div>
              </div>

              {selectedSession.transcript && (
                <div>
                  <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">Transcript</p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 leading-relaxed max-h-36 overflow-y-auto font-mono">
                    {selectedSession.transcript}
                  </div>
                </div>
              )}

              {selectedSession.evaluation && (
                <>
                  <div>
                    <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">AI Scoring</p>
                    <div className="flex flex-col gap-2.5">
                      {Object.entries(selectedSession.evaluation.scores).filter(([k]) => k !== 'overall').map(([key, val]) => (
                        <div key={key} className="flex items-center gap-3">
                          <p className="text-xs text-slate-500 capitalize w-24 shrink-0">{key}</p>
                          <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-400 h-full rounded-full transition-all" style={{ width: `${(val as number) * 10}%` }} />
                          </div>
                          <p className="text-xs font-bold text-slate-700 w-8 text-right">{val}/10</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase font-bold tracking-wider text-emerald-500 mb-2">Strengths</p>
                      <ul className="space-y-1.5 text-xs text-slate-600 pl-3 list-disc">
                        {selectedSession.evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-wider text-rose-400 mb-2">Improve</p>
                      <ul className="space-y-1.5 text-xs text-slate-600 pl-3 list-disc">
                        {selectedSession.evaluation.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <p className="text-xs uppercase font-bold tracking-wider text-indigo-500 mb-2 flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5" /> Action Plan
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600 pl-3 list-disc">
                      {selectedSession.evaluation.actionPlan.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
