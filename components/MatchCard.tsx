
import React from 'react';
import { Match, MatchStatus } from '../types';

interface MatchCardProps {
  match: Match;
  onClick: (match: Match) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  const isLive = match.status === MatchStatus.LIVE;

  return (
    <div 
      onClick={() => onClick(match)}
      className="relative overflow-hidden group bg-slate-900/40 border border-slate-800/50 rounded-3xl p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-800/60 active:scale-[0.98] shadow-xl shadow-black/20"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/0 via-fuchsia-500/0 to-yellow-500/0 group-hover:from-cyan-500/5 group-hover:via-fuchsia-500/5 group-hover:to-yellow-500/5 transition-all duration-500 rounded-3xl"></div>

      {/* Live Badge */}
      {isLive && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-rose-600 text-white rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20 z-20">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          Live
        </div>
      )}

      <div className="mb-4 relative z-10">
        <h3 className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest mb-0.5">{match.title}</h3>
        <p className="text-slate-500 text-[9px] sm:text-[10px] font-medium opacity-80 truncate">{match.venue}</p>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-6 relative z-10">
        {/* Team A */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <div className="relative mb-2 sm:mb-3">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
            <img 
              src={match.teamA.flagUrl} 
              alt={match.teamA.name} 
              className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-slate-700 object-cover shadow-2xl" 
            />
          </div>
          <span className="font-black text-xs sm:text-sm tracking-tight truncate w-full text-center">{match.teamA.code}</span>
          <span className="text-cyan-400 text-sm sm:text-base font-black mt-0.5 leading-none">{match.teamA.score || '--'}</span>
        </div>

        {/* VS Divider */}
        <div className="flex flex-col items-center shrink-0">
            <div className="text-slate-800 font-black italic text-xl sm:text-2xl tracking-tighter opacity-50">VS</div>
            <div className="h-6 sm:h-8 w-[1px] bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <div className="relative mb-2 sm:mb-3">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full"></div>
            <img 
              src={match.teamB.flagUrl} 
              alt={match.teamB.name} 
              className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-slate-700 object-cover shadow-2xl" 
            />
          </div>
          <span className="font-black text-xs sm:text-sm tracking-tight truncate w-full text-center">{match.teamB.code}</span>
          <span className="text-fuchsia-400 text-sm sm:text-base font-black mt-0.5 leading-none">{match.teamB.score || '--'}</span>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-800/30 flex justify-between items-center relative z-10">
        <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-md truncate max-w-[65%]">{match.lastUpdate}</span>
        {match.status === MatchStatus.UPCOMING && (
          <button className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 shrink-0">Set Alert</button>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
