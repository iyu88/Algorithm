const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Node = function (value) {
    this.prev = null;
    this.next = null;
    this.value = value;
}

const Dequeue = function () {
    this.front = null;
    this.rear = null;
    this.length = 0;
    
    this.addLast = (value) => {
        const node = new Node(value);
        
        if (this.length === 0) {
            this.front = node;
            this.rear = node;
        } else {
            this.rear.next = node;
            node.prev = this.rear;
            this.rear = node;
        }
        
        this.length++;
    }
    
    this.removeFirst = () => {
        if (this.length === 0) return null;
        const value = this.front.value;
        this.front = this.front.next;
        this.length--;
        return value;
    }
}

let index = 0;
const [N, Q] = inputs[index++].split(' ').map(Number);
const R = {};

for (let i = index ; i < index + N - 1 ; i++) {
    const [from, to, weight] = inputs[i].split(' ').map(Number);
    if (R[from] === undefined) R[from] = [];
    if (R[to] === undefined) R[to] = [];
    R[from].push([to, weight]);
    R[to].push([from, weight]);
}

index += (N - 1);

const bfs = (k, v) => {
    const dequeue = new Dequeue();
    const visited = {};
    
    visited[v] = true;
    dequeue.addLast(v);
    
    let count = 0;
    
    while (dequeue.length) {
        const currentV = dequeue.removeFirst();
        
        for (const next of R[currentV]) {
            const [nextV, nextW] = next;
            if (visited[nextV] || nextW < k) continue;
            visited[nextV] = true;
            count++;
            dequeue.addLast(nextV);
        }
    }
    
    return count;
}

const answer = [];

for (let i = index ; i < index + Q ; i++) {
    const [k, v] = inputs[i].split(' ').map(Number);
    answer.push(bfs(k, v));
}

console.log(answer.join('\n'));
