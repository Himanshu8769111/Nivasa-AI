import type { Device, ActionPlan, SimulationResult, RoomScanDetectedObject, AnomalyAlert, LivingEvent } from '../types';

export class AIEngine {
  private static ELECTRICITY_RATE_RS_PER_KWH = 8.50; // ₹8.50 per kWh

  public static interpretCommand(userText: string, currentDevices: Device[]): ActionPlan {
    const textLower = userText.toLowerCase().trim();

    if (textLower.includes('leaving') || textLower.includes('out') || textLower.includes('go out') || textLower.includes('departure')) {
      return this.generateLeavingHomePlan(userText, currentDevices);
    } 
    else if (textLower.includes('sleep') || textLower.includes('night') || textLower.includes('bed')) {
      return this.generateSleepPlan(userText, currentDevices);
    } 
    else if (textLower.includes('energy') || textLower.includes('waste') || textLower.includes('optimize') || textLower.includes('save') || textLower.includes('electricity')) {
      return this.generateEnergyOptimizationPlan(userText, currentDevices);
    } 
    else if (textLower.includes('study') || textLower.includes('work') || textLower.includes('focus') || textLower.includes('read')) {
      return this.generateStudyPlan(userText, currentDevices);
    } 
    else if (textLower.includes('movie') || textLower.includes('cinema') || textLower.includes('tv') || textLower.includes('watch')) {
      return this.generateMoviePlan(userText, currentDevices);
    }
    else {
      return this.generateGenericSmartPlan(userText, currentDevices);
    }
  }

