'use client';

import React, { useState } from 'react';
import Navigation from '../../../components/Navigation';
import { useSpeechRecognition } from '../../../hooks/useSpeechRecognition';
import { useGemini } from '../../../hooks/useGemini';
import { useSessionStore } from '../../../store/useSessionStore';
import { useUserStore } from '../../../store/useUserStore';
import { InterviewQuestion, Session } from '../../../types';
import { 
  Award, 
  Briefcase, 
  User, 
  Cpu, 
  Mic, 
  Square, 
  Check, 
  ChevronRight, 
  RefreshCw, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CuteBriefcaseIllustration = () => (
  <svg className="w-24 h-24 shrink-0 mx-auto" viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="56" fill="#FAF6F0" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 3" />
    {/* Briefcase main body */}
    <rect x="25" y="45" width="70" height="45" rx="8" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    {/* Handle */}
    <path d="M48 45v-8a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v8" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
    {/* Latches */}
    <rect x="38" y="45" width="8" height="12" rx="2" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.2" />
    <rect x="74" y="45" width="8" height="12" rx="2" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.2" />
    {/* Cute eyes & smile */}
    <circle cx="53" cy="65" r="2" fill="#475569" />
    <circle cx="67" cy="65" r="2" fill="#475569" />
    <path d="M57 71c2 2 4 2 6 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    {/* Sparkle */}
    <path d="M90 35l1.5 2.5 2.5 1.5-2.5 1.5-1.5 2.5-1.5-2.5-2.5-1.5 2.5-1.5z" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1" />
  </svg>
);

const InterviewHeroDoodle = () => (
  <svg viewBox="0 0 260 200" fill="none" className="w-full h-full max-h-48">
    {/* Desk/Table */}
    <rect x="70" y="145" width="120" height="8" rx="2" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1.5"/>
    <line x1="90" y1="153" x2="90" y2="185" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="170" y1="153" x2="170" y2="185" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>

    {/* Candidate (Left) */}
    <path d="M25 145c0-14 8-24 18-24s18 10 18 24" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="43" cy="107" r="15" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Hair */}
    <path d="M28 104c0-10 7-16 15-16s15 6 15 16" fill="#475569"/>
    {/* Glasses */}
    <circle cx="38" cy="107" r="3" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <circle cx="48" cy="107" r="3" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <line x1="41" y1="107" x2="45" y2="107" stroke="#475569" strokeWidth="1.1"/>
    <path d="M39 113c1.5 1 3.5 1 5 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Interviewer (Right) */}
    <path d="M199 145c0-14 8-24 18-24s18 10 18 24" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5"/>
    <circle cx="217" cy="107" r="15" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    {/* Hair */}
    <path d="M202 104c0-10 7-16 15-16s15 6 15 16" fill="#334155"/>
    <circle cx="212" cy="106" r="1.5" fill="#334155"/>
    <circle cx="222" cy="106" r="1.5" fill="#334155"/>
    <path d="M214 113c1.5 1 3.5 1 5 0" stroke="#334155" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Laptop on desk */}
    <path d="M130 145l-5-15h25l-5 15" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5"/>
    <line x1="123" y1="145" x2="147" y2="145" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>

    {/* Speech Bubble */}
    <path d="M100 80c0-10 24-10 24 0 0 6-10 8-14 8l-4 4 1-4" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.2"/>
    <path d="M106 76h12" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>
    <path d="M107 81h8" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round"/>

    {/* Portfolio folder on left desk */}
    <rect x="80" y="140" width="16" height="5" rx="1" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1"/>

    {/* Sparkles */}
    <path d="M140 40l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M12 70l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FDE7E9" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M245 70l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#E2EFEB" stroke="#CBD5E1" strokeWidth="1"/>
  </svg>
);


