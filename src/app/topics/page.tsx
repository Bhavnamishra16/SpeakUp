'use client';

import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { useSessionStore } from '../../store/useSessionStore';
import { 
  Library, 
  Search, 
  Bookmark, 
  Calendar,
  BookmarkMinus
} from 'lucide-react';

const CuteLibraryIllustration = () => (
  <svg className="w-24 h-24 shrink-0 mx-auto" viewBox="0 0 160 160" fill="none">
    <circle cx="80" cy="80" r="76" fill="#F4F0E6" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="6 4" />
    <rect x="35" y="55" width="22" height="70" rx="3" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5" transform="rotate(-15 35 55)" />
    <line x1="30" y1="75" x2="50" y2="70" stroke="#94A3B8" strokeWidth="1.5" />
    <rect x="70" y="45" width="25" height="80" rx="3" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" />
    <rect x="76" y="55" width="13" height="15" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.2" />
    <rect x="102" y="60" width="22" height="65" rx="3" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="102" y1="80" x2="124" y2="80" stroke="#94A3B8" strokeWidth="1.5" />
    <circle cx="79" cy="90" r="2" fill="#334155" />
    <circle cx="87" cy="90" r="2" fill="#334155" />
    <path d="M81 95c1 1.5 3 1.5 4 0" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="25" y1="125" x2="135" y2="125" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M130 35l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1" />
    <path d="M22 45l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1" />
  </svg>
);

const LibraryHeroDoodle = () => (
  <svg viewBox="0 0 260 200" fill="none" className="w-full h-full max-h-48">
    {/* Bookshelf board */}
    <rect x="30" y="145" width="200" height="8" rx="2" fill="#FAF6F0" stroke="#94A3B8" strokeWidth="1.5"/>

    {/* Book 1 (standing purple) */}
    <rect x="50" y="75" width="20" height="70" rx="3" fill="#E8E6F6" stroke="#94A3B8" strokeWidth="1.5" />
    <line x1="56" y1="85" x2="56" y2="135" stroke="#94A3B8" strokeWidth="1"/>
    <line x1="64" y1="85" x2="64" y2="135" stroke="#94A3B8" strokeWidth="1"/>

    {/* Book 2 (standing yellow tilted) */}
    <rect x="73" y="70" width="20" height="70" rx="3" fill="#FEF5D1" stroke="#94A3B8" strokeWidth="1.5" transform="rotate(8 73 70)"/>

    {/* Book 3 (horizontal stack green) */}
    <rect x="110" y="125" width="60" height="20" rx="3" fill="#E2EFEB" stroke="#94A3B8" strokeWidth="1.5"/>
    <line x1="120" y1="135" x2="160" y2="135" stroke="#94A3B8" strokeWidth="1.2"/>

    {/* Book 4 (horizontal stack pink) */}
    <rect x="115" y="105" width="50" height="20" rx="3" fill="#FDE7E9" stroke="#94A3B8" strokeWidth="1.5"/>
    <line x1="125" y1="115" x2="155" y2="115" stroke="#94A3B8" strokeWidth="1.2"/>

    {/* Cute reading character sitting on top of stacked books */}
    <circle cx="140" cy="80" r="16" fill="#fff" stroke="#94A3B8" strokeWidth="1.5"/>
    <path d="M127 75c0-10 26-10 26 0" fill="#334155"/>
    {/* Glasses */}
    <circle cx="134" cy="80" r="3.5" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <circle cx="146" cy="80" r="3.5" stroke="#475569" strokeWidth="1.1" fill="none"/>
    <line x1="137.5" y1="80" x2="142.5" y2="80" stroke="#475569" strokeWidth="1.1"/>
    <path d="M136 86c1.5 1 4 1 5.5 0" stroke="#475569" strokeWidth="1.2" strokeLinecap="round"/>

    {/* Floating stars/sparkles */}
    <path d="M200 65l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FEF5D1" stroke="#CBD5E1" strokeWidth="1"/>
    <path d="M35 110l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="#FDE7E9" stroke="#CBD5E1" strokeWidth="1"/>
  </svg>
);

