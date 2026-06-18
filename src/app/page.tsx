'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Mic, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  Terminal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const CuteHeroMicIllustration = () => (
  <svg className="w-20 h-20 md:w-28 md:h-28 shrink-0" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="46" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5 3" />
    {/* Stand */}
    <path d="M50 70v15M35 85h30" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Body */}
    <rect x="42" y="30" width="16" height="32" rx="8" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5" />
    {/* Grille */}
    <path d="M42 38h16M42 46h16M50 30v16" stroke="#94A3B8" strokeWidth="1.2" />
    {/* Ring */}
    <path d="M34 46c0 10 7.2 18 16 18s16-8 16-18" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Smiling face on the mic */}
    <circle cx="47" cy="53" r="1.5" fill="#475569" />
    <circle cx="53" cy="53" r="1.5" fill="#475569" />
    <path d="M49 56c.5.8 1.5.8 2 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    {/* Little Sparkles */}
    <path d="M78 28l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1" />
  </svg>
);

const CuteSparkleStar = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1.5">
    <path d="M12 2l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
  </svg>
);

const CuteHeroRightDoodle = () => (
  <svg className="w-full h-full max-h-60 md:max-h-72 mx-auto stroke-slate-900 fill-none" viewBox="0 0 200 200">
    {/* Head */}
    <circle cx="100" cy="95" r="28" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    {/* Face details */}
    <circle cx="90" cy="92" r="2.5" fill="#475569" />
    <circle cx="110" cy="92" r="2.5" fill="#475569" />
    <path d="M95 105c3 4 7 4 10 0" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    {/* Hair (cute curls) */}
    <path d="M72 90c-5-10-2-25 10-30c12-5 25 2 30 12c5-10 18-12 28-5c10 7 8 22 2 28" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="#475569" />
    {/* Cheeks */}
    <ellipse cx="82" cy="98" rx="4" ry="2.5" fill="#FDE7E9" />
    <ellipse cx="118" cy="98" rx="4" ry="2.5" fill="#FDE7E9" />
    {/* Body */}
    <path d="M60 180c5-25 20-42 40-42s35 17 40 42" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5" />
    {/* Hands juggling speech bubbles */}
    <path d="M55 140c-10-5-15-20-5-25s15 15 5 25" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M145 140c10-5 15-20 5-25s-15 15-5 25" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Floating speech bubbles */}
    <path d="M50 65c-10-15 10-25 20-10c5 8-5 15-10 15l-5 5l1-7" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M53 52h8" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M150 65c10-15-10-25-20-10c-5 8 5 15 10 15l5 5l-1-7" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M137 52h8" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M100 35c15 0 20-15 0-15s-20 15 0 15" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M96 28h8" stroke="#94A3B8" strokeWidth="1.2" />
    {/* Sparkles */}
    <path d="M170 110l1.5 2.5l2.5 1.5l-2.5 1.5l-1.5 2.5l-1.5-2.5l-2.5-1.5l2.5-1.5z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1" />
    <path d="M30 110l1.5 2.5l2.5 1.5l-2.5 1.5l-1.5 2.5l-1.5-2.5l-2.5-1.5l2.5-1.5z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1" />
  </svg>
);

const CuteTopicCoachDoodle = () => (
  <svg className="w-full h-32 mx-auto stroke-slate-900 fill-none" viewBox="0 0 160 120">
    <line x1="20" y1="105" x2="140" y2="105" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M65 105l5-40h20l5 40" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="80" cy="35" r="14" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M64 45c-8 6-12 12-8 15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M96 45c8 6 12 12 8 15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="75" cy="32" r="1.5" fill="#475569" />
    <circle cx="85" cy="32" r="1.5" fill="#475569" />
    <path d="M78 38c1.5 2 3.5 2 5 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M100 20c15-10 40-5 35 15c-2 8-12 12-20 8l-8 4l2-8" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M80 65v-12M75 53h10" stroke="#94A3B8" strokeWidth="1.2" />
    <path d="M35 25l2 4l4 2l-4 2l-2 4l-2-4l-4-2l4-2z" fill="#E8E6F6" stroke="#CBD5E1" strokeWidth="1" />
  </svg>
);

