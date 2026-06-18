'use client';

import React, { useState } from 'react';
import Navigation from '../../../components/Navigation';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import { useGemini } from '../../../hooks/useGemini';
import { useSessionStore } from '../../../store/useSessionStore';
import { useUserStore } from '../../../store/useUserStore';
import { DebateTurn, SpeechEvaluation, Session } from '../../../types';
import { 
  MessageSquare, 
  User, 
  Cpu, 
  Send, 
  Mic, 
  Square, 
  Award, 
  RefreshCw, 
  ShieldAlert, 
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CuteDebateIllustration = () => (
  <svg className="w-24 h-24 shrink-0 mx-auto" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="56" fill="#FAF6F0" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3" />
    {/* Left speech bubble */}
    <path d="M25 45h30c4 0 7 3 7 7v14c0 4-3 7-7 7H37l-7 7v-7h-5c-4 0-7-3-7-7V52c0-4 3-7 7-7z" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="22" y1="55" x2="42" y2="55" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="22" y1="63" x2="35" y2="63" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Right speech bubble */}
    <path d="M95 55H65c-4 0-7 3-7 7v14c0 4 3 7 7 7h5l7 7v-7h8c4 0 7-3 7-7V62c0-4-3-7-7-7z" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="75" y1="65" x2="95" y2="65" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="75" y1="73" x2="88" y2="73" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />

    {/* Sparkle */}
    <path d="M60 25l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1" />
  </svg>
);

const DebateHeroDoodle = () => (
  <svg viewBox="0 0 260 200" fill="none" className="w-full h-full max-h-48">
    {/* Left debater */}
    <path d="M40 140c0-15 8-25 18-25s18 10 18 25" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="58" cy="100" r="16" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Left hair */}
    <path d="M42 96c0-10 7-16 16-16s16 6 16 16" fill="#475569"/>
    {/* Left glasses */}
    <circle cx="52" cy="100" r="3.5" stroke="#475569" strokeWidth="1.2" fill="none"/>
    <circle cx="64" cy="100" r="3.5" stroke="#475569" strokeWidth="1.2" fill="none"/>
    <line x1="55.5" y1="100" x2="60.5" y2="100" stroke="#475569" strokeWidth="1.2"/>
    <path d="M54 107c2 1.5 5 1.5 7 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Right debater */}
    <path d="M184 140c0-15 8-25 18-25s18 10 18 25" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="202" cy="100" r="16" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Right hair */}
    <path d="M186 96c0-10 7-16 16-16s16 6 16 16" fill="#64748B"/>
    {/* Right face details */}
    <circle cx="196" cy="99" r="1.5" fill="#475569"/>
    <circle cx="208" cy="99" r="1.5" fill="#475569"/>
    <path d="M198 106c2 1.5 5 1.5 7 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Podium left */}
    <rect x="30" y="140" width="56" height="40" rx="4" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1.5"/>
    <line x1="36" y1="150" x2="80" y2="150" stroke="#E2E8F0" strokeWidth="1.5"/>
    <line x1="36" y1="160" x2="60" y2="160" stroke="#E2E8F0" strokeWidth="1.5"/>

    {/* Podium right */}
    <rect x="174" y="140" width="56" height="40" rx="4" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1.5"/>
    <line x1="180" y1="150" x2="224" y2="150" stroke="#E2E8F0" strokeWidth="1.5"/>
    <line x1="180" y1="160" x2="204" y2="160" stroke="#E2E8F0" strokeWidth="1.5"/>

    {/* Speech Bubble Pro (Left) */}
    <path d="M80 65c0-12 24-12 24 0 0 7-10 10-14 10l-4 4 1-4" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.2"/>
    <path d="M86 61h12" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    <path d="M87 67h8" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>

    {/* Speech Bubble Con (Right) */}
    <path d="M180 65c0-12-24-12-24 0 0 7 10 10 14 10l4 4-1-4" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1.2"/>
    <path d="M162 61h12" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    <path d="M165 67h8" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>

    {/* VS Text in middle */}
    <circle cx="130" cy="95" r="16" fill="#EEECFB" stroke="#94A3B8" strokeWidth="1.5"/>
    <text x="130" y="100" textAnchor="middle" fill="#6366F1" className="text-xs font-black" style={{ fontSize: '10px' }}>VS</text>

    {/* Sparkles */}
    <path d="M130 35l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M15 80l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FDE7E9" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M245 80l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#E2EFEB" stroke="#CBD5E1" strokeWidth="1"/>
  </svg>
);


