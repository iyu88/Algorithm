const fs = require('fs');
const [num, friends, count, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
        if (this.h.length === 0) return;
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
        while (this.h[index] !== undefined && (this.h[left] !== undefined && this.h[left].w < this.h[index].w || this.h[right] !== undefined && this.h[right].w < this.h[index].w)) {
            let small = left;
            if (this.h[right] !== undefined && this.h[right].w < this.h[left].w) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2 + 1;
            right = left + 1;
        }
    }
}

const answer = [];
const N = +num;
const abcHome = friends.split(' ').map(Number);
const C = +count;
const points = Array(N+1).fill(null).map(_ => []);
arr.forEach(el => {
    const [from, to, weight] = el.split(' ').map(Number);
    points[from].push({v: to, w: weight});
    points[to].push({v: from, w: weight});
});

const dijkstra = (homePos) => {
    const minHeap = new MinHeap();
    const visited = Array(N+1).fill(Infinity);
    visited[homePos] = 0;
    minHeap.push({v: homePos, w: visited[homePos]});
    
    while (minHeap.size()) {
        const {v: currentV, w: currentW} = minHeap.pop();
        if (visited[currentV] < currentW) continue;
        if (points[currentV].length === 0) continue;
        for (const next of points[currentV]) {
            const {v: nextV, w: nextW} = next;
            if (visited[nextV] > visited[currentV] + nextW) {
                visited[nextV] = visited[currentV] + nextW;
                minHeap.push({v: nextV, w: visited[nextV]});
            }
        }
    }
    
    return visited;
}


for (let i = 0 ; i < 3 ; i++) {
    answer.push(dijkstra(abcHome[i]));
}

let max = -1; 
let maxIndex = -1; 

for (let i = 1 ; i <= N ; i++) {
    let min = Math.min(answer[0][i], answer[1][i]);
    min = Math.min(min, answer[2][i]);
    if (max === min && maxIndex > i) maxIndex = i;
    else if (max < min) {
        max = min;
        maxIndex = i;
    }
}

console.log(maxIndex);
