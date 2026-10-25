import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { queryAIChat, ChatMessage } from '../utils/aiChat';
import { Bot, X, Send, Sparkles, CornerDownLeft, Loader2 } from 'lucide-react';

const QUICK_PROMPTS = [
  'What is Khula Gyan?',
  'What is Harikrishna building right now?',
  'Tell me about his RAG research',
  'How to contact HKP?',
];

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I'm Harikrishna's portfolio assistant. Ask me anything about his RAG projects (Khula Gyan), agent safety research, education, or songwriting.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await queryAIChat(text);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: "I encountered a network issue answering your request. Please write directly to hpokhrel794@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group px-4 py-3 rounded-[6px] bg-[#111418] border border-[#1F242D] hover:border-[#00F5FF]/60 text-[#F3F4F6] hover:text-[#00F5FF] font-mono text-xs font-semibold tracking-wider flex items-center gap-2.5 shadow-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F5FF]"
          aria-label="Toggle Ask HKP AI Assistant Chat"
          aria-expanded={isOpen}
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#00F5FF]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00F5FF] animate-ping" />
          </div>
          <span>[ ASK AI ]</span>
          <Sparkles className="w-3.5 h-3.5 text-[#38BDF8] group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] max-h-[600px] h-[520px] rounded-[8px] bg-[#0B0D10]/95 backdrop-blur-xl border border-[#1F242D] shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-label="HKP AI Assistant Chat"
          >
            {/* Header */}
            <div className="bg-[#111418] px-4 py-3 border-b border-[#1F242D] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#00F5FF]" />
                <span className="font-mono text-xs font-bold text-[#F3F4F6] tracking-wider">
                  HKP // AI ASSISTANT (MOCK RAG)
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] text-[#9CA3AF] hover:text-white transition-colors"
                aria-label="Close AI chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-[6px] border leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#161B22] border-[#38BDF8]/40 text-[#F3F4F6]'
                        : 'bg-[#111418] border-[#1F242D] text-[#9CA3AF]'
                    }`}
                  >
                    <div className="font-sans text-xs">{msg.text}</div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-[#1F242D] font-mono text-[10px] text-[#38BDF8]">
                        CITATIONS: {msg.sources.join(' · ')}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-[#4B5563] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3.5 rounded-[6px] bg-[#111418] border border-[#1F242D] text-[#00F5FF] font-mono text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-[#0E1116] border-t border-[#1F242D] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={loading}
                  className="shrink-0 px-2.5 py-1 rounded-[4px] bg-[#111418] border border-[#1F242D] hover:border-[#38BDF8]/50 font-mono text-[10px] text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#111418] border-t border-[#1F242D]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Khula Gyan, RAG, or projects..."
                  className="flex-1 px-3 py-2 rounded-[4px] bg-[#0B0D10] border border-[#1F242D] font-sans text-xs text-[#F3F4F6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00F5FF] placeholder:text-[#4B5563]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-3 py-2 rounded-[4px] bg-[#00F5FF] hover:bg-white text-[#0B0D10] font-mono text-xs font-semibold uppercase disabled:opacity-40 transition-colors flex items-center gap-1"
                  aria-label="Send query"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
