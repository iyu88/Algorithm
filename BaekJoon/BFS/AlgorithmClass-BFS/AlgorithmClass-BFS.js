const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const [N, M, R] = nums.split(' ').map(Number);
const visited = Array(N+1).fill(0);
let points = Array.from(Array(N+1), () => []);
arr.forEach(el => {
    const [pointA, pointB] = el.split(' ').map(Number);
    points[pointA].push(pointB);
    points[pointB].push(pointA);
});

points = points.map(point => point.sort((a, b) => a - b));

const bfs = start_point => {
    const queue = Queue();
    let order = 1;
    visited[start_point] = order;
    queue.add(start_point)
    while (queue.size()) {
        const current_point = queue.remove();
        for (const next_point of points[current_point]) {
            if (!visited[next_point]) {
                visited[next_point] = ++order;
                queue.add(next_point);
            }
        }
    }
}

bfs(R);

console.log(visited.slice(1).join('\n'));
