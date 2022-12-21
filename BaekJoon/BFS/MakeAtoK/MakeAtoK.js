const fs = require('fs');
const [a, b] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = (value) => {
        if (!this.size()) this.q['0'] = value;
        else this.q[++this.rear] = value;
    }
    
    this.remove = () => {
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

const MAX_VALUE = 1000000;
const visited = Array(MAX_VALUE).fill(false);

const bfs = (start, end) => {
    const q = new queue();
    visited[start] = true;
    q.add([start, 0]);
    while (q.size()) {
        const [next, count] = q.remove();
        if (next === end) return count;
        if (!visited[next + 1] && next + 1 <= MAX_VALUE) {
            visited[next + 1] = true;
            q.add([next + 1, count + 1]);
        }
        if (!visited[next * 2] && next * 2 <= MAX_VALUE) {
            visited[next * 2] = true;
            q.add([next * 2, count + 1]);
        }
    }
}

console.log(bfs(a, b));