const CuteDebateDoodle = () => (
  <svg className="w-full h-32 mx-auto stroke-slate-900 fill-none" viewBox="0 0 160 120">
    <line x1="20" y1="105" x2="140" y2="105" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="80" cy="40" r="12" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M68 52c0-8 24-8 24 0v20c0 8-24 8-24 0z" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M80 72v15M70 87h20" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="76" cy="38" r="1.5" fill="#475569" />
    <circle cx="84" cy="38" r="1.5" fill="#475569" />
    <path d="M78 44c1.5 2 2.5 2 4 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M25 35c0-10 25-10 25 5c0 8-10 12-18 10l-4 5l1-7" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M135 35c0-10-25-10-25 5c0 8 10 12 18 10l4 5l-1-7" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M30 35h15M33 39h8" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M115 35h15M119 39h8" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const CuteInterviewDoodle = () => (
  <svg className="w-full h-32 mx-auto stroke-slate-900 fill-none" viewBox="0 0 160 120">
    <rect x="30" y="70" width="100" height="25" rx="3" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="40" y1="95" x2="40" y2="108" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="120" y1="95" x2="120" y2="108" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="50" cy="48" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M42 58c0-5 16-5 16 0v12H42z" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="110" cy="48" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M102 58c0-5 16-5 16 0v12h-16z" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <rect x="75" y="60" width="12" height="18" rx="1" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M78 60v-2h6v2" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M80 25l1.5 2l2 1.5l-2 1.5l-1.5 2l-1.5-2l-2-1.5l2-1.5z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1" />
  </svg>
);

