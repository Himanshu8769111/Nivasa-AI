import React from 'react';
import { Sliders, Play, DoorOpen, Moon, BookOpen, Film, Zap, ShieldCheck } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';

export const AutomationsView: React.FC = () => {
  const { automations, toggleAutomation, triggerAutomationNow } = useLivingOS();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'departure': return <DoorOpen className="w-5 h-5 text-amber-400" />;
      case 'sleep': return <Moon className="w-5 h-5 text-indigo-400" />;
      case 'study': return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'movie': return <Film className="w-5 h-5 text-purple-400" />;
      case 'eco': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'security': default: return <ShieldCheck className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-12 animate-in fade-in duration-300">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" /> Autonomous Engine
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">Smart Automations</h2>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          {automations.filter(a => a.enabled).length} Active Routines
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className={`bg-slate-900/90 rounded-3xl p-4 border transition-all flex flex-col gap-3 relative ${
              auto.enabled ? 'border-slate-800 shadow-lg' : 'border-slate-800/60 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                  {getCategoryIcon(auto.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{auto.name}</h3>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      Saves ~{auto.estimatedSavingKWh} kWh
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{auto.tagline}</p>
                </div>
              </div>

              <button
                onClick={() => toggleAutomation(auto.id)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  auto.enabled ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  auto.enabled ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 rounded-2xl p-2.5 border border-slate-800/80">
              {auto.description}
            </p>

            <div className="flex flex-col gap-1.5 text-[10px]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-500 font-bold uppercase">Triggers:</span>
                {auto.triggers.map((trig, idx) => (
                  <span key={idx} className="bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-mono">
                    {trig}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-slate-500 font-bold uppercase">Actions:</span>
                {auto.actions.map((act, idx) => (
                  <span key={idx} className="bg-indigo-950/60 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-mono">
                    {act}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => triggerAutomationNow(auto.id)}
              className="w-full bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500/40 text-slate-200 hover:text-white font-semibold text-xs py-2 px-3 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-1.5 mt-1"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>TEST RUN ROUTINE NOW</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
