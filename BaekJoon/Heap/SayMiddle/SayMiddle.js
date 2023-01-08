const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

class Heap {
    constructor () {
        this.h = [];
    }
    
    swap = (i, j) => {
        const temp = this.h[i];
        this.h[i] = this.h[j];
        this.h[j] = temp;
    }
    
    parentIndex = index => Math.floor((index - 1) / 2);

    parent = index => this.h[this.parentIndex(index)];

    leftIndex = index => index * 2 + 1;

    left = index => this.h[this.leftIndex(index)];

    rightIndex = index => index * 2 + 2;

    right = index => this.h[this.rightIndex(index)];

    peek = () => this.h[0];

    size = () => this.h.length;
}

class MinHeap extends Heap {
    push = value => {
        this.h.push(value);
        this.bubbleUp();
    }
    
    bubbleUp = () => {
        let index = this.h.length - 1;
        let parent = this.parentIndex(index);
        while (this.h[parent] !== undefined && this.h[index] < this.h[parent]) {
            this.swap(index, parent);
            index = parent;
            parent = this.parentIndex(index);
        }
    }
    
    pop = () => {
        if (this.size() === 0) return;
        const value = this.peek();
        this.swap(0, this.h.length - 1);
        this.h.pop();
        this.bubbleDown();
        return value;
    }
    
    bubbleDown = () => {
        let index = 0;
        let left = this.leftIndex(index);
        let right = this.rightIndex(index);
        while (this.h[left] !== undefined && (this.h[left] < this.h[index] || this.h[right] < this.h[index])) {
            let small = left;
            if (this.h[right] !== undefined && this.h[right] < this.h[left]) small = right;
            this.swap(index, small);
            index = small;
            left = this.leftIndex(index);
            right = this.rightIndex(index);
        }
    }
}

class MaxHeap extends MinHeap {
    bubbleUp = () => {
        let index = this.h.length - 1;
        let parent = this.parentIndex(index);
        while (this.h[parent] !== undefined && this.h[index] > this.h[parent]) {
            this.swap(index, parent);
            index = parent;
            parent = this.parentIndex(index);
        }
    }
    
    bubbleDown = () => {
        let index = 0;
        let left = this.leftIndex(index);
        let right = this.rightIndex(index);
        while (this.h[left] !== undefined && (this.h[left] > this.h[index] || this.h[right] > this.h[index])) {
            let big = left;
            if (this.h[right] !== undefined && this.h[right] > this.h[left]) big = right;
            this.swap(index, big);
            index = big;
            left = this.leftIndex(index);
            right = this.rightIndex(index);
        }
    }
}

const answer = [];
const minHeap = new MinHeap();
const maxHeap = new MaxHeap();

arr.forEach(el => {
    if (maxHeap.size() > minHeap.size()) minHeap.push(el);
    else maxHeap.push(el);
    
    if (minHeap.size() === 0) answer.push(maxHeap.peek());
    else {
        if (maxHeap.peek() > minHeap.peek()) {
            const temp = maxHeap.pop();
            maxHeap.push(minHeap.pop());
            minHeap.push(temp);
        }
        answer.push(maxHeap.peek());
    }
    
});

console.log(answer.join('\n'));
