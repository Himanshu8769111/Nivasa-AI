import React, { useState } from 'react';
import { Cpu, Plus, Power, Thermometer, X } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import type { RoomId, DeviceType, Device } from '../types';

export const DeviceCenterView: React.FC = () => {
  const { devices, toggleDevice, updateDeviceTemp, addCustomDevice } = useLivingOS();
  const [selectedFilter, setSelectedFilter] = useState<RoomId | 'all'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newDevName, setNewDevName] = useState('');
  const [newDevRoom, setNewDevRoom] = useState<RoomId>('bedroom');
  const [newDevType, _setNewDevType] = useState<DeviceType>('light');
  const [newDevWatt, setNewDevWatt] = useState('45');

  const filteredDevices = selectedFilter === 'all' 
    ? devices 
    : devices.filter(d => d.roomId === selectedFilter);

  const handleCreateDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevName.trim()) return;

    const newDev: Device = {
      id: 'dev_custom_' + Date.now(),
      name: newDevName,
      roomId: newDevRoom,
      roomName: newDevRoom.charAt(0).toUpperCase() + newDevRoom.slice(1),
      type: newDevType,
      state: 'ON',
      powerWatt: parseInt(newDevWatt, 10) || 30,
      mode: 'Standard Active',
      lastStateChange: 'Just created',
      isAutomated: true,
      essential: false
    };

    addCustomDevice(newDev);
    setShowAddModal(false);
    setNewDevName('');
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-12 animate-in fade-in duration-300">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5" /> Hardware Abstraction Layer
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">Device Center</h2>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Device</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
        {(['all', 'bedroom', 'living', 'kitchen', 'bathroom', 'entrance'] as const).map((rId) => (
          <button
            key={rId}
            onClick={() => setSelectedFilter(rId)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap border transition-all ${
              selectedFilter === rId
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {rId === 'all' ? 'All Devices' : rId}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {filteredDevices.map((dev) => (
          <div
            key={dev.id}
            className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 flex flex-col gap-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-white">{dev.name}</h3>
                  <span className="text-[9px] text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    {dev.roomName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="font-mono text-cyan-300 font-semibold">{dev.powerWatt}W</span>
                  {dev.mode && <span>• {dev.mode}</span>}
                  <span>• {dev.isAutomated ? 'AI Automated' : 'Manual'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                  dev.state === 'ON' || dev.state === 'ACTIVE'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}>
                  {dev.state}
                </span>

                <button
                  onClick={() => toggleDevice(dev.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    dev.state === 'ON' || dev.state === 'ACTIVE'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>
            </div>

            {dev.type === 'ac' && dev.state === 'ON' && (
              <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs mt-1">
                <span className="text-slate-400 text-[10px] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Target Thermostat
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateDeviceTemp(dev.id, Math.max(18, (dev.targetTemp || 22) - 1))}
                    className="w-6 h-6 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-cyan-300">{dev.targetTemp || 22}°C</span>
                  <button
                    onClick={() => updateDeviceTemp(dev.id, Math.min(30, (dev.targetTemp || 22) + 1))}
                    className="w-6 h-6 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-cyan-400" /> Add Smart Device
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDevice} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Device Name</label>
                <input
                  type="text"
                  required
                  value={newDevName}
                  onChange={e => setNewDevName(e.target.value)}
                  placeholder="e.g. Study Desk Lamp"
                  className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Room</label>
                  <select
                    value={newDevRoom}
                    onChange={e => setNewDevRoom(e.target.value as RoomId)}
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="bedroom">Bedroom</option>
                    <option value="living">Living Room</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="bathroom">Bathroom</option>
                    <option value="entrance">Entrance</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Wattage (W)</label>
                  <input
                    type="number"
                    value={newDevWatt}
                    onChange={e => setNewDevWatt(e.target.value)}
                    className="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 font-bold py-3 rounded-xl shadow-md mt-2 transition-all active:scale-95"
              >
                CREATE DEVICE
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