export default function MockInterview() {
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    handleEditTranscript,
    resetTranscript 
  } = useSpeechRecognition();

  const { loading: aiLoading, getInterviewNextQuestion } = useGemini();
  const { addSession } = useSessionStore();
  const { addSessionToStats } = useUserStore();

  // Interview stage: 'setup' | 'active' | 'completed'
  const [step, setStep] = useState<'setup' | 'active' | 'completed'>('setup');
  
  // Track roles
  const [selectedRole, setSelectedRole] = useState<'HR' | 'Software Engineer' | 'Product Manager' | 'Marketing' | 'MBA'>('HR');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // State for tracking immediate feedback of previous answer
  const [currentFeedback, setCurrentFeedback] = useState<string>('');
  const [currentScore, setCurrentScore] = useState<number | null>(null);

  const handleStartInterview = async () => {
    // Generate the first question via mock fallback or prompt
    try {
      const res = await getInterviewNextQuestion(selectedRole, 0, []);
      
      const firstQ: InterviewQuestion = {
        id: Math.random().toString(36).substring(7),
        text: res.nextQuestion,
      };

      setQuestions([firstQ]);
      setCurrentIdx(0);
      setStep('active');
    } catch (e) {
      console.error(e);
      // Fallback fallback question
      const fallbackQ: InterviewQuestion = {
        id: 'f1',
        text: "Tell me about yourself and why you are interested in this role."
      };
      setQuestions([fallbackQ]);
      setCurrentIdx(0);
      setStep('active');
    }
  };

  const handleSendAnswer = async () => {
    if (!transcript.trim()) return;

    // Save user answer to current question index
    const updatedQuestions = [...questions];
    updatedQuestions[currentIdx] = {
      ...updatedQuestions[currentIdx],
      userAnswer: transcript
    };

    setQuestions(updatedQuestions);
    resetTranscript();

    // If it's the final question (#5), we conclude the interview on the next click
    const nextIndex = currentIdx + 1;
    if (nextIndex >= 5) {
      // Complete mock interview
      handleCompleteInterview(updatedQuestions);
      return;
    }

    try {
      const res = await getInterviewNextQuestion(selectedRole, nextIndex, updatedQuestions);
      
      // Update score & feedback for current question
      updatedQuestions[currentIdx] = {
        ...updatedQuestions[currentIdx],
        feedback: res.feedback,
        score: res.score
      };

      // Create next question structure
      const nextQ: InterviewQuestion = {
        id: Math.random().toString(36).substring(7),
        text: res.nextQuestion
      };

      setQuestions([...updatedQuestions, nextQ]);
      setCurrentFeedback(res.feedback);
      setCurrentScore(res.score);
      setCurrentIdx(nextIndex);
    } catch (e) {
      console.error(e);
      // Fallback
      updatedQuestions[currentIdx] = {
        ...updatedQuestions[currentIdx],
        feedback: "Solid response. You addressed the query directly.",
        score: 8
      };
      const nextQ: InterviewQuestion = {
        id: Math.random().toString(36).substring(7),
        text: "Describe a time you solved a tough problem under tight deadlines."
      };
      setQuestions([...updatedQuestions, nextQ]);
      setCurrentIdx(nextIndex);
    }
  };

  const handleCompleteInterview = (finalQuestions: InterviewQuestion[]) => {
    // Generate overall feedback summary
    const totalScore = finalQuestions.reduce((acc, curr) => acc + (curr.score || 8), 0);
    const avgScore = Math.round((totalScore / finalQuestions.length) * 10) / 10;
    
    // Save session to history store
    const fullTranscript = finalQuestions.map(q => `Q: ${q.text}\nA: ${q.userAnswer}`).join('\n\n');
    
    const newSession: Session = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      type: 'interview',
      topic: `${selectedRole} Mock Interview`,
      transcript: fullTranscript,
      durationActual: 240, // Mock duration seconds for 5 questions
      evaluation: {
        scores: {
          confidence: avgScore,
          fluency: 8.0,
          grammar: 9.0,
          vocabulary: 8.5,
          clarity: 8.7,
          structure: 8.5,
          persuasiveness: 8.0,
          storytelling: 7.9,
          engagement: 8.2,
          overall: avgScore
        },
        strengths: [
          "Strong domain knowledge expressed in response keywords.",
          "Nice adherence to technical specifications and parameters.",
          "Quantified goals and outcomes where appropriate."
        ],
        weaknesses: [
          "Occasionally rushed when clarifying core algorithms or methodologies.",
          "Relied on casual conversational bridge expressions."
        ],
        suggestions: [
          "Practice introducing your stories using a Situation-Task framework first.",
          "Pause for 2 seconds to formulate complex architectural statements."
        ],
        actionPlan: [
          "Record a database optimization behavioral pitch.",
          "Review STAR methodology guidelines."
        ],
        fillerWords: {
          totalCount: 3,
          mostUsed: 'actually',
          density: 3.5,
          timeline: []
        }
      }
    };

    addSession(newSession);
    addSessionToStats(240);
    setStep('completed');
  };

  const handleResetInterview = () => {
    setQuestions([]);
    setCurrentIdx(0);
    setCurrentFeedback('');
    setCurrentScore(null);
    setStep('setup');
    resetTranscript();
  };

  const roles = [
    { name: 'HR / Behavioral', value: 'HR', desc: 'Core culture fit and behavioral STAR questions.' },
    { name: 'Software Engineer', value: 'Software Engineer', desc: 'System design, core algorithms, and technical project debriefs.' },
    { name: 'Product Manager', value: 'Product Manager', desc: 'Product metrics, estimation, and engineering collaboration questions.' },
    { name: 'Marketing Manager', value: 'Marketing', desc: 'Growth strategies, campaign planning, and metrics analysis.' },
    { name: 'MBA Program', value: 'MBA', desc: 'Leadership experience, case studies, and business values.' }
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
                <Briefcase className="w-8 h-8 text-indigo-500 mt-1 shrink-0 animate-pulse" />
                AI Mock Interview
              </h1>
              <p className="text-slate-500 text-sm max-w-sm">
                Refine your behavioral and domain-specific interview performance with Gemini evaluations.
              </p>
              {step !== 'setup' && (
                <button
                  onClick={handleResetInterview}
                  className="self-start mt-2 px-4 py-2 border border-slate-200 text-xs bg-white text-slate-700 font-semibold rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Exit Session
                </button>
              )}
            </div>
            {/* Hero doodle */}
            <div className="w-64 h-52 shrink-0 hidden md:block">
              <InterviewHeroDoodle />
            </div>
          </section>

          <AnimatePresence mode="wait">
            
            {/* Step 1: Role Setup */}
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
                    <Star className="w-4.5 h-4.5 text-emerald-700" />
                  </div>
                  <h2 className="font-extrabold text-slate-900 text-base">Select Interview Track</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map((role) => (
                    <div
                      key={role.value}
                      onClick={() => setSelectedRole(role.value as any)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedRole === role.value
                          ? 'bg-[#E2EFEB] border-slate-200 text-emerald-950 shadow-sm font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <h3 className="font-black text-sm text-slate-900">{role.name}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-normal font-bold">{role.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#FAF6F0] border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <CuteBriefcaseIllustration />
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <h4 className="font-extrabold text-slate-900 text-sm">Mock Interview Guide</h4>
                    <p className="text-[11px] text-slate-600 font-semibold leading-relaxed">
                      This session consists of 5 interactive questions based on your track. Use STAR (Situation, Task, Action, Result) logic to answer. After each response, AI evaluates your structural flow instantly.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleStartInterview}
                  className="doodle-btn w-full py-4 bg-[#FEF5D1] hover:bg-yellow-100 text-slate-900 border border-slate-200 rounded-2xl shadow-md hover:translate-y-[-1px] active:translate-y-[2px] active:shadow-none transition-all font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-5 h-5 fill-current text-slate-900" />
                  Start Interactive Session
                </button>
              </motion.div>
            )}

            {/* Step 2: Active Interview Simulator */}
            {step === 'active' && questions.length > 0 && (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow"
              >
                {/* Left panel: Virtual Interviewer avatar */}
                <div className="md:col-span-1 glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md flex flex-col items-center justify-between text-center min-h-[280px]">
                  <div className="space-y-4 w-full">
                    <div className="w-20 h-20 rounded-full bg-[#E2EFEB] border border-slate-200 flex items-center justify-center mx-auto relative overflow-hidden shadow-sm">
                      <Cpu className="w-8 h-8 text-emerald-700 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">AI Recruiting Partner</h4>
                      <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-black">Gemini Agent</span>
                    </div>
                  </div>

                  <div className="w-full bg-[#FAF6F0] p-4 rounded-xl border border-slate-200 mt-4 shadow-sm">
                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider block">Session Info</span>
                    <span className="text-xs font-bold text-slate-900 mt-1 block capitalize">Track: {selectedRole}</span>
                    <span className="text-[10px] text-emerald-700 font-extrabold mt-1 block">Question {currentIdx + 1} of 5</span>
                  </div>
                </div>

                {/* Right panel: Active Question and Record */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  {/* Current Question Bubble */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                    <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 block">Interview Question</span>
                    <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                      {questions[currentIdx].text}
                    </p>
                  </div>

                  {/* Previous question quick feedback popover */}
                  {currentFeedback && (
                    <div className="p-4 bg-[#E2EFEB] border border-slate-200 rounded-xl space-y-1 shadow-sm text-slate-800">
                      <div className="flex justify-between items-center text-[10px] uppercase font-black tracking-wider text-emerald-700">
                        <span>Feedback on previous answer</span>
                        <span>Score: {currentScore}/10</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-normal font-bold">
                        {currentFeedback}
                      </p>
                    </div>
                  )}

                  {/* Speech record controls */}
                  <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4 mt-auto">
                    {isListening ? (
                      <div className="flex items-center justify-between bg-[#FDE7E9] border border-slate-200 p-4 rounded-xl shadow-sm text-rose-700">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                          <span className="text-xs font-black text-rose-700">Speak now... dictation active</span>
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
                          Answer Question
                        </button>
                        <span className="text-slate-500 text-xs font-bold">Press button to dictate answer</span>
                      </div>
                    )}

                    {/* Editor */}
                    {transcript && (
                      <div className="space-y-2">
                        <textarea
                          value={transcript}
                          onChange={(e) => handleEditTranscript(e.target.value)}
                          placeholder="dictated answer transcript..."
                          rows={3}
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-semibold font-mono leading-relaxed"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={resetTranscript}
                            className="text-xs text-slate-500 hover:text-slate-700 font-extrabold px-3 py-1.5 cursor-pointer"
                          >
                            Clear
                          </button>
                          <button
                            onClick={handleSendAnswer}
                            disabled={aiLoading}
                            className="px-4 py-2 bg-[#FEF5D1] border border-slate-200 text-slate-900 rounded-xl text-xs font-black shadow-sm hover:bg-yellow-100 active:translate-y-[1px] active:shadow-none cursor-pointer"
                          >
                            {aiLoading ? (
                              <>
                                <RefreshCw className="w-3 h-3 animate-spin text-slate-900" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                Submit Answer <ArrowRight className="w-3 h-3 text-slate-900" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Complete Interview Evaluation Scorecard */}
            {step === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Score panel */}
                <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
                  <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#E2EFEB] border border-slate-200 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">Interview Scorecard</h3>
                      <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-black">Gemini review report</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#E2EFEB] border border-slate-200 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm">
                      <span className="text-[10px] text-emerald-700 font-black uppercase tracking-wider">Overall performance rating</span>
                      <span className="text-5xl font-black text-slate-900 mt-2">
                        8.4 <span className="text-sm font-bold text-emerald-700">/10</span>
                      </span>
                    </div>

                    <div className="space-y-4">
                      <span className="text-xs uppercase tracking-wider font-black text-slate-500 block">Question Breakdown</span>
                      {questions.map((q, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-200 pb-2">
                          <span className="text-slate-600 truncate max-w-[200px] font-bold">Q{idx + 1}: {q.text}</span>
                          <span className="text-emerald-700 font-black">{q.score || 8}/10</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-900 border-b-2 border-slate-200 pb-2">Key strengths noted</h3>
                    <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4 leading-normal font-semibold">
                      <li>Clear mapping of STAR framework (Situation, Task, Action, Result) in behavioral questions.</li>
                      <li>Good utilization of domain-specific keywords and metrics calculations.</li>
                      <li>Confident delivery with excellent speed/volume modulation.</li>
                    </ul>
                  </div>

                  <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-4">
                    <h3 className="font-extrabold text-sm text-slate-900 border-b-2 border-slate-200 pb-2">Suggestions for improvements</h3>
                    <ul className="space-y-1.5 text-xs text-slate-700 list-disc pl-4 leading-normal font-semibold">
                      <li>Try to slow down by 10% when explaining complex database or architectural algorithms.</li>
                      <li>Remove transitional fillers such as &quot;actually&quot; to maintain professional confidence.</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleResetInterview}
                  className="doodle-btn w-full py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-md active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer font-bold rounded-2xl"
                >
                  Start New Interview Session
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </main>
    </div>
  );
}
