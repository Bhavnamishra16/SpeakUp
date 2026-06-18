import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, CareerGrowthReport } from '../types';

interface UserState {
  profile: UserProfile;
  careerReport: CareerGrowthReport | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  incrementSpeakingTime: (seconds: number) => void;
  addSessionToStats: (durationSeconds: number) => void;
  setCareerReport: (report: CareerGrowthReport) => void;
  resetStats: () => void;
}

const defaultProfile: UserProfile = {
  name: 'Alex Carter',
  email: 'alex@example.com',
  streak: 3,
  lastPracticeDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Yesterday
  totalSpeakingTime: 1450, // seconds (~24 minutes)
  totalSessions: 12,
  dailyGoalMinutes: 5,
};

const defaultCareerReport: CareerGrowthReport = {
  weeklyReport: "Your clarity and vocabulary have improved by 12% this week. You are speaking more deliberately, and filler word density is dropping. Focus more on structured conclusions.",
  monthlyReport: "Over the last 30 days, your confidence score grew from 6.8 to 8.4. You are highly ready for HR interviews and General communications, though tech interviews need more depth.",
  growthScore: 82,
  interviewReadiness: 78,
  leadershipCommunication: 75,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      careerReport: defaultCareerReport,
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      incrementSpeakingTime: (seconds) =>
        set((state) => ({
          profile: {
            ...state.profile,
            totalSpeakingTime: state.profile.totalSpeakingTime + seconds,
          },
        })),
      addSessionToStats: (durationSeconds) =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          let currentStreak = state.profile.streak;
          
          if (state.profile.lastPracticeDate === today) {
            // Already practiced today, keep streak
          } else if (state.profile.lastPracticeDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]) {
            // Practiced yesterday, increment streak
            currentStreak += 1;
          } else if (!state.profile.lastPracticeDate) {
            currentStreak = 1;
          } else {
            // Missed a day, reset streak to 1
            currentStreak = 1;
          }

          return {
            profile: {
              ...state.profile,
              totalSessions: state.profile.totalSessions + 1,
              totalSpeakingTime: state.profile.totalSpeakingTime + durationSeconds,
              lastPracticeDate: today,
              streak: currentStreak,
            },
          };
        }),
      setCareerReport: (report) =>
        set(() => ({
          careerReport: report,
        })),
      resetStats: () =>
        set(() => ({
          profile: {
            ...defaultProfile,
            streak: 0,
            lastPracticeDate: null,
            totalSpeakingTime: 0,
            totalSessions: 0,
          },
          careerReport: null,
        })),
    }),
    {
      name: 'speakup-user-storage',
    }
  )
);
