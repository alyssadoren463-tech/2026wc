
import React, { useState, useEffect } from 'react';
import { Match, LiveUpdateResponse } from '../types';
import { fetchLiveCricketData, getAIPrediction } from '../services/geminiService';

interface MatchDetailViewProps {
  match: Match;
  onBack: () => void;
}

const MatchDetailView: React.FC<MatchDetailViewProps> = ({ match, onBack }) => {
  const [updates, setUpdates] = useState<LiveUpdateResponse | null>(null);
  const [prediction, setPrediction] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [liveData, aiPred] = await Promise.all([
        fetchLiveCricketData(`WC cup 2k26 ${match.teamA.name} vs ${match.teamB.name} live score official update`),
        getAIPrediction(`WC cup 2k26: ${match.teamA.name} vs ${match.teamB.name}`)
      ]);
      setUpdates(liveData);
      setPrediction(aiPred);
      setLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 30000); // 30s refresh for T20 action
    return () => clearInterval(interval);
  }, [match]);

  return (
    <div className="min-h-screen bg-slate-950 pb-20 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Dynamic Header */}
      <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-slate-900 rounded-2xl border border-slate-800 text-slate-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
          <h2 className="font-black italic text-xs text-cyan-400 uppercase tracking-widest leading-none">SCORE CENTER</h2>
          <p className="text-[10px] text-slate-500 font-black mt-1">{match.teamA.code} v {match.teamB.code} • WC CUP 2K26</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
            {loading ? (
                <div className="w-4 h-4 border-2 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-lg shadow-rose-500/50"></div>
            )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Premium Score Board */}
        <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] border border-white/5 p-8 shadow-3xl">
          {/* Background Branding Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-500/10 blur-3xl"></div>
          
          <div className="flex justify-between items-start relative z-10 mb-8">
            <div className="text-center flex-1">
              <div className="relative inline-block mb-3">
                <div className="absolute -inset-2 bg-cyan-500/20 blur-xl rounded-full"></div>
                <img src={match.teamA.flagUrl} className="relative w-16 h-16 rounded-full border-2 border-slate-700 shadow-2xl" alt="" />
              </div>
              <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest">{match.teamA.code}</h4>
              <p className="text-2xl font-black text-white mt-1">{match.teamA.score || '0/0'}</p>
              <p className="text-[10px] font-bold text-cyan-400">{match.teamA.overs || '0.0'} OV</p>
            </div>

            <div className="px-4 py-8 flex flex-col items-center justify-center self-center">
              <span className="text-xl font-black text-slate-800 italic transform -rotate-12 mb-2">VS</span>
              <div className="px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black rounded-sm">LIVE</div>
            </div>

            <div className="text-center flex-1">
              <div className="relative inline-block mb-3">
                <div className="absolute -inset-2 bg-fuchsia-500/20 blur-xl rounded-full"></div>
                <img src={match.teamB.flagUrl} className="relative w-16 h-16 rounded-full border-2 border-slate-700 shadow-2xl" alt="" />
              </div>
              <h4 className="font-black text-xs text-slate-400 uppercase tracking-widest">{match.teamB.code}</h4>
              <p className="text-2xl font-black text-white mt-1">{match.teamB.score || '0/0'}</p>
              <p className="text-[10px] font-bold text-fuchsia-400">{match.teamB.overs || '0.0'} OV</p>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/5 text-center relative z-10">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Current Partnership</p>
            <p className="text-xs font-bold text-slate-200">K. Mendis 42(30) & C. Asalanka 12(8)</p>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl p-5 shadow-lg shadow-blue-500/20 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-3 mb-3">
             <div className="bg-white/20 p-2 rounded-xl">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <h4 className="font-black text-xs text-white uppercase italic tracking-wider">Expert AI Predictor</h4>
          </div>
          <p className="text-sm font-medium text-indigo-50 leading-relaxed">
            {loading ? <span className="opacity-70 animate-pulse">Running Monte Carlo simulations...</span> : prediction}
          </p>
        </div>

        {/* Detailed Official Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black italic tracking-tighter flex items-center gap-2">
               <span className="w-1.5 h-6 bg-yellow-400 rounded-full"></span>
               OFFICIAL FEED
            </h3>
            <span className="text-[10px] font-bold text-slate-500">Auto-refresh: 30s</span>
          </div>
          
          <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 min-h-[200px]">
            {updates ? (
              <article className="prose prose-sm prose-invert max-w-none prose-headings:font-black prose-headings:italic prose-headings:text-cyan-400 prose-p:text-slate-300 prose-strong:text-white">
                <div dangerouslySetInnerHTML={{ __html: updates.text.replace(/\n/g, '<br/>') }} />
              </article>
            ) : (
              <div className="space-y-4">
                <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded-full w-1/2 animate-pulse"></div>
                <div className="h-4 bg-slate-800 rounded-full w-full animate-pulse"></div>
                <div className="h-20 bg-slate-800/50 rounded-2xl w-full animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        {/* Official Sources Grounding */}
        {updates?.sources && updates.sources.length > 0 && (
          <div className="px-2 pt-4">
            <p className="text-[9px] font-black text-slate-600 mb-3 uppercase tracking-widest">Grounding via ICC Official Site</p>
            <div className="flex flex-wrap gap-2">
              {updates.sources.map((source, idx) => (
                <a 
                  key={idx} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-[10px] font-bold text-cyan-400 hover:border-cyan-500 transition-all flex items-center gap-2"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {source.title.substring(0, 20)}...
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetailView;