export default function TopicLibrary() {
  const { sessions, toggleSaveSession } = useSessionStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'impromptu' | 'debate' | 'interview' | 'gd'>('all');

  // Filter sessions
  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.topic.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesType = true;
    if (selectedFilter !== 'all') {
      const typeMap = {
        impromptu: 'public_speaking',
        debate: 'debate',
        interview: 'interview',
        gd: 'group_discussion'
      };
      matchesType = session.type === typeMap[selectedFilter];
    }

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-900 flex flex-col font-sans">
      <Navigation />

      <main className="flex-1 w-full min-h-screen pb-16 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-8 pt-10 flex flex-col gap-10">
          
          {/* Header */}
          <section className="flex items-end justify-between gap-8 pb-10 border-b border-slate-200">
            <div className="flex flex-col gap-4 flex-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Speaking Archive</p>
              <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight flex items-start gap-3">
                <Library className="w-8 h-8 text-indigo-500 mt-1 shrink-0 animate-pulse" />
                Topic & Practice Library
              </h1>
              <p className="text-slate-500 text-sm max-w-sm">
                Browse through your speaking session archives and revisit your favorited prompts.
              </p>
            </div>
            {/* Hero doodle */}
            <div className="w-64 h-52 shrink-0 hidden md:block">
              <LibraryHeroDoodle />
            </div>
          </section>

          {/* Search and Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <div className="relative col-span-1 md:col-span-2">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search practice topic histories..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 text-slate-800 transition-all"
              />
            </div>

            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as any)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700 cursor-pointer transition-all"
            >
              <option value="all">All Arenas</option>
              <option value="impromptu">Impromptu Coaching</option>
              <option value="debate">Debate Duel</option>
              <option value="interview">Mock Interview</option>
              <option value="gd">Group Discussion</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Section: Session History */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Recorded Sessions
              </h2>

              <div className="space-y-4">
                {filteredSessions.length === 0 ? (
                  <div className="p-12 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400 text-sm bg-white">
                    No sessions match your search or filters.
                  </div>
                ) : (
                  filteredSessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 space-y-3"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            session.type === 'public_speaking' ? 'bg-[#EEECFB] text-indigo-600' :
                            session.type === 'debate' ? 'bg-[#FDF0F2] text-rose-500' :
                            session.type === 'interview' ? 'bg-[#EDFBF4] text-emerald-600' :
                            'bg-[#FFFAEB] text-amber-600'
                          }`}>
                            {session.type.replace('_', ' ')}
                          </span>
                          <h3 className="font-semibold text-sm text-slate-900 pt-1">{session.topic}</h3>
                          <span className="text-[10px] text-slate-400 block" suppressHydrationWarning>
                            Logged: {new Date(session.timestamp).toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleSaveSession(session.id)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            session.saved
                              ? 'bg-[#FEF5D1] border-amber-200 text-amber-600'
                              : 'bg-white border-slate-200 text-slate-300 hover:text-slate-600'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      {session.evaluation && (
                        <div className="flex flex-wrap gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 justify-between">
                          <div className="flex gap-3">
                            <div className="text-slate-500">Overall: <strong className="text-slate-800">{session.evaluation.scores.overall}/10</strong></div>
                            <div className="text-slate-500">Fluency: <strong className="text-indigo-600">{session.evaluation.scores.fluency}/10</strong></div>
                            <div className="text-slate-500">Clarity: <strong className="text-emerald-600">{session.evaluation.scores.clarity}/10</strong></div>
                          </div>
                          <div className="text-slate-500">Duration: <strong className="text-slate-700">{session.durationActual}s</strong></div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Section: Bookmarked / Saved Topics */}
            <div className="space-y-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-indigo-600" />
                Bookmarked Topics
              </h2>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                <CuteLibraryIllustration />
                
                {sessions.filter(s => s.saved).length === 0 ? (
                  <p className="text-xs text-slate-400 leading-normal text-center py-4">
                    Bookmarked sessions will appear here for fast review.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {sessions.filter(s => s.saved).map((savedS) => (
                      <div
                        key={savedS.id}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:-translate-y-0.5 hover:shadow-sm transition-all"
                      >
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-semibold text-slate-900 truncate max-w-[160px]">
                            {savedS.topic}
                          </h4>
                          <span className="text-[9px] text-slate-400 block capitalize mt-0.5">
                            {savedS.type.replace('_', ' ')}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleSaveSession(savedS.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 bg-white border border-slate-200 rounded-lg cursor-pointer transition-colors"
                        >
                          <BookmarkMinus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
