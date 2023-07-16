const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const MaxHeap = function () {
    this.h = [];
    
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
        
        while (this.h[parent] !== undefined && this.h[index] > this.h[parent]) {
            this.swap(index, parent);
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }
    
    this.remove = () => {
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
        
        while (this.h[index] && (this.h[left] && this.h[left] > this.h[index] || this.h[right] && this.h[right] > this.h[index])) {
            let big = left;
            if (this.h[right] && this.h[right] > this.h[left]) big = right;
            this.swap(index, big);
            index = big;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const N = +num;
const arr = input.split(' ').map(Number);
const maxHeap = new MaxHeap();

const checkLimit = (limit, arr) => {
    for (const item of arr) {
        if (item > limit) return false;
        maxHeap.push(item);
    }
    
    return true;
}

const cleanSnow = (maxHeap) => {
    let time = 0;
    
    while (maxHeap.h.length > 1) {
        const max = maxHeap.remove();
        const nextMax = maxHeap.remove();
        maxHeap.push(max - nextMax);
        time += nextMax;
    }
    
    time += maxHeap.remove();
    
    return time;
}

if (!checkLimit(1440, arr)) {
    console.log(-1);
} else {
    const result = cleanSnow(maxHeap);
    
    if (result > 1440) {
        console.log(-1);
    } else {
        console.log(result);
    }
}
