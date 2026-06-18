import { useState, useCallback } from 'react';
import { Topic, SpeechStructure, SpeechEvaluation, FollowUpQuestion, DebateTurn, InterviewQuestion, GDMessage, CareerGrowthReport } from '../types';

export const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = useCallback(async (action: string, payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, payload }),
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.error || 'API Request failed');
      }

      const resJson = await response.json();
      return resJson.data;
    } catch (err: any) {
      console.error(`Error during action ${action}:`, err);
      setError(err.message || 'An unexpected error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateTopic = useCallback(async (category: string, difficulty: string, duration: number): Promise<Topic> => {
    return callApi('generateTopic', { category, difficulty, duration });
  }, [callApi]);

  const generateStructure = useCallback(async (topic: string): Promise<SpeechStructure> => {
    return callApi('generateStructure', { topic });
  }, [callApi]);

  const evaluateSpeech = useCallback(async (topic: string, transcript: string, duration: number): Promise<SpeechEvaluation> => {
    return callApi('evaluateSpeech', { topic, transcript, duration });
  }, [callApi]);

  const generateFollowUps = useCallback(async (topic: string, transcript: string): Promise<FollowUpQuestion[]> => {
    return callApi('generateFollowUps', { topic, transcript });
  }, [callApi]);

  const generateVocabWord = useCallback(async (category: string): Promise<{ word: string; type: string; definition: string; example: string; speakingAngle: string }> => {
    const res = await callApi('generateVocabWord', { category });
    return res;
  }, [callApi]);
 
  const getDebateRebuttal = useCallback(async (topic: string, position: 'A' | 'B', history: DebateTurn[]): Promise<{ rebuttalText: string }> => {
    return callApi('debateRebuttal', { topic, position, history });
  }, [callApi]);
 
  const getInterviewNextQuestion = useCallback(async (role: string, index: number, history: InterviewQuestion[]): Promise<{ feedback: string; score: number; nextQuestion: string }> => {
    return callApi('interviewSimulator', { role, index, history });
  }, [callApi]);
 
  const getGDNextTurn = useCallback(async (topic: string, messages: GDMessage[]): Promise<{ speakerName: string; avatarUrl: string; text: string }> => {
    return callApi('groupDiscussion', { topic, messages });
  }, [callApi]);
 
  const getCareerReport = useCallback(async (sessions: any[]): Promise<CareerGrowthReport> => {
    return callApi('careerReport', { sessions });
  }, [callApi]);
 
  return {
    loading,
    error,
    generateTopic,
    generateStructure,
    evaluateSpeech,
    generateFollowUps,
    generateVocabWord,
    getDebateRebuttal,
    getInterviewNextQuestion,
    getGDNextTurn,
    getCareerReport,
  };
};
