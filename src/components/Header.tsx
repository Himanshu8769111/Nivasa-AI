import React from 'react';
import { 
  Zap, Cpu, PlayCircle, Home, Layers, Sparkles, Camera, 
  HelpCircle, Sliders, BarChart3, ShieldCheck 
} from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { ActiveTab } from '../types';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, setDemoScenarioModalOpen, totalPowerWatts } = useLivingOS();

  const navLinks: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'twin', label: 'Living Twin', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { id: 'ai', label: 'AI Command', icon: <Sparkles className="w-4 h-4 text-indigo-400" /> },
    { id: 'scanner', label: 'Scanner', icon: <Camera className="w-4 h-4 text-emerald-400" /> },
    { id: 'simulator', label: 'What-If', icon: <HelpCircle className="w-4 h-4 text-purple-400" /> },
    { id: 'automations', label: 'Automations', icon: <Sliders className="w-4 h-4 text-amber-400" /> },
    { id: 'insights', label: 'Insights', icon: <BarChart3 className="w-4 h-4 text-cyan-400" /> },
    { id: 'devices', label: 'Devices', icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
    { id: 'privacy', label: 'Privacy', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/90 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1">
                NIVASA <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                iQOO 2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Predictive Living OS</p>
          </div>
        </div>

        {/* Desktop Main Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 overflow-x-auto custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-medium">
            <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Local AI Active</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalPowerWatts}W</span>
          </div>

          <button
            onClick={() => setDemoScenarioModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-full shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Pitch Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
};
