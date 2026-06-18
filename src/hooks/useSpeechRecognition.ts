import { useState, useEffect, useRef, useCallback } from 'react';
import { FillerTimelineItem } from '../types';

const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally'];

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0); // in seconds
  const [fillers, setFillers] = useState<FillerTimelineItem[]>([]);
  const [isSupported, setIsSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const detectedFillersCountRef = useRef<Record<string, number>>({});

  // Check support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
      }
    }
  }, []);

  // Update word count and search filler words when transcript changes
  useEffect(() => {
    if (!transcript) {
      setWordCount(0);
      return;
    }
    const words = transcript.trim().split(/\s+/);
    setWordCount(words.length);

    // Dynamic filler detection based on the latest added words
    const lowerTranscript = transcript.toLowerCase();
    const timeline: FillerTimelineItem[] = [];

    // Simple word boundaries checks for single and multi-word filler terms
    FILLER_WORDS.forEach((filler) => {
      // Find all matches with index
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      let match;
      while ((match = regex.exec(lowerTranscript)) !== null) {
        // Approximate time of filler word in speech
        const charRatio = match.index / lowerTranscript.length;
        const wordTime = Math.round(duration * charRatio * 10) / 10;
        timeline.push({
          word: filler,
          time: wordTime || 0.1, // Ensure non-zero
        });
      }
    });

    // Sort by time
    timeline.sort((a, b) => a.time - b.time);
    setFillers(timeline);
  }, [transcript, duration]);

  // Handle timer ticks
  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isListening]);

  // Audio analyzer for visual waves
  const startAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        // Normalize between 0 and 100
        setVolume(Math.min(100, Math.round((average / 128) * 100)));
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
    }
  };

  const stopAudioAnalysis = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setVolume(0);
  };

  const startListening = useCallback(() => {
    if (!isSupported) return;

    // Reset session states
    setTranscript('');
    setDuration(0);
    setFillers([]);
    detectedFillersCountRef.current = {};

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      startAudioAnalysis();
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = 0; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      stopAudioAnalysis();
    };

    recognition.start();
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    stopAudioAnalysis();
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setDuration(0);
    setFillers([]);
    setWordCount(0);
    setVolume(0);
  }, []);

  const handleEditTranscript = useCallback((newText: string) => {
    setTranscript(newText);
  }, []);

  return {
    isListening,
    transcript,
    wordCount,
    volume,
    duration,
    fillers,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
    handleEditTranscript,
  };
};
