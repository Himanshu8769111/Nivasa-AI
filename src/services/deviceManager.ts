import type { Device, DeviceState, RoomId, LivingEvent } from '../types';

export interface IDeviceManager {
  getDevices(): Device[];
  getDeviceById(id: string): Device | undefined;
  getDevicesByRoom(roomId: RoomId): Device[];
  setDeviceState(id: string, state: DeviceState, mode?: string): void;
  toggleDeviceState(id: string): void;
  updateDeviceTemp(id: string, temp: number): void;
  addDevice(device: Device): void;
  subscribe(listener: (devices: Device[], event?: LivingEvent) => void): () => void;
}

export class MockDeviceManager implements IDeviceManager {
  private devices: Device[];
  private listeners: Set<(devices: Device[], event?: LivingEvent) => void> = new Set();

  constructor(initialDevices: Device[]) {
    this.devices = [...initialDevices];
  }

  public getDevices(): Device[] {
    return [...this.devices];
  }

  public getDeviceById(id: string): Device | undefined {
    return this.devices.find(d => d.id === id);
  }

  public getDevicesByRoom(roomId: RoomId): Device[] {
    return this.devices.filter(d => d.roomId === roomId);
  }

  public setDeviceState(id: string, state: DeviceState, mode?: string): void {
    let updatedDev: Device | null = null;
    this.devices = this.devices.map(d => {
      if (d.id === id) {
        updatedDev = {
          ...d,
          state,
          mode: mode || d.mode,
          lastStateChange: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return updatedDev;
      }
      return d;
    });

    if (updatedDev) {
      const event: LivingEvent = {
        id: 'evt_' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roomId: (updatedDev as Device).roomId,
        roomName: (updatedDev as Device).roomName,
        description: `${(updatedDev as Device).name} set to ${state}${mode ? ` (${mode})` : ''}`,
        type: 'device',
        severity: 'info'
      };
      this.notifyListeners(event);
    }
  }

  public toggleDeviceState(id: string): void {
    const dev = this.getDeviceById(id);
    if (!dev) return;
    const newState: DeviceState = dev.state === 'ON' || dev.state === 'ACTIVE' ? 'OFF' : 'ON';
    this.setDeviceState(id, newState);
  }

  public updateDeviceTemp(id: string, temp: number): void {
    let updatedDev: Device | null = null;
    this.devices = this.devices.map(d => {
      if (d.id === id) {
        updatedDev = {
          ...d,
          targetTemp: temp,
          mode: `Cool ${temp}°C`,
          lastStateChange: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return updatedDev;
      }
      return d;
    });

    if (updatedDev) {
      const event: LivingEvent = {
        id: 'evt_' + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        roomId: (updatedDev as Device).roomId,
        roomName: (updatedDev as Device).roomName,
        description: `${(updatedDev as Device).name} temperature adjusted to ${temp}°C`,
        type: 'device',
        severity: 'info'
      };
      this.notifyListeners(event);
    }
  }

  public addDevice(device: Device): void {
    this.devices.push(device);
    const event: LivingEvent = {
      id: 'evt_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      roomId: device.roomId,
      roomName: device.roomName,
      description: `New smart device added: ${device.name} (${device.powerWatt}W)`,
      type: 'device',
      severity: 'info'
    };
    this.notifyListeners(event);
  }

  public subscribe(listener: (devices: Device[], event?: LivingEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(event?: LivingEvent): void {
    this.listeners.forEach(listener => listener([...this.devices], event));
  }
}