export default function DebateArena() {
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    handleEditTranscript,
    resetTranscript 
  } = useSpeechRecognition();

  const { loading: aiLoading, getDebateRebuttal, evaluateSpeech } = useGemini();
  const { addSession } = useSessionStore();
  const { addSessionToStats } = useUserStore();

  // Debate step state: 'setup' | 'active' | 'completed'
  const [step, setStep] = useState<'setup' | 'active' | 'completed'>('setup');
  
  // Stance: 'A' represents Affirmative, 'B' represents Negative
  const [position, setPosition] = useState<'A' | 'B'>('A');
  const [motionText, setMotionText] = useState('Universal Basic Income (UBI) should be implemented globally to combat AI job displacement.');
  
  // History of debate turns
  const [turns, setTurns] = useState<DebateTurn[]>([]);
  const [debateEvaluation, setDebateEvaluation] = useState<SpeechEvaluation | null>(null);
  const [evaluatingDebate, setEvaluatingDebate] = useState(false);

  const handleStartDebate = () => {
    setTurns([
      {
        id: 'd1',
        sender: 'gemini',
        text: position === 'A' 
          ? "Welcome to this debate arena. As the Negative side, I will argue that global UBI is economically unsustainable and damages workforce incentives. Please present your opening constructive arguments for the Affirmative side."
          : "Welcome to this debate arena. As the Affirmative side, I will argue that global UBI is critical to human dignity and economic stability. Please present your opening refutations/constructive arguments for the Negative side.",
        timestamp: new Date().toISOString()
      }
    ]);
    setStep('active');
  };

  const handleSendArgument = async () => {
    if (!transcript.trim()) return;

    const userTurn: DebateTurn = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: transcript,
      timestamp: new Date().toISOString()
    };

    const updatedTurns = [...turns, userTurn];
    setTurns(updatedTurns);
    resetTranscript();

    try {
      // Fetch dynamic rebuttal from Gemini
      const res = await getDebateRebuttal(motionText, position, updatedTurns);
      
      const geminiTurn: DebateTurn = {
        id: Math.random().toString(36).substring(7),
        sender: 'gemini',
        text: res.rebuttalText,
        timestamp: new Date().toISOString()
      };

      setTurns([...updatedTurns, geminiTurn]);
    } catch (e) {
      console.error(e);
      // Fallback fallback turn if error
      const geminiTurn: DebateTurn = {
        id: Math.random().toString(36).substring(7),
        sender: 'gemini',
        text: "That is an interesting assertion, but it ignores the inflationary pressure that injecting cash liquidity directly into consumer markets will create.",
        timestamp: new Date().toISOString()
      };
      setTurns([...updatedTurns, geminiTurn]);
    }
  };

  const handleCompleteDebate = async () => {
    setEvaluatingDebate(true);
    // Combine all user arguments to send for evaluation
    const userTranscript = turns
      .filter(t => t.sender === 'user')
      .map(t => t.text)
      .join('\n\n');

    try {
      const evalResult = await evaluateSpeech(
        `Debate: ${motionText} (Stance: ${position === 'A' ? 'Affirmative' : 'Negative'})`,
        userTranscript || "No user input provided.",
        180 // Arbitrary speech duration for debate rounds
      );

      setDebateEvaluation(evalResult);
      setStep('completed');

      // Save to localStorage history
      const newSession: Session = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: 'debate',
        topic: motionText,
        transcript: userTranscript,
        durationActual: 180,
        evaluation: evalResult,
        saved: false,
        meta: { position, turnsCount: turns.length }
      };

      addSession(newSession);
      addSessionToStats(180);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluatingDebate(false);
    }
  };

  const handleResetDebate = () => {
    setTurns([]);
    setDebateEvaluation(null);
    setStep('setup');
    resetTranscript();
  };

  const motions = [
    "Universal Basic Income (UBI) should be implemented globally to combat AI job displacement.",
    "Social media platforms should be legally classified as publishers and held liable for user content.",
    "Nuclear energy is essential to achieving net-zero global carbon emissions by 2050.",
    "Cryptocurrencies do more harm than good in the global financial system."
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 w-full min-h-screen pb-16 relative overflow-hidden flex flex-col">
        <div className="max-w-5xl mx-auto px-8 pt-10 flex flex-col gap-10 flex-grow w-full">
          
          {/* Header */}
          <section className="flex items-end justify-between gap-8 pb-10 border-b border-slate-200">
            <div className="flex flex-col gap-4 flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Speaking Arena</p>
              <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight flex items-start gap-3">
                <MessageSquare className="w-8 h-8 text-indigo-500 mt-1 shrink-0 animate-pulse" />
                AI Debate Arena
              </h1>
              <p className="text-slate-500 text-sm max-w-sm">
                Challenge Gemini in a round-based competitive debate and polish your persuasive logic.
              </p>
              {step !== 'setup' && (
                <button
                  onClick={handleResetDebate}
                  className="self-start mt-2 px-4 py-2 border border-slate-200 text-xs bg-white text-slate-700 font-semibold rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Exit Arena
                </button>
              )}
            </div>
            {/* Hero doodle */}
            <div className="w-64 h-52 shrink-0 hidden md:block">
              <DebateHeroDoodle />
            </div>
          </section>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Debate Setup */}
            {step === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-card bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md"
              >
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#E2EFEB] border border-slate-200 flex items-center justify-center font-bold">
                    <Sparkles className="w-4.5 h-4.5 text-purple-600" />
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-base">Setup Debate Duel</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Debate Motion
                    </label>
                    <textarea
                      value={motionText}
                      onChange={(e) => setMotionText(e.target.value)}
                      rows={3}
                      className="w-full p-4 bg-[#FAF6F0] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 font-semibold leading-relaxed"
                    />
                    
                    {/* Fast selectors */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {motions.map((mot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setMotionText(mot)}
                          className="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl text-[10px] truncate max-w-xs transition-all shadow-sm active:translate-y-[1px] active:shadow-none cursor-pointer"
                        >
                          {mot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Position Toggle */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Select Your Stance
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPosition('A')}
                        className={`py-4 rounded-xl border font-black text-xs transition-all cursor-pointer ${
                          position === 'A'
                            ? 'bg-[#E8E6F6] border-slate-200 text-indigo-700 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-[#FAF6F0]'
                        }`}
                      >
                        Position A (Affirmative)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPosition('B')}
                        className={`py-4 rounded-xl border font-black text-xs transition-all cursor-pointer ${
                          position === 'B'
                            ? 'bg-[#E8E6F6] border-slate-200 text-indigo-700 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-[#FAF6F0]'
                        }`}
                      >
                        Position B (Negative / Opposition)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#FAF6F0] border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <CuteDebateIllustration />
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h4 className="font-extrabold text-slate-900 text-sm">Debate Arena Rules</h4>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      You will take turns presenting constructive points or refuting arguments. After at least two rounds, click 'Conclude Debate' for a comprehensive assessment of your speech logic and confidence index.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStartDebate}
                  className="doodle-btn w-full py-4 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 rounded-2xl shadow-md hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-none transition-all font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-current text-slate-900" />
                  Enter Arena & Speak First
                </button>
              </motion.div>
            )}

            {/* Step 2: Active Debate Arena */}
            {step === 'active' && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6 flex-grow"
              >
                {/* Motion status board */}
                <div className="p-4 rounded-xl bg-[#FEF5D1] border border-slate-200 text-xs shadow-sm font-semibold text-slate-800">
                  <span className="text-purple-700 font-black uppercase tracking-wider block mb-1">Debate Motion</span>
                  <p className="text-slate-900 font-bold text-sm leading-relaxed">{motionText}</p>
                  <span className="text-slate-600 block mt-2 text-[10px] font-black uppercase tracking-wider">
                    Your Stance: <strong className="text-indigo-700">{position === 'A' ? 'Affirmative / Pro' : 'Negative / Opposition'}</strong>
                  </span>
                </div>

                {/* Turns conversation history log */}
                <div className="flex-grow min-h-[300px] overflow-y-auto no-scrollbar space-y-4 max-h-[360px] bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
                  {turns.map((turn) => (
                    <div
                      key={turn.id}
                      className={`flex gap-3 max-w-[85%] ${
                        turn.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border border-slate-200 shrink-0 ${
                        turn.sender === 'user' ? 'bg-[#E8E6F6] text-indigo-700' : 'bg-[#E2EFEB] text-purple-700'
                      }`}>
                        {turn.sender === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                      </div>
                      <div className={`p-4 rounded-2xl text-xs leading-relaxed font-bold border border-slate-200 shadow-sm ${
                        turn.sender === 'user'
                          ? 'bg-[#E8E6F6] text-slate-800 rounded-tr-none'
                          : 'bg-[#E2EFEB] text-slate-800 rounded-tl-none'
                      }`}>
                        {turn.text}
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex gap-3 max-w-[85%] mr-auto">
                      <div className={`w-8 h-8 rounded-full bg-[#E2EFEB] border border-slate-200 text-purple-700 flex items-center justify-center text-xs shrink-0 font-bold`}>
                        <Cpu className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="p-4 rounded-2xl text-xs bg-[#E2EFEB] border border-slate-200 text-slate-800 rounded-tl-none shadow-sm shimmer w-64 h-16" />
                    </div>
                  )}
                </div>

                {/* Speak panel controls */}
                <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                  {isListening ? (
                    <div className="flex items-center justify-between bg-[#FDE7E9] border border-slate-200 p-4 rounded-xl shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                        <span className="text-xs font-black text-rose-700">Microphone Recording...</span>
                      </div>
                      <button
                        onClick={stopListening}
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg border border-slate-200 shadow-sm active:translate-y-[1px] cursor-pointer"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={startListening}
                        className="px-4 py-3 bg-[#E2EFEB] hover:bg-green-100 text-slate-900 border border-slate-200 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] cursor-pointer"
                      >
                        <Mic className="w-4 h-4 fill-current text-slate-900 animate-pulse" />
                        Record Stance Rebuttal
                      </button>
                      <span className="text-slate-500 text-xs font-bold">Press button to record argument</span>
                    </div>
                  )}

                  {/* Transcript editor */}
                  {transcript && (
                    <div className="space-y-2">
                      <textarea
                        value={transcript}
                        onChange={(e) => handleEditTranscript(e.target.value)}
                        placeholder="dictated speech transcript will display here..."
                        rows={2}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800 font-semibold font-mono leading-relaxed"
                      />
                      <div className="flex justify-between items-center">
                        <button
                          onClick={resetTranscript}
                          className="text-xs text-slate-500 hover:text-slate-700 font-extrabold cursor-pointer"
                        >
                          Clear
                        </button>
                        <button
                          onClick={handleSendArgument}
                          disabled={aiLoading}
                          className="px-3.5 py-1.5 bg-[#FEF5D1] border border-slate-200 text-slate-900 rounded-xl text-xs font-black flex items-center gap-1 shadow-sm hover:bg-yellow-100 active:translate-y-[1px] active:shadow-none cursor-pointer"
                        >
                          Send Argument <Send className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Finalize Arena button */}
                <button
                  onClick={handleCompleteDebate}
                  disabled={evaluatingDebate || turns.length < 2}
                  className="doodle-btn w-full py-4 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 rounded-2xl shadow-md hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-none transition-all font-black flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {evaluatingDebate ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Gemini Assessing Debate Performance...
                    </>
                  ) : (
                    <>
                      <Award className="w-5 h-5" />
                      Conclude Debate & Assess Scores
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Step 3: Debate scorecard evaluation */}
            {step === 'completed' && debateEvaluation && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Overall Score */}
                <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
                  <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#FEF5D1] border border-slate-200 flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">Debate Assessment Scorecard</h3>
                      <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-black">Gemini review report</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    
                    <div className="col-span-2 md:col-span-1 p-5 bg-[#E8E6F6] border border-slate-200 text-center flex flex-col justify-center items-center rounded-2xl shadow-sm">
                      <span className="text-[10px] text-indigo-700 font-black uppercase tracking-wider">Persuasive Logic</span>
                      <span className="text-4xl font-black text-slate-900 mt-2">
                        {debateEvaluation.scores.persuasiveness} <span className="text-xs font-bold text-indigo-700">/10</span>
                      </span>
                    </div>

                    {Object.entries(debateEvaluation.scores)
                      .filter(([key]) => ['confidence', 'fluency', 'clarity', 'structure', 'overall'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="p-3.5 bg-[#FAF6F0] border border-slate-200 rounded-xl shadow-sm">
                          <div className="flex justify-between text-xs text-slate-600 capitalize mb-1.5 font-bold">
                            <span>{key}</span>
                            <span className="text-slate-900 font-black">{value}</span>
                          </div>
                          <div className="w-full bg-slate-200 border border-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-purple-600 h-full rounded-full" style={{ width: `${value * 10}%` }} />
                          </div>
                        </div>
                      ))}

                  </div>
                </div>

                {/* Bullet feedback lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-900 border-b-2 border-slate-200 pb-2">Debate Strengths</h3>
                    <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4 leading-relaxed font-semibold">
                      {debateEvaluation.strengths.map((str, idx) => (
                        <li key={idx}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-900 border-b-2 border-slate-200 pb-2">Areas of Refutation improvements</h3>
                    <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4 leading-relaxed font-semibold">
                      {debateEvaluation.suggestions.map((sug, idx) => (
                        <li key={idx}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleResetDebate}
                  className="doodle-btn w-full py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-bold rounded-2xl"
                >
                  Start New Motion Debate
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}

