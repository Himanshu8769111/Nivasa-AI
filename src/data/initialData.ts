import type { Device, Room, LivingEvent, AutomationTemplate } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'bedroom',
    name: 'Bedroom',
    occupied: true,
    lastOccupiedTime: 'Just now',
    temperature: 24,
    humidity: 52,
    lightCount: 1,
    activeDevicesCount: 3,
    icon: 'bed'
  },
  {
    id: 'living',
    name: 'Living Room',
    occupied: false,
    lastOccupiedTime: '72 minutes ago',
    temperature: 26,
    humidity: 55,
    lightCount: 1,
    activeDevicesCount: 2,
    icon: 'sofa'
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    occupied: false,
    lastOccupiedTime: '3 hours ago',
    temperature: 27,
    humidity: 60,
    lightCount: 0,
    activeDevicesCount: 1,
    icon: 'utensils'
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    occupied: false,
    lastOccupiedTime: '4 hours ago',
    temperature: 25,
    humidity: 68,
    lightCount: 0,
    activeDevicesCount: 0,
    icon: 'bath'
  },
  {
    id: 'entrance',
    name: 'Entrance',
    occupied: false,
    lastOccupiedTime: '15 minutes ago',
    temperature: 26,
    humidity: 50,
    lightCount: 0,
    activeDevicesCount: 2,
    icon: 'door-closed'
  }
];

export const INITIAL_DEVICES: Device[] = [
  {
    id: 'dev_bedroom_ac',
    name: 'Bedroom AC',
    roomId: 'bedroom',
    roomName: 'Bedroom',
    type: 'ac',
    state: 'ON',
    powerWatt: 1200,
    mode: 'Cool 22°C',
    targetTemp: 22,
    lastStateChange: '10:45 PM',
    isAutomated: true,
    essential: false
  },
  {
    id: 'dev_bedroom_fan',
    name: 'Bedroom Fan',
    roomId: 'bedroom',
    roomName: 'Bedroom',
    type: 'fan',
    state: 'ON',
    powerWatt: 60,
    mode: 'Speed 3',
    lastStateChange: '10:45 PM',
    isAutomated: true,
    essential: false
  },
  {
    id: 'dev_bedroom_light',
    name: 'Bedroom Light',
    roomId: 'bedroom',
    roomName: 'Bedroom',
    type: 'light',
    state: 'ON',
    powerWatt: 10,
    mode: 'Warm White 80%',
    lastStateChange: '10:30 PM',
    isAutomated: false,
    essential: false
  },
  {
    id: 'dev_bedroom_charger',
    name: 'Desk Charger',
    roomId: 'bedroom',
    roomName: 'Bedroom',
    type: 'charger',
    state: 'ACTIVE',
    powerWatt: 15,
    mode: 'Fast Charge (iQOO 12)',
    lastStateChange: '10:51 PM',
    isAutomated: true,
    essential: false
  },
  {
    id: 'dev_living_tv',
    name: 'Living Room TV',
    roomId: 'living',
    roomName: 'Living Room',
    type: 'tv',
    state: 'OFF',
    powerWatt: 110,
    mode: 'Standby',
    lastStateChange: '09:15 PM',
    isAutomated: false,
    essential: false
  },
  {
    id: 'dev_living_fan',
    name: 'Living Room Fan',
    roomId: 'living',
    roomName: 'Living Room',
    type: 'fan',
    state: 'ON',
    powerWatt: 60,
    mode: 'Speed 4',
    lastStateChange: '08:20 PM',
    isAutomated: false,
    essential: false
  },
  {
    id: 'dev_living_light',
    name: 'Living Room Ceiling Light',
    roomId: 'living',
    roomName: 'Living Room',
    type: 'light',
    state: 'ON',
    powerWatt: 12,
    mode: 'Cool Daylight',
    lastStateChange: '08:10 PM',
    isAutomated: false,
    essential: false
  },
  {
    id: 'dev_kitchen_geyser',
    name: 'Kitchen Smart Geyser',
    roomId: 'kitchen',
    roomName: 'Kitchen',
    type: 'geyser',
    state: 'OFF',
    powerWatt: 2000,
    mode: 'Eco Standby',
    lastStateChange: '07:30 AM',
    isAutomated: true,
    essential: false
  },
  {
    id: 'dev_kitchen_fridge',
    name: 'Smart Refrigerator',
    roomId: 'kitchen',
    roomName: 'Kitchen',
    type: 'fridge',
    state: 'ACTIVE',
    powerWatt: 140,
    mode: 'Normal Cooling',
    lastStateChange: 'Continuous',
    isAutomated: false,
    essential: true
  },
  {
    id: 'dev_entrance_lock',
    name: 'Entrance Smart Lock',
    roomId: 'entrance',
    roomName: 'Entrance',
    type: 'lock',
    state: 'ON',
    powerWatt: 5,
    mode: 'Locked & Guarded',
    lastStateChange: '09:00 PM',
    isAutomated: true,
    essential: true
  },
  {
    id: 'dev_entrance_camera',
    name: 'Doorway Security Cam',
    roomId: 'entrance',
    roomName: 'Entrance',
    type: 'camera',
    state: 'ACTIVE',
    powerWatt: 8,
    mode: 'AI Motion Detection',
    lastStateChange: 'Continuous',
    isAutomated: true,
    essential: true
  }
];

