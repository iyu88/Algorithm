const fs = require('fs');
const [nums, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const [N, M] = nums.split(' ').map(Number);
const points = Array(N+1).fill(null).map(_ => []);
const visited = Array(N+1).fill(false);
const queue = new Queue();

input.forEach(el => {
    const [x, y] = el.split(' ').map(Number);
    points[x].push(y);
});

const bfs = (startPoint, targetPoint) => {
    visited[startPoint] = true;
    queue.add([startPoint, 0]);
    
    while (queue.length) {
        const [currentPoint, count] = queue.remove();
        if (currentPoint === targetPoint) return count;
        for (const nextPoint of points[currentPoint]) {
            if (visited[nextPoint] === false) {
                visited[nextPoint] = true;
                queue.add([nextPoint, count + 1]);
            }
        }
    }
    
    return -1;
}

console.log(bfs(1, N));
