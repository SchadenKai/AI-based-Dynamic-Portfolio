"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaTerminal, FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa6';
import { useLayoutStore, SectionName } from '@/store/useLayoutStore';
import TextareaAutosize from 'react-textarea-autosize';

// Humorous messages for network/connection failures
const NETWORK_ERROR_MESSAGES = [
  "Whoops! The internet gremlins ate my signal. 📡 Try again in a sec?",
  "My carrier pigeon got lost. 🐦 Mind giving it another go?",
  "The Wi-Fi gods are not pleased today. But hey, the portfolio still looks great!",
  "Connection dropped faster than my New Year's resolutions. Please retry!",
  "*taps microphone* Is this thing on? Let's try that again.",
  "The tubes of the internet got clogged. 🚿 One more try?",
  "My message got stuck in traffic. 🚗 Please send again!",
  "Looks like a squirrel chewed through the cables again. Classic squirrel.",
  "The digital winds weren't in my favor. ⛵ Care to try once more?",
  "Signal lost in the void! 🌌 Please retransmit.",
];

// Get a random network error message
const getRandomNetworkError = () => {
  return NETWORK_ERROR_MESSAGES[Math.floor(Math.random() * NETWORK_ERROR_MESSAGES.length)];
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Identify yourself. How should I reconfigure this portfolio for you?" }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const setLayout = useLayoutStore((state) => state.setLayout);

  const prompts = [
    { label: "Recruiter", text: "I'm a technical recruiter looking for a Senior Frontend Engineer." },
    { label: "Hiring Manager", text: "I'm an Engineering Manager interested in your system design skills." },
    { label: "Developer", text: "I'm a fellow developer. Show me your coolest side project." },
  ];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || status === 'loading') return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setStatus('loading');

    try {
      // Send last 10 messages context
      const historyContext = [...messages, { role: 'user', content: userMessage }].slice(-10);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: historyContext
        }),
      });

      const data = await res.json();

      // Handle rate limiting (429 status or isRateLimited flag)
      if (res.status === 429 || data.isRateLimited) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message || "You're chatting too fast! Please slow down."
        }]);
        setStatus('error');
        return;
      }

      if (data.layout_order && Array.isArray(data.layout_order)) {
        setLayout(data.layout_order as SectionName[], data.highlight_ids || []);
        setMessages(prev => [...prev, { role: 'assistant', content: data.message || "Portfolio reconfigured." }]);
        setStatus('success');

        // Unveiling transition
        setTimeout(() => {
          const portfolio = document.getElementById('portfolio');
          if (portfolio) {
            portfolio.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1000);
      } else {
        // Log the response for debugging but show user a friendly message
        console.error("Invalid API response", data);
        setStatus('error');
        // API might have returned an error message or use network error fallback
        const errorMessage = data.message || getRandomNetworkError();
        setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessages(prev => [...prev, { role: 'assistant', content: getRandomNetworkError() }]);
    }
  };

  const handlePromptClick = (text: string) => {
    setInput(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section aria-label="AI Portfolio Configuration Chat" className="w-full h-[calc(100vh-4rem)] flex flex-col justify-center max-w-4xl mx-auto font-mono px-4 md:px-0">
      <div className="border-2 border-border bg-surface flex flex-col h-[500px] md:h-[600px] max-h-[90vh] relative overflow-hidden group shadow-[8px_8px_0px_0px_var(--border-color)] rounded-lg" role="region" aria-label="Chat interface">

        {/* Header */}
        <header className="flex items-center gap-2 md:gap-3 p-3 md:p-4 border-b-2 border-border bg-secondary z-10 text-black shrink-0">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-background border-2 border-border rounded-full" aria-hidden="true" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-background border-2 border-border rounded-full" aria-hidden="true" />
          <h2 className="flex-1 text-center font-bold uppercase tracking-widest text-xs md:text-sm">
            System Interface // Context Layer
          </h2>
          <FaTerminal className="text-lg md:text-xl" aria-hidden="true" />
        </header>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 scrollbar-thin scrollbar-thumb-foreground scrollbar-track-transparent" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, idx) => (
            <article key={idx} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`} aria-label={`${msg.role === 'assistant' ? 'AI' : 'You'}: ${msg.content}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 border-2 border-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_var(--border-color)] ${msg.role === 'assistant' ? 'bg-secondary text-black' : 'bg-foreground text-background'}`} aria-hidden="true">
                {msg.role === 'assistant' ? <FaRobot /> : <FaUser />}
              </div>
              <div className={`flex-1 max-w-[85%] md:max-w-[80%] border-2 border-border p-3 md:p-4 text-xs md:text-sm font-medium shadow-[4px_4px_0px_0px_var(--border-color)] ${msg.role === 'assistant' ? 'bg-background text-foreground' : 'bg-primary text-white'}`}>
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              </div>
            </article>
          ))}
          {status === 'loading' && (
            <div className="flex gap-3 md:gap-4 animate-fade-in opacity-50" role="status" aria-label="AI is processing your message">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary border-2 border-border flex items-center justify-center shadow-[2px_2px_0px_0px_var(--border-color)]" aria-hidden="true">
                <FaRobot className="animate-pulse" />
              </div>
              <div className="border-2 border-border bg-background p-3 md:p-4 text-xs md:text-sm text-foreground shadow-[4px_4px_0px_0px_var(--border-color)]">
                <span className="animate-pulse">Analyzing input credentials...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <footer className="p-3 md:p-4 border-t-2 border-border bg-background shrink-0">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <TextareaAutosize
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your role or intent..."
              minRows={1}
              maxRows={4}
              className="flex-1 bg-background border-2 border-border text-foreground placeholder-muted-foreground focus:outline-none resize-none py-3 px-4 text-sm leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] focus:shadow-[4px_4px_0px_0px_var(--border-color)] transition-all"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || !input.trim()}
              aria-label="Send message"
              className="mb-1 h-11 w-11 md:h-[46px] md:w-[46px] flex items-center justify-center bg-foreground border-2 border-border text-background shadow-[4px_4px_0px_0px_var(--border-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border-color)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <FaPaperPlane className="text-sm" aria-hidden="true" />
            </button>
          </form>

          {/* Prompts */}
          <nav aria-label="Quick prompt templates" className="flex gap-2 mt-3 md:mt-4 overflow-x-auto pb-3 md:pb-4 scrollbar-hide pt-2">
            <span className="text-xs text-foreground font-bold uppercase py-1 mr-2 shrink-0 self-center">Quick Access:</span>
            {prompts.map((prompt) => (
              <button
                key={prompt.label}
                type="button"
                onClick={() => handlePromptClick(prompt.text)}
                className="group border-2 border-border bg-background px-3 py-2 min-h-[44px] text-xs text-left text-foreground font-bold hover:bg-accent hover:shadow-[3px_3px_0px_0px_var(--border-color)] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 max-w-[200px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                title={prompt.text}
                aria-label={`Use prompt: ${prompt.label}`}
              >
                <span>[{prompt.label}]</span>
              </button>
            ))}
          </nav>

          {/* Skip Button */}
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => {
                useLayoutStore.getState().resetLayout();
                setTimeout(() => {
                  const portfolio = document.getElementById('portfolio');
                  if (portfolio) {
                    portfolio.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 500);
              }}
              className="text-xs text-foreground font-bold hover:text-primary transition-colors flex items-center gap-1 border-b-2 border-transparent hover:border-border min-h-[44px] focus:outline-none focus-visible:text-primary"
              aria-label="Skip chat and go directly to portfolio"
            >
              Just browsing? Skip to Portfolio <span className="text-primary font-black" aria-hidden="true">↓</span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