export const INITIAL_TIMELINE: LivingEvent[] = [
  {
    id: 'evt_1',
    timestamp: '11:20 PM',
    roomId: 'living',
    roomName: 'Living Room',
    description: 'Living room became empty while Fan & Light stayed ON',
    type: 'occupancy',
    severity: 'warning'
  },
  {
    id: 'evt_2',
    timestamp: '10:51 PM',
    roomId: 'bedroom',
    roomName: 'Bedroom',
    description: 'Desk Charger connected to iQOO device (Drawing 15W)',
    type: 'device',
    severity: 'info'
  },
  {
    id: 'evt_3',
    timestamp: '10:45 PM',
    roomId: 'bedroom',
    roomName: 'Bedroom',
    description: 'Bedroom AC turned ON (Target 22°C, 1200W)',
    type: 'device',
    severity: 'info'
  },
  {
    id: 'evt_4',
    timestamp: '10:42 PM',
    roomId: 'bedroom',
    roomName: 'Bedroom',
    description: 'Bedroom occupied by Himanshu',
    type: 'occupancy',
    severity: 'info'
  },
  {
    id: 'evt_5',
    timestamp: '09:00 PM',
    roomId: 'entrance',
    roomName: 'Entrance',
    description: 'Entrance Smart Lock verified locked state',
    type: 'security',
    severity: 'info'
  }
];

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  {
    id: 'auto_leaving_home',
    name: 'Leaving Home',
    tagline: 'Eco Mode & Guard Protocol',
    description: 'Turns off non-essential appliances, sets AC to Eco 26°C, locks all doors, and activates security camera.',
    icon: 'door-open',
    category: 'departure',
    enabled: true,
    triggers: ['Voice: "I am leaving for 2 hours"', 'Geofence Exit'],
    actions: ['AC → Eco Mode', 'Living Light → OFF', 'Living Fan → OFF', 'Smart Lock → LOCK', 'Cam → Guard Mode'],
    estimatedSavingKWh: 0.82
  },
  {
    id: 'auto_sleep_mode',
    name: 'Sleep Mode',
    tagline: 'Quiet, Efficient Night Routine',
    description: 'Darkens all living areas, adjusts bedroom AC to 25°C Eco, turns on fan, locks entrance door, and activates quiet hours.',
    icon: 'moon',
    category: 'sleep',
    enabled: true,
    triggers: ['Voice: "Going to sleep"', 'Time: 11:30 PM'],
    actions: ['Living Lights → OFF', 'Living TV → OFF', 'Bedroom AC → 25°C', 'Bedroom Fan → ON (Speed 2)', 'Entrance Lock → LOCK'],
    estimatedSavingKWh: 0.41
  },
  {
    id: 'auto_study_mode',
    name: 'Study / Work Mode',
    tagline: 'Focus Atmosphere Optimization',
    description: 'Optimizes ambient lighting, maintains steady 24°C temperature, turns off TV, and enables phone Do Not Disturb mode.',
    icon: 'book-open',
    category: 'study',
    enabled: true,
    triggers: ['Voice: "Prepare for study"', 'NFC Tag Desk'],
    actions: ['Bedroom Light → Focus White 100%', 'Bedroom AC → 24°C', 'Living TV → OFF', 'Phone DND → ON'],
    estimatedSavingKWh: 0.25
  },
  {
    id: 'auto_movie_mode',
    name: 'Movie / Cinema Mode',
    tagline: 'Immersive Entertainment Setup',
    description: 'Dims living room lights to 20% warm accent, powers TV, sets quiet fan speed, and mutes unnecessary alerts.',
    icon: 'film',
    category: 'movie',
    enabled: false,
    triggers: ['Voice: "Movie mode"', 'Living TV ON'],
    actions: ['Living Light → Dim Warm 20%', 'Living Fan → Speed 2', 'Bedroom AC → 24°C'],
    estimatedSavingKWh: 0.15
  },
  {
    id: 'auto_energy_save',
    name: 'Aggressive Energy Saver',
    tagline: 'Peak Hour Waste Mitigation',
    description: 'Automatically detects empty rooms with active devices and shuts down idle fans, lights, and chargers.',
    icon: 'zap',
    category: 'eco',
    enabled: true,
    triggers: ['Empty Room > 30 mins', 'Peak Tariff Window'],
    actions: ['Empty Room Lights → OFF', 'Empty Room Fans → OFF', 'Idle Chargers → OFF'],
    estimatedSavingKWh: 0.65
  },
  {
    id: 'auto_night_safety',
    name: 'Night Perimeter Guard',
    tagline: 'Smart Perimeter Safety',
    description: 'Ensures entrance doors are locked, verifies camera feed, and illuminates entrance path if motion detected after 11 PM.',
    icon: 'shield-check',
    category: 'security',
    enabled: true,
    triggers: ['Time: 11:00 PM', 'Unusual Door Motion'],
    actions: ['Smart Lock → Force Lock', 'Cam AI → High Sensitivity', 'Alert Himanshu if unlocked'],
    estimatedSavingKWh: 0.05
  }
];
