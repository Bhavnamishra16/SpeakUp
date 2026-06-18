import { Topic, SpeechStructure, SpeechEvaluation, FollowUpQuestion, DebateTurn, InterviewQuestion, GDMessage, CareerGrowthReport, FillerTimelineItem } from '../types';

const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally'];

// Structured prompts that request JSON outputs from Gemini
export const prompts = {
  generateTopic: (category: string, difficulty: string, duration: number) => `
    You are an advanced Real-Time News, Current Affairs, and Universe Trend AI Agent.
    Your task is to generate a public speaking topic.
    
    Category: ${category}
    Difficulty: ${difficulty} (easy/basic, medium, hard)
    Recommended Duration: ${duration} seconds.
    
    CRITICAL PROMPT INSTRUCTIONS:
    1. Respect the requested Difficulty level:
       - If difficulty is "easy" or "basic": Generate a very accessible, relatable, everyday, and simple speaking topic (e.g. basic habits, simple tech tools, school/work balance, everyday communications). The background, context, and vocabulary keywords must be simple, direct, and easy to understand for beginners.
       - If difficulty is "medium" or "hard": Generate a highly unique, contemporary, and intellectually challenging topic focusing on current events, recent breakthroughs (2024-2026), cosmological discoveries, deep space research, emerging tech (quantum computing, fusion energy, AI agents), or pressing geopolitical/economic issues. Provide sophisticated, advanced vocabulary keywords (e.g. anthropocene, technological singularity, ephemeral).
    2. Do NOT generate generic or cliché topics (avoid "Is AI replacing writers?" or "Is remote work good?" for medium/hard levels). Make the topic specific and contemporary.
    3. Category guidelines for medium/hard:
       - technology: Focus on cutting-edge developments (e.g., decentralized Web3 systems, humanoid robotics, James Webb Space Telescope discoveries, biocomputing, satellite constellations, fusion energy).
       - business: Focus on modern economic shifts, green transition finance, startup funding in high-rate environments, creator economy, or supply chain resilience.
       - leadership: Focus on leadership in crisis, managing distributed global swarms, ethical AI deployment leadership, or cross-cultural empathy in fractured political landscapes.
       - education: Focus on neurodiversity in learning, AI-native education models, micro-credentials vs traditional degrees, or spatial computing in classrooms.
       - startups: Focus on deep-tech startups, climate-tech fundraising, sovereign AI infrastructures, or bootstrap growth loops.
       - social: Focus on algorithmic bias, digital loneliness, mental health in hyper-connected grids, or city-planning for extreme climate events.
       - environment: Focus on carbon-capture systems, geo-engineering debates, biodiversity loss tracking, or green hydrogen transitions.
       - general: Focus on contemporary cognitive superpowers, public speaking in automated eras, or psychological resilience in hyper-specialized technical roles.
    4. Provide 5-6 appropriate vocabulary keywords matching the difficulty (simple and common for easy; advanced and academic for medium/hard).
    5. The background and context must refer to actual, present-day facts, research, or scientific consensus.
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) that matches this TypeScript interface:
    interface TopicResponse {
      title: string;
      context: string;
      background: string;
      talkingPoints: string[];
      sampleIntro: string;
      sampleConclusion: string;
      recommendedVocabulary: string[];
    }
  `,

  generateStructure: (topic: string) => `
    Analyze the following speaking topic: "${topic}".
    Generate a speech structure/framework outline. Provide THREE different frameworks: PREP (Point, Reason, Example, Point), STAR (Situation, Task, Action, Result) for interview/story topics, and PPF (Past, Present, Future). Choose the one that fits best as the default, and explain it.
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) matching this format:
    {
      "framework": "PREP" | "STAR" | "PPF",
      "intro": "Short description of what to say in the introduction",
      "point1": "First main argument or point instruction",
      "point2": "Second main argument or point instruction",
      "point3": "Third main argument or point instruction",
      "conclusion": "Advice for a strong closing statement"
    }
  `,

  evaluateSpeech: (topic: string, transcript: string, durationSeconds: number) => `
    You are a brutally honest, professional public speaking coach. Evaluate the following speech transcript on the topic: "${topic}".
    The speech lasted ${durationSeconds} seconds.
    
    TRANSCRIPT: "${transcript}"
    
    CRITICAL SCORING RULES BASED ON FILLER WORDS:
    First, count ALL filler words in the transcript. Filler words include: "um", "uh", "like" (when used as a filler, not comparison), "you know", "basically", "actually", "literally", "so" (when used as a sentence starter filler), "right", "I mean".
    
    FILLER-BASED OVERALL SCORE RULES (STRICTLY FOLLOW):
    - 0 filler words: Overall score between 8.5-9.5
    - 1-2 filler words: Overall score between 7.0-8.0
    - 3-4 filler words: Overall score between 6.0-7.0
    - 5 or more filler words: Overall score between 4.0-5.5
    
    Also consider speech pace and lagging:
    - If the speaker speaks too slowly (below 100 WPM), deduct 0.5-1.0 from fluency and engagement.
    - If the speaker speaks too fast (above 170 WPM), deduct 0.5-1.0 from clarity.
    - If the speech is very short (under 20 seconds), be honest that the sample is too small for a proper evaluation.
    
    FEEDBACK RULES:
    - Be GENUINE and SPECIFIC. Do NOT use generic praise like "Great job!" or "Well done!". Reference actual phrases or patterns from the transcript.
    - Point out specific filler words used and suggest CONCRETE alternatives. For example, instead of "um", suggest pausing silently; instead of "like", suggest "such as" or "for example"; instead of "you know", suggest dropping it entirely.
    - If the speech is short or barely has content, say so honestly. Don't inflate feedback for a 5-second speech.
    - Strengths should reference actual good moments from the transcript if any exist.
    - Weaknesses should be real and actionable, not sugarcoated.
    
    You must evaluate these dimensions (0.0 to 10.0 each):
    - Confidence, Fluency, Grammar, Vocabulary, Clarity, Structure, Persuasiveness, Storytelling, Engagement
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) matching this format:
    {
      "scores": {
        "confidence": 7.0,
        "fluency": 6.5,
        "grammar": 8.0,
        "vocabulary": 7.0,
        "clarity": 7.5,
        "structure": 6.0,
        "persuasiveness": 6.5,
        "storytelling": 6.0,
        "engagement": 7.0,
        "overall": 6.8
      },
      "strengths": ["Specific strength referencing transcript"],
      "weaknesses": ["Specific weakness referencing transcript"],
      "suggestions": ["Specific actionable suggestion"],
      "actionPlan": ["Concrete next-step action"],
      "fillerWords": {
        "totalCount": 5,
        "mostUsed": "um",
        "density": 6.5
      },
      "fillerAnalysis": {
        "detectedFillers": [{"word": "um", "count": 3, "alternative": "Use a silent pause instead"}, {"word": "like", "count": 2, "alternative": "Replace with 'such as' or 'for example'"}],
        "overallFillerVerdict": "You used 5 filler words which significantly impacts your fluency score. Your most frequent filler is 'um' — practice replacing it with deliberate 1-second silent pauses.",
        "fillerScore": 5.5
      }
    }
  `,

  generateFollowUps: (topic: string, transcript: string) => `
    Based on the topic: "${topic}" and the user's speech transcript: "${transcript}", generate exactly 5 intelligent, challenging follow-up questions that challenge the speaker's critical thinking, logic, or arguments.
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) matching this format:
    {
      "questions": [
        { "id": "q1", "text": "Question text here..." },
        { "id": "q2", "text": "Question text here..." },
        { "id": "q3", "text": "Question text here..." },
        { "id": "q4", "text": "Question text here..." },
        { "id": "q5", "text": "Question text here..." }
      ]
    }
  `,

  debateRebuttal: (topic: string, position: 'A' | 'B', history: DebateTurn[]) => `
    You are an opponent in a competitive debate simulator.
    The topic is: "${topic}".
    The user's stance is: Position ${position === 'A' ? 'A (Affirmative)' : 'B (Negative)'}.
    You represent the opposing stance.
    
    Here is the conversation history of the debate:
    ${JSON.stringify(history)}
    
    Generate your counterargument/rebuttal to the user's latest point. Be persuasive, sharp, polite, and structure your arguments well. Limit your response to 100-150 words.
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) matching this format:
    {
      "rebuttalText": "Your counterargument here..."
    }
  `,

  interviewSimulator: (role: string, index: number, history: InterviewQuestion[]) => `
    You are an expert recruiter conducting a mock interview for a ${role} role.
    Here is the history of the interview so far:
    ${JSON.stringify(history)}
    
    Your task:
    - If the user has just answered a question (the last item in the history contains a userAnswer), analyze their answer and provide short constructive feedback and a score (1-10) for that answer.
    - Ask the NEXT question appropriate for the role. This is question #${index + 1}. If it's question #5, state that this is the final question.
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) matching this format:
    {
      "feedback": "Short feedback on the previous answer, or empty if it is the first question",
      "score": 8, // Score for the previous answer, or null if first question
      "nextQuestion": "The next question you want to ask..."
    }
  `,

  groupDiscussion: (topic: string, messages: GDMessage[]) => `
    You are simulating a group discussion. The topic is: "${topic}".
    Here is the current discussion log:
    ${JSON.stringify(messages)}
    
    Your task:
    Generate the next message in the discussion from one of the other AI participants (e.g. "Sarah (Tech Analyst)", "David (Business Strategist)", "Elena (Environmental Advocate)").
    Keep the tone collaborative but intellectually diverse. Limit to 60-90 words.
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) matching this format:
    {
      "speakerName": "Sarah (Tech Analyst)",
      "avatar": "/avatars/avatar1.png",
      "text": "The next statement in the discussion..."
    }
  `,

  careerReport: (sessionsJson: string) => `
    Analyze these public speaking practice session logs for the user:
    ${sessionsJson}
    
    Generate an executive career communication growth report:
    1. Weekly growth summary
    2. Monthly progression report
    3. Communication Growth Score (0 to 100)
    4. Interview Readiness Score (0 to 100)
    5. Leadership Communication Score (0 to 100)
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) matching this format:
    {
      "weeklyReport": "Weekly text summary...",
      "monthlyReport": "Monthly text summary...",
      "growthScore": 85,
      "interviewReadiness": 75,
      "leadershipCommunication": 80
    }
  `,

  generateVocabWord: (category: string) => `
    You are an advanced Vocabulary Coach and Linguistics Expert.
    Your task is to generate a unique, sophisticated, and highly practical vocabulary word for public speaking, debate, or interview practice.
    
    Category: ${category}
    
    CRITICAL PROMPT INSTRUCTIONS:
    1. Ensure the word is advanced and intellectually stimulating, but applicable to real-world discussions (avoid extremely obscure archaic words).
    2. Provide:
       - The word itself
       - The part of speech abbreviation (e.g., n., v., adj., adv.)
       - A clear, concise definition
       - A highly realistic, contemporary example sentence
       - An engaging "speaking angle" or prompt that challenges the user to speak about a topic using this word.
    
    You must return a raw JSON object (WITHOUT any markdown wrappers, code blocks, or backticks) that matches this format:
    {
      "word": "Cognition",
      "type": "n.",
      "definition": "the mental action of acquiring knowledge and understanding",
      "example": "Sleep deprivation steadily erodes cognition, slowing the very thinking we need most under pressure.",
      "speakingAngle": "Talk about how your cognition changes when you are tired or stressed."
    }
  `
};

