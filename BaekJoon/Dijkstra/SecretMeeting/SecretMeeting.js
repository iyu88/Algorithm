const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const minHeap = function () {
    this.h = [0];
    
    this.swap = (i, j) => {
        [this.h[i], this.h[j]]  = [this.h[j], this.h[i]];
    }
    
    this.push = (value) => {
        this.h.push(value);
        this.bubbleUp();
    }
    
    this.bubbleUp = () => {
        let index = this.h.length - 1;
        let parent = Math.floor(index / 2);
        while (parent > 0 && this.h[index].w < this.h[parent].w) {
            this.swap(index, parent);
            index = parent;
            parent = Math.floor(index / 2);
        }
    }
    
    this.pop = () => {
        if (this.h.length === 1) return;
        const value = this.h[1];
        this.swap(1, this.h.length - 1);
        this.h.pop();
        this.bubbleDown();
        return value;
    }
    
    this.bubbleDown = () => {
        let index = 1;
        let left = index * 2;
        let right = left + 1;
        while (this.h[index] && ((this.h[left] && this.h[left].w < this.h[index].w) || (this.h[right] && this.h[right].w < this.h[index].w))) {
            let small = left;
            if (this.h[right] && this.h[right].w < this.h[left].w) small = right;
            this.swap(index, small);
            index = small;
            left = index * 2;
            right = left + 1;
        }
    }
}

let index = 0;
let output = [];

while (index < arr.length) {
    const [nodeCount, edgeCount] = arr[index++].split(' ').map(Number);
    const edges = arr.slice(index, index + edgeCount);
    index += edgeCount;
    const peerCount = arr[index++];
    const peers = arr[index++].split(' ').map(Number);
    
    const points = Array(nodeCount+1).fill(null).map(el => []);
    edges.forEach(el => {
        const [from, to, weight] = el.split(' ').map(Number);
        points[from].push({v: to, w: weight});
        points[to].push({v: from, w: weight});
    });
    
    const dijkstra = (peer) => {
        const answer = Array(nodeCount+1).fill(Infinity);
        const heap = new minHeap();
        answer[peer] = 0;
        heap.push({v: peer, w: answer[peer]});
        while (heap.h.length !== 1) {
            const {v: startV, w: startW} = heap.pop();
            if (!points[startV].length) continue;
            if (answer[startV] < startW) continue;
            for (const node of points[startV]) {
                const {v: nextV, w: nextW} = node;
                if (answer[nextV] > answer[startV] + nextW) {
                    answer[nextV] = answer[startV] + nextW;
                    heap.push({v: nextV, w: answer[nextV]});
                }
            }
        }
        return answer;
    }
    
    const result = peers.map(el => dijkstra(el));
    const dists = result[0].map((el, index) => Array(result.length).fill(null).reduce((acc, cur, index2) => acc + result[index2][index], 0));
    const min = Math.min(...dists);
    output.push(dists.indexOf(min));
}

console.log(output.join('\n'));
