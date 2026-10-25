/**
 * Harikrishna Pokhrel (HKP) - AI Chat Assistant Interface
 * Front-end interface for "Ask About Me" assistant.
 * Uses local intent-matching responder with simulated latency.
 * Designed so connecting a real RAG backend (e.g., Khula Gyan / FastAPI)
 * requires replacing this function implementation.
 */

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  sources?: string[];
  timestamp: string;
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['khula gyan', 'civic', 'rag', 'nepali', 'citation'],
    answer:
      'Khula Gyan is Harikrishna\'s open-source Grounded RAG assistant built specifically for Nepali civic documents. It enforces page-level citations and returns honest refusals when facts are absent, rather than speculating.',
    sources: ['Khula Gyan Specs', 'github.com/HAliveKP'],
  },
  {
    keywords: ['bot', 'discord', 'llm', 'admin'],
    answer:
      'Harikrishna built "Bot", a natural-language Discord admin bot using an LLM planner, discord.py, FastAPI, Redis, and Docker with v1.0.0 release and passing CI.',
    sources: ['github.com/HAliveKP/Bot'],
  },
  {
    keywords: ['research', 'capstone', 'smart-research', 'agent', 'mcp'],
    answer:
      'smart-research-assistant is a capstone multi-agent AI system featuring orchestrator, researcher, analyzer, and writer agents with tool integration (MCP) and state memory.',
    sources: ['github.com/HAliveKP/smart-research-assistant'],
  },
  {
    keywords: ['greencompass', 'green compass', 'carbon', 'nepal', 'gemini'],
    answer:
      'GreenCompass is a live carbon intelligence dashboard for Nepal, tracking real-time carbon indices with React, Vite, Tailwind CSS, and Google Gemini AI.',
    sources: ['green-compass-seven.vercel.app', 'github.com/HAliveKP/GreenCompass'],
  },
  {
    keywords: ['education', 'university', 'coventry', 'softwarica', 'degree', 'college', 'study'],
    answer:
      'Harikrishna is currently pursuing his BSc (Hons) in Artificial Intelligence from Coventry University via Softwarica College of IT & E-Commerce in Kathmandu, Nepal.',
    sources: ['Coventry University / Softwarica College'],
  },
  {
    keywords: ['aws', 'cloud', 'club', 'founding', 'community'],
    answer:
      'Harikrishna is a Founding Member and Technical Lead at AWS Cloud Club Softwarica, where he conducts hands-on sessions on cloud architecture, containers, and developer tooling.',
    sources: ['AWS Cloud Club Softwarica'],
  },
  {
    keywords: ['music', 'songwriting', 'acoustic', 'guitar', 'composition'],
    answer:
      'Beyond code, Harikrishna composes acoustic music. He views songwriting and software engineering as identical disciplines: establishing a motif, editing out the superfluous, and managing tension.',
    sources: ['Beyond Code Section'],
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'github'],
    answer:
      'You can reach Harikrishna via email at hpokhrel794@gmail.com, explore his GitHub at github.com/HAliveKP, or connect on LinkedIn at linkedin.com/in/harikrishna-pokhrel.',
    sources: ['Contact Protocol'],
  },
];

export async function queryAIChat(userPrompt: string): Promise<{ answer: string; sources?: string[] }> {
  // Simulate 450ms network delay for realistic streaming feel
  await new Promise((resolve) => setTimeout(resolve, 450));

  const normalized = userPrompt.toLowerCase().trim();

  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return { answer: entry.answer, sources: entry.sources };
    }
  }

  // Default intelligent fallback
  return {
    answer:
      `I am HKP's AI Assistant. Harikrishna Pokhrel is an AI student at Coventry University (Softwarica) in Kathmandu, specializing in grounded retrieval systems (RAG), agent safety gates, and open-source tools like Khula Gyan and Bot. What specific project or topic would you like to know more about?`,
    sources: ['harikrishnapokhrel.com.np'],
  };
}
