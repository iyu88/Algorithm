const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const Queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    this.length = 0;
    
    this.add = (value) => {
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
const board = arr.map(el => el.split(' ').map(Number));
const DY = [-1, 0, 0, 1];
const DX = [0, -1, 1, 0];
let Y, X;
let shark = 2;
let eaten = 0;
let fishes = 0;
let time = 0;

for (let y = 0 ; y < N ; y++) {
    for (let x = 0 ; x < N ; x++) {
        if (!board[y][x]) continue;
        if (board[y][x] < 9) fishes++;
        else [Y, X] = [y, x];
    }
}

const findFish = (y, x) => {
    const visited = Array.from({length: N}, () => Array.from({length: N}, () => false));
    visited[y][x] = true;
    
    const queue = new Queue();
    queue.add([y, x, 0]);
    
    board[y][x] = 0
    const pos = [];
    
    while (queue.length) {
        const [curY, curX, moves] = queue.remove();
        
        if (board[curY][curX] && board[curY][curX] < shark) {
            pos.push([curY, curX, moves]);
        }
        
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + curY;
            const dxx = DX[k] + curX;
        
            if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
            if (visited[dyy][dxx] || board[dyy][dxx] > shark) continue;
            
            visited[dyy][dxx] = true;
            queue.add([dyy, dxx, moves + 1]);
        }
    }
    
    if (pos.length === 0) return null;
    
    const [ nextFish ] = pos.sort((a, b) => a[2] - b[2] || a[0] - b[0] || a[1] - b[1]);
    const [nextY, nextX, moved] = nextFish;
    
    [Y, X] = [nextY, nextX];
    board[nextY][nextX] = 9;
    board[y][x] = 0;
    eaten++;
    fishes--;
    return moved;
}

while (fishes) {
    const result = findFish(Y, X);
    if (result) time += result;
    else break;
    
    if (eaten === shark) {
        eaten = 0;
        shark++;
    }
}

console.log(time);
