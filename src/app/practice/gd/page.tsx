'use client';

import React, { useState } from 'react';
import Navigation from '../../../components/Navigation';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import { useGemini } from '../../../hooks/useGemini';
import { useSessionStore } from '../../../store/useSessionStore';
import { useUserStore } from '../../../store/useUserStore';
import { GDMessage, Session } from '../../../types';
import { 
  Users, 
  User, 
  PlusCircle, 
  Mic, 
  Square, 
  Award, 
  RefreshCw, 
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CuteGDIllustration = () => (
  <svg className="w-24 h-24 shrink-0 mx-auto" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="56" fill="#FAF6F0" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3" />
    {/* Left head */}
    <circle cx="40" cy="50" r="14" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M28 78c0-8 6-12 12-12s12 4 12 12" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="36" cy="48" r="1.5" fill="#475569" />
    <circle cx="44" cy="48" r="1.5" fill="#475569" />
    <path d="M38 53.5c1 1 2 1 3 0" stroke="#475569" strokeWidth="1" />

    {/* Right head */}
    <circle cx="80" cy="50" r="14" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5" />
    <path d="M68 78c0-8 6-12 12-12s12 4 12 12" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="76" cy="48" r="1.5" fill="#475569" />
    <circle cx="84" cy="48" r="1.5" fill="#475569" />
    <path d="M78 53.5c1 1 2 1 3 0" stroke="#475569" strokeWidth="1" />

    {/* Chat lines bridging them */}
    <path d="M48 40c4-4 12-4 16 0" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
    {/* Sparkle */}
    <path d="M60 65l1.5 2.5 2.5 1.5-2.5 1.5-1.5 2.5-1.5-2.5-2.5-1.5 2.5-1.5z" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1" />
  </svg>
);

const GDHeroDoodle = () => (
  <svg viewBox="0 0 260 200" fill="none" className="w-full h-full max-h-48">
    {/* Left Speaker */}
    <path d="M30 145c0-14 8-24 18-24s18 10 18 24" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="48" cy="107" r="15" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    <path d="M33 104c0-10 7-16 15-16s15 6 15 16" fill="#475569"/>
    <circle cx="43" cy="106" r="1.5" fill="#475569"/>
    <circle cx="53" cy="106" r="1.5" fill="#475569"/>
    <path d="M45 113c1.5 1 3.5 1 5 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Middle Speaker */}
    <path d="M112 135c0-14 8-24 18-24s18 10 18 24" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="130" cy="97" r="15" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    <path d="M115 94c0-10 7-16 15-16s15 6 15 16" fill="#64748B"/>
    {/* Glasses for middle speaker */}
    <circle cx="124" cy="97" r="3" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <circle cx="136" cy="97" r="3" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <line x1="127" y1="97" x2="133" y2="97" stroke="#475569" strokeWidth="1.1"/>
    <path d="M127 103c1.5 1 3.5 1 5 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Right Speaker */}
    <path d="M194 145c0-14 8-24 18-24s18 10 18 24" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="212" cy="107" r="15" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    <path d="M197 104c0-10 7-16 15-16s15 6 15 16" fill="#334155"/>
    <circle cx="207" cy="106" r="1.5" fill="#334155"/>
    <circle cx="217" cy="106" r="1.5" fill="#334155"/>
    <path d="M209 113c1.5 1 3.5 1 5 0" stroke="#334155" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Collaborative Table */}
    <ellipse cx="130" cy="155" rx="95" ry="12" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1.5"/>

    {/* Floating Speech Bubbles */}
    {/* Bubble Left */}
    <path d="M70 70c0-9 18-9 18 0 0 5-8 6-11 6l-3 3 1-3" fill="#EEECFB" stroke="#94A3B8" strokeWidth="1"/>
    {/* Bubble Right */}
    <path d="M190 70c0-9-18-9-18 0 0 5 8 6 11 6l3 3-1-3" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1"/>

    {/* Sparkles */}
    <path d="M130 40l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M15 80l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FDE7E9" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M245 80l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#E2EFEB" stroke="#CBD5E1" strokeWidth="1"/>
  </svg>
);


