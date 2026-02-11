
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Welcome to the WC cup 2k26 Strategy Room. I am your Official Expert AI. Ask me about live scores, player form, or tournament history!' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: `You are the Official WC cup 2k26 Expert. 
          Your primary source is https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026. 
          Always check for live score updates if asked about ongoing matches in WC cup 2k26. 
          Use a vibrant, knowledgeable, and energetic tone. Use markdown formatting.`,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm currently unable to retrieve the latest stats. Please try again soon." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Signal lost from the official commentary box. Check your connection!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 pb-24 animate-in fade-in duration-500">
      <div className="p-4 border-b border-white/5 glass flex items-center justify-between">
        <div>
           <h2 className="text-2xl font-black italic text-fuchsia-500 tracking-tighter">STRATEGY ROOM</h2>
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">WC cup 2k26 OFFICIAL AI</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-fuchsia-600 rounded-2xl flex items-center justify-center rotate-3 shadow-lg shadow-fuchsia-500/20">
           <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
           </svg>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed shadow-xl ${
              m.role === 'user' 
                ? 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-tr-none shadow-indigo-500/10' 
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              <div className="prose prose-sm prose-invert max-w-none">
                 <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl rounded-tl-none flex gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-950/80 backdrop-blur-md">
        <div className="flex gap-2 bg-slate-900 border border-slate-800 p-3 rounded-[2rem] focus-within:border-cyan-500/50 transition-all shadow-inner">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about WC cup 2k26..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1 px-3 placeholder:text-slate-600 text-white"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20"
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
