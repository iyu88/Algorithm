const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const MinHeap = function () {
    this.h = [];
    
    this.swap = (i, j) => {
        const temp = this.h[i];
        this.h[i] = this.h[j];
        this.h[j] = temp;
    }

    this.size = () => this.h.length;
    
    this.add = value => {
        this.h.push(value);
        this.bubbleUp();
    }
    
    this.bubbleUp = () => {
        let index = this.h.length - 1;
        let parent = Math.floor((index - 1) / 2);
        while (parent > -1 && this.h[index][2] < this.h[parent][2]) {
            this.swap(index, parent);
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }
    
    this.remove = () => {
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
        while (this.h[index] && ((this.h[left] && this.h[left][2] < this.h[index][2]) || (this.h[right] && this.h[right][2] < this.h[index][2]))) {
            let small = left;
            if (this.h[right] && this.h[right][2] < this.h[left][2]) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const [N, M] = nums.split(' ').map(Number);
const $map = arr.map(line => line.split(' ').map(Number));
const costs = Array.from(Array(N+1), () => Array(M+1).fill(Infinity));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

const dijkstra = (startY, startX, cost) => {
    const minHeap = new MinHeap();
    costs[startY][startX] = cost;
    minHeap.add([startY, startX, cost]);
    while (minHeap.size()) {
        const [nextY, nextX, nextCost] = minHeap.remove();
        for (let k = 0 ; k < 4 ; k++) {
            const dy = nextY + DY[k];
            const dx = nextX + DX[k];
            if (dy < 0 || dx < 0 || dy >= N || dx >= M) continue;
            if ($map[dy][dx] < 0) continue;
            if (costs[dy][dx] > costs[nextY][nextX] + $map[dy][dx]) {
                costs[dy][dx] = costs[nextY][nextX] + $map[dy][dx];
                minHeap.add([dy, dx, costs[dy][dx]]);
            }
        }
    }
}

if ($map[0][0] >= 0) dijkstra(0, 0, $map[0][0]);

console.log(costs[N-1][M-1] === Infinity ? -1 : costs[N-1][M-1]);
