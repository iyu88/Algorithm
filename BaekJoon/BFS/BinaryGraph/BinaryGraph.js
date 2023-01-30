const fs = require('fs');
let [N, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = [];
let index = 0;

const Queue = function () {
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
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

while (N--) {
    const [V, E] = arr[index++].split(' ').map(Number);
    const points = Array(V+1).fill(null).map(el => []);
    const visited = Array(V+1).fill(false);
    const $case = arr.slice(index, index + E).forEach(el => {
        const [from, to] = el.split(' ').map(Number);
        points[from].push(to);
        points[to].push(from);
    });
    
    const bfs = (startPoint) => {
        const queue = new Queue();
        let binary = 1;
        visited[startPoint] = binary;
        queue.add(startPoint);
        while (queue.size()) {
            const currentPoint = queue.remove();
            if (visited[currentPoint] === 1) binary = 2;
            else if (visited[currentPoint] === 2) binary = 1;
            for (const nextPoint of points[currentPoint]) {
                if (!visited[nextPoint]) {
                    visited[nextPoint] = binary;
                    queue.add(nextPoint);
                } else if (visited[nextPoint] === visited[currentPoint]) return false;
            }
        }
        return true;
    }
    
    for (let i = 1; i <= V; i++) {
        if (!visited[i]) bfs(i);
    }
    
    let result = true;
    for (let i = 1; i <= V; i++) {
        for (let j = 0; j < points[i].length; j++) {
            if (visited[i] === visited[points[i][j]]) {
                result = false;
                break;
            }
        }
        if (!result) break;
    }
    answer.push(result ? "YES" : "NO");
    index += E;
}

console.log(answer.join('\n'));
