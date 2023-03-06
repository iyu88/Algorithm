const fs = require('fs');
const [sizes, presents, children] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = sizes.split(' ').map(Number);
const P = presents.split(' ').map(Number);
const C = children.split(' ').map(Number);

const MaxHeap = function () {
    if (new.target === undefined) return new MaxHeap();
    
    this.h = [];
    
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
        while (this.h[parent] !== undefined && this.h[parent] < this.h[index]) {
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
        
        while (this.h[left] !== undefined && (this.h[left] > this.h[index] || this.h[right] > this.h[index])) {
            let big = left;
            if (this.h[right] !== undefined && this.h[right] > this.h[left]) big = right;
            this.swap(index, big);
            index = big;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const maxHeap = new MaxHeap();
let flag = 1;

P.forEach(maxHeap.push);

for (let i = 0 ; i < M ; i++) {
    const max = maxHeap.pop();
    if (max === C[i]) continue;
    if (max > C[i]) maxHeap.push(max - C[i]);
    if (max < C[i]) {
        flag = 0;
        break;
    }
}

console.log(flag);
