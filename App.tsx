
import React, { useState, useEffect } from 'react';
import Navigation, { Tab } from './components/Navigation';
import MatchCard from './components/MatchCard';
import MatchDetailView from './components/MatchDetailView';
import PointsTable from './components/PointsTable';
import AIAssistant from './components/AIAssistant';
import { Match, MatchStatus } from './types';

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    title: 'WC CUP 2K26 • Group A',
    venue: 'R. Premadasa Stadium, Colombo',
    status: MatchStatus.LIVE,
    teamA: { name: 'Sri Lanka', code: 'SL', flagUrl: 'https://flagcdn.com/w80/lk.png', score: '178/4', overs: '18.2' },
    teamB: { name: 'India', code: 'IND', flagUrl: 'https://flagcdn.com/w80/in.png', score: 'Yet to bat', overs: '0.0' },
    lastUpdate: 'Kusal Mendis 84*(52) batting brilliantly',
  },
  {
    id: '2',
    title: 'WC CUP 2K26 • Group B',
    venue: 'Arun Jaitley Stadium, Delhi',
    status: MatchStatus.UPCOMING,
    teamA: { name: 'South Africa', code: 'SA', flagUrl: 'https://flagcdn.com/w80/za.png' },
    teamB: { name: 'England', code: 'ENG', flagUrl: 'https://flagcdn.com/w80/gb-eng.png' },
    lastUpdate: 'Starts today at 19:30 IST',
  },
  {
    id: '3',
    title: 'WC CUP 2K26 • Warm-up',
    venue: 'Pallekele International Stadium',
    status: MatchStatus.FINISHED,
    teamA: { name: 'Australia', code: 'AUS', flagUrl: 'https://flagcdn.com/w80/au.png', score: '210/3' },
    teamB: { name: 'Pakistan', code: 'PAK', flagUrl: 'https://flagcdn.com/w80/pk.png', score: '185/8' },
    lastUpdate: 'Australia won by 25 runs',
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const renderContent = () => {
    if (selectedMatch) {
      return <MatchDetailView match={selectedMatch} onBack={() => setSelectedMatch(null)} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <div className="p-4 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 mt-4 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 bg-clip-text text-transparent italic tracking-tighter">
                  WC CUP 2K26
                </h1>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Official Live Portal</p>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-full border border-slate-700">
                 <img src="https://www.icc-cricket.com/resources/ver/i/elements/logo.png" className="w-8 invert" alt="ICC" />
              </div>
            </header>

            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full"></span>
                  LIVE ACTION
                </h2>
                <span className="px-2 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-bold rounded-full animate-pulse">
                  2 MATCHES LIVE
                </span>
              </div>
              <div className="grid gap-5">
                {MOCK_MATCHES.filter(m => m.status === MatchStatus.LIVE).map(match => (
                  <MatchCard key={match.id} match={match} onClick={setSelectedMatch} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <span className="w-2 h-6 bg-gradient-to-b from-fuchsia-500 to-purple-600 rounded-full"></span>
                UPCOMING & RECENT
              </h2>
              <div className="grid gap-4">
                {MOCK_MATCHES.filter(m => m.status !== MatchStatus.LIVE).map(match => (
                  <MatchCard key={match.id} match={match} onClick={setSelectedMatch} />
                ))}
              </div>
            </section>
          </div>
        );
      case 'scores':
        return (
          <div className="p-4 pb-24">
             <div className="mb-8 mt-4">
                <h2 className="text-2xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase">Match Schedule</h2>
                <p className="text-slate-500 text-xs">WC cup 2k26 • Official Fixtures</p>
             </div>
            <div className="grid gap-4">
              {MOCK_MATCHES.map(match => (
                <MatchCard key={match.id} match={match} onClick={setSelectedMatch} />
              ))}
            </div>
          </div>
        );
      case 'table':
        return <PointsTable />;
      case 'ai':
        return <AIAssistant />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-slate-950 text-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 -right-20 w-64 h-64 bg-fuchsia-500/10 blur-[100px] pointer-events-none"></div>
      
      <main className="relative z-10">
        {renderContent()}
      </main>
      {!selectedMatch && <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default App;
