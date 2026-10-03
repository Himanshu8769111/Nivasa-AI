import React, { useState } from 'react';
import { Layers, Power, Clock, UserCheck, UserX, Thermometer, Wind } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { RoomId, Device } from '../types';

export const LivingTwinView: React.FC = () => {
  const { rooms, devices, events, toggleDevice } = useLivingOS();
  const [selectedRoomId, setSelectedRoomId] = useState<RoomId>('bedroom');

  const selectedRoom = rooms.find(r => r.id === selectedRoomId);
  const roomDevices = devices.filter(d => d.roomId === selectedRoomId);

  const getDeviceBadgeClass = (dev: Device) => {
    switch (dev.state) {
      case 'ON':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-cyan-500/20';
      case 'ACTIVE':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/20';
      case 'WARNING':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/20';
      case 'IDLE':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      case 'OFF':
      default:
        return 'bg-slate-900 text-slate-500 border-slate-800 opacity-70';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-3xl border border-slate-800/80">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Digital Twin Core
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">Living Twin Engine</h2>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
          5 Rooms • 11 Devices
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Apartment Floorplan Graph */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              INTERACTIVE APARTMENT FLOORPLAN GRAPH
            </h3>

            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 min-h-[360px]">
              
              {/* Bedroom */}
              <button
                onClick={() => setSelectedRoomId('bedroom')}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedRoomId === 'bedroom' 
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10' 
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Bedroom</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                    <UserCheck className="w-3.5 h-3.5" /> Occupied
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span className="text-xs font-mono text-cyan-300 font-medium">AC ON (22°C)</span>
                  <span className="text-xs font-mono text-cyan-300">• Fan Speed 3</span>
                  <span className="text-xs font-mono text-amber-300">• 15W</span>
                </div>
              </button>

              {/* Living Room */}
              <button
                onClick={() => setSelectedRoomId('living')}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  selectedRoomId === 'living' 
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10' 
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Living Room</span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-500/30">
                    <UserX className="w-3.5 h-3.5" /> Empty (72m)
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <span className="text-xs font-mono text-amber-300">Fan Speed 4</span>
                  <span className="text-xs font-mono text-indigo-300">• Light ON</span>
                </div>
              </button>

              {/* Kitchen */}
              <button
                onClick={() => setSelectedRoomId('kitchen')}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedRoomId === 'kitchen' 
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10' 
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Kitchen</span>
                  <span className="text-xs font-mono text-slate-400">140W</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-2">
                  Smart Refrigerator Active
                </div>
              </button>

              {/* Bathroom & Entrance */}
              <div className="grid grid-rows-2 gap-3">
                <button
                  onClick={() => setSelectedRoomId('bathroom')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedRoomId === 'bathroom' 
                      ? 'bg-slate-900 border-cyan-500/60' 
                      : 'bg-slate-900/50 border-slate-800/80'
                  }`}
                >
                  <span className="text-xs font-bold text-white">Bathroom</span>
                  <span className="text-xs text-slate-500">Idle</span>
                </button>

                <button
                  onClick={() => setSelectedRoomId('entrance')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selectedRoomId === 'entrance' 
                      ? 'bg-slate-900 border-cyan-500/60' 
                      : 'bg-slate-900/50 border-slate-800/80'
                  }`}
                >
                  <span className="text-xs font-bold text-white">Entrance</span>
                  <span className="text-xs text-emerald-400 font-semibold">Guarded Lock</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Devices Panel & Event Timeline */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {selectedRoom && (
            <div className="bg-slate-900/90 rounded-3xl p-5 border border-cyan-500/30 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {selectedRoom.name} Devices
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedRoom.occupied ? 'Occupied right now' : `Empty since ${selectedRoom.lastOccupiedTime}`}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1"><Thermometer className="w-4 h-4 text-cyan-400" /> {selectedRoom.temperature}°C</span>
                  <span className="flex items-center gap-1"><Wind className="w-4 h-4 text-indigo-400" /> {selectedRoom.humidity}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {roomDevices.map(dev => (
                  <div
                    key={dev.id}
                    className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${getDeviceBadgeClass(dev)}`}>
                        <Power className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{dev.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{dev.powerWatt}W</span>
                          {dev.mode && <span>• {dev.mode}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${getDeviceBadgeClass(dev)}`}>
                        {dev.state}
                      </span>
                      <button
                        onClick={() => toggleDevice(dev.id)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                        title="Toggle Device State"
                      >
                        <Power className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Timeline */}
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-lg flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" /> DIGITAL TWIN EVENT TIMELINE
            </h3>

            <div className="flex flex-col gap-3 relative pl-4 border-l-2 border-slate-800">
              {events.map((evt) => (
                <div key={evt.id} className="relative group">
                  <span className={`absolute -left-[21px] top-2 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                    evt.severity === 'warning' 
                      ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' 
                      : 'bg-cyan-400'
                  }`}></span>
                  
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-mono text-cyan-300">{evt.timestamp}</span>
                      {evt.roomName && <span>{evt.roomName}</span>}
                    </div>
                    <p className="text-slate-200 font-medium leading-tight">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
