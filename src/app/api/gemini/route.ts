import { NextRequest, NextResponse } from 'next/server';
import { prompts, getMockFallback } from '../../../services/geminiPrompts';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (!action) {
      return NextResponse.json({ error: 'Missing action parameter' }, { status: 400 });
    }

    // Determine prompt based on action
    let promptText = '';
    let fallbackData: any = null;

    switch (action) {
      case 'generateTopic':
        promptText = prompts.generateTopic(payload.category, payload.difficulty, payload.duration);
        fallbackData = getMockFallback.generateTopic(payload.category, payload.difficulty, payload.duration);
        break;
      case 'generateStructure':
        promptText = prompts.generateStructure(payload.topic);
        fallbackData = getMockFallback.generateStructure(payload.topic);
        break;
      case 'evaluateSpeech':
        promptText = prompts.evaluateSpeech(payload.topic, payload.transcript, payload.duration);
        fallbackData = getMockFallback.evaluateSpeech(payload.topic, payload.transcript, payload.duration);
        break;
      case 'generateFollowUps':
        promptText = prompts.generateFollowUps(payload.topic, payload.transcript);
        fallbackData = getMockFallback.generateFollowUps(payload.topic, payload.transcript);
        break;
      case 'debateRebuttal':
        promptText = prompts.debateRebuttal(payload.topic, payload.position, payload.history);
        const rawDebate = getMockFallback.debateRebuttal(payload.topic, payload.position, payload.history);
        fallbackData = { rebuttalText: rawDebate };
        break;
      case 'interviewSimulator':
        promptText = prompts.interviewSimulator(payload.role, payload.index, payload.history);
        fallbackData = getMockFallback.interviewSimulator(payload.role, payload.index, payload.history);
        break;
      case 'groupDiscussion':
        promptText = prompts.groupDiscussion(payload.topic, payload.messages);
        fallbackData = getMockFallback.groupDiscussion(payload.topic, payload.messages);
        break;
      case 'careerReport':
        promptText = prompts.careerReport(JSON.stringify(payload.sessions));
        fallbackData = getMockFallback.careerReport(payload.sessions.length);
        break;
      case 'generateVocabWord':
        promptText = prompts.generateVocabWord(payload.category);
        fallbackData = getMockFallback.generateVocabWord(payload.category);
        break;
      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }

    // If API key is missing, return mock fallback data immediately
    if (!GEMINI_API_KEY) {
      console.log(`[Gemini API] Key missing, using mock fallback for action: ${action}`);
      return NextResponse.json({ data: fallbackData, isMock: true });
    }

    // Call live Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Gemini API] Request failed:', errorText);
      // Fallback on API failure
      return NextResponse.json({ data: fallbackData, isMock: true, warning: 'API error, fell back to mock data' });
    }

    const resJson = await response.json();
    const textContent = resJson.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('No content returned from Gemini');
    }

    // Parse output JSON
    try {
      // Clean up markdown block decorators if Gemini still includes them despite config
      let cleanedText = textContent.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.substring(7);
      }
      if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.substring(3);
      }
      if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.substring(0, cleanedText.length - 3);
      }
      
      const parsedData = JSON.parse(cleanedText.trim());
      return NextResponse.json({ data: parsedData, isMock: false });
    } catch (parseError) {
      console.error('[Gemini API] Parse failed for output:', textContent);
      return NextResponse.json({ data: fallbackData, isMock: true, warning: 'Failed to parse JSON response' });
    }
  } catch (err: any) {
    console.error('[Gemini API] Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
