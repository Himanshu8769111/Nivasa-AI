import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type { 
  Device, Room, LivingEvent, ActionPlan, SimulationResult, 
  AnomalyAlert, AutomationTemplate, LivingScore, ActiveTab, DemoScenarioId 
} from '../types';
import { INITIAL_DEVICES, INITIAL_ROOMS, INITIAL_TIMELINE, AUTOMATION_TEMPLATES } from '../data/initialData';
import { MockDeviceManager } from '../services/deviceManager';
import { AIEngine } from '../services/aiEngine';

interface LivingOSContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
  devices: Device[];
  rooms: Room[];
  events: LivingEvent[];
  automations: AutomationTemplate[];
  anomalies: AnomalyAlert[];
  currentPlan: ActionPlan | null;
  setCurrentPlan: (plan: ActionPlan | null) => void;
  livingScore: LivingScore;
  totalPowerWatts: number;
  dailyEnergyKWh: number;
  dailyCostRs: number;
  toggleDevice: (id: string) => void;
  updateDeviceTemp: (id: string, temp: number) => void;
  addCustomDevice: (dev: Device) => void;
  runNLCommand: (query: string) => ActionPlan;
  executePlan: (plan: ActionPlan) => void;
  cancelPlan: () => void;
  runSimulationQuery: (query: string) => SimulationResult;
  toggleAutomation: (id: string) => void;
  triggerAutomationNow: (id: string) => void;
  triggerDemoScenario: (scenarioId: DemoScenarioId) => void;
  demoScenarioModalOpen: boolean;
  setDemoScenarioModalOpen: (open: boolean) => void;
}

const LivingOSContext = createContext<LivingOSContextType | undefined>(undefined);

const deviceManager = new MockDeviceManager(INITIAL_DEVICES);

