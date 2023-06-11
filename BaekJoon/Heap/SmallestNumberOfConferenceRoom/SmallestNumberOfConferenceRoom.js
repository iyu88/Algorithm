const fs = require('fs');
const [_, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const MinHeap = function () {
    this.h = [];
    
    this.min = () => this.h[0];
    
    this.size = () => this.h.length;
    
    this.swap = (i, j) => {
        [this.h[i], this.h[j]] = [this.h[j], this.h[i]];
    }
    
    this.push = value => {
        this.h.push(value);
        this.bubbleUp();
    }
    
    this.bubbleUp = () => {
        let index = this.h.length - 1;
        let parent = Math.floor((index - 1) / 2);
        
        while (this.h[parent] !== undefined && this.h[index] < this.h[parent]) {
            this.swap(index, parent);
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }
    
    this.pop = () => {
        if (this.size() === 0) return null;
        const value = this.min();
        this.swap(0, this.h.length - 1);
        this.h.pop();
        this.bubbleDown();
        return value;
    }
    
    this.bubbleDown = () => {
        let index = 0;
        let left = index * 2 + 1;
        let right = left + 1;
        
        while (this.h[index] !== undefined && (this.h[left] !== undefined && this.h[left] < this.h[index] || this.h[right] !== undefined && this.h[right] < this.h[index])) {
            let small = left;
            if (this.h[right] !== undefined && this.h[right] < this.h[left]) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const minHeap = new MinHeap();
const sorted = inputs.map(el => el.split(' ').map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
let answer = 1;

minHeap.push(sorted[0][1]);

for (let i = 1; i < inputs.length; i++) {
    while (minHeap.size() && minHeap.min() <= sorted[i][0]) {
        minHeap.pop();
    }
    minHeap.push(sorted[i][1]);
    answer = Math.max(answer, minHeap.size());
}

console.log(answer);
