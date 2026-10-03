import React from 'react';
import { BarChart3, Zap, IndianRupee, AlertTriangle, TrendingUp, Clock, ShieldAlert } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';

export const InsightsView: React.FC = () => {
  const { dailyEnergyKWh, dailyCostRs, anomalies } = useLivingOS();

  const hourlyData = [
    { hour: '00', kWh: 0.4 }, { hour: '02', kWh: 0.3 }, { hour: '04', kWh: 0.3 },
    { hour: '06', kWh: 0.6 }, { hour: '08', kWh: 1.2 }, { hour: '10', kWh: 0.8 },
    { hour: '12', kWh: 0.7 }, { hour: '14', kWh: 1.1 }, { hour: '16', kWh: 0.9 },
    { hour: '18', kWh: 1.4 }, { hour: '20', kWh: 2.1 }, { hour: '22', kWh: 1.8 }
  ];

  return (
    <div className="flex flex-col gap-4 p-4 pb-12 animate-in fade-in duration-300">
      
      <div>
        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
          <BarChart3 className="w-3.5 h-3.5" /> Living Intelligence & Analytics
        </span>
        <h2 className="text-xl font-bold text-white tracking-tight">Energy & Safety Insights</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time pattern analysis across Himanshu's connected living twin.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/90 rounded-3xl p-4 border border-emerald-500/30 flex flex-col gap-1 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Est. Daily Usage</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono">{dailyEnergyKWh} kWh</span>
          <span className="text-[10px] text-slate-400">Based on active wattage loads</span>
        </div>

        <div className="bg-slate-900/90 rounded-3xl p-4 border border-cyan-500/30 flex flex-col gap-1 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Est. Daily Cost</span>
            <IndianRupee className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-extrabold text-cyan-400 font-mono">₹{dailyCostRs}</span>
          <span className="text-[10px] text-slate-400">Tariff rate @ ₹8.50/kWh</span>
        </div>
      </div>

      <div className="bg-slate-900/90 rounded-3xl p-4 border border-slate-800 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> 24-HOUR POWER PROFILE
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Peak: 8 PM - 11 PM</span>
        </div>

        <div className="h-36 w-full flex items-end justify-between gap-1.5 pt-4 pb-2 px-1">
          {hourlyData.map((d, idx) => {
            const isPeak = d.hour === '20' || d.hour === '22';
            const barHeightPct = Math.min(100, (d.kWh / 2.5) * 100);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                <span className="text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.kWh}
                </span>
                <div className="w-full bg-slate-950 rounded-t-lg overflow-hidden h-full flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isPeak 
                        ? 'bg-gradient-to-t from-amber-500 to-rose-400 shadow-[0_0_10px_#f59e0b]' 
                        : 'bg-gradient-to-t from-cyan-600 to-cyan-400'
                    }`}
                    style={{ height: `${barHeightPct}%` }}
                  ></div>
                </div>
                <span className="text-[9px] font-mono text-slate-500">{d.hour}h</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          PROACTIVE AI INSIGHT CARDS
        </h3>

        <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">AC is your primary energy contributor</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              Bedroom AC contributes <strong className="text-cyan-300">68% of total daily estimated usage</strong> (1200W capacity). Switching to 25°C Eco saves ~1.8 kWh daily.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Peak Usage Window Identified</h4>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              Your energy consumption is highest between <strong className="text-amber-300">8:00 PM and 11:00 PM</strong> when both Living Room and Bedroom devices operate concurrently.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> HYBRID ANOMALY DETECTION
        </h3>

        {anomalies.length === 0 ? (
          <div className="bg-slate-900/80 rounded-2xl p-4 text-center text-xs text-slate-400 border border-slate-800">
            No active anomalies detected right now.
          </div>
        ) : (
          anomalies.map(anom => (
            <div key={anom.id} className="bg-slate-900/90 rounded-2xl p-3.5 border border-amber-500/40 flex flex-col gap-2 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold text-white">{anom.title}</h4>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                  {anom.severity} Alert
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                {anom.description}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
