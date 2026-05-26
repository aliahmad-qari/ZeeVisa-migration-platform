import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles, User, Globe, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      text: "As-salamu alaykum! I'm **ZeeBot**, your interactive Gulf Visa & Migration AI assistant. 🌍✈️\n\nHow can I help you navigate the process for Gulf countries today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build a minimalist history formatted for ZeeBot
      const historyPayload = messages.map(msg => ({
        role: msg.roleItem || msg.role,
        text: msg.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        text: data.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        text: "I am having temporary trouble connecting to the digital pipeline. Please verify internet connection or try asking your question again in a bit.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend(input);
    }
  };

  // Quick suggestions for the user
  const suggestions = [
    { label: "📍 Saudi Biometrics", prompt: "How do I complete my biometrics for a Saudi Working Visa?" },
    { label: "🏥 Wafid Medical Check", prompt: "What are the rules and process for the Wafid GAMCA medical tests?" },
    { label: "🇦🇪 UAE Emirates ID", prompt: "How do I register for biometrics to get an Emirates ID?" },
    { label: "💼 Dubai IT Salary Band", prompt: "What is the average salary range for software engineers in UAE / Dubai?" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none flex flex-col items-end">
      <AnimatePresence>
        {/* CHAT WINDOW CONTAINER */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="bg-white text-slate-800 rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col w-[350px] sm:w-[400px] h-[520px] max-h-[85vh] overflow-hidden mb-4"
          >
            {/* Elegant Header */}
            <div className="bg-[#0b1b3d] text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="p-2 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-xl shadow-lg ring-2 ring-amber-500/20">
                    <Bot className="w-5 h-5 text-slate-950 stroke-[2.5]" />
                  </div>
                  <span className="absolute bottom-[-1px] right-[-1px] w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#091530] animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight tracking-tight flex items-center gap-1.5">
                    ZeeBot AI Chat
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </h3>
                  <p className="text-[10px] text-slate-300 font-medium tracking-wide">Gulf immigration advisor • Live</p>
                </div>
              </div>
              <button
                onClick={handleToggle}
                className="p-1.5 hover:bg-slate-800 rounded-xl transition cursor-pointer select-none"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            {/* Conversation Flow Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bob/User Icons */}
                  {msg.role !== 'user' && (
                    <div className="shrink-0 p-1.5 bg-[#0b1b3d] text-amber-500 rounded-xl h-8 w-8 flex items-center justify-center">
                      <Bot className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  )}

                  <div className="space-y-1 max-w-[80%]">
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-[#0b1b3d] text-white rounded-tr-none font-medium'
                          : 'bg-white border border-slate-200/85 text-slate-850 rounded-tl-none font-medium'
                      }`}
                    >
                      {/* Robust support for formatting markdown lines cleanly */}
                      {msg.text.split('\n').map((line, idx) => {
                        let parsedLine = line;
                        // Replace double bold marks
                        const boldRegex = /\*\*(.*?)\*\*/g;
                        const matchMatches = parsedLine.match(boldRegex);
                        if (matchMatches) {
                          const elements: React.ReactNode[] = [];
                          let remaining = parsedLine;
                          let keyIndex = 0;
                          while (true) {
                            const match = boldRegex.exec(parsedLine);
                            if (!match) break;
                            const startIndex = remaining.indexOf(match[0]);
                            if (startIndex > 0) {
                              elements.push(remaining.substring(0, startIndex));
                            }
                            elements.push(<strong key={keyIndex++} className="font-extrabold text-[#f59e0b]">{match[1]}</strong>);
                            remaining = remaining.substring(startIndex + match[0].length);
                          }
                          elements.push(remaining);
                          return <p key={idx} className="mb-1.5 last:mb-0">{elements}</p>;
                        }
                        return <p key={idx} className="mb-1.5 last:mb-0">{line}</p>;
                      })}
                    </div>
                    <span className="block text-[9px] text-slate-400 font-medium px-1 font-mono">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="shrink-0 p-1.5 bg-amber-500 text-slate-950 rounded-xl h-8 w-8 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="shrink-0 p-1.5 bg-[#0b1b3d] text-amber-500 rounded-xl h-8 w-8 flex items-center justify-center">
                    <Bot className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" />
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Tap suggestions row */}
            <div className="px-4 py-2 bg-white border-t border-slate-100">
              <div className="text-[10px] text-slate-400 font-extrabold flex items-center gap-1 mb-1.5">
                <HelpCircle className="w-3 h-3 text-amber-500" /> SUGGESTIONS:
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto pr-1">
                {suggestions.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(s.prompt)}
                    className="text-[9.5px] font-bold py-1 px-2.5 bg-slate-100 hover:bg-amber-100 hover:text-amber-600 text-slate-600 rounded-full border border-slate-250 transition cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input Row */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Etimad, GAMCA, visas, UAE..."
                className="flex-1 text-xs py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 outline-none rounded-full font-medium text-slate-800 placeholder-slate-400 transition"
              />
              <button
                onClick={() => handleSend(input)}
                className="shrink-0 p-2.5 bg-[#0b1b3d] hover:bg-amber-500 text-amber-500 hover:text-slate-950 rounded-full shadow-md transition cursor-pointer select-none"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HORIZONTAL COMPACT DOCK OF FLOATING UTILITIES */}
      <div className="flex items-center gap-3">
        {/* ANIMATED WHATSAPP FLOATING BUTTON */}
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-emerald-500 rounded-full pointer-events-none z-[-1]"
          />
          <motion.a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="p-4 bg-[#12b34c] hover:bg-[#10a144] text-white rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer select-none group border border-emerald-600/50"
            title="Chat on WhatsApp"
          >
            <svg 
              className="w-6 h-6 fill-white" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.4 4.8 1.4 5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10c0 1.9.5 3.4 1.4 4.9l-.9 3.4 3.5-.9zM16.5 13.5c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.8-.9-2.4-.3-.6-.6-.5-.9-.5H7.5c-.3 0-.7.1-1.1.5-.4.4-1.4 1.4-1.4 3.4s1.5 4 1.7 4.3c.2.2 2.9 4.5 7.1 6.3 1 .4 1.8.7 2.4.9 1 .3 2 .3 2.7.2.8-.1 2.5-1 2.8-2 .3-1 .3-1.9.2-2.1-.2-.2-.5-.3-.8-.4z" />
            </svg>
          </motion.a>
        </div>

        {/* FLOAT ACTION FLOATING ZEEBOT BUTTON */}
        <div className="relative">
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2.0,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-[#0b1b3d] rounded-full border border-amber-500/50 pointer-events-none z-[-1]"
            />
          )}
          <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="p-4.5 bg-[#0b1b3d] text-white rounded-full shadow-2xl flex items-center justify-center relative cursor-pointer select-none group border border-slate-800"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-amber-500 inline-block stroke-[2.5]" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Bot className="w-6 h-6 text-amber-500 inline-block stroke-[2.5]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-3.5 -right-3.5 bg-emerald-500 text-slate-950 text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg border-2 border-[#091530] animate-bounce">
                      {unreadCount}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
