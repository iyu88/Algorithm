const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const MinHeap = function () {
    this.h = [];
    
    this.size = () => this.h.length;
    
    this.swap = (i, j) => {
        const temp = this.h[i];
        this.h[i] = this.h[j];
        this.h[j] = temp;
    }
    
    this.push = (value) => {
        this.h.push(value);
        this.bubbleUp();
    }
    
    this.bubbleUp = () => {
        let index = this.h.length - 1;
        let parent = Math.floor((index - 1) / 2);
        
        while (this.h[parent] !== undefined && this.h[index].w < this.h[parent].w) {
            this.swap(index, parent);
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }
    
    this.pop = () => {
        if (this.size() === 0) return null;
        const value = this.h[0];
        this.swap(0, this.h.length - 1);
        this.h.pop();
        this.bubbleDown();
        return value;
    }
    
    this.bubbleDown = () => {
        let index = 0;
        let left = index * 2 + 1;
        let right = left + 1;
        
        while (this.h[index] !== undefined && ((this.h[left] !== undefined && this.h[left].w < this.h[index].w) || (this.h[right] !== undefined && this.h[right].w < this.h[index].w))) {
            let small = left;
            if (this.h[right] !== undefined && (this.h[right].w < this.h[left].w)) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const [N, M, X] = nums.split(' ').map(Number);
const points = Array.from({length: N+1}, () => []);
inputs.forEach(el => {
    const [from, to, weight] = el.split(' ').map(Number);
    points[from].push({p: to, w: weight});
    points[to].push({p: from, w: weight});
});

const dijkstra = (start) => {
    const dist = Array(N+1).fill(Infinity);
    const minHeap = new MinHeap();
    
    dist[start] = 0;
    minHeap.push({p: start, w: dist[start], t: 0});
    
    while (minHeap.size()) {
        const {p: currentPoint, w: currentWeight, t: currentTime} = minHeap.pop();
        if (points[currentPoint].length === 0) continue;
        if (currentWeight > dist[currentPoint]) continue;
        
        for (const next of points[currentPoint]) {
            const {p: nextPoint, w: nextWeight} = next;
            if (dist[nextPoint] > dist[currentPoint] + nextWeight) {
                dist[nextPoint] = dist[currentPoint] + nextWeight;
                minHeap.push({p: nextPoint, w: dist[nextPoint], t: currentTime + 1});
            }
        }
    }
    
    return dist;
}

const dists = dijkstra(X).slice(1);
const maxDist = Math.max(...dists);

console.log(maxDist * 2);
