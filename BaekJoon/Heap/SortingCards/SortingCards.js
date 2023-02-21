const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const MinHeap = function () {
    if (new.target === undefined) {
        return new MinHeap();
    } 
    
    this.h = [];
    
    this.size = () => this.h.length;
    
    this.swap = (i, j) => {
        const temp = this.h[i];
        this.h[i] = this.h[j];
        this.h[j] = temp;
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
        if (this.h.length === 0) return null;
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
        while (this.h[left] !== undefined && (this.h[left] < this.h[index] || this.h[right] < this.h[index])) {
            let small = left;
            if (this.h[right] !== undefined && this.h[right] < this.h[left]) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

let answer = 0;
const minHeap = MinHeap();
arr.forEach(el => minHeap.push(+el));

while (minHeap.size() > 1) {
    const first = minHeap.pop();
    const second = minHeap.pop();
    
    minHeap.push(first + second);
    answer += (first + second);
}

console.log(answer);
