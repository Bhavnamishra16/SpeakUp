'use client';

import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useSessionStore } from '../../store/useSessionStore';
import { useUserStore } from '../../store/useUserStore';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  Flame, 
  CheckCircle2, 
  Activity, 
  Calendar, 
  ChevronRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AnalyticsDashboard() {
  const { sessions } = useSessionStore();
  const { profile } = useUserStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracker' | 'history'>('tracker');
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Basic calculations
  const totalSpeeches = sessions.length;
  
  // Calculate average scores across all sessions
  const getAverage = (key: 'overall' | 'confidence' | 'fluency' | 'vocabulary' | 'structure' | 'clarity') => {
    if (totalSpeeches === 0) return 0;
    const sum = sessions.reduce((acc, curr) => {
      const score = curr.evaluation?.scores[key] || 0;
      return acc + score;
    }, 0);
    return Math.round((sum / totalSpeeches) * 10) / 10;
  };

  const avgOverall = getAverage('overall');
  const avgConfidence = getAverage('confidence');
  const avgFluency = getAverage('fluency');
  const avgVocabulary = getAverage('vocabulary');
  const avgStructure = getAverage('structure');
  const avgClarity = getAverage('clarity');

  // Speaking level system
  let userLevel = 1;
  let levelTitle = 'Fresh Voice';
  let nextLevelThreshold = 3;
  let sessionsInCurrentLevel = totalSpeeches;
  let progressPercent = 0;
  let levelDescription = 'Start your public speaking journey! Practice your first speeches to build baseline confidence.';

  if (totalSpeeches >= 16) {
    userLevel = 5;
    levelTitle = 'Master Orator';
    nextLevelThreshold = 25;
    sessionsInCurrentLevel = totalSpeeches - 16;
    progressPercent = Math.min(100, Math.round((sessionsInCurrentLevel / 9) * 100));
    levelDescription = 'Stellar! You have reached the highest peak of IMPR impromptu speech mastery. Share your eloquence with the universe.';
  } else if (totalSpeeches >= 10) {
    userLevel = 4;
    levelTitle = 'Eloquent Presenter';
    nextLevelThreshold = 16;
    sessionsInCurrentLevel = totalSpeeches - 10;
    progressPercent = Math.round((sessionsInCurrentLevel / 6) * 100);
    levelDescription = 'Incredible articulation. Your phrasing and pacing flow naturally. Perfect your arguments to become a Master Orator.';
  } else if (totalSpeeches >= 6) {
    userLevel = 3;
    levelTitle = 'Articulate Speaker';
    nextLevelThreshold = 10;
    sessionsInCurrentLevel = totalSpeeches - 6;
    progressPercent = Math.round((sessionsInCurrentLevel / 4) * 100);
    levelDescription = 'Steady climb! You structure your speeches logically and control filler words. Keep practice sessions up to level up.';
  } else if (totalSpeeches >= 3) {
    userLevel = 2;
    levelTitle = 'Impromptu Challenger';
    nextLevelThreshold = 6;
    sessionsInCurrentLevel = totalSpeeches - 3;
    progressPercent = Math.round((sessionsInCurrentLevel / 3) * 100);
    levelDescription = 'Great job. You are past the icebreaker stage. Focus on speaking prompts and timing parameters to rise.';
  } else if (totalSpeeches >= 1) {
    userLevel = 1;
    levelTitle = 'Icebreaker Novice';
    nextLevelThreshold = 3;
    sessionsInCurrentLevel = totalSpeeches;
    progressPercent = Math.round((sessionsInCurrentLevel / 3) * 100);
    levelDescription = 'Nice start! Your first speech has been recorded. Complete a few more sessions to level up your verbal fluency.';
  }

  // Milestones verification
  const milestones = [
    {
      id: 'm1',
      title: 'First Icebreaker',
      description: 'Record your first speech session.',
      isCompleted: totalSpeeches >= 1,
      accent: 'bg-indigo-50 border-indigo-100 text-indigo-700'
    },
    {
      id: 'm2',
      title: 'Pacing Control',
      description: 'Deliver a speech with fewer than 3 filler words.',
      isCompleted: sessions.some(s => (s.evaluation?.fillerWords.totalCount || 0) < 3),
      accent: 'bg-emerald-50 border-emerald-100 text-emerald-700'
    },
    {
      id: 'm3',
      title: 'Confidence Boost',
      description: 'Achieve a confidence rating of 8.5 or higher.',
      isCompleted: sessions.some(s => (s.evaluation?.scores.confidence || 0) >= 8.5),
      accent: 'bg-amber-50 border-amber-100 text-amber-700'
    },
    {
      id: 'm4',
      title: 'Speaking Marathon',
      description: 'Record a practice speech lasting over 2 minutes.',
      isCompleted: sessions.some(s => s.durationActual >= 120),
      accent: 'bg-rose-50 border-rose-100 text-rose-700'
    }
  ];

  // Prepare custom SVG progression line coordinates
  // Sort sessions oldest to newest for chronological progress
  const chartData = [...sessions]
    .reverse()
    .slice(-10) // Show last 10 sessions
    .map((s, idx) => ({
      index: idx + 1,
      score: s.evaluation?.scores.overall || 0,
      topic: s.topic
    }));

  const svgWidth = 500;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  // Function to build SVG points
  const points = chartData.map((d, i) => {
    const x = paddingX + (i * (svgWidth - 2 * paddingX)) / Math.max(1, chartData.length - 1);
    // Score maps 0 to height-paddingY, 10 to paddingY
    const y = svgHeight - paddingY - (d.score * (svgHeight - 2 * paddingY)) / 10;
    return { x, y, score: d.score, topic: d.topic, index: d.index };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`
    : '';

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 w-full pb-16">
        <div className="max-w-5xl mx-auto px-8 pt-10 flex flex-col gap-8">
          
          {/* Header */}
          <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-1.5">
              <span className="px-3 py-1 bg-[#E2EFEB] text-emerald-800 border border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-wider">
                SpeakUp Growth
              </span>
              <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight flex items-start gap-2.5">
                <TrendingUp className="w-8 h-8 text-indigo-500 mt-1 shrink-0 animate-pulse" />
                Speaking Journey & Progress Tracker
              </h1>
              <p className="text-slate-500 text-sm max-w-lg font-medium leading-relaxed">
                Log practice sessions, hit key verbal articulation milestones, and track your level growth over time.
              </p>
            </div>
            
            {/* Minimal tab switches */}
            <div className="bg-[#EAE6DF] p-1 rounded-full flex gap-1 border border-slate-200 shadow-inner select-none self-start md:self-auto">
              <button
                onClick={() => setActiveTab('tracker')}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'tracker' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'history' 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Session Logs ({totalSpeeches})
              </button>
            </div>
          </section>

          <AnimatePresence mode="wait">
            {activeTab === 'tracker' ? (
              <motion.div
                key="tracker-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* ── CORE LEVEL SYSTEM CARD ── */}
                <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-md flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
                  {/* Decorative background shape */}
                  <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-[#FEF5D1]/30 to-[#EEECFB]/30 rounded-full blur-2xl pointer-events-none" />

                  {/* Level Badge Circle */}
                  <div className="w-32 h-32 rounded-full bg-[#13493E] border-4 border-yellow-300 flex flex-col items-center justify-center text-white shrink-0 shadow-lg relative select-none">
                    <span className="text-[10px] uppercase font-black tracking-wider text-yellow-300">Level</span>
                    <span className="text-5xl font-black leading-none mt-0.5">{userLevel}</span>
                    {/* Badge stars */}
                    <div className="absolute -bottom-2.5 bg-yellow-400 border border-[#13493E] text-slate-900 text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">
                      {levelTitle}
                    </div>
                  </div>

                  {/* Level Progress Description */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">Level Progress Summary</h2>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-xl">
                        {levelDescription}
                      </p>
                    </div>

                    <div className="space-y-1.5 max-w-md">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600">
                        <span>Speeches logged: {totalSpeeches}</span>
                        <span>Next level: {nextLevelThreshold} speeches</span>
                      </div>
                      
                      {/* Custom Glassy Progress Bar */}
                      <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200/50 p-0.5 relative shadow-inner">
                        <motion.div 
                          className="bg-gradient-to-r from-emerald-500 to-[#13493E] h-full rounded-full transition-all" 
                          style={{ width: `${progressPercent}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Info Items */}
                  <div className="flex flex-row md:flex-col gap-6 items-center border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8 shrink-0 w-full md:w-auto justify-around">
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Time Practiced</span>
                      <h4 className="text-xl font-black text-[#13493E] mt-0.5">{Math.round(profile.totalSpeakingTime / 60)} min</h4>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block">Daily Streak</span>
                      <h4 className="text-xl font-black text-amber-500 mt-0.5 flex items-center justify-center gap-1">
                        <Flame className="w-5 h-5 text-amber-500 fill-current" />
                        {profile.streak} Days
                      </h4>
                    </div>
                  </div>
                </div>

                {/* ── PROGRESS GRAPH & COMPETENCY INDICATORS GRID ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Custom SVG Progression Line Chart (8 Columns) */}
                  <div className="lg:col-span-7 glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-indigo-600 font-black uppercase tracking-widest block">Rating Progression</span>
                        <h3 className="font-extrabold text-sm text-slate-900">Impression Rating Trend</h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold font-mono">Last 10 sessions</span>
                    </div>

                    {totalSpeeches === 0 ? (
                      <div className="h-[220px] bg-slate-50/50 border border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center p-6 gap-2">
                        <Activity className="w-8 h-8 text-slate-300" />
                        <h4 className="font-extrabold text-xs text-slate-600">No session trend data</h4>
                        <p className="text-[10px] text-slate-400 font-semibold max-w-xs leading-normal">
                          Practice impromptu speech topics or interviews to generate performance charts.
                        </p>
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-center">
                        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-w-lg">
                          <defs>
                            <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.25)" />
                              <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                            </linearGradient>
                          </defs>

                          {/* Grid Lines */}
                          {[0, 2.5, 5, 7.5, 10].map((level, i) => {
                            const y = svgHeight - paddingY - (level * (svgHeight - 2 * paddingY)) / 10;
                            return (
                              <g key={i}>
                                <line 
                                  x1={paddingX} 
                                  y1={y} 
                                  x2={svgWidth - paddingX} 
                                  y2={y} 
                                  stroke="#F1F5F9" 
                                  strokeWidth="1.2" 
                                />
                                <text 
                                  x={paddingX - 10} 
                                  y={y + 3} 
                                  textAnchor="end" 
                                  className="text-[8px] font-black fill-slate-400 font-mono"
                                >
                                  {level}
                                </text>
                              </g>
                            );
                          })}

                          {/* Area Fill */}
                          {areaPath && (
                            <path 
                              d={areaPath} 
                              fill="url(#chartAreaGrad)" 
                            />
                          )}

                          {/* Line Path */}
                          {linePath && (
                            <path 
                              d={linePath} 
                              fill="none" 
                              stroke="#6366F1" 
                              strokeWidth="2.5" 
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          )}

                          {/* Points / Dots */}
                          {points.map((p, i) => (
                            <g key={i} className="group">
                              <circle 
                                cx={p.x} 
                                cy={p.y} 
                                r="4" 
                                fill="#ffffff" 
                                stroke="#6366F1" 
                                strokeWidth="2.5" 
                                className="cursor-pointer hover:r-5 transition-all"
                              />
                              <text
                                x={p.x}
                                y={p.y - 10}
                                textAnchor="middle"
                                className="text-[8px] font-black fill-slate-800 font-mono"
                              >
                                {p.score}
                              </text>
                              <text
                                x={p.x}
                                y={svgHeight - 10}
                                textAnchor="middle"
                                className="text-[7px] font-bold fill-slate-400 font-sans"
                              >
                                #{p.index}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Competency Rings Indicators (5 Columns) */}
                  <div className="lg:col-span-5 glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-5">
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[9px] text-emerald-700 font-black uppercase tracking-widest block">Competency Indices</span>
                      <h3 className="font-extrabold text-sm text-slate-900">Communication Capacities</h3>
                    </div>

                    {totalSpeeches === 0 ? (
                      <div className="space-y-4 py-4">
                        {[
                          { label: 'Fluency Indicator', color: 'bg-emerald-500' },
                          { label: 'Confidence Score', color: 'bg-indigo-500' },
                          { label: 'Vocabulary Richness', color: 'bg-amber-500' },
                          { label: 'Structural Mastery', color: 'bg-rose-500' }
                        ].map((item, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold text-slate-400">
                              <span>{item.label}</span>
                              <span>--</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className={`${item.color} h-full w-[15%] opacity-20`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {/* Circular ring 1: Fluency */}
                        <div className="flex flex-col items-center p-3 rounded-2xl bg-[#FAF6F0]/30 border border-slate-200/40 text-center">
                          <div className="w-14 h-14 relative flex items-center justify-center select-none">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="28" cy="28" r="23" stroke="#F1F5F9" strokeWidth="3.5" fill="transparent" />
                              <circle cx="28" cy="28" r="23" stroke="#10B981" strokeWidth="3.5" fill="transparent" strokeDasharray={144} strokeDashoffset={144 - (144 * avgFluency * 10) / 100} />
                            </svg>
                            <span className="absolute text-[11px] font-black text-slate-800">{avgFluency}/10</span>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mt-2 block">Fluency</span>
                        </div>

                        {/* Circular ring 2: Confidence */}
                        <div className="flex flex-col items-center p-3 rounded-2xl bg-[#FAF6F0]/30 border border-slate-200/40 text-center">
                          <div className="w-14 h-14 relative flex items-center justify-center select-none">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="28" cy="28" r="23" stroke="#F1F5F9" strokeWidth="3.5" fill="transparent" />
                              <circle cx="28" cy="28" r="23" stroke="#6366F1" strokeWidth="3.5" fill="transparent" strokeDasharray={144} strokeDashoffset={144 - (144 * avgConfidence * 10) / 100} />
                            </svg>
                            <span className="absolute text-[11px] font-black text-slate-800">{avgConfidence}/10</span>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mt-2 block">Confidence</span>
                        </div>

                        {/* Circular ring 3: Vocabulary */}
                        <div className="flex flex-col items-center p-3 rounded-2xl bg-[#FAF6F0]/30 border border-slate-200/40 text-center">
                          <div className="w-14 h-14 relative flex items-center justify-center select-none">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="28" cy="28" r="23" stroke="#F1F5F9" strokeWidth="3.5" fill="transparent" />
                              <circle cx="28" cy="28" r="23" stroke="#F59E0B" strokeWidth="3.5" fill="transparent" strokeDasharray={144} strokeDashoffset={144 - (144 * avgVocabulary * 10) / 100} />
                            </svg>
                            <span className="absolute text-[11px] font-black text-slate-800">{avgVocabulary}/10</span>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mt-2 block">Vocabulary</span>
                        </div>

                        {/* Circular ring 4: Structure */}
                        <div className="flex flex-col items-center p-3 rounded-2xl bg-[#FAF6F0]/30 border border-slate-200/40 text-center">
                          <div className="w-14 h-14 relative flex items-center justify-center select-none">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="28" cy="28" r="23" stroke="#F1F5F9" strokeWidth="3.5" fill="transparent" />
                              <circle cx="28" cy="28" r="23" stroke="#EF4444" strokeWidth="3.5" fill="transparent" strokeDasharray={144} strokeDashoffset={144 - (144 * avgStructure * 10) / 100} />
                            </svg>
                            <span className="absolute text-[11px] font-black text-slate-800">{avgStructure}/10</span>
                          </div>
                          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest mt-2 block">Structure</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── MILESTONE ACHIEVEMENTS TIMELINE ── */}
                <section className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-indigo-500" />
                      Milestone Accomplishments
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {milestones.map((milestone) => (
                      <div 
                        key={milestone.id} 
                        className={`p-5 rounded-2xl border flex flex-col justify-between shadow-sm relative overflow-hidden transition-all bg-white border-slate-200`}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${
                              milestone.isCompleted 
                                ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                                : 'bg-slate-50 border-slate-100 text-slate-400'
                            }`}>
                              {milestone.isCompleted ? 'Unlocked' : 'Locked'}
                            </span>
                            
                            {/* Checkmark circle */}
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border shadow-inner ${
                              milestone.isCompleted
                                ? 'bg-emerald-500 border-emerald-600 text-white'
                                : 'bg-slate-50 border-slate-200 text-transparent'
                            }`}>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          
                          <h4 className="font-extrabold text-xs text-slate-800">{milestone.title}</h4>
                          <p className="text-[10px] font-medium text-slate-500 leading-normal">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="history-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {totalSpeeches === 0 ? (
                  <div className="glass-card bg-white border border-slate-200 rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-3">
                    <Activity className="w-10 h-10 text-slate-300" />
                    <h4 className="font-extrabold text-slate-800 text-base">No Sessions Logged Yet</h4>
                    <p className="text-xs text-slate-500 max-w-sm font-semibold leading-relaxed">
                      Complete a speech topic in our practice arenas to record speech timestamps and review feedback reports.
                    </p>
                    <Link
                      href="/practice/topic"
                      className="mt-3 px-5 py-2.5 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-slate-900 fill-current" />
                      Start First Speech
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map((session) => {
                      const isExpanded = expandedSessionId === session.id;
                      const scores = session.evaluation?.scores;
                      const fillersCount = session.evaluation?.fillerWords.totalCount || 0;
                      
                      return (
                        <div 
                          key={session.id}
                          className="glass-card bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition-all"
                        >
                          {/* Row Header */}
                          <div 
                            onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                            className="p-5 flex items-center justify-between gap-6 cursor-pointer hover:bg-slate-50/50 select-none"
                          >
                            <div className="min-w-0 flex-1 space-y-1">
                              <span className="text-[9px] text-indigo-600 font-black uppercase tracking-wider block">
                                {session.type === 'public_speaking' ? 'Public Speaking' : session.type}
                              </span>
                              <h4 className="font-extrabold text-xs text-slate-900 truncate max-w-lg">
                                {session.topic}
                              </h4>
                              <div className="flex gap-4 items-center text-[10px] text-slate-400 font-bold">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {new Date(session.timestamp).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </span>
                                <span>Duration: {session.durationActual}s</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 shrink-0">
                              <div className="text-right">
                                <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Rating</span>
                                <span className="text-sm font-black text-indigo-600">{scores?.overall || 0}/10</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 text-slate-400 transform transition-transform ${
                                isExpanded ? 'rotate-90' : ''
                              }`} />
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4 bg-slate-50/20">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Transcript */}
                                <div className="md:col-span-2 space-y-1.5">
                                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">Transcript</span>
                                  <p className="text-xs text-slate-700 font-semibold leading-relaxed font-mono bg-white p-4 border border-slate-200/60 rounded-xl h-44 overflow-y-auto no-scrollbar">
                                    {session.transcript}
                                  </p>
                                </div>

                                {/* Quick Scores & Fillers */}
                                <div className="space-y-4">
                                  <div className="space-y-1.5">
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">Scores</span>
                                    <div className="bg-white border border-slate-200/60 rounded-xl p-3 grid grid-cols-2 gap-3 text-xs">
                                      <div className="flex justify-between font-semibold">
                                        <span className="text-slate-500">Fluency:</span>
                                        <span className="font-extrabold text-slate-900">{scores?.fluency}</span>
                                      </div>
                                      <div className="flex justify-between font-semibold">
                                        <span className="text-slate-500">Confidence:</span>
                                        <span className="font-extrabold text-slate-900">{scores?.confidence}</span>
                                      </div>
                                      <div className="flex justify-between font-semibold">
                                        <span className="text-slate-500">Vocabulary:</span>
                                        <span className="font-extrabold text-slate-900">{scores?.vocabulary}</span>
                                      </div>
                                      <div className="flex justify-between font-semibold">
                                        <span className="text-slate-500">Structure:</span>
                                        <span className="font-extrabold text-slate-900">{scores?.structure}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-1.5">
                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest block">Pacing & Fillers</span>
                                    <div className="bg-white border border-slate-200/60 rounded-xl p-3 flex justify-between items-center text-xs font-bold">
                                      <span className="text-slate-500">Filler Words:</span>
                                      <span className={`px-2 py-0.5 rounded ${
                                        fillersCount > 4 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
                                      }`}>
                                        {fillersCount} word{fillersCount !== 1 ? 's' : ''}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Strengths & suggestions */}
                              {session.evaluation && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-white border border-slate-200/60 p-4 rounded-xl space-y-1.5">
                                    <span className="text-[9px] text-emerald-700 font-black uppercase tracking-widest block">Strengths</span>
                                    <ul className="text-xs text-slate-600 font-semibold list-disc pl-4 space-y-1">
                                      {session.evaluation.strengths.slice(0, 3).map((s, idx) => (
                                        <li key={idx}>{s}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="bg-white border border-slate-200/60 p-4 rounded-xl space-y-1.5">
                                    <span className="text-[9px] text-rose-700 font-black uppercase tracking-widest block">Suggestions</span>
                                    <ul className="text-xs text-slate-600 font-semibold list-disc pl-4 space-y-1">
                                      {session.evaluation.suggestions.slice(0, 3).map((s, idx) => (
                                        <li key={idx}>{s}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
