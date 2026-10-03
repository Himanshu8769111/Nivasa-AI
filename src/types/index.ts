export type RoomId = 'bedroom' | 'living' | 'kitchen' | 'bathroom' | 'entrance';

export type DeviceType = 
  | 'ac' 
  | 'fan' 
  | 'light' 
  | 'tv' 
  | 'charger' 
  | 'geyser' 
  | 'lock' 
  | 'fridge' 
  | 'camera';

export type DeviceState = 'ON' | 'OFF' | 'IDLE' | 'WARNING' | 'ACTIVE';

export interface Device {
  id: string;
  name: string;
  roomId: RoomId;
  roomName: string;
  type: DeviceType;
  state: DeviceState;
  powerWatt: number;
  mode?: string; // e.g. "Cool 22°C", "Eco", "Speed 3"
  targetTemp?: number;
  lastStateChange: string;
  isAutomated: boolean;
  essential: boolean;
}

export interface Room {
  id: RoomId;
  name: string;
  occupied: boolean;
  lastOccupiedTime: string;
  temperature?: number;
  humidity?: number;
  lightCount: number;
  activeDevicesCount: number;
  icon: string;
}

export interface LivingEvent {
  id: string;
  timestamp: string;
  roomId?: RoomId;
  roomName?: string;
  description: string;
  type: 'occupancy' | 'device' | 'energy' | 'security' | 'automation';
  severity?: 'info' | 'warning' | 'alert';
}

export interface ProposedDeviceChange {
  deviceId: string;
  deviceName: string;
  roomName: string;
  fromState: DeviceState;
  toState: DeviceState;
  fromMode?: string;
  toMode?: string;
  action: string;
}

export interface ImpactPreview {
  energyDeltaKWh: number; // e.g. -0.41 kWh (saved)
  costDeltaRs: number;    // e.g. -3.50 ₹ (saved)
  devicesAffected: number;
  comfortImpact: 'Optimal' | 'High' | 'Medium' | 'Low';
  safetyImpact: 'Improved' | 'Protected' | 'Neutral' | 'Attention';
  durationHours: number;
}

export interface ActionPlan {
  id: string;
  title: string;
  userPrompt?: string;
  intent: string;
  reasoning: string;
  proposedChanges: ProposedDeviceChange[];
  impactPreview: ImpactPreview;
  status: 'proposed' | 'approved' | 'executed' | 'cancelled';
  timestamp: string;
}

export interface SimulationOption {
  id: string;
  label: string;
  mode: string;
  acState: DeviceState;
  acTemp?: number;
  estimatedEnergyKWh: number;
  estimatedCostRs: number;
  comfortScore: number; // 0 - 100
  deviceImpact: string;
}

export interface SimulationResult {
  query: string;
  durationHours: number;
  options: SimulationOption[];
  recommendedOptionId: string;
  explanation: string;
  keyTakeaway: string;
}

export interface AnomalyAlert {
  id: string;
  title: string;
  description: string;
  roomId: RoomId;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  reason: string;
  suggestedActionPlan?: ActionPlan;
}

export interface AutomationTemplate {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: 'departure' | 'sleep' | 'study' | 'movie' | 'eco' | 'security';
  enabled: boolean;
  triggers: string[];
  actions: string[];
  lastTriggered?: string;
  estimatedSavingKWh: number;
}

export interface RoomScanDetectedObject {
  id: string;
  label: string;
  type: DeviceType;
  confidence: number; // 0 - 1
  box: { x: number; y: number; width: number; height: number }; // Percentage 0 - 100
  estimatedWattage: number;
  existingMatch?: string; // deviceId if already in Living Twin
  roomName: string;
  safetyFlag?: string;
}

export interface LivingScore {
  overall: number; // 0 - 100
  comfort: number;
  safety: number;
  energy: number;
  convenience: number;
  statusText: string;
}

export type ActiveTab = 'home' | 'twin' | 'ai' | 'scanner' | 'simulator' | 'automations' | 'insights' | 'devices' | 'privacy';

export type DemoScenarioId = 
  | 'scenario_leaving_home'
  | 'scenario_sleep_mode'
  | 'scenario_energy_waste'
  | 'scenario_room_scan'
  | 'scenario_what_if_ac'
  | 'scenario_door_safety';
