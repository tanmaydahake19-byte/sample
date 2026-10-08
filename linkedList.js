/**
 * Talegaon Dabhade Water Grid Management System
 * SCADA & Enterprise Singly Linked List Data Structure Implementation
 */

class WaterNode {
    constructor(id, name, location, capacity, currentLevel, dailyUsage, statusOverride = 'Online') {
        this.id = Number(id);
        this.name = name;
        this.location = location;
        this.capacity = Number(capacity);
        this.currentLevel = Number(currentLevel);
        this.dailyUsage = Number(dailyUsage);
        this.operationalStatus = statusOverride; // 'Online', 'Offline', 'Maintenance'
        this.lastUpdated = '08 Oct 2026, 22:09 IST';
        this.next = null;
    }

    getPercentage() {
        if (!this.capacity || this.capacity <= 0) return 0;
        const pct = (this.currentLevel / this.capacity) * 100;
        return Math.min(100, Math.max(0, Number(pct.toFixed(1))));
    }

    getHealthStatus() {
        const pct = this.getPercentage();
        if (pct < 25) return 'Critical';
        if (pct < 55) return 'Low';
        if (pct < 80) return 'Moderate';
        return 'Optimal';
    }
}

class WaterLinkedList {
    constructor() {
        this.head = null;
        this.weeklyData = [5400, 6100, 5800, 7200, 6900, 8400, 7600];
        this.alerts = [
            { id: 1, type: 'Critical', sourceId: 104, message: 'Yashwantnagar Water Tower reserve dropped to 26.7% (Low threshold alert)', timestamp: '08 Oct 2026, 21:45 IST', ack: false },
            { id: 2, type: 'Warning', sourceId: 103, message: 'MIDC Phase 1 ESR telemetry delay detected (+14 mins)', timestamp: '08 Oct 2026, 21:10 IST', ack: false },
            { id: 3, type: 'Info', sourceId: 102, message: 'Indrayani River Intake station valve #3 routine inspection logged', timestamp: '08 Oct 2026, 19:30 IST', ack: true }
        ];
    }

    // 1. Add Source at Tail (Default Append)
    addSource(id, name, location, capacity, currentLevel, dailyUsage, operationalStatus = 'Online') {
        const newNode = new WaterNode(id, name, location, capacity, currentLevel, dailyUsage, operationalStatus);
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

    // 2. Add Source at Head (Priority Prepend)
    addSourceAtHead(id, name, location, capacity, currentLevel, dailyUsage, operationalStatus = 'Online') {
        const newNode = new WaterNode(id, name, location, capacity, currentLevel, dailyUsage, operationalStatus);
        newNode.next = this.head;
        this.head = newNode;
        return newNode;
    }

    // 3. Delete Source by ID
    deleteSource(id) {
        if (this.head === null) return false;
        id = Number(id);
        if (this.head.id === id) {
            this.head = this.head.next;
            return true;
        }
        let current = this.head;
        while (current.next !== null && current.next.id !== id) {
            current = current.next;
        }
        if (current.next !== null) {
            current.next = current.next.next;
            return true;
        }
        return false;
    }

    // 4. Find Node by ID, Name, or Location
    findSource(query) {
        if (this.head === null) return null;
        let temp = this.head;
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

    // 5. Swap two nodes by ID
    swapNodes(id1, id2) {
        id1 = Number(id1);
        id2 = Number(id2);
        if (id1 === id2 || !this.head) return false;

        let prev1 = null, curr1 = this.head;
        while (curr1 && curr1.id !== id1) {
            prev1 = curr1;
            curr1 = curr1.next;
        }

        let prev2 = null, curr2 = this.head;
        while (curr2 && curr2.id !== id2) {
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

    // Aggregate metrics
    getTotalWater() {
        let total = 0;
        let temp = this.head;
        while (temp !== null) {
            total += temp.currentLevel;
            temp = temp.next;
        }
        return total;
    }

    getTotalCapacity() {
        let cap = 0;
        let temp = this.head;
        while (temp !== null) {
            cap += temp.capacity;
            temp = temp.next;
        }
        return cap;
    }

    getTotalDailyUsage() {
        let usage = 0;
        let temp = this.head;
        while (temp !== null) {
            usage += temp.dailyUsage;
            temp = temp.next;
        }
        return usage;
    }

    getReservePercentage() {
        const cap = this.getTotalCapacity();
        if (cap === 0) return '0.0';
        return ((this.getTotalWater() / cap) * 100).toFixed(1);
    }

    getNodeCount() {
        let count = 0;
        let temp = this.head;
        while (temp !== null) {
            count++;
            temp = temp.next;
        }
        return count;
    }

    getOnlineCount() {
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
                index: index,
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

    getWeeklyTotal() {
        return this.weeklyData.reduce((sum, val) => sum + val, 0);
    }

    getWeeklyAverage() {
        if (this.weeklyData.length === 0) return 0;
        return (this.getWeeklyTotal() / this.weeklyData.length).toFixed(1);
    }
}
