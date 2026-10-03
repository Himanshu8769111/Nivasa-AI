import React from 'react';
import { 
  Home, Layers, Sparkles, Camera, HelpCircle, Sliders, 
  BarChart3, Cpu, ShieldCheck, PlayCircle, Zap, Smartphone, Monitor 
} from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { ActiveTab } from '../types';

export const DesktopSidebar: React.FC = () => {
  const { 
    activeTab, setActiveTab, livingScore, totalPowerWatts, 
    setDemoScenarioModalOpen, isPhoneFrame, setIsPhoneFrame 
  } = useLivingOS();

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'home', label: 'Home Dashboard', icon: <Home className="w-4 h-4" /> },
    { id: 'twin', label: 'Living Twin Graph', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { id: 'ai', label: 'AI Command Center', icon: <Sparkles className="w-4 h-4 text-indigo-400" />, badge: 'Gemma' },
    { id: 'scanner', label: 'Scan My Room', icon: <Camera className="w-4 h-4 text-emerald-400" /> },
    { id: 'simulator', label: 'What-If Simulator', icon: <HelpCircle className="w-4 h-4 text-purple-400" /> },
    { id: 'automations', label: 'Smart Automations', icon: <Sliders className="w-4 h-4 text-amber-400" /> },
    { id: 'insights', label: 'Energy Insights', icon: <BarChart3 className="w-4 h-4 text-cyan-400" /> },
    { id: 'devices', label: 'Device Center', icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800/80 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30 p-4 shadow-2xl backdrop-blur-md">
      
      {/* Top Header Logo */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold tracking-tight text-white">
                NIVASA <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
              </h1>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Predictive Living OS</p>
          </div>
        </div>

        {/* View Mode Toggle Switch (Desktop Web vs Phone Mockup) */}
        <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800/90 flex items-center justify-between text-xs">
          <button
            onClick={() => setIsPhoneFrame(false)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl font-semibold transition-all ${
              !isPhoneFrame
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setIsPhoneFrame(true)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl font-semibold transition-all ${
              isPhoneFrame
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Phone</span>
          </button>
        </div>

        {/* Navigation Item List */}
        <nav className="flex flex-col gap-1 mt-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-md font-bold'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Cards */}
      <div className="flex flex-col gap-3 pt-3 border-t border-slate-800">
        
        {/* Fast Pitch Scenarios Trigger */}
        <button
          onClick={() => setDemoScenarioModalOpen(true)}
          className="w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs py-2.5 px-3 rounded-2xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Pitch Demo Scenarios</span>
        </button>

        {/* Live Power & Score Badge */}
        <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1 text-slate-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalPowerWatts}W</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400 font-bold">
            <span>Score: {livingScore.overall}/100</span>
          </div>
        </div>

      </div>

    </aside>
  );
};
