const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const MinHeap = function () {
    this.h = [];
    
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
        
        while (this.h[index] && (this.h[left] && this.h[left].w < this.h[index].w || this.h[right] && this.h[right].w < this.h[index].w)) {
            let small = left;
            if (this.h[right] && this.h[right].w < this.h[left].w) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const N = +num;
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
const board = inputs.map(el => el.split(' ').map(Number));

const calcDist = (y1, x1, y2, x2) => {
    return Math.abs(board[y1][x1] - board[y2][x2]);
}

const dijkstra = () => {
    const minHeap = new MinHeap();
    const answer = Array.from({length: N}, () => Array.from({length: N}, () => Infinity));
    
    minHeap.push({y: 0, x: 0, w: 0});
    answer[0][0] = 0;
    
    while (minHeap.size()) {
        const {y:currentY, x:currentX, w:currentW} = minHeap.pop();
        
        if (answer[currentY][currentX] < currentW) continue;
        
        for (let k = 0 ; k < 4 ; k++) {
            const nextY = currentY + DY[k];
            const nextX = currentX + DX[k];
            
            if (nextY < 0 || nextX < 0 || nextY >= N || nextX >= N) continue;
            
            const dist = Math.max(currentW, calcDist(currentY, currentX, nextY, nextX));
            
            if (answer[nextY][nextX] > dist) {
                answer[nextY][nextX] = dist;
                minHeap.push({y: nextY, x: nextX, w: answer[nextY][nextX]});
            }
        }
    }
    
    return answer[N-1][N-1];
}

console.log(dijkstra());
