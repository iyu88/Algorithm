const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

let index = 0;
const [N, M] = inputs[index++].split(' ').map(Number);
const [S, E] = inputs[index++].split(' ').map(Number);
const points = Array.from({length: N+1}, () => []);
inputs.forEach((el, idx) => {
    if (idx < 2) return;
    const [x, y] = el.split(' ').map(Number);
    points[x].push(y);
    points[y].push(x);
});

const bfs = (start, end) => {
    const queue = new Queue();
    const visited = Array.from({length: N+1}, () => false);
    visited[start] = true;
    queue.add([start, 0]);
    
    while (queue.length) {
        const [current, count] = queue.remove();
        if (current === end) return count;
        
        for (const next of points[current]) {
            if (visited[next] === false) {
                visited[next] = true;
                queue.add([next, count+1]);
            }
        }
        
        if (current + 1 <= N && visited[current+1] === false) {
            visited[current+1] = true;
            queue.add([current+1, count+1]);
        }
        
        if (current - 1 > 0 && visited[current-1] === false) {
            visited[current-1] = true;
            queue.add([current-1, count+1]);
        }
    }
}

console.log(bfs(S, E));
