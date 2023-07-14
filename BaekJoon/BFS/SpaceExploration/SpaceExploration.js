const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const N = +num;
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
const board = inputs.map(el => el.split(''));
const visited = Array.from({length: N+1}, () => Array.from({length: N+1}, () => false));

const bfs = (y, x) => {
    const queue = new Queue();
    queue.add([y, x]);
    visited[y][x] = true;
    
    while (queue.length) {
        const [currentY, currentX] = queue.remove();
        
        for (let k = 0; k < 4; k++) {
            const dyy = DY[k] + currentY; 
            const dxx = DX[k] + currentX;
        
            if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
            if (visited[dyy][dxx]) continue;
            if (board[dyy][dxx] === '.') continue;
        
            visited[dyy][dxx] = true;
            queue.add([dyy, dxx]);
        }
    }
}

let answer = 0;

for (let i = 0 ; i < N ; i++) {
    for (let j = 0 ; j < N ; j++) {
        if (visited[i][j] === false && board[i][j] === '*') {
            bfs(i, j);
            answer++;
        }
    }
}

console.log(answer);
