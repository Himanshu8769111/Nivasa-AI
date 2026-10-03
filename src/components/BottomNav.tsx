import React from 'react';
import { Home, Layers, Sparkles, Camera, BarChart3 } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useLivingOS();

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'twin', label: 'Twin', icon: <Layers className="w-5 h-5" /> },
    { id: 'ai', label: 'AI Plan', icon: <Sparkles className="w-5 h-5 text-indigo-400" /> },
    { id: 'scanner', label: 'Scanner', icon: <Camera className="w-5 h-5" /> },
    { id: 'insights', label: 'Insights', icon: <BarChart3 className="w-5 h-5" /> }
  ];

  return (
    <div className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around relative">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-cyan-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
