'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../../../components/Navigation';
import { useGemini } from '../../../hooks/useGemini';
import { 
  Volume2, 
  Play, 
  Pause, 
  RefreshCw, 
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock list of words to cycle through during spin animation
const SPIN_WORDS = [
  'Smug', 'Cognition', 'Pugnacious', 'Ephemeral', 'Obfuscate', 
  'Resilient', 'Pragmatic', 'Ubiquitous', 'Cacophony', 'Superfluous',
  'Venerate', 'Loquacious', 'Epitome', 'Enigma', 'Capricious',
  'Eloquent', 'Aesthetic', 'Benevolent', 'Conundrum', 'Dichotomy'
];

export default function LearnVocabPage() {
  const { loading: aiLoading, generateVocabWord } = useGemini();

  // Active word details state
  const [activeWord, setActiveWord] = useState({
    word: 'Cognition',
    type: 'n.',
    definition: 'the mental action of acquiring knowledge and understanding',
    example: 'Sleep deprivation steadily erodes cognition, slowing the very thinking we need most under pressure.',
    speakingAngle: 'Talk about how your cognition changes when you are tired or stressed.'
  });

  // Cylinder slot previews
  const [prevWord, setPrevWord] = useState('Smug');
  const [nextWord, setNextWord] = useState('Pugnacious');
  const [spinning, setSpinning] = useState(false);
  const [currentSpinIdx, setCurrentSpinIdx] = useState(0);

  // Filters state
  const [language, setLanguage] = useState<'us' | 'uk'>('us');
  const [category, setCategory] = useState<'random' | 'academic' | 'business'>('random');

  // Timer state
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Slot lever rotation state
  const [leverRotation, setLeverRotation] = useState(0);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Text-to-Speech pronunciation
  const speakWord = () => {
    if ('speechSynthesis' in window) {
      // Cancel any current speaking
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeWord.word);
      utterance.lang = language === 'us' ? 'en-US' : 'en-GB';
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  // Timer logic
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      // Play a subtle beep
      if ('AudioContext' in window || '(webkitAudioContext)' in window) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(520, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        } catch (e) {
          console.log(e);
        }
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, timeLeft]);

  const handleStartTimer = () => {
    setTimerActive(true);
  };

  const handlePauseTimer = () => {
    setTimerActive(false);
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimeLeft(30);
  };

  // Pull lever and spin logic
  const handlePullLever = async () => {
    if (spinning || aiLoading) return;
    
    // Animate lever arm down
    setLeverRotation(60);
    setSpinning(true);

    // Rapidly cycle the slot cylinder index
    let cycles = 0;
    if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);

    cycleIntervalRef.current = setInterval(() => {
      setCurrentSpinIdx((prev) => (prev + 1) % SPIN_WORDS.length);
      cycles++;
    }, 100);

    // Spring lever back to upright position
    setTimeout(() => {
      setLeverRotation(0);
    }, 300);

    try {
      // Fetch new vocabulary word from Gemini or Fallback
      const vocabResult = await generateVocabWord(category);

      // Minimum spinning delay
      setTimeout(() => {
        if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
        
        // Land on the word
        setActiveWord(vocabResult);

        // Map surrounding preview words in cylinder list
        const vocabIndex = SPIN_WORDS.indexOf(vocabResult.word);
        if (vocabIndex !== -1) {
          setPrevWord(SPIN_WORDS[(vocabIndex - 1 + SPIN_WORDS.length) % SPIN_WORDS.length]);
          setNextWord(SPIN_WORDS[(vocabIndex + 1) % SPIN_WORDS.length]);
        } else {
          // Generate dynamic preview words if the landed word isn't in mock lists
          setPrevWord(SPIN_WORDS[Math.floor(Math.random() * SPIN_WORDS.length)]);
          setNextWord(SPIN_WORDS[Math.floor(Math.random() * SPIN_WORDS.length)]);
        }

        setSpinning(false);
      }, 1500);

    } catch (e) {
      console.error(e);
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
      setSpinning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 w-full pb-16 pt-8">
        <div className="max-w-5xl mx-auto px-8 flex flex-col gap-10">

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* ── LEFT COLUMN: TITLE & CARD ── */}
            <div className="space-y-6">
              
              {/* Hand-drawn style title banner */}
              <div className="flex flex-col select-none relative pl-2">
                {/* Wavy line highlights */}
                <h1 className="text-5xl font-black text-[#13493E] tracking-tight uppercase leading-none">
                  Learn<br />Vocab
                </h1>
                <div className="h-1 bg-yellow-400 w-36 rounded-full mt-1.5" />
                <div className="h-0.5 bg-yellow-400/80 w-24 rounded-full mt-1" />
                
                {/* Steps instructions */}
                <ol className="mt-6 space-y-1 text-base font-bold text-[#13493E] tracking-tight">
                  <li className="flex items-center gap-1.5">1) Get random vocab</li>
                  <li className="flex items-center gap-1.5">2) Pronounce correctly</li>
                  <li className="flex items-center gap-1.5">3) Practice speaking</li>
                </ol>
              </div>

              {/* Active Vocabulary Word Card */}
              <div className="glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">{activeWord.word}</h2>
                      
                      {/* Audio pronunciation speaker icon */}
                      <button 
                        onClick={speakWord}
                        className="w-7 h-7 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 active:scale-95 transition-all shadow-sm cursor-pointer"
                        title="Listen pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-slate-400 italic font-mono">{activeWord.type}</p>
                  </div>
                  
                  <span className="px-2.5 py-1 bg-[#E2EFEB] text-emerald-700 border border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-wider">
                    Word Details
                  </span>
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">Definition</span>
                    <p className="text-xs text-slate-700 font-bold leading-normal">{activeWord.definition}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block">Example Sentence</span>
                    <p className="text-xs text-slate-600 font-medium italic leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-200/40">
                      &quot;{activeWord.example}&quot;
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-indigo-500 uppercase font-black tracking-widest block">Speaking Prompt / Angle</span>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed border-l-3 border-indigo-400 pl-3">
                      {activeWord.speakingAngle}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: SLOT CYLINDER & TIMER ── */}
            <div className="space-y-8 flex flex-col items-center">
              
              {/* Slot Cylinder Box (3 words stacked) */}
              <div className="w-full glass-card bg-white border border-slate-200 rounded-3xl p-8 flex items-center justify-between gap-6 relative overflow-hidden shadow-md max-w-md">
                
                {/* Cylinder window */}
                <div className="flex-1 w-full border border-slate-200 bg-[#FAF6F0] rounded-2xl h-[160px] relative overflow-hidden flex flex-col items-center justify-center shadow-inner select-none">
                  {/* Vertical fade masks */}
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
                  
                  {/* Winding list */}
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    {/* Top word (Faded) */}
                    <span className="text-sm font-semibold text-slate-300 font-serif leading-none italic">
                      {spinning ? SPIN_WORDS[(currentSpinIdx - 1 + SPIN_WORDS.length) % SPIN_WORDS.length] : prevWord}
                    </span>
                    
                    {/* Center word (Active) */}
                    <span className="text-2xl font-black text-indigo-700 font-serif leading-none border-y-2 border-dashed border-indigo-200/50 py-2.5 px-6">
                      {spinning ? SPIN_WORDS[currentSpinIdx] : activeWord.word}
                    </span>
                    
                    {/* Bottom word (Faded) */}
                    <span className="text-sm font-semibold text-slate-300 font-serif leading-none italic">
                      {spinning ? SPIN_WORDS[(currentSpinIdx + 1) % SPIN_WORDS.length] : nextWord}
                    </span>
                  </div>
                </div>

                {/* Slot Machine Lever Arm (Draggable) */}
                <div className={`w-16 h-36 shrink-0 relative flex justify-center transition-all duration-300 ${
                  spinning || aiLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'
                }`}>
                  {/* Pivot box */}
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 absolute bottom-10 z-20 flex items-center justify-center shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  </div>
                  
                  {/* Arm shaft and knob */}
                  <motion.div
                    className={`w-2.5 bg-slate-300 absolute bottom-12 rounded-t-full origin-bottom ${
                      !spinning && !aiLoading ? 'cursor-grab active:cursor-grabbing hover:brightness-110' : 'cursor-not-allowed'
                    }`}
                    style={{ height: '70px', transformOrigin: 'center bottom' }}
                    animate={{ rotate: leverRotation }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    onClick={!spinning && !aiLoading ? handlePullLever : undefined}
                    drag={!spinning && !aiLoading ? "y" : false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{ top: 0, bottom: 0.8 }}
                    onDrag={(event, info) => {
                      if (spinning || aiLoading) return;
                      const rotation = Math.min(60, Math.max(0, info.offset.y));
                      setLeverRotation(rotation);
                    }}
                    onDragEnd={(event, info) => {
                      if (spinning || aiLoading) return;
                      if (info.offset.y > 35) {
                        handlePullLever();
                      } else {
                        setLeverRotation(0);
                      }
                    }}
                  >
                    {/* Red knob ball */}
                    <div className="w-8 h-8 rounded-full bg-red-400 border border-red-500 absolute top-[-24px] left-[-9px] shadow-sm flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white/40" />
                    </div>
                  </motion.div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full justify-center max-w-xs">
                <button
                  onClick={handlePullLever}
                  disabled={spinning || aiLoading}
                  className="flex-1 py-3 bg-[#FEF5D1] hover:bg-yellow-100 disabled:opacity-50 text-slate-900 border border-slate-200 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${spinning ? 'animate-spin' : ''}`} />
                  Spin!
                </button>
                <button
                  onClick={handleStartTimer}
                  disabled={timerActive || timeLeft === 0}
                  className="flex-grow py-3 bg-white hover:bg-slate-50 disabled:opacity-50 text-slate-800 border border-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm hover:translate-y-[-1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  Start Timer →
                </button>
              </div>

              {/* Dropdowns Configuration */}
              <div className="flex gap-4 w-full max-w-md">
                <div className="flex-1 space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none text-slate-700 transition-all shadow-sm"
                  >
                    <option value="us">US EN</option>
                    <option value="uk">UK EN</option>
                  </select>
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none text-slate-700 transition-all shadow-sm"
                  >
                    <option value="random">Random</option>
                    <option value="academic">Academic</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </div>

              {/* ── TIMER SECTION (30 Sec Countdown) ── */}
              <div className="w-full glass-card bg-white border border-slate-200 rounded-3xl p-6 shadow-md max-w-md flex flex-col items-center gap-4">
                <div className="w-full flex justify-between items-center border-b border-slate-100 pb-2">
                  <h3 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    30-Second Speaking Timer
                  </h3>
                  <span className={`text-[9px] font-black uppercase tracking-wider ${
                    timeLeft === 0 ? 'text-rose-500 animate-pulse' : 'text-slate-400'
                  }`}>
                    {timeLeft === 0 ? 'Time up!' : 'Active'}
                  </span>
                </div>

                <div className="flex items-center gap-8 py-2">
                  {/* Digital Clock */}
                  <div className="text-center">
                    <span className={`text-4xl font-black font-mono tracking-tight transition-colors ${
                      timeLeft <= 5 ? 'text-red-500' : 'text-slate-900'
                    }`}>
                      00:{timeLeft.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest block mt-0.5">Remaining time</span>
                  </div>

                  {/* Circular visual feedback */}
                  <div className="w-16 h-16 relative flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#F1F5F9"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke={timeLeft <= 5 ? "#EF4444" : "#6366F1"}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={176}
                        strokeDashoffset={176 - (176 * timeLeft) / 30}
                        transition={{ duration: 0.3 }}
                      />
                    </svg>
                    <Clock className="absolute w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex items-center gap-2 w-full">
                  {timerActive ? (
                    <button
                      onClick={handlePauseTimer}
                      className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Pause className="w-3.5 h-3.5 text-slate-600 fill-current" />
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={handleStartTimer}
                      disabled={timeLeft === 0}
                      className="flex-1 py-2 bg-[#E2EFEB] hover:bg-green-100 disabled:opacity-50 text-slate-900 border border-slate-200 font-black rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                      Start
                    </button>
                  )}
                  <button
                    onClick={handleResetTimer}
                    className="py-2 px-4 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
