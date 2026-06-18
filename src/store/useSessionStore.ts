import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session, Topic, SpeechStructure, DebateSession, InterviewSession, GDSession } from '../types';

interface SessionState {
  sessions: Session[];
  savedTopics: Topic[];
  debateSessions: DebateSession[];
  interviewSessions: InterviewSession[];
  gdSessions: GDSession[];
  currentTopic: Topic | null;
  currentStructure: SpeechStructure | null;
  
  addSession: (session: Session) => void;
  deleteSession: (id: string) => void;
  toggleSaveSession: (id: string) => void;
  addSavedTopic: (topic: Topic) => void;
  removeSavedTopic: (id: string) => void;
  setCurrentTopic: (topic: Topic | null) => void;
  setCurrentStructure: (structure: SpeechStructure | null) => void;
  
  addDebateSession: (debate: DebateSession) => void;
  updateDebateSession: (debate: DebateSession) => void;
  addInterviewSession: (interview: InterviewSession) => void;
  updateInterviewSession: (interview: InterviewSession) => void;
  addGDSession: (gd: GDSession) => void;
  updateGDSession: (gd: GDSession) => void;
  clearHistory: () => void;
}

const mockSessions: Session[] = [
  {
    id: 's1',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    type: 'public_speaking',
    topic: 'The Future of AI in Modern Education',
    transcript: 'Artificial intelligence is changing how students learn. Um, I believe that in the future, personalized tutors will help, like, every child learn at their own pace. Uh, however, we must also consider the digital divide, basically because not everyone has access to computers or fast internet.',
    durationActual: 45,
    saved: true,
    evaluation: {
      scores: {
        confidence: 8.2,
        fluency: 7.2,
        grammar: 8.8,
        vocabulary: 7.9,
        clarity: 8.0,
        structure: 7.5,
        persuasiveness: 7.0,
        storytelling: 6.8,
        engagement: 7.4,
        overall: 7.6
      },
      strengths: [
        'Clear statement of your main idea in the introduction.',
        'Good pace and clear pronounciation of vocabulary words.',
        'Use of contrasting points (personalized learning vs digital divide).'
      ],
      weaknesses: [
        'Frequent use of filler words such as "um", "like", and "uh".',
        'Abrupt transition into the issue of the digital divide.',
        'Weak conclusion; the speech ended without summarizing key takeaways.'
      ],
      suggestions: [
        'Pause for 1 second instead of saying "um" or "uh" when transitioning thoughts.',
        'Use transitional phrases: "On the other hand...", "Crucially, however..."',
        'End with a call to action or a strong vision statement.'
      ],
      actionPlan: [
        'Next session: Practice a 1-minute speech focusing only on reducing "um"s.',
        'Complete the PPF (Past, Present, Future) structuring exercise.'
      ],
      fillerWords: {
        totalCount: 4,
        mostUsed: 'um',
        density: 8.8, // 4 fillers in ~70 words is high density
        timeline: [
          { word: 'um', time: 6 },
          { word: 'like', time: 14 },
          { word: 'uh', time: 23 },
          { word: 'basically', time: 38 }
        ]
      }
    }
  },
  {
    id: 's2',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    type: 'interview',
    topic: 'Software Engineer: Describe a challenging technical project you worked on.',
    transcript: 'Actually, the most challenging project was optimizing a database that was running queries very slowly. I analyzed the query plans and found out we were missing indexes. So, literally, I added indexes and reorganized the database tables. This, you know, reduced the latency by 80%.',
    durationActual: 62,
    saved: false,
    evaluation: {
      scores: {
        confidence: 8.9,
        fluency: 8.0,
        grammar: 9.1,
        vocabulary: 8.5,
        clarity: 8.7,
        structure: 8.8,
        persuasiveness: 8.2,
        storytelling: 8.0,
        engagement: 8.3,
        overall: 8.5
      },
      strengths: [
        'Strong technical vocabulary (query plans, latency, optimization, indexes).',
        'Excellent application of the STAR framework (Situation, Task, Action, Result).',
        'Quantified the success metrics (80% latency reduction).'
      ],
      weaknesses: [
        'Used words like "actually" and "literally" which undermine confidence.',
        'Speed of speaking was slightly rushed in the action phase.'
      ],
      suggestions: [
        'Speak 10% slower to show composure when talking about the technical actions.',
        'Eliminate conversational modifiers like "actually".'
      ],
      actionPlan: [
        'Practice describing the same project without using "actually" or "literally".',
        'Review the STAR Framework checklist.'
      ],
      fillerWords: {
        totalCount: 3,
        mostUsed: 'actually',
        density: 4.8,
        timeline: [
          { word: 'actually', time: 1 },
          { word: 'literally', time: 24 },
          { word: 'you know', time: 42 }
        ]
      }
    }
  }
];

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessions: mockSessions,
      savedTopics: [],
      debateSessions: [],
      interviewSessions: [],
      gdSessions: [],
      currentTopic: null,
      currentStructure: null,

      addSession: (session) =>
        set((state) => ({
          sessions: [session, ...state.sessions],
        })),

      deleteSession: (id) =>
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        })),

      toggleSaveSession: (id) =>
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === id ? { ...s, saved: !s.saved } : s
          ),
        })),

      addSavedTopic: (topic) =>
        set((state) => {
          if (state.savedTopics.some((t) => t.id === topic.id)) return state;
          return { savedTopics: [...state.savedTopics, topic] };
        }),

      removeSavedTopic: (id) =>
        set((state) => ({
          savedTopics: state.savedTopics.filter((t) => t.id !== id),
        })),

      setCurrentTopic: (topic) =>
        set(() => ({
          currentTopic: topic,
        })),

      setCurrentStructure: (structure) =>
        set(() => ({
          currentStructure: structure,
        })),

      addDebateSession: (debate) =>
        set((state) => ({
          debateSessions: [debate, ...state.debateSessions],
        })),

      updateDebateSession: (updatedDebate) =>
        set((state) => ({
          debateSessions: state.debateSessions.map((d) =>
            d.id === updatedDebate.id ? updatedDebate : d
          ),
        })),

      addInterviewSession: (interview) =>
        set((state) => ({
          interviewSessions: [interview, ...state.interviewSessions],
        })),

      updateInterviewSession: (updatedInterview) =>
        set((state) => ({
          interviewSessions: state.interviewSessions.map((i) =>
            i.id === updatedInterview.id ? updatedInterview : i
          ),
        })),

      addGDSession: (gd) =>
        set((state) => ({
          gdSessions: [gd, ...state.gdSessions],
        })),

      updateGDSession: (updatedGD) =>
        set((state) => ({
          gdSessions: state.gdSessions.map((g) =>
            g.id === updatedGD.id ? updatedGD : g
          ),
        })),

      clearHistory: () =>
        set(() => ({
          sessions: [],
          savedTopics: [],
          debateSessions: [],
          interviewSessions: [],
          gdSessions: [],
          currentTopic: null,
          currentStructure: null,
        })),
    }),
    {
      name: 'speakup-sessions-storage',
    }
  )
);