export const LivingOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [events, setEvents] = useState<LivingEvent[]>(INITIAL_TIMELINE);
  const [automations, setAutomations] = useState<AutomationTemplate[]>(AUTOMATION_TEMPLATES);
  const [currentPlan, setCurrentPlan] = useState<ActionPlan | null>(null);
  const [demoScenarioModalOpen, setDemoScenarioModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = deviceManager.subscribe((newDevices, newEvent) => {
      setDevices(newDevices);
      if (newEvent) {
        setEvents(prev => [newEvent, ...prev]);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setRooms(prevRooms => 
      prevRooms.map(r => {
        const roomDevs = devices.filter(d => d.roomId === r.id);
        const activeCount = roomDevs.filter(d => d.state === 'ON' || d.state === 'ACTIVE').length;
        return {
          ...r,
          activeDevicesCount: activeCount
        };
      })
    );
  }, [devices]);

  const totalPowerWatts = useMemo(() => {
    return devices.reduce((sum, d) => {
      if (d.state === 'ON' || d.state === 'ACTIVE') {
        return sum + d.powerWatt;
      }
      return sum;
    }, 0);
  }, [devices]);

  const dailyEnergyKWh = useMemo(() => {
    const totalKW = totalPowerWatts / 1000;
    return Number((totalKW * 6.5).toFixed(2));
  }, [totalPowerWatts]);

  const dailyCostRs = useMemo(() => {
    return Number((dailyEnergyKWh * 8.50).toFixed(2));
  }, [dailyEnergyKWh]);

  const livingScore = useMemo<LivingScore>(() => {
    const isLivingEmptyWithPower = devices.some(d => d.roomId === 'living' && (d.state === 'ON' || d.state === 'ACTIVE'));
    const isDoorLocked = devices.find(d => d.type === 'lock')?.state === 'ON';

    let energyScore = isLivingEmptyWithPower ? 75 : 92;
    let safetyScore = isDoorLocked ? 95 : 70;
    let comfortScore = 90;
    let convenienceScore = 91;

    const overall = Math.round((energyScore * 0.3) + (safetyScore * 0.3) + (comfortScore * 0.2) + (convenienceScore * 0.2));

    let statusText = 'Your home is calm and operating efficiently.';
    if (overall < 80) {
      statusText = 'Attention suggested: Energy waste detected in Living Room.';
    }

    return {
      overall,
      comfort: comfortScore,
      safety: safetyScore,
      energy: energyScore,
      convenience: convenienceScore,
      statusText
    };
  }, [devices]);

  const anomalies = useMemo(() => {
    return AIEngine.detectAnomalies(devices, events);
  }, [devices, events]);

  const toggleDevice = (id: string) => {
    deviceManager.toggleDeviceState(id);
  };

  const updateDeviceTemp = (id: string, temp: number) => {
    deviceManager.updateDeviceTemp(id, temp);
  };

  const addCustomDevice = (dev: Device) => {
    deviceManager.addDevice(dev);
  };

  const runNLCommand = (query: string): ActionPlan => {
    const plan = AIEngine.interpretCommand(query, devices);
    setCurrentPlan(plan);
    return plan;
  };

  const executePlan = (plan: ActionPlan) => {
    plan.proposedChanges.forEach(change => {
      if (change.toState === 'OFF') {
        deviceManager.setDeviceState(change.deviceId, 'OFF');
      } else if (change.toState === 'ON' || change.toState === 'ACTIVE') {
        deviceManager.setDeviceState(change.deviceId, change.toState, change.toMode);
      }
    });

    const execEvent: LivingEvent = {
      id: 'evt_plan_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: `AI Action Plan Applied: "${plan.title}" (${plan.proposedChanges.length} devices updated)`,
      type: 'automation',
      severity: 'info'
    };
    setEvents(prev => [execEvent, ...prev]);
    setCurrentPlan(null);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const cancelPlan = () => {
    setCurrentPlan(null);
  };

  const runSimulationQuery = (query: string): SimulationResult => {
    return AIEngine.simulateScenario(query, devices);
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => 
      prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a)
    );
  };

  const triggerAutomationNow = (id: string) => {
    const auto = automations.find(a => a.id === id);
    if (!auto) return;

    let plan: ActionPlan;
    if (auto.category === 'departure') {
      plan = AIEngine.interpretCommand('leaving home', devices);
    } else if (auto.category === 'sleep') {
      plan = AIEngine.interpretCommand('going to sleep', devices);
    } else if (auto.category === 'study') {
      plan = AIEngine.interpretCommand('prepare for study', devices);
    } else if (auto.category === 'movie') {
      plan = AIEngine.interpretCommand('movie mode', devices);
    } else {
      plan = AIEngine.interpretCommand('make house energy efficient', devices);
    }

    setCurrentPlan(plan);
    setActiveTab('ai');
  };

  const triggerDemoScenario = (scenarioId: DemoScenarioId) => {
    switch (scenarioId) {
      case 'scenario_leaving_home': {
        const plan = AIEngine.interpretCommand("I am leaving for two hours.", devices);
        setCurrentPlan(plan);
        setActiveTab('ai');
        break;
      }
      case 'scenario_sleep_mode': {
        const plan = AIEngine.interpretCommand("I am going to sleep.", devices);
        setCurrentPlan(plan);
        setActiveTab('ai');
        break;
      }
      case 'scenario_energy_waste': {
        const plan = AIEngine.interpretCommand("What is wasting electricity right now?", devices);
        setCurrentPlan(plan);
        setActiveTab('ai');
        break;
      }
      case 'scenario_room_scan': {
        setActiveTab('scanner');
        break;
      }
      case 'scenario_what_if_ac': {
        setActiveTab('simulator');
        break;
      }
      case 'scenario_door_safety': {
        deviceManager.setDeviceState('dev_entrance_lock', 'OFF', 'Unlocked');
        setActiveTab('home');
        break;
      }
    }
  };

  return (
    <LivingOSContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isPhoneFrame,
        setIsPhoneFrame,
        devices,
        rooms,
        events,
        automations,
        anomalies,
        currentPlan,
        setCurrentPlan,
        livingScore,
        totalPowerWatts,
        dailyEnergyKWh,
        dailyCostRs,
        toggleDevice,
        updateDeviceTemp,
        addCustomDevice,
        runNLCommand,
        executePlan,
        cancelPlan,
        runSimulationQuery,
        toggleAutomation,
        triggerAutomationNow,
        triggerDemoScenario,
        demoScenarioModalOpen,
        setDemoScenarioModalOpen
      }}
    >
      {children}
    </LivingOSContext.Provider>
  );
};

export const useLivingOS = () => {
  const context = useContext(LivingOSContext);
  if (!context) {
    throw new Error('useLivingOS must be used within a LivingOSProvider');
  }
  return context;
};