  private static generateLeavingHomePlan(prompt: string, devices: Device[]): ActionPlan {
    const proposedChanges = [];
    let savedWatts = 0;

    for (const dev of devices) {
      if (dev.roomId === 'living' && dev.state === 'ON') {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'OFF' as const,
          action: 'Power OFF to prevent empty-room energy waste'
        });
        savedWatts += dev.powerWatt;
      } else if (dev.id === 'dev_bedroom_ac' && dev.state === 'ON') {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'ON' as const,
          fromMode: dev.mode,
          toMode: 'Eco Mode (26°C)',
          action: 'Switch to Eco Mode 26°C (Reduces load by 60%)'
        });
        savedWatts += (dev.powerWatt * 0.6);
      } else if (dev.type === 'charger' && dev.state === 'ACTIVE') {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'OFF' as const,
          action: 'Disconnect standby charger'
        });
        savedWatts += dev.powerWatt;
      }
    }

    const lock = devices.find(d => d.type === 'lock');
    if (lock) {
      proposedChanges.push({
        deviceId: lock.id,
        deviceName: lock.name,
        roomName: lock.roomName,
        fromState: lock.state,
        toState: 'ON' as const,
        toMode: 'Guarded Lock',
        action: 'Engage Guarded Lock protocol'
      });
    }

    const durationHours = 2;
    const energyDeltaKWh = Number(((savedWatts * durationHours) / 1000).toFixed(2));
    const costDeltaRs = Number((energyDeltaKWh * this.ELECTRICITY_RATE_RS_PER_KWH).toFixed(2));

    return {
      id: 'plan_' + Date.now(),
      title: 'Temporary Departure Guard',
      userPrompt: prompt,
      intent: 'LEAVING_HOME',
      reasoning: 'Detected temporary departure of ~2 hours. Non-essential living room appliances switched OFF, AC optimized to Eco mode, and entrance door secured.',
      proposedChanges,
      impactPreview: {
        energyDeltaKWh: -Math.abs(energyDeltaKWh),
        costDeltaRs: -Math.abs(costDeltaRs),
        devicesAffected: proposedChanges.length,
        comfortImpact: 'Low',
        safetyImpact: 'Improved',
        durationHours
      },
      status: 'proposed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  private static generateSleepPlan(prompt: string, devices: Device[]): ActionPlan {
    const proposedChanges = [];
    let savedWatts = 0;

    for (const dev of devices) {
      if (dev.roomId === 'living' && dev.state === 'ON') {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'OFF' as const,
          action: 'Turn OFF living room devices'
        });
        savedWatts += dev.powerWatt;
      } else if (dev.id === 'dev_bedroom_ac' && dev.state === 'ON') {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'ON' as const,
          fromMode: dev.mode,
          toMode: 'Sleep Eco (25°C)',
          action: 'Set AC to comfortable sleep temp (25°C)'
        });
        savedWatts += (dev.powerWatt * 0.35);
      } else if (dev.id === 'dev_bedroom_light' && dev.state === 'ON') {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'OFF' as const,
          action: 'Turn OFF bedroom ceiling light'
        });
        savedWatts += dev.powerWatt;
      }
    }

    const lock = devices.find(d => d.type === 'lock');
    if (lock && lock.state !== 'ON') {
      proposedChanges.push({
        deviceId: lock.id,
        deviceName: lock.name,
        roomName: lock.roomName,
        fromState: lock.state,
        toState: 'ON' as const,
        toMode: 'Night Lock',
        action: 'Secure smart lock for night'
      });
    }

    const durationHours = 7;
    const energyDeltaKWh = Number(((savedWatts * durationHours) / 1000).toFixed(2));
    const costDeltaRs = Number((energyDeltaKWh * this.ELECTRICITY_RATE_RS_PER_KWH).toFixed(2));

    return {
      id: 'plan_' + Date.now(),
      title: 'Sleep Mode Plan',
      userPrompt: prompt,
      intent: 'SLEEP_MODE',
      reasoning: 'Prepares bedroom for rest: sets AC to recommended sleep temperature (25°C), turns off ambient lighting, shuts off living room waste, and secures entrance lock.',
      proposedChanges,
      impactPreview: {
        energyDeltaKWh: -Math.abs(energyDeltaKWh),
        costDeltaRs: -Math.abs(costDeltaRs),
        devicesAffected: proposedChanges.length,
        comfortImpact: 'High',
        safetyImpact: 'Improved',
        durationHours
      },
      status: 'proposed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  private static generateEnergyOptimizationPlan(prompt: string, devices: Device[]): ActionPlan {
    const proposedChanges = [];
    let savedWatts = 0;

    for (const dev of devices) {
      if (!dev.essential && dev.roomId === 'living' && dev.state === 'ON') {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'OFF' as const,
          action: 'Power OFF active device in empty room'
        });
        savedWatts += dev.powerWatt;
      } else if (dev.type === 'ac' && dev.state === 'ON' && (dev.targetTemp || 22) < 25) {
        proposedChanges.push({
          deviceId: dev.id,
          deviceName: dev.name,
          roomName: dev.roomName,
          fromState: dev.state,
          toState: 'ON' as const,
          fromMode: dev.mode,
          toMode: 'Green Eco 25°C',
          action: 'Increase AC temp from 22°C to 25°C (saves ~24% power)'
        });
        savedWatts += 300;
      }
    }

    const durationHours = 4;
    const energyDeltaKWh = Number(((savedWatts * durationHours) / 1000).toFixed(2));
    const costDeltaRs = Number((energyDeltaKWh * this.ELECTRICITY_RATE_RS_PER_KWH).toFixed(2));

    return {
      id: 'plan_' + Date.now(),
      title: 'Active Energy Waste Mitigation',
      userPrompt: prompt,
      intent: 'ENERGY_SAVE',
      reasoning: 'Identified 72 minutes of idle living room power draw and aggressive AC temp (22°C). Optimizing AC thermostat to 25°C and turning off idle living lights.',
      proposedChanges,
      impactPreview: {
        energyDeltaKWh: -Math.abs(energyDeltaKWh),
        costDeltaRs: -Math.abs(costDeltaRs),
        devicesAffected: proposedChanges.length,
        comfortImpact: 'Optimal',
        safetyImpact: 'Neutral',
        durationHours
      },
      status: 'proposed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  private static generateStudyPlan(prompt: string, devices: Device[]): ActionPlan {
    const proposedChanges: any[] = [];

    const ac = devices.find(d => d.id === 'dev_bedroom_ac');
    if (ac) {
      proposedChanges.push({
        deviceId: ac.id,
        deviceName: ac.name,
        roomName: ac.roomName,
        fromState: ac.state,
        toState: 'ON' as const,
        fromMode: ac.mode,
        toMode: 'Focus Cool 24°C',
        action: 'Maintain quiet 24°C focus atmosphere'
      });
    }

    const livingTv = devices.find(d => d.id === 'dev_living_tv');
    if (livingTv && livingTv.state === 'ON') {
      proposedChanges.push({
        deviceId: livingTv.id,
        deviceName: livingTv.name,
        roomName: livingTv.roomName,
        fromState: livingTv.state,
        toState: 'OFF' as const,
        action: 'Turn OFF TV to eliminate distractions'
      });
    }

    return {
      id: 'plan_' + Date.now(),
      title: 'Study & Concentration Routine',
      userPrompt: prompt,
      intent: 'STUDY_MODE',
      reasoning: 'Configures bedroom for deep focus: steady 24°C cooling, bright task lighting, and eliminates living room audio distractions.',
      proposedChanges,
      impactPreview: {
        energyDeltaKWh: -0.25,
        costDeltaRs: -2.10,
        devicesAffected: Math.max(2, proposedChanges.length),
        comfortImpact: 'Optimal',
        safetyImpact: 'Neutral',
        durationHours: 3
      },
      status: 'proposed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  private static generateMoviePlan(prompt: string, _devices: Device[]): ActionPlan {
    return {
      id: 'plan_' + Date.now(),
      title: 'Cinema Atmosphere Setup',
      userPrompt: prompt,
      intent: 'MOVIE_MODE',
      reasoning: 'Powers up Living Room TV, dims ambient lighting to 20% warm mood light, and sets quiet fan speed.',
      proposedChanges: [
        {
          deviceId: 'dev_living_tv',
          deviceName: 'Living Room TV',
          roomName: 'Living Room',
          fromState: 'OFF',
          toState: 'ON',
          toMode: 'HDMI 1 / Smart Hub',
          action: 'Power ON TV'
        },
        {
          deviceId: 'dev_living_light',
          deviceName: 'Living Room Ceiling Light',
          roomName: 'Living Room',
          fromState: 'ON',
          toState: 'ON',
          fromMode: 'Cool Daylight',
          toMode: 'Dim Warm 20%',
          action: 'Dim lighting for cinema mood'
        }
      ],
      impactPreview: {
        energyDeltaKWh: 0.15,
        costDeltaRs: 1.25,
        devicesAffected: 2,
        comfortImpact: 'High',
        safetyImpact: 'Neutral',
        durationHours: 2
      },
      status: 'proposed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  private static generateGenericSmartPlan(prompt: string, devices: Device[]): ActionPlan {
    return this.generateEnergyOptimizationPlan(prompt, devices);
  }

  public static simulateScenario(query: string, _currentDevices: Device[]): SimulationResult {
    const queryLower = query.toLowerCase();

    if (queryLower.includes('ac') && (queryLower.includes('5 hours') || queryLower.includes('3 hours') || queryLower.includes('keep'))) {
      const durationHours = queryLower.includes('5 hours') ? 5 : 3;

      const acWattFull = 1200;
      const acWattEco = 600;

      const energyFull = Number(((acWattFull * durationHours) / 1000).toFixed(2));
      const costFull = Number((energyFull * this.ELECTRICITY_RATE_RS_PER_KWH).toFixed(2));

      const energyEco = Number(((acWattEco * durationHours) / 1000).toFixed(2));
      const costEco = Number((energyEco * this.ELECTRICITY_RATE_RS_PER_KWH).toFixed(2));

      return {
        query,
        durationHours,
        options: [
          {
            id: 'opt_a',
            label: 'Option A: Continuous AC at 22°C',
            mode: 'Full Cool 22°C',
            acState: 'ON',
            acTemp: 22,
            estimatedEnergyKWh: energyFull,
            estimatedCostRs: costFull,
            comfortScore: 92,
            deviceImpact: 'Compressor works continuously at 100% capacity.'
          },
          {
            id: 'opt_b',
            label: 'Option B: Eco Mode at 25°C (Recommended)',
            mode: 'Eco Cool 25°C',
            acState: 'ON',
            acTemp: 25,
            estimatedEnergyKWh: energyEco,
            estimatedCostRs: costEco,
            comfortScore: 88,
            deviceImpact: 'Compressor cycles efficiently with 50% power savings.'
          },
          {
            id: 'opt_c',
            label: 'Option C: AC OFF + Fan ON',
            mode: 'Natural Ventilation',
            acState: 'OFF',
            estimatedEnergyKWh: 0.21,
            estimatedCostRs: 1.80,
            comfortScore: 60,
            deviceImpact: 'Zero compressor wear. Room temperature may rise 2-3°C.'
          }
        ],
        recommendedOptionId: 'opt_b',
        explanation: `Based on current ambient conditions (24°C outside humidity), Option B (Eco Mode at 25°C) provides the optimal balance: you save ₹${(costFull - costEco).toFixed(2)} (${(((costFull - costEco)/costFull)*100).toFixed(0)}% lower cost) while preserving 88% comfort index.`,
        keyTakeaway: `Switching to 25°C saves ~${(energyFull - energyEco).toFixed(2)} kWh over ${durationHours} hours without thermal discomfort.`
      };
    } else {
      return {
        query: query || 'What if all lights remain on overnight?',
        durationHours: 8,
        options: [
          {
            id: 'opt_a',
            label: 'Option A: All Lights ON Overnight (8h)',
            mode: 'Full Lighting',
            acState: 'ON',
            estimatedEnergyKWh: 0.64,
            estimatedCostRs: 5.44,
            comfortScore: 40,
            deviceImpact: 'Unnecessary light pollution and bulb hours degradation.'
          },
          {
            id: 'opt_b',
            label: 'Option B: Smart Night Auto-Off (Recommended)',
            mode: 'Automated Dark',
            acState: 'OFF',
            estimatedEnergyKWh: 0.05,
            estimatedCostRs: 0.42,
            comfortScore: 95,
            deviceImpact: 'Powers off living room & bedroom ceiling lights at 11:30 PM.'
          }
        ],
        recommendedOptionId: 'opt_b',
        explanation: 'Option B saves 0.59 kWh and ₹5.02 per night, extending lamp lifespan by ~2,900 hours per year.',
        keyTakeaway: 'Automated night shutdown improves sleep melatonin cycles while stopping phantom grid draw.'
      };
    }
  }

  public static detectAnomalies(devices: Device[], _timeline: LivingEvent[]): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = [];

    const livingFan = devices.find(d => d.id === 'dev_living_fan');
    const livingLight = devices.find(d => d.id === 'dev_living_light');
    if ((livingFan?.state === 'ON' || livingLight?.state === 'ON')) {
      alerts.push({
        id: 'anom_empty_room_waste',
        title: 'Empty Room Energy Waste',
        description: 'Living room has been unoccupied for 72 minutes while the ceiling fan and light are actively drawing power (72W total).',
        roomId: 'living',
        severity: 'medium',
        timestamp: '11:20 PM',
        reason: 'Occupancy sensor confirmed 0 motion since 10:08 PM.',
        suggestedActionPlan: this.interpretCommand('Optimize energy waste', devices)
      });
    }

    const lock = devices.find(d => d.type === 'lock');
    if (lock && lock.state !== 'ON') {
      alerts.push({
        id: 'anom_unlocked_door',
        title: 'Entrance Door Unlocked at Night',
        description: 'The main entrance smart lock is currently disengaged after 10:00 PM.',
        roomId: 'entrance',
        severity: 'high',
        timestamp: '10:00 PM',
        reason: 'Night perimeter safety rule requires entrance lock engagement.',
      });
    }

    return alerts;
  }

  public static processRoomScan(_capturedImageDataUrl?: string): RoomScanDetectedObject[] {
    return [
      {
        id: 'scan_ac_1',
        label: 'Air Conditioner',
        type: 'ac',
        confidence: 0.96,
        box: { x: 15, y: 12, width: 45, height: 22 },
        estimatedWattage: 1200,
        existingMatch: 'dev_bedroom_ac',
        roomName: 'Bedroom'
      },
      {
        id: 'scan_fan_1',
        label: 'Ceiling Fan',
        type: 'fan',
        confidence: 0.94,
        box: { x: 62, y: 8, width: 28, height: 26 },
        estimatedWattage: 60,
        existingMatch: 'dev_bedroom_fan',
        roomName: 'Bedroom'
      },
      {
        id: 'scan_light_1',
        label: 'Smart LED Panel',
        type: 'light',
        confidence: 0.98,
        box: { x: 40, y: 35, width: 20, height: 18 },
        estimatedWattage: 10,
        existingMatch: 'dev_bedroom_light',
        roomName: 'Bedroom'
      },
      {
        id: 'scan_monitor_1',
        label: 'Desktop Monitor',
        type: 'tv',
        confidence: 0.91,
        box: { x: 10, y: 50, width: 32, height: 35 },
        estimatedWattage: 45,
        roomName: 'Bedroom'
      },
      {
        id: 'scan_charger_1',
        label: 'iQOO Fast Charger',
        type: 'charger',
        confidence: 0.95,
        box: { x: 48, y: 65, width: 16, height: 20 },
        estimatedWattage: 15,
        existingMatch: 'dev_bedroom_charger',
        roomName: 'Bedroom'
      }
    ];
  }
}