// Realistic mock generator to use as fallback when API key is missing
export const getMockFallback = {
  generateTopic: (category: string, difficulty: string, duration: number): Topic => {
    const easyTitles: Record<string, string[]> = {
      technology: [
        'Why learning basic coding is useful for everyone',
        'How smartphone usage affects our daily focus',
        'The benefits of using digital calendars for time management',
        'Why we should take regular breaks from social media screen time'
      ],
      business: [
        'Why budgeting is important for college students',
        'The benefits of working part-time during school',
        'Simple ways to promote a small business online',
        'What makes a good customer service experience'
      ],
      leadership: [
        'Why listening is the most important skill for a team leader',
        'How to show appreciation to your classmates or coworkers',
        'What makes someone a good role model',
        'How to make decisions cooperatively in a group'
      ],
      interview: [
        'Tell me about your favorite hobby and what you learned from it.',
        'Why do you want to learn public speaking?',
        'How do you manage your time when you have a busy week?',
        'Describe a project you worked on recently.'
      ],
      debate: [
        'Books are better than movies.',
        'Online learning is more convenient than in-person classes.',
        'Playing video games has positive cognitive benefits.',
        'Public transportation should be free for students.'
      ],
      gd: [
        'Should schools teach financial literacy early on?',
        'Is working from home better than working in an office?',
        'The pros and cons of using tablets in elementary schools',
        'How can individuals reduce plastic waste in their daily lives?'
      ],
      general: [
        'Why public speaking is an important life skill',
        'The benefits of waking up early in the morning',
        'How reading books changes your perspective on life',
        'Why showing empathy to others makes communities stronger'
      ]
    };

    const titles: Record<string, string[]> = {
      technology: [
        'The discoveries of the James Webb Space Telescope regarding early universe galaxies',
        'The role of Sovereign AI Infrastructure in national technological sovereignty',
        'How neuro-symbolic AI bridges generative neural networks and symbolic reasoning',
        'The development of commercial nuclear fusion energy reactors',
        'The security implications of Quantum Cryptography in a post-quantum world',
        'Swarms of autonomous drones: Ethics, technology, and swarm intelligence architectures'
      ],
      business: [
        'How circular economy business models are transforming modern product lifecycles',
        'The rise of Green transition finance and voluntary carbon credit trading markets',
        'Supply chain decentralization in response to geopolitical instability',
        'How high interest rate environments impact venture capital in deep tech startups',
        'The gig economy shifting towards Web3-based decentralized work cooperatives'
      ],
      leadership: [
        'Leading multi-disciplinary engineering teams through rapid AI integration cycles',
        'How crisis leadership has evolved in the era of viral social media misinformation',
        'Managing cross-cultural international teams during periods of global inflation',
        'Empathy-driven management for remote team cohorts facing digital fatigue',
        'Decentralized autonomous leadership structures in decentralized organizations'
      ],
      interview: [
        'Why do you want to join our deep-tech engineering group?',
        'Describe a time you solved a complex architectural bug with tight production deadlines.',
        'Where do you see the future of generative user interfaces in five years?',
        'Tell me about a time you had to challenge a technical decision made by your manager.'
      ],
      debate: [
        'Cryptocurrency sovereign frameworks do more harm than good to monetary stability.',
        'Universal Basic Income should be funded through automated AI taxes.',
        'Deep space exploration missions represent the highest utility of public infrastructure funds.',
        'Algorithmic moderation platforms infringe on digital democratic expression.'
      ],
      gd: [
        'Will cashless central bank digital currencies (CBDCs) increase inequality?',
        'Is traditional higher education obsolete in the era of automated skill verification?',
        'Electric vehicles: Practical climate solution or environmental greenwashing?',
        'The role of synthetic biology in solving global agricultural resilience challenges'
      ],
      general: [
        'Why public speaking remains the ultimate human skill in an automated world',
        'Overcoming psychological imposter syndrome in highly specialized technical roles',
        'The power of active listening in managing complex organizational conflicts',
        'Resilience in the Anthropocene: Developing personal cognitive focus strategies'
      ]
    };

    const isEasy = difficulty === 'easy' || difficulty === 'basic';
    const list = isEasy 
      ? (easyTitles[category] || easyTitles.general)
      : (titles[category] || titles.general);
    const title = list[Math.floor(Math.random() * list.length)];

    let context = 'Public speaking is not just about sharing information, but telling a compelling story that moves your audience.';
    let background = 'With the rise of modern digital systems, human communication has evolved. However, speaking clearly, passionately, and with structure remains a critical professional skill.';
    let talkingPoints = [
      'Introduce the core problem and why it matters today.',
      'Provide a personal anecdote or case study example.',
      'Discuss the counterpoints or challenges.',
      'Suggest a forward-looking solution or summary.'
    ];
    let recommendedVocabulary = ['Confidence', 'Empathy', 'Structure', 'Practice', 'Feedback'];

    if (isEasy) {
      context = 'Practice speaking about simple, everyday ideas to build confidence and fluency.';
      background = 'Sharing personal views on daily habits and activities is the best way to develop basic communication skills.';
      talkingPoints = [
        'Introduce your topic and explain why it is relevant to daily life.',
        'Give 1-2 simple examples from your own experience.',
        'Discuss one challenge people face with this topic.',
        'Conclude with a helpful tip or encouraging thought.'
      ];
      recommendedVocabulary = ['Growth', 'Consistency', 'Mindset', 'Balance', 'Communication'];
    } else {
      if (title.includes('universe') || title.includes('Telescope') || title.includes('Space') || title.includes('exploration') || title.includes('drones')) {
        context = 'Discussing humanity\'s position in the cosmos and drone physics requires balancing scientific precision with a sense of wonder.';
        background = 'Recent deep-space discoveries have challenged our models of early galaxy formation and accelerated interest in space exploration.';
        talkingPoints = [
          'Detail the scientific breakthrough or technological mission objectives.',
          'Discuss the engineering challenges (funding, physics, life support, autonomy).',
          'Analyze the philosophical implications of discovering our place in the universe.',
          'Conclude with the long-term outlook for human civilization as a multi-planetary species.'
        ];
        recommendedVocabulary = ['Cosmology', 'Spectrometry', 'Astrophysics', 'Singularity', 'Infrared', 'Heliocentric'];
      } else if (title.includes('AI') || title.includes('Quantum') || title.includes('cryptography') || title.includes('neuro-symbolic') || title.includes('algorithmic')) {
        context = 'Analyzing deep technology shifts requires evaluating both computing power and ethical control limits.';
        background = 'The transition from simple deep learning to reasoning agents, alongside quantum developments, marks a turning point in technological history.';
        talkingPoints = [
          'Explain the core technology and how it differs from previous architectures.',
          'Address privacy, security, and machine alignment problems.',
          'Detail how industries and developer ecosystems will be restructured.',
          'Provide a vision for a collaborative human-machine future.'
        ];
        recommendedVocabulary = ['Neural network', 'Quantum supremacy', 'Decentralized', 'Deterministic', 'Algorithmic', 'Neuro-symbolic'];
      } else if (title.includes('economy') || title.includes('finance') || title.includes('business') || title.includes('VC') || title.includes('cooperatives') || title.includes('CBDCs')) {
        context = 'Speaking about modern finance demands analyzing systemic changes, risk factors, and growth incentives.';
        background = 'With shifts in global interest rates and transitions to green technologies, venture models are undergoing rapid restructuring.';
        talkingPoints = [
          'Outline the financial or business transition happening in the market.',
          'Detail the risks associated with capital allocation in this climate.',
          'Highlight the opportunities for sustainable or decentralized business models.',
          'Summarize the path forward for builders, investors, and regulators.'
        ];
        recommendedVocabulary = ['Venture capital', 'Capital efficiency', 'Circular economy', 'Arbitrage', 'Resilience', 'Liquidity'];
      } else if (title.includes('environment') || title.includes('climate') || title.includes('hydrogen') || title.includes('carbon') || title.includes('biodiversity') || title.includes('biology')) {
        context = 'Speaking about the ecological crisis requires presenting actionable, science-based solutions over simple greenwashing.';
        background = 'The transition to net-zero heavy industries relies on carbon capture, green hydrogen grids, and remote sensing verification.';
        talkingPoints = [
          'Define the specific environmental hazard or climate mechanism.',
          'Evaluate the technological feasibility of modern solutions.',
          'Discuss the geopolitical and economic hurdles in transitioning infrastructure.',
          'Provide a clear call-to-action for industrial scaling.'
        ];
        recommendedVocabulary = ['Carbon sequestration', 'Anthropocene', 'Geo-engineering', 'Photovoltaic', 'Green hydrogen', 'Biodiversity'];
      }
    }

    return {
      id: Math.random().toString(36).substring(7),
      title,
      category: category as any,
      difficulty: difficulty as any,
      duration,
      context,
      background,
      talkingPoints,
      sampleIntro: 'Welcome everyone. Today, I want to talk about a topic that sits at the intersection of our careers and daily lives...',
      sampleConclusion: 'In conclusion, while the tools we use will continue to change, the power of clear human articulation is here to stay. Thank you.',
      recommendedVocabulary
    };
  },

  generateStructure: (topic: string): SpeechStructure => {
    return {
      framework: 'PREP',
      intro: 'State your Point clearly. Hook the audience by stating your main thesis regarding: "' + topic + '".',
      point1: 'State your Reason. Explain the "Why" behind your primary point with logic.',
      point2: 'Provide an Example. Share a concrete study, data point, or personal anecdote to support your reason.',
      point3: 'Reiterate your Point. Summarize the logic and bridge to the final takeaway.',
      conclusion: 'Wrap up with a strong action step, message of hope, or a thought-provoking question.'
    };
  },

  evaluateSpeech: (topic: string, transcript: string, durationSeconds: number): SpeechEvaluation => {
    const cleanTranscript = transcript.trim();
    const wordCount = cleanTranscript.length > 0 ? cleanTranscript.split(/\s+/).length : 0;
    const lowercase = cleanTranscript.toLowerCase();
    
    // Extended filler words list
    const EXTENDED_FILLERS = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally', 'i mean', 'right', 'so'];
    
    // Filler alternatives map
    const FILLER_ALTERNATIVES: Record<string, string> = {
      'um': 'Use a deliberate 1-second silent pause instead.',
      'uh': 'Pause silently and take a breath before continuing.',
      'like': "Replace with 'such as', 'for example', or simply remove it.",
      'you know': 'Drop it entirely. Your audience will follow without it.',
      'basically': "Replace with 'essentially' or 'in short', or remove entirely.",
      'actually': "Use 'in fact' sparingly, or remove it — it rarely adds meaning.",
      'literally': "Only use when something is factually literal. Otherwise, say 'truly' or remove it.",
      'i mean': 'Rephrase the sentence directly instead of prefacing with this.',
      'right': "If seeking validation, pause instead. If transitioning, use 'now' or 'next'.",
      'so': "When starting a sentence, try 'Therefore', 'As a result', or begin with the point directly."
    };

    // Detect fillers with individual counts
    const fillersTimeline: FillerTimelineItem[] = [];
    const fillerCounts: Record<string, number> = {};
    let fillerCount = 0;
    
    EXTENDED_FILLERS.forEach((fw: string) => {
      const regex = new RegExp(`\\b${fw}\\b`, 'gi');
      const matches = lowercase.match(regex);
      if (matches) {
        fillerCounts[fw] = matches.length;
        fillerCount += matches.length;
        let matchIndex = 0;
        while ((matchIndex = lowercase.indexOf(fw, matchIndex)) !== -1) {
          const charRatio = matchIndex / Math.max(1, lowercase.length);
          fillersTimeline.push({
            word: fw,
            time: Math.round(durationSeconds * charRatio * 10) / 10
          });
          matchIndex += fw.length;
        }
      }
    });

    fillersTimeline.sort((a, b) => a.time - b.time);
    
    const density = durationSeconds > 0 ? (fillerCount / (durationSeconds / 60)) : 0;
    const wpm = durationSeconds > 0 ? (wordCount / (durationSeconds / 60)) : 0;

    // === FILLER-BASED OVERALL SCORE (STRICT RULES) ===
    let fillerBasedOverall: number;
    let fillerScore: number;
    if (fillerCount === 0) {
      fillerBasedOverall = 8.5 + Math.random() * 1.0; // 8.5-9.5
      fillerScore = 9.5;
    } else if (fillerCount <= 2) {
      fillerBasedOverall = 7.0 + Math.random() * 1.0; // 7.0-8.0
      fillerScore = 7.5;
    } else if (fillerCount <= 4) {
      fillerBasedOverall = 6.0 + Math.random() * 1.0; // 6.0-7.0
      fillerScore = 6.0;
    } else {
      fillerBasedOverall = 4.0 + Math.random() * 1.5; // 4.0-5.5
      fillerScore = 4.5;
    }
    fillerBasedOverall = Math.round(fillerBasedOverall * 10) / 10;
    fillerScore = Math.round(fillerScore * 10) / 10;

    // === INDIVIDUAL METRIC SCORING ===
    
    // Fluency: heavily penalized by fillers
    let fluency = fillerCount === 0 ? 9.0 : fillerCount <= 2 ? 7.5 : fillerCount <= 4 ? 6.5 : 5.0;
    if (wpm > 0 && wpm < 100) fluency -= 0.8;
    else if (wpm > 170) fluency -= 0.6;
    if (wpm === 0) fluency = 4.0;
    fluency = Math.max(4.0, Math.min(9.8, Math.round(fluency * 10) / 10));

    // Confidence
    let confidence = 8.5;
    if (fillerCount > 0) confidence -= Math.min(3.5, fillerCount * 0.35);
    if (durationSeconds < 15) confidence -= 2.0;
    else if (durationSeconds < 30) confidence -= 1.0;
    confidence = Math.max(4.0, Math.min(9.5, Math.round(confidence * 10) / 10));

    // Vocabulary
    const wordsArray = lowercase.match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(wordsArray).size;
    const uniquenessRatio = wordCount > 0 ? uniqueWords / wordCount : 0.5;
    let vocabulary = 6.5 + (uniquenessRatio * 3.0);
    const advancedWords = ['paradigm', 'ubiquitous', 'empirical', 'nuanced', 'cognitive', 'sustainability', 'infrastructure', 'implications', 'compelling', 'anecdote', 'counterpoints', 'transition', 'consensus', 'articulate', 'persuasive'];
    let advancedCount = 0;
    advancedWords.forEach(word => { if (lowercase.includes(word)) advancedCount++; });
    vocabulary += Math.min(1.5, advancedCount * 0.3);
    vocabulary = Math.max(5.0, Math.min(9.5, Math.round(vocabulary * 10) / 10));

    // Grammar
    let grammar = 9.0 - Math.min(2.0, density * 0.15);
    grammar = Math.max(6.0, Math.min(9.5, Math.round(grammar * 10) / 10));

    // Clarity
    let clarity = 9.0 - Math.min(2.5, fillerCount * 0.3);
    if (wpm > 170) clarity -= 0.8;
    clarity = Math.max(5.0, Math.min(9.5, Math.round(clarity * 10) / 10));

    // Structure
    let structure = 6.0;
    if (wordCount > 80) structure += 2.0;
    else if (wordCount > 40) structure += 1.2;
    else if (wordCount > 20) structure += 0.5;
    const structureWords = ['first', 'second', 'conclusion', 'finally', 'however', 'therefore', 'next', 'summarize', 'in conclusion', 'to begin'];
    let structCount = 0;
    structureWords.forEach(word => { if (lowercase.includes(word)) structCount++; });
    structure += Math.min(1.5, structCount * 0.3);
    structure = Math.max(4.0, Math.min(9.5, Math.round(structure * 10) / 10));

    // Persuasiveness
    let persuasiveness = 4.5 + (confidence * 0.2) + (structure * 0.15) + (vocabulary * 0.1);
    persuasiveness = Math.max(4.0, Math.min(9.5, Math.round(persuasiveness * 10) / 10));

    // Storytelling
    let storytelling = 5.0 + (uniquenessRatio * 2.5) + (durationSeconds > 40 ? 1.0 : 0);
    storytelling = Math.max(4.0, Math.min(9.5, Math.round(storytelling * 10) / 10));

    // Engagement
    let engagement = 5.5 + (confidence * 0.15);
    if (wpm >= 110 && wpm <= 155) engagement += 1.5;
    if (fillerCount > 4) engagement -= 1.0;
    engagement = Math.max(4.0, Math.min(9.5, Math.round(engagement * 10) / 10));

    // Overall: use the filler-based overall as the anchor
    const calculatedAvg = (confidence + fluency + grammar + vocabulary + clarity + structure + persuasiveness + storytelling + engagement) / 9;
    // Blend: 60% filler-rule-based, 40% calculated average
    const overall = Math.round(((fillerBasedOverall * 0.6) + (calculatedAvg * 0.4)) * 10) / 10;

    // === GENUINE, SPECIFIC FEEDBACK ===
    const firstWords = cleanTranscript.split(/\s+/).slice(0, 8).join(' ');
    const isShortSpeech = durationSeconds < 15 || wordCount < 15;

    const strengths: string[] = [];
    if (isShortSpeech) {
      strengths.push(`You took the initiative to start speaking on "${topic}" — that's the most important first step.`);
      strengths.push('Even a short attempt builds neural pathways for impromptu speaking.');
      strengths.push('Your willingness to practice is itself a sign of growth mindset.');
    } else {
      if (fillerCount === 0) {
        strengths.push('Zero filler words detected — your speech flow is exceptionally clean and professional.');
      } else if (fillerCount <= 2) {
        strengths.push(`Only ${fillerCount} filler word${fillerCount > 1 ? 's' : ''} detected — you maintained strong verbal control throughout.`);
      }
      
      if (wpm >= 110 && wpm <= 155) {
        strengths.push(`Your speaking pace of ~${Math.round(wpm)} WPM is within the ideal range (110-155 WPM) for audience comprehension.`);
      } else {
        strengths.push(`You spoke for ${durationSeconds} seconds with ${wordCount} words, showing sustained effort on the topic.`);
      }

      if (uniquenessRatio > 0.65) {
        strengths.push('Strong vocabulary diversity — you avoided repetitive word patterns and used varied language.');
      } else {
        strengths.push(`Your opening "${firstWords}..." showed clear intent to address the topic directly.`);
      }
    }

    const weaknesses: string[] = [];
    if (isShortSpeech) {
      weaknesses.push(`Your speech was only ${durationSeconds} seconds (${wordCount} words) — this is too short for a meaningful evaluation. Aim for at least 30-60 seconds.`);
      weaknesses.push('Without more content, it is impossible to assess structure, argumentation, or storytelling ability.');
      weaknesses.push('Try speaking continuously even when unsure — silence is better than stopping entirely.');
    } else {
      if (fillerCount > 4) {
        const topFiller = Object.entries(fillerCounts).sort((a, b) => b[1] - a[1])[0];
        weaknesses.push(`You used ${fillerCount} filler words, with "${topFiller[0]}" appearing ${topFiller[1]} time${topFiller[1] > 1 ? 's' : ''}. This significantly disrupts your speech flow and signals hesitation to listeners.`);
      } else if (fillerCount > 0) {
        const topFiller = Object.entries(fillerCounts).sort((a, b) => b[1] - a[1])[0];
        weaknesses.push(`${fillerCount} filler word${fillerCount > 1 ? 's' : ''} detected ("${topFiller[0]}" × ${topFiller[1]}). While manageable, eliminating these will sharpen your delivery.`);
      } else {
        weaknesses.push('Your transitions between ideas could be smoother — consider using bridge phrases like "building on that" or "this connects to".');
      }

      if (wpm > 170) {
        weaknesses.push(`Your speaking pace (~${Math.round(wpm)} WPM) is above the recommended range. Fast speech can make key arguments hard to follow. Slow down during critical points.`);
      } else if (wpm > 0 && wpm < 90) {
        weaknesses.push(`Your speaking pace (~${Math.round(wpm)} WPM) is slower than ideal. This can feel monotonous to listeners. Try to vary your rhythm.`);
      } else {
        weaknesses.push('The conclusion lacked a strong closing statement. End with a memorable takeaway or call-to-action.');
      }

      if (structCount === 0) {
        weaknesses.push('No structural markers detected (e.g., "first", "however", "in conclusion"). Using these helps the audience follow your argument logic.');
      } else {
        weaknesses.push('Some points could benefit from concrete examples or data to support your claims.');
      }
    }

    const suggestions: string[] = [];
    if (fillerCount > 0) {
      const topFiller = Object.entries(fillerCounts).sort((a, b) => b[1] - a[1])[0];
      suggestions.push(`Replace "${topFiller[0]}" with ${FILLER_ALTERNATIVES[topFiller[0]] || 'a deliberate silent pause'}. Practice this in your next 60-second speech.`);
    } else {
      suggestions.push('Maintain your filler-free delivery. Challenge yourself with harder topics or shorter preparation time.');
    }
    suggestions.push('Record yourself speaking and listen back — you will catch patterns you miss in real-time.');
    suggestions.push(`Aim for ${Math.max(durationSeconds + 30, 60)} seconds in your next session to practice sustaining arguments longer.`);

    // Build fillerAnalysis
    const detectedFillers = Object.entries(fillerCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({
        word,
        count,
        alternative: FILLER_ALTERNATIVES[word] || 'Use a deliberate silent pause instead.'
      }));
    
    let overallFillerVerdict = '';
    if (fillerCount === 0) {
      overallFillerVerdict = 'Excellent — zero filler words detected. Your speech delivery is clean and professional. This is a strong indicator of speaking confidence.';
    } else if (fillerCount <= 2) {
      overallFillerVerdict = `You used ${fillerCount} filler word${fillerCount > 1 ? 's' : ''}, which is acceptable but can be eliminated. Focus on pausing silently when you feel the urge to say "${detectedFillers[0]?.word || 'um'}".`;
    } else if (fillerCount <= 4) {
      overallFillerVerdict = `You used ${fillerCount} filler words, which noticeably impacts your fluency. Your most frequent filler is "${detectedFillers[0]?.word}" (${detectedFillers[0]?.count}×). Practice a 30-second speech focusing solely on eliminating this word.`;
    } else {
      overallFillerVerdict = `You used ${fillerCount} filler words — this is a major area for improvement. Your speech sounds hesitant and rehearsed confidence drops significantly. Your most problematic filler is "${detectedFillers[0]?.word}" (${detectedFillers[0]?.count}×). ${FILLER_ALTERNATIVES[detectedFillers[0]?.word] || 'Practice silent pauses.'}`;
    }

    return {
      scores: {
        confidence,
        fluency,
        grammar,
        vocabulary,
        clarity,
        structure,
        persuasiveness,
        storytelling,
        engagement,
        overall
      },
      strengths,
      weaknesses,
      suggestions,
      actionPlan: [
        fillerCount > 2 
          ? `Record a 60-second speech and consciously replace every "${Object.keys(fillerCounts)[0] || 'um'}" with a 1-second silent pause.` 
          : 'Try the STAR framework (Situation, Task, Action, Result) for your next topic to improve structure.',
        `In your next session, aim for at least ${Math.max(durationSeconds + 15, 45)} seconds and use 2+ vocabulary words from the recommended list.`
      ],
      fillerWords: {
        totalCount: fillerCount,
        mostUsed: fillersTimeline[0]?.word || 'none',
        density: Math.round(density * 10) / 10,
        timeline: fillersTimeline
      },
      fillerAnalysis: {
        detectedFillers,
        overallFillerVerdict,
        fillerScore
      }
    };
  },

  generateFollowUps: (topic: string, transcript: string): FollowUpQuestion[] => {
    return [
      { id: 'q1', text: 'You mentioned the role of regulations. What specific guidelines would protect consumers without stifling innovation?' },
      { id: 'q2', text: 'How do we address the social implications of this shift on rural or low-income communities?' },
      { id: 'q3', text: 'Is there a counter-argument to your view that you find particularly compelling?' },
      { id: 'q4', text: 'What is the immediate next step that an individual speaker or citizen can take?' },
      { id: 'q5', text: 'If you had to summarize your entire speech in a single sentence, what would it be?' }
    ];
  },

  debateRebuttal: (topic: string, position: 'A' | 'B', history: DebateTurn[]): string => {
    const argumentsForA = [
      "While that point seems logical on the surface, it overlooks the massive economic displacement it causes. We must focus on transition structures first.",
      "Furthermore, historical precedents show that top-down solutions fail because they lack the localized flexibility necessary to adapt to regional challenges.",
      "I hear your point, but research indicates that the long-term benefits of my proposal far outweigh the initial capital investments you outlined."
    ];
    return argumentsForA[history.length % argumentsForA.length];
  },

  interviewSimulator: (role: string, index: number, history: InterviewQuestion[]): { feedback: string; score: number; nextQuestion: string } => {
    const list = {
      HR: [
        'Tell me about yourself and why you are interested in this role.',
        'Describe a time you solved a conflict within a team.',
        'How do you prioritize your work when managing multiple tasks?',
        'Tell me about a time you failed. What did you learn?',
        'Why should we hire you over other candidates?'
      ],
      'Software Engineer': [
        'Explain the difference between a process and a thread.',
        'How would you design a rate limiter for a public API?',
        'Describe a time you had to optimize a slow system database.',
        'What is your favorite programming language and what is one drawback of it?',
        'How do you ensure code quality and test coverage in your projects?'
      ],
      'Product Manager': [
        'How would you prioritize features for a new ride-sharing app?',
        'Tell me about a product you love and how you would improve it.',
        'How do you handle disagreements with engineering teams regarding deadlines?',
        'Explain a time you launched a feature that failed. What went wrong?',
        'How do you measure the success of an online payment checkout page?'
      ],
      Marketing: [
        'How would you launch a new energy drink in a crowded market?',
        'What metrics do you track to evaluate a digital advertising campaign?',
        'Describe a successful rebranding project you worked on.',
        'How do you handle a sudden viral negative review about your product?',
        'Explain your strategy for organic growth through content creation.'
      ],
      MBA: [
        'Why is an MBA necessary for your career goals right now?',
        'Describe a time you led a team through a significant transition.',
        'How do you analyze a company entering a new international market?',
        'Tell me about a complex financial decision you had to make.',
        'What is your vision for your career 10 years after graduation?'
      ]
    };

    const questionsList = list[role as keyof typeof list] || list.HR;
    const feedback = index > 0 ? "Excellent response. You structured your explanation nicely and provided solid examples. Try to speak slightly more slowly." : "";
    const score = index > 0 ? 8 : 0;
    const nextQuestion = questionsList[index] || "Thank you. That concludes the mock interview.";

    return {
      feedback,
      score,
      nextQuestion
    };
  },

  groupDiscussion: (topic: string, messages: GDMessage[]): { speakerName: string; avatarUrl: string; text: string } => {
    const contributors = [
      { name: 'Sarah (Tech Analyst)', avatar: '/avatars/avatar1.png', texts: [
        "I think we also need to consider the scalability here. The technological infrastructure simply isn't ready in most developing regions.",
        "That's a valid point, but if we don't start implementing these initiatives today, we will fall even further behind in the digital economy."
      ]},
      { name: 'David (Business Strategist)', avatar: '/avatars/avatar2.png', texts: [
        "Looking at the cost-benefit analysis, it's clear that private sector partnerships will be crucial to funding this sort of infrastructure.",
        "I agree, and we should also incentivize startups to innovate in this space by offering R&D tax tax exemptions."
      ]},
      { name: 'Elena (Social Advocate)', avatar: '/avatars/avatar3.png', texts: [
        "We can't ignore the ethical aspect. If we transition too quickly, we risk isolating senior citizens and marginalized groups who are less digitally literate.",
        "Exactly, education and training campaigns must run parallel to any technical deployment."
      ]}
    ];

    const person = contributors[messages.length % contributors.length];
    const text = person.texts[Math.floor(messages.length / contributors.length) % person.texts.length] || "I agree with the general consensus, but let's look at the implementation timeframe.";

    return {
      speakerName: person.name,
      avatarUrl: person.avatar,
      text
    };
  },

  careerReport: (sessionsCount: number): CareerGrowthReport => {
    return {
      weeklyReport: "You completed " + sessionsCount + " sessions this week. Your average fluency score increased by 4.2%. Keep up the practice, specifically working on mock interviews.",
      monthlyReport: "Your overall progress is excellent. Filler words usage has dropped from 6% to 2.4% over 30 days. You show high leadership readiness.",
      growthScore: 88,
      interviewReadiness: 81,
      leadershipCommunication: 79
    };
  },

  generateVocabWord: (category: string): { word: string; type: string; definition: string; example: string; speakingAngle: string } => {
    const vocabList = [
      {
        word: "Cognition",
        type: "n.",
        definition: "the mental action of acquiring knowledge and understanding",
        example: "Sleep deprivation steadily erodes cognition, slowing the very thinking we need most under pressure.",
        speakingAngle: "Talk about how your cognition changes when you are tired or stressed."
      },
      {
        word: "Pugnacious",
        type: "adj.",
        definition: "eager or quick to argue, quarrel, or fight",
        example: "The candidate's pugnacious attitude during the debate alienated many moderate voters.",
        speakingAngle: "Discuss whether a leader should be pugnacious when defending their team."
      },
      {
        word: "Smug",
        type: "adj.",
        definition: "having or showing an excessive pride in oneself or one's achievements",
        example: "He had a smug look on his face after winning the negotiation.",
        speakingAngle: "Share a time when a smug opponent underestimated you."
      },
      {
        word: "Ephemeral",
        type: "adj.",
        definition: "lasting for a very short time; transient",
        example: "Fame in the digital age is often ephemeral, lasting only as long as the next viral trend.",
        speakingAngle: "Talk about an ephemeral experience that had a lasting impact on you."
      },
      {
        word: "Obfuscate",
        type: "v.",
        definition: "to deliberately make something unclear or difficult to understand",
        example: "The corporate spokesperson attempted to obfuscate the truth with jargon.",
        speakingAngle: "Why do you think public speakers try to obfuscate when answering tough questions?"
      },
      {
        word: "Resilient",
        type: "adj.",
        definition: "able to withstand or recover quickly from difficult conditions",
        example: "A resilient supply chain is essential for businesses operating in volatile markets.",
        speakingAngle: "Explain how you stayed resilient during a major setback in your project."
      },
      {
        word: "Pragmatic",
        type: "adj.",
        definition: "dealing with things sensibly and realistically based on practical considerations",
        example: "We need a pragmatic approach to environmental regulation rather than ideological debates.",
        speakingAngle: "Argue for a pragmatic compromise on a controversial policy."
      },
      {
        word: "Ubiquitous",
        type: "adj.",
        definition: "present, appearing, or found everywhere",
        example: "Smartphones have become ubiquitous in modern society, changing how we connect.",
        speakingAngle: "Explain how a ubiquitous technology has impacted your daily attention span."
      },
      {
        word: "Cacophony",
        type: "n.",
        definition: "a harsh, discordant mixture of sounds",
        example: "A cacophony of car horns and shouting street vendors filled the morning air.",
        speakingAngle: "Describe a situation where a cacophony of opinions made it hard to reach a decision."
      },
      {
        word: "Superfluous",
        type: "adj.",
        definition: "unnecessary, especially through being more than enough",
        example: "In public speaking, superfluous words like 'basically' can dilute your core message.",
        speakingAngle: "How do you identify and remove superfluous details when explaining complex tasks?"
      },
      {
        word: "Venerate",
        type: "v.",
        definition: "regard with great respect; revere",
        example: "Many programmers venerate the open-source pioneers who built the foundations of the web.",
        speakingAngle: "Talk about a mentor or historical figure you venerate and why."
      },
      {
        word: "Loquacious",
        type: "adj.",
        definition: "tending to talk a great deal; talkative",
        example: "While she was loquacious in casual chats, she was remarkably concise in presentations.",
        speakingAngle: "How do you manage a loquacious team member during a time-sensitive group discussion?"
      },
      {
        word: "Epitome",
        type: "n.",
        definition: "a person or thing that is a perfect example of a particular quality or type",
        example: "His calm under pressure made him the epitome of effective crisis leadership.",
        speakingAngle: "Describe a brand or leader that is the epitome of innovation today."
      },
      {
        word: "Enigma",
        type: "n.",
        definition: "a person or thing that is mysterious, puzzling, or difficult to understand",
        example: "The founder's sudden departure from the company remains an enigma to investors.",
        speakingAngle: "Discuss a scientific mystery or technological trend that you find to be an enigma."
      },
      {
        word: "Capricious",
        type: "adj.",
        definition: "given to sudden and unaccountable changes of mood or behavior",
        example: "The market can be capricious, making long-term startup forecasting difficult.",
        speakingAngle: "How should leaders make decisions when dealing with a capricious client or environment?"
      }
    ];

    if (category === 'academic') {
      const academicList = vocabList.filter(v => v.word === 'Cognition' || v.word === 'Obfuscate' || v.word === 'Pragmatic' || v.word === 'Cacophony' || v.word === 'Superfluous' || v.word === 'Venerate');
      if (academicList.length > 0) return academicList[Math.floor(Math.random() * academicList.length)];
    } else if (category === 'business') {
      const businessList = vocabList.filter(v => v.word === 'Resilient' || v.word === 'Pragmatic' || v.word === 'Capricious' || v.word === 'Ubiquitous' || v.word === 'Smug');
      if (businessList.length > 0) return businessList[Math.floor(Math.random() * businessList.length)];
    }

    return vocabList[Math.floor(Math.random() * vocabList.length)];
  }
};