export default function GroupDiscussionCoach() {
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    handleEditTranscript,
    resetTranscript 
  } = useSpeechRecognition();

  const { loading: aiLoading, getGDNextTurn, evaluateSpeech } = useGemini();
  const { addSession } = useSessionStore();
  const { addSessionToStats } = useUserStore();

  // GD state: 'setup' | 'active' | 'completed'
  const [step, setStep] = useState<'setup' | 'active' | 'completed'>('setup');
  
  const [topicText, setTopicText] = useState('Will cashless economies increase financial inequality in developing nations?');
  const [messages, setMessages] = useState<GDMessage[]>([]);
  const [evaluatingGD, setEvaluatingGD] = useState(false);
  const [gdEvaluation, setGdEvaluation] = useState<any>(null);

  const handleStartGD = () => {
    // Generate initial participant statements
    const initialMsgs: GDMessage[] = [
      {
        id: 'g1',
        speakerName: 'Sarah (Tech Analyst)',
        avatarUrl: '/avatars/avatar1.png',
        text: "I think digitizing currencies has massive efficiency benefits, but the lack of digital literacy and power infrastructure in rural sectors remains a huge barrier. If we move to a completely cashless model, we risk locking millions out of basic commerce.",
        timestamp: new Date().toISOString(),
        isAI: true
      },
      {
        id: 'g2',
        speakerName: 'David (Business Strategist)',
        avatarUrl: '/avatars/avatar2.png',
        text: "I agree with Sarah, but we should also consider the formalization of the informal economy. Digital transactions bring businesses into the tax net, which boosts government revenue and enables infrastructure spending.",
        timestamp: new Date().toISOString(),
        isAI: true
      }
    ];

    setMessages(initialMsgs);
    setStep('active');
  };

  const handleUserIntervene = async () => {
    if (!transcript.trim()) return;

    const userMsg: GDMessage = {
      id: Math.random().toString(36).substring(7),
      speakerName: 'You (Leader)',
      avatarUrl: '/avatars/user.png',
      text: transcript,
      timestamp: new Date().toISOString(),
      isAI: false
    };

    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    resetTranscript();

    try {
      // Fetch response statement from another AI participant
      const nextTurn = await getGDNextTurn(topicText, updatedMsgs);
      
      const nextGDMsg: GDMessage = {
        id: Math.random().toString(36).substring(7),
        speakerName: nextTurn.speakerName,
        avatarUrl: nextTurn.avatarUrl || '/avatars/avatar3.png',
        text: nextTurn.text,
        timestamp: new Date().toISOString(),
        isAI: true
      };

      setMessages([...updatedMsgs, nextGDMsg]);
    } catch (e) {
      console.error(e);
      // Fallback response
      const fallbackGDMsg: GDMessage = {
        id: Math.random().toString(36).substring(7),
        speakerName: 'Elena (Social Advocate)',
        avatarUrl: '/avatars/avatar3.png',
        text: "That is a crucial point regarding financial inclusion. We must establish regulatory guardrails first to protect marginalized groups before fully transitioning cashless.",
        timestamp: new Date().toISOString(),
        isAI: true
      };
      setMessages([...updatedMsgs, fallbackGDMsg]);
    }
  };

  const handleCompleteGD = async () => {
    setEvaluatingGD(true);
    const userTranscript = messages
      .filter(m => !m.isAI)
      .map(m => m.text)
      .join('\n\n');

    try {
      // Request Gemini speech assessment
      const evalResult = await evaluateSpeech(
        `Group Discussion: ${topicText}`,
        userTranscript || "No user interventions in discussion.",
        150 // Mock duration
      );

      // Map evaluating speech results to custom Group Discussion scorecard variables
      const gdScorecard = {
        relevance: Math.round(evalResult.scores.clarity * 10) / 10,
        leadership: Math.round(evalResult.scores.structure * 1.1 * 10) / 10, // boost structure for leadership estimation
        clarity: evalResult.scores.clarity,
        communication: evalResult.scores.fluency,
        confidence: evalResult.scores.confidence,
        overall: evalResult.scores.overall,
        feedback: evalResult.suggestions.join(" ") + " Focus on synthesizing group stances."
      };

      setGdEvaluation(gdScorecard);
      setStep('completed');

      // Save session
      const newSession: Session = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        type: 'group_discussion',
        topic: topicText,
        transcript: userTranscript,
        durationActual: 150,
        evaluation: evalResult,
        saved: false,
        meta: { messagesCount: messages.length }
      };

      addSession(newSession);
      addSessionToStats(150);
    } catch (e) {
      console.error(e);
    } finally {
      setEvaluatingGD(false);
    }
  };

  const handleResetGD = () => {
    setMessages([]);
    setGdEvaluation(null);
    setStep('setup');
    resetTranscript();
  };

  const sampleTopics = [
    "Will cashless economies increase financial inequality in developing nations?",
    "Should carbon taxes be universally mandated for multi-national manufacturers?",
    "Is online privacy completely dead in the era of artificial intelligence models?",
    "Will micro-credentials replace traditional four-year college degrees?"
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
                <Users className="w-8 h-8 text-indigo-500 mt-1 shrink-0 animate-pulse" />
                Group Discussion Coach
              </h1>
              <p className="text-slate-500 text-sm max-w-sm">
                Jump into simulated team debates, articulate viewpoints, and get rated on group leadership.
              </p>
              {step !== 'setup' && (
                <button
                  onClick={handleResetGD}
                  className="self-start mt-2 px-4 py-2 border border-slate-200 text-xs bg-white text-slate-700 font-semibold rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Exit Session
                </button>
              )}
            </div>
            {/* Hero doodle */}
            <div className="w-64 h-52 shrink-0 hidden md:block">
              <GDHeroDoodle />
            </div>
          </section>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Setup */}
            {step === 'setup' && (
              <motion.div
                key="setup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-card bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md"
              >
                <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-slate-200 flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-amber-600 animate-spin" />
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-base">Create Group Discussion</h2>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-500">
                      GD Speaking Topic
                    </label>
                    <textarea
                      value={topicText}
                      onChange={(e) => setTopicText(e.target.value)}
                      rows={3}
                      className="w-full p-4 bg-[#FAF6F0] border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 font-semibold leading-relaxed"
                    />
                    
                    {/* Fast selectors */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {sampleTopics.map((top, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTopicText(top)}
                          className="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl text-[10px] truncate max-w-xs transition-all shadow-sm active:translate-y-[1px] active:shadow-none cursor-pointer"
                        >
                          {top}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#FAF6F0] border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <CuteGDIllustration />
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h4 className="font-extrabold text-slate-900 text-sm">GD Session Mechanics</h4>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      Participate in a team meeting where Sarah and David will present their viewpoints. Tap 'Intervene' to present your refutations, build consensus, and lead the team to a structured summary.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStartGD}
                  className="doodle-btn w-full py-4 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 rounded-2xl shadow-md hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-none transition-all font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Users className="w-5 h-5 fill-current text-slate-900" />
                  Initialize Group Session
                </button>
              </motion.div>
            )}

            {/* Step 2: Active Conversation */}
            {step === 'active' && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6 flex-grow"
              >
                {/* Topic card */}
                <div className="p-4 rounded-xl bg-[#FEF5D1] border border-slate-200 text-xs shadow-sm font-semibold text-slate-800">
                  <span className="text-amber-700 font-black uppercase tracking-wider block mb-1">Group Topic</span>
                  <p className="text-slate-900 font-bold text-sm leading-relaxed">{topicText}</p>
                </div>

                {/* Messages panel */}
                <div className="flex-grow min-h-[300px] overflow-y-auto no-scrollbar space-y-4 max-h-[360px] bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${
                        !msg.isAI ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 font-bold border border-slate-200 ${
                        !msg.isAI ? 'text-amber-700 bg-[#FEF5D1]' : 'text-slate-800 bg-[#E2EFEB]'
                      }`}>
                        {msg.speakerName.charAt(0)}
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-500 font-black block">
                          {msg.speakerName}
                        </span>
                        <div className={`p-4 rounded-2xl text-xs leading-relaxed font-bold border border-slate-200 shadow-sm ${
                          !msg.isAI
                            ? 'bg-[#FEF5D1] text-slate-850 rounded-tr-none'
                            : 'bg-[#FAF6F0] text-slate-800 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex gap-3 max-w-[85%] mr-auto">
                      <div className="w-8 h-8 rounded-full bg-[#E2EFEB] border border-slate-200 flex items-center justify-center text-xs shrink-0 font-bold">
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-700" />
                      </div>
                      <div className="p-4 rounded-2xl text-xs bg-[#FAF6F0] border border-slate-200 text-slate-800 rounded-tl-none shadow-sm shimmer w-64 h-14" />
                    </div>
                  )}
                </div>

                {/* Recorder intervention controls */}
                <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                  {isListening ? (
                    <div className="flex items-center justify-between bg-[#FDE7E9] border border-slate-200 p-4 rounded-xl shadow-sm text-rose-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                        <span className="text-xs font-black text-rose-700">Microphone input streaming...</span>
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
                        Intervene / Share Viewpoint
                      </button>
                      <span className="text-slate-500 text-xs font-bold">Press button to speak and record</span>
                    </div>
                  )}

                  {/* Transcript box */}
                  {transcript && (
                    <div className="space-y-2">
                      <textarea
                        value={transcript}
                        onChange={(e) => handleEditTranscript(e.target.value)}
                        placeholder="dictated viewpoint transcript will show here..."
                        rows={2}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 font-semibold font-mono leading-relaxed"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={resetTranscript}
                          className="text-xs text-slate-500 hover:text-slate-700 font-extrabold px-3 py-1.5 cursor-pointer"
                        >
                          Discard
                        </button>
                        <button
                          onClick={handleUserIntervene}
                          disabled={aiLoading}
                          className="px-4 py-2 bg-[#FEF5D1] border border-slate-200 text-slate-900 rounded-xl text-xs font-black shadow-sm hover:bg-yellow-100 active:translate-y-[1px] active:shadow-none cursor-pointer"
                        >
                          Submit to Group <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* End discussion assessment */}
                <button
                  onClick={handleCompleteGD}
                  disabled={evaluatingGD || messages.length < 3}
                  className="doodle-btn w-full py-4 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 rounded-2xl shadow-md hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-none transition-all font-black flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {evaluatingGD ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Gemini Compiling GD Evaluation...
                    </>
                  ) : (
                    <>
                      <Award className="w-5 h-5" />
                      Conclude Discussion & View Metrics
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* Step 3: Complete GD evaluation report */}
            {step === 'completed' && gdEvaluation && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Scorecards card */}
                <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
                  <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#FEF5D1] border border-slate-200 flex items-center justify-center">
                      <Award className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">Group Discussion Assessment</h3>
                      <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-black">Gemini review scorecard</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    
                    <div className="col-span-2 md:col-span-1 p-5 bg-[#E8E6F6] border border-slate-200 text-center flex flex-col justify-center items-center rounded-2xl shadow-sm">
                      <span className="text-[10px] text-indigo-750 font-black uppercase tracking-wider">Group Leadership</span>
                      <span className="text-4xl font-black text-slate-900 mt-2">
                        {gdEvaluation.leadership} <span className="text-xs font-bold text-indigo-700">/10</span>
                      </span>
                    </div>

                    {Object.entries(gdEvaluation)
                      .filter(([key]) => ['relevance', 'clarity', 'communication', 'confidence', 'overall'].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="p-3.5 bg-[#FAF6F0] border border-slate-200 rounded-xl shadow-sm">
                          <div className="flex justify-between text-xs text-slate-600 capitalize mb-1.5 font-bold">
                            <span>{key}</span>
                            <span className="text-slate-900 font-black">{value as number}</span>
                          </div>
                          <div className="w-full bg-slate-200 border border-slate-200 h-2 rounded-full overflow-hidden shadow-inner">
                            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(value as number) * 10}%` }} />
                          </div>
                        </div>
                      ))}

                  </div>
                </div>

                {/* Feedback note card */}
                <div className="p-6 rounded-2xl bg-[#E2EFEB] border border-slate-200 space-y-2 shadow-sm text-slate-800">
                  <h4 className="text-xs uppercase tracking-wider font-black text-emerald-700">Detailed coach remarks</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold">
                    {gdEvaluation.feedback}
                  </p>
                </div>

                <button
                  onClick={handleResetGD}
                  className="doodle-btn w-full py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-bold rounded-2xl"
                >
                  Start New Discussion Topic
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
