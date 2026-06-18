'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../../../components/Navigation';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import { useGemini } from '../../../hooks/useGemini';
import { useSessionStore } from '../../../store/useSessionStore';
import { useUserStore } from '../../../store/useUserStore';
import { Topic, SpeechStructure, SpeechEvaluation, Session, FollowUpQuestion } from '../../../types';
import { 
  Sparkles, 
  Settings, 
  Mic, 
  Square, 
  Award, 
  RefreshCw, 
  BookOpen, 
  AlertTriangle,
  TrendingUp,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Volume2,
  Calendar,
  Play,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock topics to cycle through during slot spin animation
const SPIN_PLACEHOLDERS = [
  "Should remote work be a human right?",
  "Is artificial intelligence replacing art?",
  "How failure shapes successful entrepreneurs",
  "The boundaries of facial recognition laws",
  "Universal Basic Income: Pros and Cons",
  "Is higher education still worth it?",
  "The future of cryptocurrency systems",
  "Overcoming imposter syndrome at work",
  "The impact of fast fashion on ecology",
  "Active listening in leadership positions"
];

// Microphone doodle illustration
const CuteMicIllustration = () => (
  <svg className="w-20 h-20 shrink-0" viewBox="0 0 100 100" fill="none">
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

// Category-specific dynamic illustrations
const TopicIllustration = ({ category }: { category: string }) => {
  const getIllustration = () => {
    switch (category) {
      case 'technology':
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <circle cx="45" cy="50" r="28" fill="#E8E6F6" opacity="0.8" />
            <rect x="55" y="30" width="40" height="40" rx="8" fill="#FEF5D1" opacity="0.6" />
            <rect x="25" y="35" width="70" height="44" rx="4" stroke="#1E293B" strokeWidth="1.8" fill="#FFFFFF" />
            <line x1="25" y1="72" x2="95" y2="72" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M15 79h90l-5 6H20z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="1.8" />
            <rect x="35" y="43" width="16" height="12" rx="2" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.2" />
            <line x1="58" y1="46" x2="85" y2="46" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="58" y1="53" x2="75" y2="53" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="38" y1="62" x2="82" y2="62" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M98 25l1.5 2 2 1.5-2 1.5-1.5 2-1.5-2-2-1.5 2-1.5z" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="0.8" />
            <circle cx="102" cy="45" r="5" stroke="#1E293B" strokeWidth="1.2" fill="#FFFFFF" />
          </svg>
        );
      case 'business':
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <ellipse cx="60" cy="55" rx="35" ry="22" fill="#E2EFEB" opacity="0.8" />
            <circle cx="85" cy="40" r="18" fill="#FEF5D1" opacity="0.6" />
            <rect x="25" y="25" width="70" height="55" rx="6" stroke="#1E293B" strokeWidth="1.8" fill="#FFFFFF" />
            <line x1="35" y1="40" x2="85" y2="40" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="35" y1="55" x2="85" y2="55" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="35" y1="70" x2="85" y2="70" stroke="#1E293B" strokeWidth="1.5" />
            <line x1="35" y1="25" x2="35" y2="70" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="42" y="50" width="10" height="20" rx="1.5" fill="#E8E6F6" stroke="#1E293B" strokeWidth="1.2" />
            <rect x="58" y="38" width="10" height="32" rx="1.5" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1.2" />
            <rect x="74" y="45" width="10" height="25" rx="1.5" fill="#FDE7E9" stroke="#1E293B" strokeWidth="1.2" />
            <circle cx="100" cy="30" r="7" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1.2" />
            <line x1="100" y1="26" x2="100" y2="34" stroke="#1E293B" strokeWidth="1" />
          </svg>
        );
      case 'education':
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <circle cx="50" cy="55" r="28" fill="#FEF5D1" opacity="0.8" />
            <rect x="60" y="30" width="35" height="35" rx="6" fill="#E8E6F6" opacity="0.6" />
            <path d="M25 68h65v10H25z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M90 68c4 0 6 3 6 5s-2 5-6 5" stroke="#1E293B" strokeWidth="1.8" fill="none" />
            <path d="M30 52h55v12H30z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M85 52c4 0 6 3 6 6s-2 6-6 6" stroke="#1E293B" strokeWidth="1.8" fill="none" />
            <path d="M57 20l25 8l-25 8l-25-8z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <rect x="47" y="28" width="20" height="10" fill="#1E293B" stroke="#1E293B" strokeWidth="1.2" />
            <path d="M72 25v15l3 2" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </svg>
        );
      case 'leadership':
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <circle cx="60" cy="50" r="30" fill="#E8E6F6" opacity="0.8" />
            <path d="M40 50l30-18v36z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <rect x="30" y="42" width="12" height="16" rx="2" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M70 32c5 0 9 8 9 18s-4 18-9 18" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M38 58l-5 12h8l2-12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M88 40a12 12 0 0 1 0 20" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M96 32a22 22 0 0 1 0 36" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M22 25l1.5 2 2 1.5-2 1.5-1.5 2-1.5-2-2-1.5 2-1.5z" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="0.8" />
          </svg>
        );
      case 'startups':
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <ellipse cx="60" cy="60" rx="30" ry="18" fill="#FEF5D1" opacity="0.8" />
            <path d="M45 65l5 20h20l5-20z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <rect x="40" y="60" width="40" height="6" rx="1.5" fill="#E8E6F6" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M60 22c-8 0-14 6-14 14c0 6 4 10 6 12v5h16v-5c2-2 6-6 6-12c0-8-6-14-14-14z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <line x1="54" y1="57" x2="66" y2="57" stroke="#1E293B" strokeWidth="1.8" />
            <line x1="56" y1="61" x2="64" y2="61" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M42 52c-8-6-6-16 0-12s4 14 0 12z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.2" />
            <path d="M78 52c8-6 6-16 0-12s-4 14 0 12z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.2" />
            <line x1="60" y1="14" x2="60" y2="8" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="43" y1="21" x2="38" y2="17" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="77" y1="21" x2="82" y2="17" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'social':
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <circle cx="45" cy="50" r="24" fill="#FDE7E9" opacity="0.8" />
            <circle cx="75" cy="50" r="24" fill="#E8E6F6" opacity="0.6" />
            <path d="M25 45c0-12 24-12 24 0c0 6-8 10-14 10l-4 5l1-7" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M95 48c0-12-24-12-24 0c0 6 8 10 14 10l4 5l-1-7" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M60 22c0-2-3-4-5-2c-2-2-5 0-5 2c0 3 5 6 5 6s5-3 5-6z" fill="#FDE7E9" stroke="#1E293B" strokeWidth="1.2" />
            <line x1="33" y1="42" x2="41" y2="42" stroke="#1E293B" strokeWidth="1.2" />
            <line x1="79" y1="45" x2="87" y2="45" stroke="#1E293B" strokeWidth="1.2" />
          </svg>
        );
      case 'environment':
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <circle cx="60" cy="50" r="30" fill="#E2EFEB" opacity="0.8" />
            <circle cx="60" cy="50" r="25" stroke="#1E293B" strokeWidth="1.8" fill="#FFFFFF" />
            <path d="M50 40c-6-2-8 6-4 8s8-2 4-8z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.2" />
            <path d="M72 45c-4-4-8 2-6 5s6 3 6-5z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.2" />
            <path d="M58 62c-3-5-8-1-6 2s8 1 6-2z" fill="#E2EFEB" stroke="#1E293B" strokeWidth="1.2" />
            <path d="M60 25c0-8 6-10 10-10" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M70 15c-3-3-8 1-6 3s4 1 6-3z" fill="#FEF5D1" stroke="#1E293B" strokeWidth="1" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 120 100" className="w-24 h-20 shrink-0">
            <circle cx="60" cy="50" r="28" fill="#FEF5D1" opacity="0.8" />
            <ellipse cx="80" cy="65" rx="20" ry="12" fill="#E8E6F6" opacity="0.6" />
            <path d="M35 55c0-10 8-15 15-15s15 5 15 15v10H35z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <circle cx="50" cy="30" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.8" />
            <path d="M72 38a10 10 0 0 1 0 16" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M78 30a18 18 0 0 1 0 32" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M96 22l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="0.8" />
          </svg>
        );
    }
  };

  return getIllustration();
};