const CuteGDDoodle = () => (
  <svg className="w-full h-32 mx-auto stroke-slate-900 fill-none" viewBox="0 0 160 120">
    <ellipse cx="80" cy="85" rx="45" ry="18" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="80" cy="42" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M72 52c0-5 16-5 16 0v15H72z" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="45" cy="65" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M37 75c0-5 16-5 16 0v10H37z" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="115" cy="65" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M107 75c0-5 16-5 16 0v10h-16z" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M60 55s10-10 20 0" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
    <path d="M80 55s10 10 20 0" stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
  </svg>
);

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does SpeakUp analyze my speech?",
      a: "SpeakUp uses the browser's Web Speech API to transcribe your voice in real time. Once your session ends, the transcript is analyzed by Google's Gemini AI to assess confidence, vocabulary, grammar, clarity, persuasiveness, and storytelling structure."
    },
    {
      q: "Can SpeakUp detect filler words like 'um' and 'like'?",
      a: "Yes! SpeakUp detects filler words (um, uh, like, basically, you know, actually, literally) dynamically. We plot them on a session timeline and calculate your filler density score to help you reduce hesitation over time."
    },
    {
      q: "What is the difference between Public Speaking and Debate mode?",
      a: "Public Speaking mode helps you practice solo topics with frameworks like PREP or STAR. Debate mode is a round-based simulation where Gemini acts as your opponent, analyzing your points and generating intelligent rebuttals you must answer."
    },
    {
      q: "Does this require a paid subscription?",
      a: "No! During our launch phase, all core features (Topic Library, AI Speech Evaluation, Mock Interviews, and Debate Simulator) are completely free to use with local caching."
    },
    {
      q: "Is my voice recorded and stored on your servers?",
      a: "No. Your voice is processed locally in your browser via the Web Speech API. We only send the text transcript to the Gemini AI API for evaluation. Your files and past sessions are stored completely in your browser's Local Storage, keeping your data private."
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-slate-950" />,
      title: "AI Topic Generator",
      desc: "Instant customized speaking topics across 11 categories with recommended vocab, context, and key talking points."
    },
    {
      icon: <Terminal className="w-6 h-6 text-slate-950" />,
      title: "Speaking Frameworks",
      desc: "Immediate structures mapped to PREP, STAR, and PPF methods to keep your arguments organized."
    },
    {
      icon: <Mic className="w-6 h-6 text-slate-950" />,
      title: "Live Speech to Text",
      desc: "Transcribe your speech word-by-word with instant filler word highlighting and timeline placement."
    },
    {
      icon: <Award className="w-6 h-6 text-slate-950" />,
      title: "AI Speech Evaluation",
      desc: "Detailed scorecard rating confidence, grammar, clarity, fluency, and engagement out of 10."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-slate-950" />,
      title: "Debate & Interview Simulators",
      desc: "Interactive round-based debate duels and mock hiring panels (Software Engineer, PM, Marketing, HR)."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-slate-950" />,
      title: "Analytics Dashboard",
      desc: "Track daily streaks, total speaking time, vocabulary growth, and reduction in filler word density."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans relative overflow-hidden select-none">
      
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-[#FAF6F0]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FEF5D1] border border-slate-200 flex items-center justify-center shadow-sm">
              <Mic className="w-4.5 h-4.5 text-slate-800" />
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tight">
              SpeakUp
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#E2EFEB] text-emerald-800 border border-slate-100 shadow-sm">
              AI Coach
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-700 font-extrabold uppercase tracking-wider">
            <a href="#features" className="hover:text-slate-900 hover:underline">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 hover:underline">How It Works</a>
            <a href="#pricing" className="hover:text-slate-900 hover:underline">Pricing</a>
            <a href="#faq" className="hover:text-slate-900 hover:underline">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-xs font-bold hover:text-slate-900 px-3 py-1.5 hover:bg-slate-900/5 rounded-lg transition-colors">
              Log in
            </Link>
            <Link href="/auth/register" className="text-xs font-black bg-[#FEF5D1] hover:bg-yellow-50 text-slate-900 border border-slate-200 rounded-xl px-5 py-2.5 shadow-sm hover:-translate-y-0.5 active:translate-y-[1px] transition-all">
              Start Practicing
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        <div className="absolute top-12 left-10 hidden lg:block">
          <CuteSparkleStar className="w-10 h-10 animate-bounce" />
        </div>
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <CuteSparkleStar className="w-12 h-12 rotate-12" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-800 shadow-sm mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
          <span>Next-Generation AI Speech Coaching</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-6"
        >
          <CuteHeroMicIllustration />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 text-left leading-none">
            Master Public Speaking <br /> with AI
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-slate-700 mt-2 max-w-2xl font-bold leading-relaxed"
        >
          Practice, analyze, improve, and become a confident speaker with real-time AI coaching. Refine interviews, debate simulations, and group discussions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
        >
          <Link href="/auth/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FEF5D1] hover:bg-yellow-50 text-slate-900 border border-slate-200 rounded-2xl px-8 py-4 shadow-md font-extrabold hover:-translate-y-0.5 active:translate-y-[1px] transition-all">
            Start Practicing <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/auth/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl px-8 py-4 shadow-md font-extrabold hover:-translate-y-0.5 active:translate-y-[1px] transition-all">
            Generate Topic
          </Link>
        </motion.div>

        {/* Product UI Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-4 shadow-md relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-red-450 border border-slate-100 shadow-sm" />
              <span className="w-3.5 h-3.5 rounded-full bg-yellow-450 border border-slate-100 shadow-sm" />
              <span className="w-3.5 h-3.5 rounded-full bg-green-450 border border-slate-100 shadow-sm" />
            </div>
            <div className="text-[10px] text-slate-500 font-bold bg-[#FAF6F0] px-4 py-1.5 rounded-xl border border-slate-200 shadow-sm">
              speakup.ai/dashboard
            </div>
            <div className="w-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="md:col-span-2 rounded-2xl bg-[#FAF6F0] p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-slate-900">Live Transcription</h3>
                <span className="flex items-center gap-1.5 text-xs text-emerald-800 bg-[#E2EFEB] px-2.5 py-0.5 rounded-full border border-slate-100 shadow-sm font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Recording
                </span>
              </div>
              <div className="text-xs text-slate-850 leading-relaxed font-mono font-semibold min-h-[120px] bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                Artificial intelligence is modifying how we represent ideas. <span className="bg-[#FEF5D1] border border-slate-200 text-slate-900 px-1.5 py-0.5 rounded font-black">Um</span>, I think we are entering a new <span className="bg-[#E8E6F6] border border-slate-200 text-slate-900 px-1.5 py-0.5 rounded font-black">paradigm shift</span>. <span className="bg-[#FEF5D1] border border-slate-200 text-slate-900 px-1.5 py-0.5 rounded font-black">Basically</span>, everyone has a personal AI companion...
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 font-extrabold">
                <div>Duration: <span className="text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm">01:45</span></div>
                <div>Word Count: <span className="text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm">182 words</span></div>
                <div>Filler Count: <span className="text-amber-700 bg-[#FEF5D1] border border-slate-200 px-2 py-0.5 rounded-md shadow-sm font-black">2 detected</span></div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#FAF6F0] p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-black text-sm text-slate-900 mb-4">Gemini Evaluation</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
                      <span>Fluency & Flow</span>
                      <span className="text-slate-900 font-extrabold">8.4 / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 border border-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#E8E6F6] h-full rounded-full border-r border-slate-200" style={{ width: '84%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
                      <span>Vocabulary Range</span>
                      <span className="text-slate-900 font-extrabold">7.9 / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 border border-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#FEF5D1] h-full rounded-full border-r border-slate-200" style={{ width: '79%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-700 font-bold mb-1">
                      <span>Clarity & Tone</span>
                      <span className="text-slate-900 font-extrabold">9.0 / 10</span>
                    </div>
                    <div className="w-full bg-slate-200 border border-slate-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#E2EFEB] h-full rounded-full border-r border-slate-200" style={{ width: '90%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4 text-xs font-bold">
                <div className="text-indigo-700 font-black mb-1">AI Coach Verdict:</div>
                <p className="text-slate-650 leading-normal">
                  Great command of arguments. Try to replace your filler words with silent transitions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Double-Box Highlight Banner (Movee Style) */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-12 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
          {/* Lavender Left Box */}
          <div className="bg-[#E8E6F6] border border-slate-200 p-8 rounded-3xl shadow-md flex flex-col justify-between min-h-[300px]">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Speech training for growing careers
              </h2>
              <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed">
                We coach student and professional teams to articulate complex ideas clearly, eliminate filler words, and deliver persuasive arguments with confidence.
              </p>
            </div>
            <Link href="/auth/register" className="inline-flex items-center justify-between w-fit gap-3 bg-slate-900 text-white font-bold px-6 py-3 rounded-full text-xs shadow-sm hover:-translate-y-0.5 active:translate-y-[1px] transition-all cursor-pointer mt-6">
              Start Practicing →
            </Link>
          </div>

          {/* Yellow Right Box (Doodle Box) */}
          <div className="bg-[#FEF5D1] border border-slate-200 p-6 rounded-3xl shadow-md flex items-center justify-center min-h-[300px]">
            <CuteHeroRightDoodle />
          </div>
        </div>
      </section>

      {/* Interactive Speaking Arenas (Movee Cards Style) */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-slate-200 bg-white select-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
              Interactive Speaking Arenas
            </h2>
          </div>
          <p className="text-slate-600 text-xs md:text-sm font-semibold max-w-md">
            Meticulously designed speech modules and real-time simulators. Simple, visual, interactive, and fun.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: AI Topic Coach */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between h-[360px]">
            <div>
              <div className="bg-[#FAF6F0] border border-slate-200 rounded-2xl overflow-hidden p-2 mb-4">
                <CuteTopicCoachDoodle />
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1.5">AI Topic Coach</h3>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                Practice impromptu speaking with instant Gemini generated prompts and templates.
              </p>
            </div>
            <Link href="/practice/topic" className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:translate-y-[1px] cursor-pointer mt-4">
              Enter Arena →
            </Link>
          </div>

          {/* Card 2: Debate Duel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between h-[360px]">
            <div>
              <div className="bg-[#FAF6F0] border border-slate-200 rounded-2xl overflow-hidden p-2 mb-4">
                <CuteDebateDoodle />
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1.5">Debate Duel</h3>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                Defend your stance in a real-time debate round simulation against Gemini AI.
              </p>
            </div>
            <Link href="/practice/debate" className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:translate-y-[1px] cursor-pointer mt-4">
              Enter Arena →
            </Link>
          </div>

          {/* Card 3: Mock Interview */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between h-[360px]">
            <div>
              <div className="bg-[#FAF6F0] border border-slate-200 rounded-2xl overflow-hidden p-2 mb-4">
                <CuteInterviewDoodle />
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1.5">Mock Interview</h3>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                Simulate role-specific technical and behavioral interviews with career guidance.
              </p>
            </div>
            <Link href="/practice/interview" className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:translate-y-[1px] cursor-pointer mt-4">
              Enter Arena →
            </Link>
          </div>

          {/* Card 4: Group Discussion */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col justify-between h-[360px]">
            <div>
              <div className="bg-[#FAF6F0] border border-slate-200 rounded-2xl overflow-hidden p-2 mb-4">
                <CuteGDDoodle />
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1.5">Group Discussion</h3>
              <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                Lead simulated group dialogue panels and reach consensus with active feedback.
              </p>
            </div>
            <Link href="/practice/gd" className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:translate-y-[1px] cursor-pointer mt-4">
              Enter Arena →
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-10 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-black mb-6">
            Empowering students and professionals from leading teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 font-black text-slate-800">
            <span className="text-base bg-[#E8E6F6] px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">Stripe-style Tech</span>
            <span className="text-base bg-[#FEF5D1] px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">Linear-style Dev</span>
            <span className="text-base bg-[#E2EFEB] px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">Vercel-style Host</span>
            <span className="text-base bg-[#FDE7E9] px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm">Grammarly-style AI</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            Professional Communication Features
          </h2>
          <p className="text-slate-600 text-lg mt-4 font-bold">
            Everything you need to master your speech, conquer interviews, and deliver flawless presentations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:translate-y-[-2px] hover:shadow-md shadow-sm transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                {feat.icon}
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 border-t border-slate-200 bg-[#E8E6F6]/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
              Three Steps to Speaking Confidence
            </h2>
            <p className="text-slate-600 mt-4 font-semibold">
              Our streamlined workflow helps you practice anywhere, anytime, with immediate feedback loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#FEF5D1] border border-slate-200 flex items-center justify-center font-black text-slate-900 mb-6 text-lg shadow-sm">
                1
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3">Choose Your Focus</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                Generate an AI topic, launch a debate, or start a mock interview matching your industry and experience level.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#E8E6F6] border border-slate-200 flex items-center justify-center font-black text-slate-900 mb-6 text-lg shadow-sm">
                2
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3">Speak and Record</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                Record your response directly in the web app. Watch live transcription highlight your structure and filler words.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-12 h-12 rounded-full bg-[#E2EFEB] border border-slate-200 flex items-center justify-center font-black text-slate-900 mb-6 text-lg shadow-sm">
                3
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-3">Review Action Plan</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                Unlock your Gemini evaluation metrics, read constructive feedback pointers, and complete follow-up exercises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-lg mt-4 font-semibold">
            Start training for free. Upgrade to unlock unlimited AI assessments and tailored dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between shadow-md hover:translate-y-[-2px] transition-all">
            <div>
              <h3 className="text-lg font-black text-slate-900">Starter</h3>
              <p className="text-xs text-slate-500 mt-1 font-bold">Perfect for casual practice</p>
              <div className="my-6">
                <span className="text-4xl font-black text-slate-900">$0</span>
                <span className="text-slate-600 text-xs font-bold"> / forever</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 mb-8 font-semibold">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> 5 AI topics generated per day</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Basic transcript & recording</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Local dashboard history</li>
              </ul>
            </div>
            <Link href="/auth/register" className="w-full text-center py-3 bg-[#E8E6F6] text-slate-900 font-bold border border-slate-200 rounded-xl shadow-sm hover:bg-indigo-100 transition-all text-xs active:translate-y-[1px] cursor-pointer">
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-[#FEF5D1] flex flex-col justify-between relative shadow-md hover:translate-y-[-2px] transition-all">
            <span className="absolute top-0 right-6 translate-y-[-50%] bg-white text-slate-900 border border-slate-200 text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Most Popular
            </span>
            <div>
              <h3 className="text-lg font-black text-slate-900">Pro</h3>
              <p className="text-xs text-slate-705 mt-1 font-bold">For career professionals and candidates</p>
              <div className="my-6">
                <span className="text-4xl font-black text-slate-900">$15</span>
                <span className="text-slate-705 text-xs font-bold"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-800 mb-8 font-semibold">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-700" /> Unlimited AI topic generations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-700" /> Unlimited speech evaluations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-700" /> Complete mock interview simulators</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-700" /> Interactive debate opponents</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-700" /> Career coach weekly reports</li>
              </ul>
            </div>
            <Link href="/auth/register" className="w-full text-center py-3 bg-white text-slate-900 font-bold border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all text-xs active:translate-y-[1px] cursor-pointer">
              Upgrade to Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-3xl border border-slate-200 bg-white flex flex-col justify-between shadow-md hover:translate-y-[-2px] transition-all">
            <div>
              <h3 className="text-lg font-black text-slate-900">Enterprise</h3>
              <p className="text-xs text-slate-500 mt-1 font-bold">For universities and corporate teams</p>
              <div className="my-6">
                <span className="text-3xl font-black text-slate-900">Custom</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 mb-8 font-semibold">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Team management dashboard</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Custom interview job profiles</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-700" /> Dedicated SLA and support</li>
              </ul>
            </div>
            <button className="w-full text-center py-3 bg-[#E2EFEB] text-slate-900 font-bold border border-slate-200 rounded-xl shadow-sm hover:bg-emerald-100 transition-all text-xs active:translate-y-[1px] cursor-pointer">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-200">
        <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-extrabold text-sm text-slate-900 hover:bg-slate-50"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-900" /> : <ChevronDown className="w-4 h-4 text-slate-900" />}
              </button>
              
              {activeFaq === idx && (
                <div className="px-6 pb-5 text-xs text-slate-700 font-semibold border-t border-slate-200 bg-[#FAF6F0] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-semibold">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FEF5D1] border border-slate-200 flex items-center justify-center shadow-sm">
              <Mic className="w-3.5 h-3.5 text-slate-900" />
            </div>
            <span className="font-black text-slate-900 text-sm">SpeakUp</span>
            <span>© {new Date().getFullYear()} SpeakUp AI Inc. All rights reserved.</span>
          </div>

          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900 hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 hover:underline">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
