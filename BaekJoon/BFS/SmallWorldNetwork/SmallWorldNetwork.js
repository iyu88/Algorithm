const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    this.q = {};
    this.front = this.rear = this.length = 0;
    
    this.add = value => {
        if (this.length === 0) this.q[this.rear] = value;
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

const [N, M] = inputs[0].split(' ').map(Number);
const relations = Array(N+1).fill(null).map(_ => []);

for (let i = 1 ; i <= M ; i++) {
    const [from, to] = inputs[i].split(' ').map(Number);
    relations[from].push(to);
    relations[to].push(from);
}

const bfs = (start) => {
    const visited = Array(N+1).fill(-1);
    const queue = new Queue();
    
    visited[start]++;
    queue.add(start);
    
    while (queue.length) {
        const current = queue.remove();
        
        for (const next of relations[current]) {
            if (visited[next] === -1) {
                visited[next] = visited[current] + 1;
                queue.add(next);
            }
        }
    }
    
    const max = Math.max(...visited.slice(1));
    const noRelation = visited.slice(1).includes(-1);
    return max > 6 || noRelation;
}

let answer = 'Small World!';
for (let i = 1 ; i <= N ; i++) {
    const result = bfs(i);
    if (result) {
        answer = 'Big World!';
        break;
    }
}

console.log(answer);
