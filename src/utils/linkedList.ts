import { WaterSource, SCADAAlert } from '../types/waterGrid';

export class WaterNode implements WaterSource {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentLevel: number;
  dailyUsage: number;
  operationalStatus: 'Online' | 'Offline' | 'Maintenance';
  lastUpdated: string;
  next: WaterNode | null = null;

  constructor(
    id: number,
    name: string,
    location: string,
    capacity: number,
    currentLevel: number,
    dailyUsage: number,
    status: 'Online' | 'Offline' | 'Maintenance' = 'Online'
  ) {
    this.id = Number(id);
    this.name = name;
    this.location = location;
    this.capacity = Number(capacity);
    this.currentLevel = Number(currentLevel);
    this.dailyUsage = Number(dailyUsage);
    this.operationalStatus = status;
    this.lastUpdated = '08 Oct 2026, 22:09 IST';
  }

  getPercentage(): number {
    if (!this.capacity || this.capacity <= 0) return 0;
    const pct = (this.currentLevel / this.capacity) * 100;
    return Math.min(100, Math.max(0, Number(pct.toFixed(1))));
  }

  getHealthStatus(): 'Optimal' | 'Moderate' | 'Low' | 'Critical' {
    const pct = this.getPercentage();
    if (pct < 25) return 'Critical';
    if (pct < 55) return 'Low';
    if (pct < 80) return 'Moderate';
    return 'Optimal';
  }
}

export class WaterLinkedList {
  head: WaterNode | null = null;
  weeklyData: number[] = [5400, 6100, 5800, 7200, 6900, 8400, 7600];
  alerts: SCADAAlert[] = [
    {
      id: 1,
      type: 'Critical',
      sourceId: 104,
      message: 'Yashwantnagar Water Tower reserve dropped to 26.7% (Low threshold alert)',
      timestamp: '08 Oct 2026, 21:45 IST',
      ack: false
    },
    {
      id: 2,
      type: 'Warning',
      sourceId: 103,
      message: 'MIDC Phase 1 ESR telemetry delay detected (+14 mins)',
      timestamp: '08 Oct 2026, 21:10 IST',
      ack: false
    },
    {
      id: 3,
      type: 'Info',
      sourceId: 102,
      message: 'Indrayani River Intake station valve #3 routine inspection logged',
      timestamp: '08 Oct 2026, 19:30 IST',
      ack: true
    }
  ];

  constructor() {
    this.initDefaultDataset();
  }

  initDefaultDataset() {
    this.head = null;
    this.addSource(101, 'Talegaon Talav (Dabhade Lake) Treatment', 'Ward 1 - Old Town, Dabhade Wada', 18000, 14200, 1200);
    this.addSource(102, 'Indrayani River Intake Station', 'Kund Mala Road, Indrayani Basin', 30000, 23500, 2800);
    this.addSource(103, 'MIDC Phase 1 Elevated Storage (ESR)', 'Navlakh Umbre MIDC Corridor', 22000, 9500, 1900);
    this.addSource(104, 'Yashwantnagar & Station Road Water Tower', 'Ward 4 - Talegaon Station Zone', 9000, 2400, 850);
    this.addSource(105, 'Varale Hill Master Balancing Reservoir', 'Ward 12 - Varale Gaon Hilltop', 16000, 13800, 1100);
  }

  addSource(id: number, name: string, location: string, capacity: number, currentLevel: number, dailyUsage: number): WaterNode {
    const newNode = new WaterNode(id, name, location, capacity, currentLevel, dailyUsage);
    if (this.head === null) {
      this.head = newNode;
      return newNode;
    }
    let temp = this.head;
    while (temp.next !== null) {
      temp = temp.next;
    }
    temp.next = newNode;
    return newNode;
  }

  addSourceAtHead(id: number, name: string, location: string, capacity: number, currentLevel: number, dailyUsage: number): WaterNode {
    const newNode = new WaterNode(id, name, location, capacity, currentLevel, dailyUsage);
    newNode.next = this.head;
    this.head = newNode;
    return newNode;
  }

  deleteSource(id: number): boolean {
    if (this.head === null) return false;
    const targetId = Number(id);
    if (this.head.id === targetId) {
      this.head = this.head.next;
      return true;
    }
    let current = this.head;
    while (current.next !== null && current.next.id !== targetId) {
      current = current.next;
    }
    if (current.next !== null) {
      current.next = current.next.next;
      return true;
    }
    return false;
  }

  findSource(query: string | number): { node: WaterNode; index: number } | null {
    if (this.head === null) return null;
    let temp: WaterNode | null = this.head;
    let index = 0;
    const q = String(query).toLowerCase().trim();
    while (temp !== null) {
      if (String(temp.id) === q || temp.name.toLowerCase().includes(q) || temp.location.toLowerCase().includes(q)) {
        return { node: temp, index };
      }
      temp = temp.next;
      index++;
    }
    return null;
  }

  swapNodes(id1: number, id2: number): boolean {
    const n1 = Number(id1);
    const n2 = Number(id2);
    if (n1 === n2 || !this.head) return false;

    let prev1: WaterNode | null = null, curr1: WaterNode | null = this.head;
    while (curr1 && curr1.id !== n1) {
      prev1 = curr1;
      curr1 = curr1.next;
    }

    let prev2: WaterNode | null = null, curr2: WaterNode | null = this.head;
    while (curr2 && curr2.id !== n2) {
      prev2 = curr2;
      curr2 = curr2.next;
    }

    if (!curr1 || !curr2) return false;

    if (prev1 !== null) prev1.next = curr2;
    else this.head = curr2;

    if (prev2 !== null) prev2.next = curr1;
    else this.head = curr1;

    const tempNext = curr1.next;
    curr1.next = curr2.next;
    curr2.next = tempNext;

    return true;
  }

  getTotalWater(): number {
    let total = 0;
    let temp = this.head;
    while (temp !== null) {
      total += temp.currentLevel;
      temp = temp.next;
    }
    return total;
  }

  getTotalCapacity(): number {
    let cap = 0;
    let temp = this.head;
    while (temp !== null) {
      cap += temp.capacity;
      temp = temp.next;
    }
    return cap;
  }

  getReservePercentage(): string {
    const cap = this.getTotalCapacity();
    if (cap === 0) return '0.0';
    return ((this.getTotalWater() / cap) * 100).toFixed(1);
  }

  getNodeCount(): number {
    let count = 0;
    let temp = this.head;
    while (temp !== null) {
      count++;
      temp = temp.next;
    }
    return count;
  }

  getOnlineCount(): number {
    let count = 0;
    let temp = this.head;
    while (temp !== null) {
      if (temp.operationalStatus === 'Online') count++;
      temp = temp.next;
    }
    return count;
  }

  toArray() {
    const arr = [];
    let temp = this.head;
    let index = 0;
    while (temp !== null) {
      arr.push({
        index,
        id: temp.id,
        name: temp.name,
        location: temp.location,
        capacity: temp.capacity,
        currentLevel: temp.currentLevel,
        dailyUsage: temp.dailyUsage,
        percentage: temp.getPercentage(),
        healthStatus: temp.getHealthStatus(),
        operationalStatus: temp.operationalStatus,
        lastUpdated: temp.lastUpdated,
        hasNext: temp.next !== null
      });
      temp = temp.next;
      index++;
    }
    return arr;
  }
}
