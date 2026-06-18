export type Difficulty = 'easy' | 'basic' | 'medium' | 'hard';


export type Category =
  | 'general'
  | 'technology'
  | 'business'
  | 'education'
  | 'leadership'
  | 'startups'
  | 'social'
  | 'environment'
  | 'interview'
  | 'gd'
  | 'debate'
  | 'random';

export interface Topic {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  duration: number; // in seconds
  context: string;
  background: string;
  talkingPoints: string[];
  sampleIntro: string;
  sampleConclusion: string;
  recommendedVocabulary: string[];
}

export interface SpeechStructure {
  framework: 'PREP' | 'STAR' | 'PPF';
  intro: string;
  point1: string;
  point2: string;
  point3: string;
  conclusion: string;
}

export interface EvaluationScores {
  confidence: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  clarity: number;
  structure: number;
  persuasiveness: number;
  storytelling: number;
  engagement: number;
  overall: number;
}

export interface FillerTimelineItem {
  word: string;
  time: number; // seconds from start
}

export interface FillerWordsData {
  totalCount: number;
  mostUsed: string;
  density: number; // index score
  timeline: FillerTimelineItem[];
}

export interface SpeechEvaluation {
  scores: EvaluationScores;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  actionPlan: string[];
  fillerWords: FillerWordsData;
  fillerAnalysis?: {
    detectedFillers: { word: string; count: number; alternative: string }[];
    overallFillerVerdict: string;
    fillerScore: number;
  };
}

export interface FollowUpQuestion {
  id: string;
  text: string;
  userAnswer?: string;
  feedback?: string;
  score?: number;
}

export interface Session {
  id: string;
  timestamp: string;
  type: 'public_speaking' | 'interview' | 'debate' | 'group_discussion';
  topic: string;
  transcript: string;
  durationActual: number; // in seconds
  evaluation?: SpeechEvaluation;
  followUps?: FollowUpQuestion[];
  saved?: boolean;
  meta?: Record<string, any>; // Stores sub-options (e.g. Debate position, Interview mode, GD details)
}

export interface UserProfile {
  name: string;
  email: string;
  streak: number;
  lastPracticeDate: string | null;
  totalSpeakingTime: number; // in seconds
  totalSessions: number;
  dailyGoalMinutes: number;
}

export interface DebateTurn {
  id: string;
  sender: 'user' | 'gemini';
  text: string;
  timestamp: string;
}

export interface DebateSession {
  id: string;
  topic: string;
  position: 'A' | 'B'; // Position A or Position B
  turns: DebateTurn[];
  evaluation?: SpeechEvaluation;
  status: 'active' | 'completed';
}

export interface InterviewQuestion {
  id: string;
  text: string;
  userAnswer?: string;
  feedback?: string;
  score?: number;
}

export interface InterviewSession {
  id: string;
  role: 'HR' | 'Software Engineer' | 'Product Manager' | 'Marketing' | 'MBA';
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  status: 'active' | 'completed';
  overallScore?: number;
  overallFeedback?: string;
}

export interface GDMessage {
  id: string;
  speakerName: string;
  avatarUrl: string;
  text: string;
  timestamp: string;
  isAI: boolean;
}

export interface GDSession {
  id: string;
  topic: string;
  messages: GDMessage[];
  status: 'active' | 'completed';
  evaluation?: {
    relevance: number;
    leadership: number;
    clarity: number;
    communication: number;
    confidence: number;
    overall: number;
    feedback: string;
  };
}

export interface CareerGrowthReport {
  weeklyReport: string;
  monthlyReport: string;
  growthScore: number; // out of 100
  interviewReadiness: number; // out of 100
  leadershipCommunication: number; // out of 100
}
