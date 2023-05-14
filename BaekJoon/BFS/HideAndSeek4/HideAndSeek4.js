const fs = require('fs');
const [N, K] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

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

const bfs = (start, end) => {
    const visited = {};
    const queue = new Queue();
    
    visited[start] = start;
    queue.add([start, 0]);
    
    while (queue.length) {
        const [current, time] = queue.remove();
        if (current === end) return [time, visited[current]];
        
        const nexts = [current + 1, current - 1, current * 2];
        
        nexts.forEach(next => {
          if (next < 0 || next > 100000) return;
          if (visited[next] === undefined) {
              visited[next] = visited[current] + ' ' + next;
              queue.add([next, time + 1]);
          }  
        });
    }
}

console.log(bfs(N, K).join('\n'));
