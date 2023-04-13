const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const MinHeap = function () {
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
            if (this.h[right] !== undefined && this.h[right].w < this.h[left].w) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

let index = 0;
const N = +inputs[index++];
const dangerArea = inputs.slice(index, index + N);
index += N;
const M = +inputs[index++];
const deathArea = inputs.slice(index, index + M);
const S = 501;
const board = Array.from({length: S}, () => Array.from({length: S}, () => 1));
const answer = Array.from({length: S}, () => Array.from({length: S}, () => Infinity));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

const setAreaOnBoard = (str, value) => {
    const [X1, Y1, X2, Y2] = str.split(' ').map(Number);
    const [startX, endX] = [X1, X2].sort((a, b) => a - b);
    const [startY, endY] = [Y1, Y2].sort((a, b) => a - b);
    for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
            board[y][x] = value;
        }
    }
}

dangerArea.forEach(el => setAreaOnBoard(el, 2));
deathArea.forEach(el => setAreaOnBoard(el, 0));

const dijkstra = () => {
    const minHeap = new MinHeap();

    answer[0][0] = 0;
    minHeap.push({y: 0, x: 0, w: answer[0][0]});
    
    while (minHeap.size()) {
        const {y, x, w} = minHeap.pop();
        
        for (let k = 0; k < 4; k++) {
            const dyy = DY[k] + y;
            const dxx = DX[k] + x;
            
            if (dyy < 0 || dxx < 0 || dyy >= S || dxx >= S || !board[dyy][dxx]) continue; 
            
            const nextWeight = board[dyy][dxx] === 1 ? w : w + 1;
            
            if (answer[dyy][dxx] > nextWeight) {
                answer[dyy][dxx] = nextWeight;
                minHeap.push({y: dyy, x: dxx, w: answer[dyy][dxx]});
            }
        }
    }
}

dijkstra();
console.log(answer[S-1][S-1] === Infinity ? -1 : answer[S-1][S-1]);
