export interface WaterSource {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentLevel: number;
  dailyUsage: number;
  operationalStatus: 'Online' | 'Offline' | 'Maintenance';
  lastUpdated: string;
  next?: WaterSource | null;
}

export interface SCADAAlert {
  id: number;
  type: 'Critical' | 'Warning' | 'Info';
  sourceId: number;
  message: string;
  timestamp: string;
  ack: boolean;
}
