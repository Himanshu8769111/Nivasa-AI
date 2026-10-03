import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, Plus } from 'lucide-react';
import { useLivingOS } from '../context/LivingOSContext';
import { AIEngine } from '../services/aiEngine';
import type { RoomScanDetectedObject } from '../types';

export const ScannerView: React.FC = () => {
  const { addCustomDevice, setActiveTab } = useLivingOS();
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<RoomScanDetectedObject[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = async () => {
    setIsScanning(true);
    setScanComplete(false);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      }
    } catch {
      setCameraActive(false);
    }

    setTimeout(() => {
      const results = AIEngine.processRoomScan();
      setDetectedObjects(results);
      setIsScanning(false);
      setScanComplete(true);
    }, 2500);
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleAddDevicesToTwin = () => {
    detectedObjects.forEach(obj => {
      if (!obj.existingMatch) {
        addCustomDevice({
          id: 'dev_scan_' + Date.now() + Math.random().toString(36).substr(2, 4),
          name: obj.label,
          roomId: 'bedroom',
          roomName: obj.roomName,
          type: obj.type,
          state: 'ON',
          powerWatt: obj.estimatedWattage,
          lastStateChange: 'Just scanned',
          isAutomated: true,
          essential: false
        });
      }
    });

    setActiveTab('twin');
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-12 animate-in fade-in duration-300">
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <Camera className="w-3.5 h-3.5" /> Spatial Vision AI
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">SCAN MY ROOM</h2>
        </div>
        <button
          onClick={startCamera}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>Rescan</span>
        </button>
      </div>

      <div className="relative w-full h-[320px] bg-slate-950 rounded-3xl border-2 border-cyan-500/40 shadow-2xl overflow-hidden flex items-center justify-center">
        
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover" 
        />

        {!cameraActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/60 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-400">
              <Camera className="w-8 h-8 animate-pulse" />
            </div>
            <span className="text-xs font-bold text-white">Spatial Camera Feed Active</span>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
              Analyzing room geometry, identifying appliances, and calculating power loads.
            </p>
          </div>
        )}

        {isScanning && (
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] animate-bounce"></div>
            <span className="bg-slate-950/80 text-cyan-300 text-xs font-mono px-3 py-1 rounded-full border border-cyan-500/40 mt-4 backdrop-blur-md">
              Analyzing Spatial Vision & Wattages...
            </span>
          </div>
        )}

        {scanComplete && detectedObjects.map((obj) => (
          <div
            key={obj.id}
            className="absolute border-2 border-cyan-400 bg-cyan-500/10 rounded-lg pointer-events-none flex flex-col items-start p-1 transition-all duration-500 animate-in zoom-in-95"
            style={{
              left: `${obj.box.x}%`,
              top: `${obj.box.y}%`,
              width: `${obj.box.width}%`,
              height: `${obj.box.height}%`
            }}
          >
            <span className="bg-cyan-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
              {obj.label} ({(obj.confidence * 100).toFixed(0)}%)
            </span>
            <span className="bg-slate-950/90 text-cyan-300 text-[8px] font-mono px-1 rounded mt-0.5 border border-cyan-500/30">
              ~{obj.estimatedWattage}W
            </span>
          </div>
        ))}

        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 pointer-events-none"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 pointer-events-none"></div>
      </div>

      {scanComplete && (
        <div className="bg-slate-900/90 rounded-3xl p-4 border border-emerald-500/30 shadow-xl flex flex-col gap-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Analysis Complete</span>
                <h3 className="text-xs font-bold text-white">ROOM SCAN COMPLETE</h3>
              </div>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
              5 Objects Detected
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Smart Devices</span>
              <span className="text-base font-bold text-cyan-400 font-mono">5</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Energy Loads</span>
              <span className="text-base font-bold text-amber-400 font-mono">2</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Safety Issues</span>
              <span className="text-base font-bold text-emerald-400 font-mono">0</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-300">Detected Smart Appliances:</span>
            {detectedObjects.map(obj => (
              <div key={obj.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-white font-medium">{obj.label}</span>
                  <span className="text-[10px] text-slate-500">({obj.roomName})</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {obj.existingMatch ? 'In Living Twin' : `+ Add (${obj.estimatedWattage}W)`}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddDevicesToTwin}
            className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 hover:from-emerald-400 hover:to-indigo-400 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD ALL TO LIVING TWIN</span>
          </button>
        </div>
      )}

    </div>
  );
};