// Hero doodle: person at a podium/stage speaking into a mic
const SpeakerHeroDoodle = () => (
  <svg viewBox="0 0 260 220" fill="none" className="w-full h-full max-h-52">
    {/* Podium */}
    <rect x="90" y="155" width="80" height="45" rx="4" fill="#EEECFB" stroke="#94A3B8" strokeWidth="1.5"/>
    <rect x="100" y="145" width="60" height="15" rx="3" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Body */}
    <path d="M105 145c0-22 12-36 25-36s25 14 25 36" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Head */}
    <circle cx="130" cy="94" r="22" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Hair */}
    <path d="M108 88c0-14 10-22 22-22s22 8 22 22" fill="#334155"/>
    {/* Eyes */}
    <circle cx="122" cy="93" r="2.2" fill="#334155"/>
    <circle cx="138" cy="93" r="2.2" fill="#334155"/>
    {/* Smile */}
    <path d="M124 101c3 3.5 9 3.5 12 0" stroke="#334155" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Cheeks */}
    <ellipse cx="114" cy="98" rx="4" ry="2.5" fill="#FDE7E9"/>
    <ellipse cx="146" cy="98" rx="4" ry="2.5" fill="#FDE7E9"/>
    {/* Arms at podium */}
    <path d="M105 130c-8 0-12 8-5 12" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M155 130c8 0 12 8 5 12" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Mic on podium */}
    <rect x="124" y="136" width="12" height="18" rx="6" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.2"/>
    <line x1="130" y1="154" x2="130" y2="162" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Speech bubbles floating */}
    <path d="M170 65c0-14 28-14 28 0 0 9-12 14-18 14l-4 5 1-5" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.2"/>
    <path d="M178 58h12" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    <path d="M179 64h8" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    <path d="M55 75c0-10 20-10 20 0 0 7-9 10-13 10l-3 4 1-4" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.2"/>
    <path d="M62 70h8" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    {/* Stars/sparkles */}
    <path d="M200 105l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M42 110l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FDE7E9" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M210 45l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#E2EFEB" stroke="#CBD5E1" strokeWidth="1"/>
    {/* Squiggle */}
    <path d="M20 155q5-4 10 0t10 0" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

