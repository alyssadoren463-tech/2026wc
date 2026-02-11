
import React from 'react';

const STANDINGS = [
  { team: 'India', p: 9, w: 9, l: 0, pts: 18, nrr: '+2.570' },
  { team: 'South Africa', p: 9, w: 7, l: 2, pts: 14, nrr: '+1.261' },
  { team: 'Australia', p: 9, w: 7, l: 2, pts: 14, nrr: '+0.841' },
  { team: 'New Zealand', p: 9, w: 5, l: 4, pts: 10, nrr: '+0.743' },
  { team: 'Pakistan', p: 9, w: 4, l: 5, pts: 8, nrr: '-0.199' },
  { team: 'Afghanistan', p: 9, w: 4, l: 5, pts: 8, nrr: '-0.336' },
];

const PointsTable: React.FC = () => {
  return (
    <div className="p-4 pb-24 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black mb-6 mt-4 italic uppercase">Points Table</h2>
      
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-6 gap-2 p-4 bg-slate-800/50 text-[10px] font-black uppercase tracking-wider text-slate-400">
          <div className="col-span-2">Team</div>
          <div className="text-center">P</div>
          <div className="text-center">W</div>
          <div className="text-center">PTS</div>
          <div className="text-right">NRR</div>
        </div>
        <div className="divide-y divide-slate-800">
          {STANDINGS.map((row, idx) => (
            <div key={row.team} className="grid grid-cols-6 gap-2 p-4 text-xs items-center hover:bg-slate-800/30 transition-colors">
              <div className="col-span-2 flex items-center gap-2">
                <span className="font-bold text-slate-500">{idx + 1}</span>
                <span className="font-bold">{row.team}</span>
              </div>
              <div className="text-center text-slate-400 font-medium">{row.p}</div>
              <div className="text-center text-slate-400 font-medium">{row.w}</div>
              <div className="text-center font-black text-indigo-400">{row.pts}</div>
              <div className="text-right font-mono text-slate-400">{row.nrr}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
        <h4 className="text-xs font-bold text-indigo-400 mb-2 uppercase italic">Qualification Path</h4>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          The top 4 teams at the end of the group stage will qualify for the Semi-Finals.
          India and South Africa have already secured their spots.
        </p>
      </div>
    </div>
  );
};

export default PointsTable;
