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
                status: temp.getStatus(),
                hasNext: temp.next !== null
            });
            temp = temp.next;
            index++;
        }
        return arr;
    }
    // 7. Weekly Usage (7-Day Array operations)
    getWeeklyTotal() {
        return this.weeklyData.reduce((sum, val) => sum + val, 0);
    }
    getWeeklyAverage() {
        if (this.weeklyData.length === 0) return 0;
        return (this.getWeeklyTotal() / this.weeklyData.length).toFixed(1);
    }
    setWeeklyData(newData) {
        if (Array.isArray(newData) && newData.length === 7) {
            this.weeklyData = newData.map(Number);
            return true;
        }
        return false;
    }
}
