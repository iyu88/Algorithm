const fs = require('fs');
const [A, B, C] = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

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
        if (this.size() === 0) return;
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value;
    }
}

const bfs = (startWater) => {
    let water = startWater;
    const answer = [];
    const queue = new Queue();
    const visited = Array(A+1).fill(null).map(el => Array(B+1).fill(false));
    
    const moveWater = (from, to) => {
        if (!visited[from][to]) {
            visited[from][to] = true;
            queue.add([from, to]);
        }
    }
    
    visited[0][0] = true;
    queue.add([0, 0]);
    while (queue.size()) {
        let [nextA, nextB] = queue.remove();
        let nextC = C - nextA - nextB;
        if (nextA === 0) answer.push(nextC);
        
        water = Math.min(nextA, B-nextB);
        moveWater(nextA - water, nextB + water);
        
        water = Math.min(nextA, C-nextC);
        moveWater(nextA - water, nextB)

        water = Math.min(nextB, A-nextA);
        moveWater(nextA + water, nextB - water);
        
        water = Math.min(nextB, C-nextC);
        moveWater(nextA, nextB - water);

        water = Math.min(nextC, A-nextA);
        moveWater(nextA + water, nextB);

        water = Math.min(nextC, B-nextB);
        moveWater(nextA, nextB + water);
        
    }
    return answer;
}

console.log(bfs(C).sort((a, b) => a - b).join(' '));
