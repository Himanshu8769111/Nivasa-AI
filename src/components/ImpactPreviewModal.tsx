import React from 'react';
import { ArrowRight, Zap, IndianRupee, ShieldCheck, Smile, CheckCircle2, X, Cpu } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { ActionPlan } from '../types';

export const ImpactPreviewModal: React.FC<{ plan: ActionPlan; onClose: () => void }> = ({ plan, onClose }) => {
  const { executePlan } = useLivingOS();

  const handleApply = () => {
    executePlan(plan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-[0_0_50px_rgba(99,102,241,0.2)] flex flex-col gap-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Cpu className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">AI Impact Preview</span>
              <h3 className="text-base font-bold text-white leading-tight">{plan.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {plan.userPrompt && (
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-xs text-slate-300 italic">
            "{plan.userPrompt}"
          </div>
        )}

        <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-200 leading-relaxed">
          <strong className="text-indigo-300 block mb-0.5 font-semibold">AI Decision Reasoning:</strong>
          {plan.reasoning}
        </div>

        <div className="bg-slate-950 rounded-2xl p-3.5 border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>CURRENT LIVING STATE</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 animate-bounce horizontal" />
            <span className="text-emerald-400 font-bold">PREDICTED AI STATE</span>
          </div>

          <div className="flex flex-col gap-2">
            {plan.proposedChanges.map((change, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{change.deviceName}</span>
                  <span className="text-[10px] text-slate-400">{change.roomName}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                    change.fromState === 'ON' || change.fromState === 'ACTIVE' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {change.fromState} {change.fromMode ? `(${change.fromMode})` : ''}
                  </span>
                  
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    change.toState === 'OFF' 
                      ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {change.toState} {change.toMode ? `(${change.toMode})` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-950/80 rounded-2xl p-3 border border-emerald-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Est. Energy Delta</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {plan.impactPreview.energyDeltaKWh <= 0 ? `${plan.impactPreview.energyDeltaKWh} kWh` : `+${plan.impactPreview.energyDeltaKWh} kWh`}
              </span>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-3 border border-cyan-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Est. Cost Delta</span>
              <span className="text-base font-bold text-cyan-400 font-mono">
                {plan.impactPreview.costDeltaRs <= 0 ? `₹${Math.abs(plan.impactPreview.costDeltaRs)}` : `+₹${plan.impactPreview.costDeltaRs}`}
              </span>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Smile className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Comfort Impact</span>
              <span className="text-xs font-bold text-indigo-300">
                {plan.impactPreview.comfortImpact}
              </span>
            </div>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Safety Impact</span>
              <span className="text-xs font-bold text-amber-300">
                {plan.impactPreview.safetyImpact}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleApply}
            className="flex-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>APPLY PLAN</span>
          </button>

          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs py-3 px-3.5 rounded-xl border border-slate-700 transition-colors"
          >
            CANCEL
          </button>
        </div>

      </div>
    </div>
  );
};
