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

const O = {};
inputs.forEach((el, idx) => {
    if (!idx) return;
    const [from, to] = el.split(' ');
    O[from] = to;
});

const bfs = (start = 1) => {
    const queue = new Queue();
    const visited = Array.from({length: 101}, () => -1);
    
    queue.add(start);
    visited[start] = 0;
    
    while (queue.length) {
        const current = queue.remove();
        
        for (let k = 6 ; k > 0 ; k--) {
            let next = current + k;
            
            if (next > 100) continue;
            
            if (O[next]) next = +O[next];
            
            if (visited[next] === -1) {
                visited[next] = visited[current] + 1;
                queue.add(next);
            }
        }
    }
    
    return visited[100];
}

console.log(bfs());
