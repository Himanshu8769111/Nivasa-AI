import React from 'react';
import { 
  Zap, ShieldCheck, Smile, Sparkles, AlertTriangle, 
  DoorClosed, Moon, Film, ChevronRight, Activity 
} from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';

export const HomeView: React.FC = () => {
  const { 
    livingScore, devices, runNLCommand, 
    setCurrentPlan, setActiveTab, triggerAutomationNow 
  } = useLivingOS();

  const bedroomAc = devices.find(d => d.id === 'dev_bedroom_ac');
  const bedroomFan = devices.find(d => d.id === 'dev_bedroom_fan');
  const activeLights = devices.filter(d => d.type === 'light' && d.state === 'ON').length;
  const doorLock = devices.find(d => d.type === 'lock');
  const charger = devices.find(d => d.id === 'dev_bedroom_charger');

  const handleReviewInsight = () => {
    const plan = runNLCommand('What is wasting electricity right now?');
    setCurrentPlan(plan);
    setActiveTab('ai');
  };

  const handleOptimizeInsight = () => {
    const plan = runNLCommand('Make the house energy efficient');
    setCurrentPlan(plan);
    setActiveTab('ai');
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Dashboard Greeting Header */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-3xl border border-slate-800/80">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Good evening, Himanshu</h2>
          <p className="text-xs md:text-sm text-slate-400 font-medium mt-0.5">{livingScore.statusText}</p>
        </div>
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-sm text-cyan-300">
            H
          </div>
        </div>
      </div>

      {/* Desktop Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Living Score, AI Insight & Suggested Actions */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* LIVING SCORE CARD (87/100) */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 rounded-3xl p-5 border border-indigo-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Digital Twin Living Score
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-5xl font-extrabold text-white tracking-tight font-mono">
                    {livingScore.overall}
                  </span>
                  <span className="text-base font-semibold text-slate-400">/100</span>
                </div>
                <span className="text-xs font-semibold text-emerald-400 mt-1">
                  Optimal Living Status
                </span>
              </div>

              {/* Radial Circular Score Visual */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="38"
                    stroke="currentColor"
                    strokeWidth="7"
                    className="text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="38"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeDasharray={240}
                    strokeDashoffset={240 - (240 * livingScore.overall) / 100}
                    strokeLinecap="round"
                    className="text-cyan-400 transition-all duration-1000 ease-out"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Breakdown Chips */}
            <div className="grid grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80">
              <div className="flex flex-col items-center bg-slate-950/60 rounded-2xl p-2.5 border border-slate-800/60">
                <Smile className="w-4 h-4 text-indigo-400 mb-1" />
                <span className="text-[10px] text-slate-400">Comfort</span>
                <span className="text-sm font-bold text-indigo-300 font-mono">{livingScore.comfort}</span>
              </div>
              <div className="flex flex-col items-center bg-slate-950/60 rounded-2xl p-2.5 border border-slate-800/60">
                <ShieldCheck className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] text-slate-400">Safety</span>
                <span className="text-sm font-bold text-amber-300 font-mono">{livingScore.safety}</span>
              </div>
              <div className="flex flex-col items-center bg-slate-950/60 rounded-2xl p-2.5 border border-slate-800/60">
                <Zap className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="text-[10px] text-slate-400">Energy</span>
                <span className="text-sm font-bold text-emerald-300 font-mono">{livingScore.energy}</span>
              </div>
              <div className="flex flex-col items-center bg-slate-950/60 rounded-2xl p-2.5 border border-slate-800/60">
                <Sparkles className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="text-[10px] text-slate-400">Convenience</span>
                <span className="text-sm font-bold text-cyan-300 font-mono">{livingScore.convenience}</span>
              </div>
            </div>
          </div>

          {/* AI PROACTIVE INSIGHT CARD */}
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-amber-500/30 shadow-lg flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">AI Proactive Insight</span>
                <h4 className="text-sm font-bold text-white">Living Room Idle Power Waste</h4>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80">
              "Your living room has been empty for <strong className="text-amber-400">72 minutes</strong> while the fan and ceiling light are still actively drawing power."
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReviewInsight}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-3 px-4 rounded-xl border border-slate-700 transition-colors"
              >
                [ Review ]
              </button>
              <button
                onClick={handleOptimizeInsight}
                className="flex-1 bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl shadow-md shadow-amber-500/20 transition-all"
              >
                [ Optimize ]
              </button>
            </div>
          </div>

          {/* SUGGESTED ACTIONS */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
              SUGGESTED MULTI-DEVICE ACTIONS
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => triggerAutomationNow('auto_sleep_mode')}
                className="bg-slate-900/90 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/40 p-4 rounded-2xl text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Moon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300">Prepare for sleep</h4>
                <p className="text-[10px] text-slate-400 mt-1">AC 25°C + Darken Living</p>
              </button>

              <button
                onClick={() => triggerAutomationNow('auto_energy_save')}
                className="bg-slate-900/90 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">Save energy</h4>
                <p className="text-[10px] text-slate-400 mt-1">Shut idle room loads</p>
              </button>

              <button
                onClick={() => triggerAutomationNow('auto_leaving_home')}
                className="bg-slate-900/90 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <DoorClosed className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300">Leave home</h4>
                <p className="text-[10px] text-slate-400 mt-1">Eco AC + Guard Lock</p>
              </button>

              <button
                onClick={() => triggerAutomationNow('auto_movie_mode')}
                className="bg-slate-900/90 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-2xl text-left transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                  <Film className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">Movie mode</h4>
                <p className="text-[10px] text-slate-400 mt-1">TV ON + Dim 20%</p>
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Home Status & Device Grid */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-lg flex flex-col gap-4 sticky top-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" /> HOME STATUS
              </h3>
              <button 
                onClick={() => setActiveTab('twin')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
              >
                <span>View Twin Graph</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2.5 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Bedroom Occupancy:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Occupied
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Living Room Occupancy:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Empty (72m)
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Bedroom Thermostat:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {bedroomAc?.mode || 'Cool 22°C'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Ceiling Fan:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {bedroomFan?.mode || 'Speed 3'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Active Lighting:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  {activeLights} Lamps ON
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Entrance Smart Lock:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {doorLock?.state === 'ON' ? 'Locked & Guarded' : 'Unlocked'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Desk Fast Charger:</span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  {charger?.state === 'ACTIVE' ? 'Drawing 15W' : 'Idle'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