export default function TopicPractice() {
  const { 
    isListening, 
    transcript, 
    wordCount, 
    volume, 
    duration, 
    fillers, 
    startListening, 
    stopListening, 
    handleEditTranscript,
    resetTranscript 
  } = useSpeechRecognition();

  const { loading: aiLoading, generateTopic, generateStructure, evaluateSpeech } = useGemini();
  const { addSession } = useSessionStore();
  const { addSessionToStats } = useUserStore();

  // State
  const [step, setStep] = useState<'setup' | 'spinning' | 'topic_ready' | 'speaking' | 'review' | 'result'>('setup');
  const [category, setCategory] = useState<string>('general');
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [targetDuration, setTargetDuration] = useState<number>(60);
  
  // Topic and guides
  const [topic, setTopic] = useState<Topic | null>(null);
  const [structure, setStructure] = useState<SpeechStructure | null>(null);
  const [activeInfoTab, setActiveInfoTab] = useState<'talking' | 'structure' | 'vocab'>('talking');
  const [evaluation, setEvaluation] = useState<SpeechEvaluation | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'overview' | 'mechanics' | 'suggestions' | 'fillers'>('overview');

  // Slot lever arm pull rotation state
  const [leverRotation, setLeverRotation] = useState(0);
  const [currentPlaceholderIdx, setCurrentPlaceholderIdx] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Categories mapping
  const categories = [
    { label: 'General Communication', value: 'general' },
    { label: 'Technology & IT', value: 'technology' },
    { label: 'Business & Finance', value: 'business' },
    { label: 'Education & Learning', value: 'education' },
    { label: 'Leadership Skills', value: 'leadership' },
    { label: 'Startups & Ventures', value: 'startups' },
    { label: 'Social Issues', value: 'social' },
    { label: 'Environment & Climate', value: 'environment' }
  ];

  // Lever interaction handles
  const handlePullLever = async () => {
    if (step === 'spinning' || aiLoading) return;
    
    // Animate lever down
    setLeverRotation(60);
    setStep('spinning');
    
    // Cycle placeholder indexes rapidly for slot effect
    let cycles = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholderIdx(prev => (prev + 1) % SPIN_PLACEHOLDERS.length);
      cycles++;
    }, 120);

    // Spring back lever arm quickly
    setTimeout(() => {
      setLeverRotation(0);
    }, 300);

    try {
      // Call Gemini for the topic in parallel
      const generatedTopic = await generateTopic(category, difficulty, targetDuration);
      const struct = await generateStructure(generatedTopic.title);
      
      // Stop slot cycle, set true values
      setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTopic(generatedTopic);
        setStructure(struct);
        setStep('topic_ready');
      }, 1500); // minimum spin duration

    } catch (e) {
      console.error(e);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setStep('setup');
    }
  };

  const handleStartSpeaking = () => {
    setStep('speaking');
    startListening();
  };

  const handleStopSpeaking = () => {
    stopListening();
    setStep('review');
  };

  const handleEvaluate = async () => {
    if (!topic || !transcript) return;
    setEvaluating(true);
    try {
      const evalResult = await evaluateSpeech(topic.title, transcript, duration);
      setEvaluation(evalResult);
      setStep('result');

      // Save to localStorage history
      const newSession: Session = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: 'public_speaking',
        topic: topic.title,
        transcript,
        durationActual: duration,
        evaluation: evalResult,
        saved: false
      };

      addSession(newSession);
      addSessionToStats(duration);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluating(false);
    }
  };

  const handleReset = () => {
    resetTranscript();
    setTopic(null);
    setStructure(null);
    setEvaluation(null);
    setStep('setup');
  };

  // Auto stop when target speaking time is reached
  const stepRef = useRef(step);
  const targetDurationRef = useRef(targetDuration);
  stepRef.current = step;
  targetDurationRef.current = targetDuration;

  useEffect(() => {
    if (stepRef.current === 'speaking' && duration >= targetDurationRef.current) {
      stopListening();
      setStep('review');
    }
  }, [duration]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 w-full pb-16">
        <div className="max-w-5xl mx-auto px-8 pt-10 flex flex-col gap-10">

          {/* ── HERO HEADER ── */}
          <section className="flex items-end justify-between gap-8 pb-10 border-b border-slate-200">
            <div className="flex flex-col gap-4 flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Speaking Arena</p>
              <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight flex items-start gap-3">
                <Sparkles className="w-8 h-8 text-indigo-500 mt-1 shrink-0" />
                Speech Impromptu<br />Slot Machine
              </h1>
              <p className="text-slate-500 text-sm max-w-sm">
                Spin the slots for a custom AI topic, outline structures, and practice speaking.
              </p>
              {step !== 'setup' && (
                <button
                  onClick={handleReset}
                  className="self-start mt-2 px-4 py-2 border border-slate-200 text-xs bg-white text-slate-700 font-semibold rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Machine
                </button>
              )}
            </div>
            {/* Hero doodle */}
            <div className="w-64 h-52 shrink-0 hidden md:block">
              <SpeakerHeroDoodle />
            </div>
          </section>

          {/* ── SETUP FILTERS ── */}
          {step === 'setup' && (
            <section>
              <div className="flex items-center gap-6 mb-5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Configure your session</p>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <div className="flex flex-wrap gap-6 items-end">
                <div className="space-y-2 flex-1 min-w-[180px]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 transition-all shadow-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Difficulty</label>
                  <div className="flex gap-2">
                    {['basic', 'medium', 'hard'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setDifficulty(lvl)}
                        className={`px-4 py-2.5 text-sm font-semibold capitalize rounded-xl border transition-all cursor-pointer ${
                          difficulty === lvl
                            ? 'bg-[#FEF5D1] border-slate-300 text-slate-900 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 flex-1 min-w-[160px]">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Target Speaking Time</label>
                  <select
                    value={targetDuration}
                    onChange={(e) => setTargetDuration(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-800 transition-all shadow-sm"
                  >
                    <option value={60}>1 Minute</option>
                    <option value={120}>2 Minutes</option>
                    <option value={180}>3 Minutes</option>
                    <option value={300}>5 Minutes</option>
                  </select>
                </div>
              </div>
            </section>
          )}

          {/* MAIN SLOT MACHINE BOARD CONTAINER */}
          <div className="glass-card bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-md">
            {/* The slot window */}
            <div className="flex-1 w-full min-w-0 border border-slate-200 bg-[#FAF6F0] rounded-2xl h-[160px] relative overflow-hidden flex items-center justify-center shadow-inner">
              {/* Fade masks */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FAF6F0] to-transparent z-10 pointer-events-none" />

              <div className="w-full text-center px-6">
                <AnimatePresence mode="wait">
                  {step === 'setup' && (
                    <motion.div
                      key="setup_txt"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-slate-500 font-bold italic"
                    >
                      Configure filters above, then pull the lever to generate your speaking topic.
                    </motion.div>
                  )}

                  {step === 'spinning' && (
                    <motion.div
                      key="spin_txt"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      className="text-base md:text-lg font-black text-slate-800"
                    >
                      {SPIN_PLACEHOLDERS[currentPlaceholderIdx]}
                    </motion.div>
                  )}

                  {(step === 'topic_ready' || step === 'speaking' || step === 'review' || step === 'result') && topic && (
                    <motion.div
                      key="topic_txt"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="scale-75 -my-2.5">
                        <TopicIllustration category={topic.category} />
                      </div>
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">Landed speaking topic</span>
                      <h2 className="text-base md:text-lg font-extrabold text-slate-900 leading-normal max-w-2xl mx-auto">
                        {topic.title}
                      </h2>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* The slot lever handle (Right Side) */}
            <div className={`w-16 h-36 shrink-0 relative flex justify-center transition-all duration-300 ${
              step === 'setup' ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              {/* Pivot box */}
              <div className="w-6 h-6 rounded-full bg-white border border-slate-200 absolute bottom-10 z-20 flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              </div>
              
              {/* Arm shaft and knob */}
              <motion.div
                className={`w-2.5 bg-slate-300 absolute bottom-12 rounded-t-full origin-bottom ${
                  step === 'setup' ? 'cursor-grab active:cursor-grabbing hover:brightness-110' : 'cursor-not-allowed'
                }`}
                style={{ height: '70px', transformOrigin: 'center bottom' }}
                animate={{ rotate: leverRotation }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                onClick={step === 'setup' ? handlePullLever : undefined}
                drag={step === 'setup' ? "y" : false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.8 }}
                onDrag={(event, info) => {
                  if (step !== 'setup') return;
                  const rotation = Math.min(60, Math.max(0, info.offset.y));
                  setLeverRotation(rotation);
                }}
                onDragEnd={(event, info) => {
                  if (step !== 'setup') return;
                  if (info.offset.y > 35) {
                    handlePullLever();
                  } else {
                    setLeverRotation(0);
                  }
                }}
              >
                {/* Knob ball */}
                <div className="w-8 h-8 rounded-full bg-red-400 border border-red-500 absolute top-[-24px] left-[-9px] shadow-sm flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/40" />
                </div>
              </motion.div>
            </div>

          </div>

          {/* Core Actions / Details based on step state */}
          <AnimatePresence mode="wait">
            
            {/* Setup pull lever button */}
            {step === 'setup' && (
              <button
                onClick={handlePullLever}
                disabled={aiLoading}
                className="w-full py-4 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:translate-y-[-1px] hover:shadow-md active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 cursor-pointer"
              >
                {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current text-slate-900" />}
                Pull Lever and Spin
              </button>
            )}

            {/* Landed Topic Details (Framework Guides, Vocabs, Talking points tabs) */}
            {step === 'topic_ready' && topic && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Minimal Tab selectors */}
                <div className="flex border-b-2 border-slate-200 gap-6 text-sm font-bold text-slate-500">
                  {[
                    { id: 'talking', label: 'Talking Points' },
                    { id: 'structure', label: 'Framework Structure' },
                    { id: 'vocab', label: 'Keywords & Vocab' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveInfoTab(t.id as any)}
                      className={`pb-3 border-b-3 transition-all cursor-pointer ${
                        activeInfoTab === t.id ? 'border-indigo-600 text-slate-900 font-black' : 'border-transparent hover:text-slate-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Tab contents */}
                <div className="min-h-[140px]">
                  {activeInfoTab === 'talking' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                    >
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block">Topic Context</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold">{topic.context}</p>
                      
                      <div className="h-[1.5px] bg-slate-200 my-2" />
                      
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Key parameters to address</span>
                      <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4 leading-normal font-bold">
                        {topic.talkingPoints.map((tp, idx) => (
                          <li key={idx}>{tp}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {activeInfoTab === 'structure' && structure && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                    >
                      <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest block">
                        Speaking Method: {structure.framework} Framework
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Intro</span>
                          <p className="text-xs text-slate-700 leading-normal font-semibold">{structure.intro}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Conclusion</span>
                          <p className="text-xs text-slate-700 leading-normal font-semibold">{structure.conclusion}</p>
                        </div>
                      </div>

                      <div className="h-[1.5px] bg-slate-200" />

                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-slate-200">
                          <span className="text-[9px] text-slate-500 font-black block uppercase mb-0.5">Arg 1</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-bold">{structure.point1}</p>
                        </div>
                        <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-slate-200">
                          <span className="text-[9px] text-slate-500 font-black block uppercase mb-0.5">Arg 2</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-bold">{structure.point2}</p>
                        </div>
                        <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-slate-200">
                          <span className="text-[9px] text-slate-500 font-black block uppercase mb-0.5">Arg 3</span>
                          <p className="text-[11px] text-slate-600 leading-normal font-bold">{structure.point3}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeInfoTab === 'vocab' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
                    >
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Recommended terms</span>
                      <div className="flex flex-wrap gap-2">
                        {topic.recommendedVocabulary.map((vocab, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-[#E8E6F6] border border-slate-200 rounded-xl text-xs font-bold text-slate-900 shadow-sm">
                            {vocab}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 bg-white border border-slate-200 p-6 rounded-3xl shadow-md">
                  <TopicIllustration category={topic.category} />
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <h4 className="font-extrabold text-slate-900 text-base">Ready to start recording?</h4>
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                      Find a quiet spot, review the speech structure layout, and speak clearly. AI will auto-evaluate filler words, pacing, clarity, and overall speech confidence.
                    </p>
                    <button
                      onClick={handleStartSpeaking}
                      className="w-full md:w-auto mt-2 px-6 py-3 bg-[#E2EFEB] hover:bg-green-100 text-slate-900 border border-slate-200 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                    >
                      <Mic className="w-4 h-4 text-slate-900 fill-current animate-pulse" />
                      Start Speaking Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Speaking / Recording stage */}
            {step === 'speaking' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center gap-6 shadow-md"
              >
                {/* Visual mic wave */}
                <div className="w-16 h-16 rounded-full bg-[#E8E6F6] border border-slate-200 flex items-center justify-center relative shadow-sm">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-indigo-600/30"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <Mic className="w-7 h-7 text-indigo-700 fill-current" />
                </div>

                <div className="text-center space-y-1">
                  <span className="text-3xl font-black text-slate-900">
                    {Math.floor(duration / 60).toString().padStart(2, '0')}:
                    {(duration % 60).toString().padStart(2, '0')}
                  </span>
                  <span className="text-xs text-slate-500 uppercase font-black tracking-wider block">Duration Spoken</span>
                </div>

                {/* Remaining time progress */}
                <div className="w-full space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">Time Remaining</span>
                    <span className={`font-black ${
                      targetDuration - duration <= 10 ? 'text-rose-500 animate-pulse' : 'text-slate-700'
                    }`}>
                      {Math.max(0, Math.floor((targetDuration - duration) / 60))}:{Math.max(0, (targetDuration - duration) % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                    <motion.div 
                      className={`h-full rounded-full transition-colors ${
                        targetDuration - duration <= 10 ? 'bg-rose-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${Math.max(0, Math.min(100, ((targetDuration - duration) / targetDuration) * 100))}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold block text-center">
                    Auto-stops at {Math.floor(targetDuration / 60)}:{(targetDuration % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Estimate words and fillers */}
                <div className="flex gap-12 text-center py-3 border-y border-slate-200 w-full justify-center">
                  <div>
                    <span className="text-base font-black text-slate-900">{wordCount}</span>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Words Spoken</span>
                  </div>
                  <div>
                    <span className="text-base font-black text-amber-600">{fillers.length}</span>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Fillers Detected</span>
                  </div>
                </div>

                <div className="w-full space-y-1 text-left">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider">Live Transcript Stream</span>
                  <div className="w-full h-24 bg-[#FAF6F0] border border-slate-200 p-4 rounded-xl text-xs font-mono text-slate-700 overflow-y-auto no-scrollbar font-semibold">
                    {transcript || 'Audio streaming active... start talking'}
                  </div>
                </div>

                <button
                  onClick={handleStopSpeaking}
                  className="w-full py-4 bg-[#FDE7E9] hover:bg-rose-100 text-rose-700 border border-slate-200 font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-md hover:translate-y-[-1px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-current text-rose-700" />
                  Stop Speech and Review
                </button>
              </motion.div>
            )}

            {/* Review Transcript Stage */}
            {step === 'review' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-md"
              >
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <h3 className="font-extrabold text-sm text-slate-900">Dictated speech transcript</h3>
                  <span className="text-xs text-slate-500 font-bold">Speaking time: {duration}s</span>
                </div>

                <textarea
                  value={transcript}
                  onChange={(e) => handleEditTranscript(e.target.value)}
                  rows={4}
                  className="w-full p-4 bg-[#FAF6F0] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-semibold font-mono leading-relaxed"
                />

                {/* Filler check */}
                {fillers.length > 0 && (
                  <div className="p-3 bg-[#FEF5D1] border border-slate-200 rounded-xl flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-black text-slate-600 uppercase mr-2">Fillers Detected:</span>
                    {fillers.slice(0, 10).map((f, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-700 rounded text-[9px] font-mono font-bold">
                        &quot;{f.word}&quot;
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleReset}
                    className="py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 rounded-xl text-xs shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                  >
                    Discard Session
                  </button>
                  <button
                    onClick={handleEvaluate}
                    disabled={evaluating || !transcript}
                    className="py-2.5 bg-[#E2EFEB] hover:bg-green-100 text-slate-900 rounded-xl text-xs font-black border border-slate-200 shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {evaluating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        AI Evaluating...
                      </>
                    ) : (
                      'Get AI Scorecard'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Scorecard / Result Stage */}
            {step === 'result' && evaluation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Unified Tabbed scorecard details */}
                <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-md">
                  <div className="flex border-b-2 border-slate-200 gap-6 text-sm font-bold text-slate-500">
                    {[
                      { id: 'overview', label: 'Overall Scorecard' },
                      { id: 'fillers', label: 'Filler Analysis' },
                      { id: 'mechanics', label: 'Speech Mechanics' },
                      { id: 'suggestions', label: 'Improvement Plan' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveResultTab(t.id as any)}
                        className={`pb-3 border-b-3 transition-all cursor-pointer ${
                          activeResultTab === t.id ? 'border-indigo-600 text-slate-900 font-black' : 'border-transparent hover:text-slate-700'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Result Tab Contents */}
                  <div className="min-h-[220px]">
                    {activeResultTab === 'overview' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      >
                        {/* Overall index */}
                        <div className="p-6 bg-[#E8E6F6] border border-slate-200 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm space-y-2">
                          <span className="text-[10px] text-indigo-700 font-black uppercase tracking-wider">Overall index rating</span>
                          <span className="text-5xl font-black text-slate-900 mt-1">
                            {evaluation.scores.overall} <span className="text-xs font-bold text-indigo-700">/10</span>
                          </span>
                          {/* Filler count badge */}
                          <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${
                            evaluation.fillerWords.totalCount === 0 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                              : evaluation.fillerWords.totalCount <= 2 
                                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                                : evaluation.fillerWords.totalCount <= 4 
                                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                                  : 'bg-rose-50 border-rose-200 text-rose-700'
                          }`}>
                            {evaluation.fillerWords.totalCount} filler{evaluation.fillerWords.totalCount !== 1 ? 's' : ''} • {duration}s spoken
                          </span>
                        </div>

                        {/* Top metrics */}
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                          {[
                            { name: 'confidence', val: evaluation.scores.confidence },
                            { name: 'fluency', val: evaluation.scores.fluency },
                            { name: 'clarity', val: evaluation.scores.clarity },
                            { name: 'vocabulary', val: evaluation.scores.vocabulary }
                          ].map((item) => (
                            <div key={item.name} className="p-3 bg-[#FAF6F0] border border-slate-200 rounded-xl shadow-sm">
                              <div className="flex justify-between text-xs text-slate-600 capitalize mb-1.5 font-bold">
                                <span>{item.name}</span>
                                <span className="text-slate-900 font-black">{item.val}</span>
                              </div>
                              <div className="w-full bg-slate-200 border border-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
                                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${item.val * 10}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {activeResultTab === 'fillers' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-5"
                      >
                        {/* Filler Score Header */}
                        <div className="flex items-center gap-6">
                          <div className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border shadow-sm ${
                            evaluation.fillerWords.totalCount === 0 
                              ? 'bg-emerald-50 border-emerald-200' 
                              : evaluation.fillerWords.totalCount <= 2 
                                ? 'bg-blue-50 border-blue-200' 
                                : evaluation.fillerWords.totalCount <= 4 
                                  ? 'bg-amber-50 border-amber-200' 
                                  : 'bg-rose-50 border-rose-200'
                          }`}>
                            <span className={`text-2xl font-black ${
                              evaluation.fillerWords.totalCount === 0 
                                ? 'text-emerald-700' 
                                : evaluation.fillerWords.totalCount <= 2 
                                  ? 'text-blue-700' 
                                  : evaluation.fillerWords.totalCount <= 4 
                                    ? 'text-amber-700' 
                                    : 'text-rose-700'
                            }`}>
                              {evaluation.fillerAnalysis?.fillerScore || (evaluation.fillerWords.totalCount === 0 ? '9.5' : evaluation.fillerWords.totalCount <= 2 ? '7.5' : evaluation.fillerWords.totalCount <= 4 ? '6.0' : '4.5')}
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-wider text-slate-500">Filler Score</span>
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <span className={`text-[10px] font-black uppercase tracking-wider block ${
                              evaluation.fillerWords.totalCount === 0 
                                ? 'text-emerald-700' 
                                : evaluation.fillerWords.totalCount <= 2 
                                  ? 'text-blue-700' 
                                  : evaluation.fillerWords.totalCount <= 4 
                                    ? 'text-amber-700' 
                                    : 'text-rose-700'
                            }`}>
                              {evaluation.fillerWords.totalCount === 0 
                                ? '🎯 Clean Speech — No Fillers' 
                                : evaluation.fillerWords.totalCount <= 2 
                                  ? '👍 Acceptable — Minor Fillers' 
                                  : evaluation.fillerWords.totalCount <= 4 
                                    ? '⚠️ Needs Work — Noticeable Fillers' 
                                    : '🚨 Critical — Too Many Fillers'}
                            </span>
                            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                              {evaluation.fillerAnalysis?.overallFillerVerdict || 
                                (evaluation.fillerWords.totalCount === 0 
                                  ? 'Excellent — zero filler words detected. Your speech delivery is clean and professional.'
                                  : `You used ${evaluation.fillerWords.totalCount} filler words. Your most used filler is "${evaluation.fillerWords.mostUsed}".`
                                )
                              }
                            </p>
                          </div>
                        </div>

                        {/* Filler count summary bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                            <span>Filler Word Count</span>
                            <span className="font-black text-slate-800">{evaluation.fillerWords.totalCount} words</span>
                          </div>
                          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/50 shadow-inner">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                evaluation.fillerWords.totalCount === 0 
                                  ? 'bg-emerald-500 w-[5%]' 
                                  : evaluation.fillerWords.totalCount <= 2 
                                    ? 'bg-blue-500' 
                                    : evaluation.fillerWords.totalCount <= 4 
                                      ? 'bg-amber-500' 
                                      : 'bg-rose-500'
                              }`}
                              style={{ width: `${Math.min(100, evaluation.fillerWords.totalCount * 12)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                            <span>Clean (0)</span>
                            <span>Acceptable (1-2)</span>
                            <span>Needs Work (3-4)</span>
                            <span>Critical (5+)</span>
                          </div>
                        </div>

                        {/* Detected Fillers with Alternatives */}
                        {evaluation.fillerAnalysis?.detectedFillers && evaluation.fillerAnalysis.detectedFillers.length > 0 ? (
                          <div className="space-y-3">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Detected Fillers & Alternatives</span>
                            <div className="space-y-2">
                              {evaluation.fillerAnalysis.detectedFillers.map((filler, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#FAF6F0] border border-slate-200 rounded-xl">
                                  <div className="flex items-center gap-2 shrink-0">
                                    <span className="px-2.5 py-1 bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-xs font-black">
                                      &quot;{filler.word}&quot;
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold">× {filler.count}</span>
                                  </div>
                                  <div className="flex-1 space-y-0.5">
                                    <span className="text-[9px] text-emerald-700 font-black uppercase tracking-wider block">Alternative</span>
                                    <p className="text-xs text-slate-700 font-semibold leading-normal">{filler.alternative}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : evaluation.fillerWords.totalCount > 0 ? (
                          <div className="p-4 bg-[#FEF5D1] border border-slate-200 rounded-xl">
                            <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block mb-1">Most Used Filler</span>
                            <p className="text-xs text-slate-700 font-semibold">
                              Your most used filler is &quot;{evaluation.fillerWords.mostUsed}&quot;. Practice replacing it with a deliberate 1-second silent pause.
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-[#E2EFEB] border border-slate-200 rounded-xl">
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block mb-1">🎉 Filler-Free Speech!</span>
                            <p className="text-xs text-slate-700 font-semibold">
                              Outstanding! You delivered your speech without any filler words. This shows excellent verbal control and confidence. Keep it up!
                            </p>
                          </div>
                        )}

                        {/* Quick tip */}
                        <div className="p-3.5 bg-[#E8E6F6] border border-slate-200 rounded-xl space-y-1">
                          <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block">💡 Pro Tip</span>
                          <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                            When you feel the urge to say a filler word, embrace the silence instead. A deliberate 1-second pause sounds confident and thoughtful to your audience — far better than &quot;um&quot; or &quot;uh&quot;.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {activeResultTab === 'mechanics' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs"
                      >
                        <div className="space-y-2">
                          <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block mb-1">Strengths</span>
                          <ul className="space-y-1.5 text-slate-700 pl-4 list-disc leading-relaxed font-semibold">
                            {evaluation.strengths.slice(0, 3).map((str, idx) => (
                              <li key={idx}>{str}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-black text-rose-700 uppercase tracking-wider block mb-1">Weaknesses</span>
                          <ul className="space-y-1.5 text-slate-700 pl-4 list-disc leading-relaxed font-semibold">
                            {evaluation.weaknesses.slice(0, 3).map((weak, idx) => (
                              <li key={idx}>{weak}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {activeResultTab === 'suggestions' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 text-xs font-semibold"
                      >
                        <div className="space-y-2">
                          <span className="text-xs font-black text-amber-700 uppercase tracking-wider block">Suggestions</span>
                          <ul className="space-y-1.5 text-slate-700 pl-4 list-disc leading-relaxed">
                            {evaluation.suggestions.slice(0, 3).map((sug, idx) => (
                              <li key={idx}>{sug}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-[#E8E6F6] border border-slate-200 rounded-xl text-slate-700">
                          <span className="text-xs font-black text-indigo-700 flex items-center gap-1.5 uppercase tracking-wide mb-1.5">
                            Next session objectives
                          </span>
                          <ul className="space-y-1 text-slate-800 pl-4 list-disc leading-relaxed">
                            {evaluation.actionPlan.map((act, idx) => (
                              <li key={idx}>{act}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Follow-up Panel */}
                <FollowUpPanel topic={topic?.title || ""} transcript={transcript} />

                <button
                  onClick={handleReset}
                  className="doodle-btn w-full py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-bold"
                >
                  Generate New Speaking Topic
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

// Subcomponent for follow-up questions
function FollowUpPanel({ topic, transcript }: { topic: string; transcript: string }) {
  const { loading, generateFollowUps } = useGemini();
  const [questions, setQuestions] = useState<FollowUpQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [evaluationFeedback, setEvaluationFeedback] = useState<Record<string, string>>({});
  const [evaluatingQuestionId, setEvaluatingQuestionId] = useState<string | null>(null);

  const fetchQuestions = async () => {
    try {
      const qData = await generateFollowUps(topic, transcript);
      setQuestions(qData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEvaluateAnswer = async (qId: string) => {
    const userAnswer = answers[qId];
    if (!userAnswer) return;
    setEvaluatingQuestionId(qId);
    
    // Simulate Gemini evaluating individual question answer
    setTimeout(() => {
      setEvaluationFeedback(prev => ({
        ...prev,
        [qId]: "Excellent critical analysis. You addressed the trade-offs directly and supported your argument with clean logic. Focus on slightly shortening your opening hook."
      }));
      setEvaluatingQuestionId(null);
    }, 1200);
  };

  return (
    <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b-2 border-slate-200 pb-3">
        <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          AI Follow-Up Questions
        </h3>
        {questions.length === 0 && (
          <button
            onClick={fetchQuestions}
            disabled={loading}
            className="px-3.5 py-1.5 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 font-extrabold text-xs rounded-xl transition-all shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            {loading ? 'Generating...' : 'Load Questions'}
          </button>
        )}
      </div>

      {questions.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
            <span>Question {currentIdx + 1} of 5</span>
            <div className="flex gap-1.5">
              {questions.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-3 h-3 rounded-full cursor-pointer border border-slate-300 transition-colors ${
                    currentIdx === idx ? 'bg-indigo-600' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#FAF6F0] border border-slate-200 rounded-xl shadow-sm">
            <span className="text-[10px] uppercase tracking-wider font-black text-slate-400 block mb-1">Question</span>
            <p className="text-xs font-black text-slate-800 leading-normal">
              {questions[currentIdx].text}
            </p>
          </div>

          {/* Answer Textbox */}
          <div className="space-y-2">
            <textarea
              value={answers[questions[currentIdx].id] || ''}
              onChange={(e) => setAnswers({ ...answers, [questions[currentIdx].id]: e.target.value })}
              placeholder="Type or dictate your answer..."
              rows={3}
              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-semibold font-mono leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-700 shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] disabled:opacity-30 cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-700 shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] disabled:opacity-30 cursor-pointer"
              >
                Next
              </button>
            </div>

            <button
              onClick={() => handleEvaluateAnswer(questions[currentIdx].id)}
              disabled={evaluatingQuestionId !== null || !answers[questions[currentIdx].id]}
              className="px-3.5 py-1.5 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 font-extrabold text-[10px] rounded-xl shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50 cursor-pointer"
            >
              {evaluatingQuestionId === questions[currentIdx].id ? 'Analyzing...' : 'Submit Answer'}
            </button>
          </div>

          {/* Evaluation result if submitted */}
          {evaluationFeedback[questions[currentIdx].id] && (
            <div className="p-4 bg-[#E2EFEB] border border-slate-200 rounded-xl space-y-1 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-black text-emerald-700 block">AI Evaluation feedback</span>
              <p className="text-xs text-slate-700 leading-relaxed font-bold">
                {evaluationFeedback[questions[currentIdx].id]}
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

