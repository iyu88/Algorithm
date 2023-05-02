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
        
        while ((this.h[left] !== undefined && this.h[left].w < this.h[index].w) || (this.h[right] !== undefined && this.h[right].w < this.h[index].w)) {
            let small = left;
            if (this.h[right] !== undefined && this.h[right].w < this.h[left].w) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const [C, P, PB, PA1, PA2] = nums.split(' ').map(Number);
const points = Array.from({length: C+1}, () => []);
inputs.forEach(el => {
    const [from, to, weight] = el.split(' ').map(Number);
    points[from].push([to, weight]);
    points[to].push([from, weight]);
});

const dijkstra = (PB) => {
    const answer = Array.from({length: C+1}, () => Infinity);
    const minHeap = new MinHeap();
    
    answer[PB] = 0;
    minHeap.push({p: PB, w: 0});
    
    while (minHeap.size()) {
        const {p: currentPoint, w: currentWeight} = minHeap.pop();
        if (answer[currentPoint] < currentWeight) continue;
        if (!points[currentPoint].length) continue;
        for (const next of points[currentPoint]) {
            const [nextPoint, nextWeight] = next;
            if (answer[nextPoint] > answer[currentPoint] + nextWeight) {
                answer[nextPoint] = answer[currentPoint] + nextWeight;
                minHeap.push({p: nextPoint, w: answer[nextPoint]});
            }
        }
    }
    
    return answer;
}

const D = dijkstra(PB);
const [D1, D2] = [D[PA1], D[PA2]];
const D3 = dijkstra(PA1, PA2)[PA2];
const D4 = dijkstra(PA2, PA1)[PA1];

console.log(Math.min(D1 + D3, D2 + D4));
