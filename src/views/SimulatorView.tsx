import React, { useState } from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { SimulationResult } from '../types';

export const SimulatorView: React.FC = () => {
  const { runSimulationQuery } = useLivingOS();
  const [queryText, setQueryText] = useState('What if I keep the AC on for 5 hours?');
  const [simulation, setSimulation] = useState<SimulationResult>(() => 
    runSimulationQuery('What if I keep the AC on for 5 hours?')
  );

  const sampleQueries = [
    "What if I keep the AC on for 5 hours?",
    "What if all lights remain on overnight?",
    "What if I switch the AC from 22°C to 25°C?",
    "What happens if I leave home without turning off devices?"
  ];

  const handleRunSimulation = (query: string) => {
    setQueryText(query);
    const result = runSimulationQuery(query);
    setSimulation(result);
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-12 animate-in fade-in duration-300">
      
      <div>
        <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5" /> DIGITAL TWIN WHAT-IF SIMULATOR
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">Scenario Simulator</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Predict consequences before executing actions on physical devices.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          SELECT WHAT-IF SCENARIO
        </h3>

        <div className="grid grid-cols-1 gap-2">
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleRunSimulation(sq)}
              className={`p-3 rounded-2xl text-left border text-xs font-medium transition-all ${
                queryText === sq
                  ? 'bg-purple-950/60 border-purple-500/60 text-purple-200 shadow-md shadow-purple-500/10'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              "{sq}"
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/90 rounded-3xl p-4 border border-purple-500/30 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-400" /> Simulated Results ({simulation.durationHours}h Window)
          </span>
          <span className="text-[10px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
            3 Options Analyzed
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {simulation.options.map((opt) => {
            const isRecommended = opt.id === simulation.recommendedOptionId;
            return (
              <div
                key={opt.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col gap-2.5 relative ${
                  isRecommended
                    ? 'bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-2.5 right-3 bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-md">
                    AI Recommended Option
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{opt.label}</h4>
                  <span className="text-[11px] font-mono text-slate-400">{opt.mode}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Energy Consumption</span>
                      <span className="font-mono text-emerald-400 font-bold">{opt.estimatedEnergyKWh} kWh</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (opt.estimatedEnergyKWh / 6.0) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Estimated Cost</span>
                      <span className="font-mono text-cyan-400 font-bold">₹{opt.estimatedCostRs}</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-cyan-400 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (opt.estimatedCostRs / 50.0) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400">Comfort Score: <strong className="text-indigo-300">{opt.comfortScore}%</strong></span>
                  <span className="text-slate-400 italic text-[10px]">{opt.deviceImpact}</span>
                </div>

              </div>
            );
          })}
        </div>

        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-3.5 flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Breakdown
          </span>
          <p className="text-xs text-indigo-100 leading-relaxed">
            {simulation.explanation}
          </p>
          <div className="bg-slate-950/80 rounded-xl p-2 border border-slate-800 text-[11px] text-emerald-300 font-medium">
            💡 <strong>Key Takeaway:</strong> {simulation.keyTakeaway}
          </div>
        </div>

      </div>

    </div>
  );
};
