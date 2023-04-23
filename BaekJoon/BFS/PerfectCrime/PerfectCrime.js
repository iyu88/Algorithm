const fs = require('fs');
const [nums, police] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    this.length = 0;
    
    this.add = value => {
        if (this.length === 0) this.q[this.front] = value;
        else this.q[++this.rear] = value;
        this.length++;
    }
    
    this.remove = () => {
        if (this.length === 0) return null;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front !== this.rear) this.front++;
        this.length--;
        return value;
    }
}

const [N, S, D, F, B, K] = nums.split(' ').map(Number);
const visited = Array(N+1).fill(false); 
if (K) {
    police.split(' ').forEach(el => {
        visited[el] = true;
    });    
}

const bfs = (point) => {
    const queue = new Queue();
    queue.add([point, 0]);
    visited[point] = true;
    
    while (queue.length) {
        const [current, time] = queue.remove();
        if (+current === +D) return time;
        
        const front = (+current) + (+F);
        const back = (+current) - (+B);
        
        if (front <= N && visited[front] === false) {
            visited[front] = true;    
            queue.add([front, (+time) + 1]);
        }
        
        if (back >= 1 && visited[back] === false) {
            visited[back] = true;
            queue.add([back, (+time) + 1]);
        }
    }
    
    return null;
}

const answer = bfs(S);

console.log(answer === null ? "BUG FOUND" : answer);
