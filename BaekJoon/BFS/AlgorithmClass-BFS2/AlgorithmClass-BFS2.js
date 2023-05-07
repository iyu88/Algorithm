const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    this.length = 0;
    
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

const [N, _, R] = nums.split(' ').map(Number);
const points = Array.from({length: N+1}, () => []);
inputs.map(el => {
    const [a, b] = el.split(' ').map(Number);
    points[a].push(b);
    points[b].push(a);
});
const sorted = points.map(el => el.sort((a, b) => b - a));

const bfs = (start) => {
    const queue = new Queue();
    const visited = Array.from({length: N+1}, () => 0);   
    let order = 1;
    
    queue.add(start);
    visited[start] = order++;    
    
    while (queue.length) {
        const current = queue.remove();
        
        for (const next of sorted[current]) {
            if (visited[next] === 0) {
                visited[next] = order++;
                queue.add(next);
            }
        }
    }
    
    return visited;
}

console.log(bfs(R).slice(1).join('\n'));
