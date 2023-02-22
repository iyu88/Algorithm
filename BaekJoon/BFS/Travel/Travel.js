const fs = require('fs');
const [C, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    if (new.target === undefined) {
        return new Queue();
    }
    
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = value => {
        if (!this.size()) this.q['0'] = value;
        else this.q[++this.rear] = value;
    }
    
    this.remove = () => {
        if (!this.size()) return null;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

const answer = [];
let count = +C;

while (count--) {
    const [P, N] = arr[0].split(' ').map(Number);
    const [_, ...connections] = arr.splice(0, N+1);
    const queue = Queue();
    const visited = Array(P+1).fill(false);
    const points = Array(P+1).fill(null).map(_ => []);
    connections.forEach(c => {
        const [a, b] = c.split(' ').map(Number);
        points[a].push(b);
        points[b].push(a);
    });
    
    let result = 0;
    visited[1] = true;
    queue.add(1);
    while (queue.size()) {
        const current = queue.remove();
        for (const next of points[current]) {
            if (!visited[next]) {
                visited[next] = true;
                result++;
                queue.add(next);
            }
        }
    }
    answer.push(result);
}

console.log(answer.join('\n'));
