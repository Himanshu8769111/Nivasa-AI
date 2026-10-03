import React from 'react';
import { ShieldCheck, Lock, Cpu, Eye, HardDrive } from 'lucide-react';

export const PrivacySettingsView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4 pb-12 animate-in fade-in duration-300">
      
      <div>
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> ZERO-TRUST HOME PRIVACY
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">Privacy & Local AI Engine</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          "Your home context should stay yours."
        </p>
      </div>

      <div className="bg-slate-900/90 rounded-3xl p-4 border border-emerald-500/30 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-4 h-4" /> LOCAL PRIVACY MATRIX
          </span>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
            100% On-Device
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-cyan-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Camera Analysis</h4>
                <p className="text-[10px] text-slate-400">Processed in volatile RAM, never uploaded</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LOCAL
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Voice & Natural Intent</h4>
                <p className="text-[10px] text-slate-400">Gemma 2B local model speech parsing</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LOCAL
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <HardDrive className="w-4 h-4 text-amber-400" />
              <div>
                <h4 className="text-xs font-bold text-white">Living Twin Context</h4>
                <p className="text-[10px] text-slate-400">Stored in encrypted Room database</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              LOCAL
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/90 rounded-3xl p-4 border border-indigo-500/30 shadow-xl flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-indigo-400" /> ON-DEVICE MODEL ARCHITECTURE
        </h3>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Target Model:</span>
            <span className="font-mono text-indigo-300 font-bold">Google Gemma 2B (LiteRT-LM)</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Runtime:</span>
            <span className="font-mono text-cyan-300 font-bold">Local Hybrid Engine</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Offline Resilience:</span>
            <span className="font-mono text-emerald-300 font-bold">Deterministic Local Rules Fallback</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed italic">
          NIVASA AI uses a zero-latency hybrid architecture: intent parsing runs on local model weights, while device validation runs deterministically to guarantee physical safety.
        </p>
      </div>

    </div>
  );
};
