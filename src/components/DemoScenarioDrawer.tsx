import React from 'react';
import { PlayCircle, X, Sparkles, DoorOpen, Moon, Zap, Camera, HelpCircle, Lock } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { DemoScenarioId } from '../types';

export const DemoScenarioDrawer: React.FC = () => {
  const { demoScenarioModalOpen, setDemoScenarioModalOpen, triggerDemoScenario } = useLivingOS();

  if (!demoScenarioModalOpen) return null;

  const scenarios: Array<{ id: DemoScenarioId; title: string; desc: string; icon: React.ReactNode; color: string }> = [
    {
      id: 'scenario_leaving_home',
      title: '1. Leaving Home Scenario',
      desc: 'Simulates 2-hr departure. AI generates eco plan, turns off idle living room, locks entrance.',
      icon: <DoorOpen className="w-5 h-5" />,
      color: 'text-amber-400 bg-amber-500/20 border-amber-500/30'
    },
    {
      id: 'scenario_sleep_mode',
      title: '2. Sleep Mode Scenario',
      desc: 'Sets bedroom AC to 25°C Eco, turns off living room lights/TV, locks entrance door.',
      icon: <Moon className="w-5 h-5" />,
      color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30'
    },
    {
      id: 'scenario_energy_waste',
      title: '3. Energy Waste Detected',
      desc: 'Triggers proactive AI anomaly alert for living room empty 72 mins while fan/light ON.',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30'
    },
    {
      id: 'scenario_room_scan',
      title: '4. Camera Room Scanner',
      desc: 'Opens camera view to scan devices, detect wattage, and sync objects to Living Twin.',
      icon: <Camera className="w-5 h-5" />,
      color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'
    },
    {
      id: 'scenario_what_if_ac',
      title: '5. What-If AC Simulator',
      desc: 'Compares AC 22°C vs Eco 25°C vs OFF with energy & cost graphs.',
      icon: <HelpCircle className="w-5 h-5" />,
      color: 'text-purple-400 bg-purple-500/20 border-purple-500/30'
    },
    {
      id: 'scenario_door_safety',
      title: '6. Night Safety Alert',
      desc: 'Simulates unlocked door at night and prompts AI confirmation guard.',
      icon: <Lock className="w-5 h-5" />,
      color: 'text-rose-400 bg-rose-500/20 border-rose-500/30'
    }
  ];

  const handleSelect = (id: DemoScenarioId) => {
    triggerDemoScenario(id);
    setDemoScenarioModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <PlayCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">iQOO Hackathon 2026</span>
              <h3 className="text-base font-bold text-white leading-tight">Fast 3-Min Pitch Scenarios</h3>
            </div>
          </div>
          <button 
            onClick={() => setDemoScenarioModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Select any scenario below to instantly demonstrate NIVASA AI's predictive capabilities to the evaluators:
        </p>

        <div className="flex flex-col gap-2.5">
          {scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              className="w-full text-left bg-slate-950 hover:bg-slate-800/90 rounded-2xl p-3 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-3 group"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${s.color}`}>
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">{s.title}</h4>
                  <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
