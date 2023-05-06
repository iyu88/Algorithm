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

const [H, W, N] = nums.split(' ').map(Number);
const board = inputs.map(el => el.split(''));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
let SY, SX;

for (let y = 0 ; y < H ; y++) {
    for (let x = 0 ; x < W ; x++) {
        if (Number(board[y][x]) === board[y][x] * 1) {
            board[y][x] = Number(board[y][x]);
        } else if (board[y][x] === 'S') {
            [SY, SX] = [y, x];
        }
    }
}

const bfs = (Y, X, T) => {
    const queue = new Queue();
    const visited = Array.from({length: H}, () => Array.from({length: W}, () => false));

    queue.add([Y, X, 0]);
    visited[Y][X] = true;
    
    while (queue.length) {
        const [currentY, currentX, time] = queue.remove();
        if (board[currentY][currentX] === T) return [currentY, currentX, time];
        
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + currentY;
            const dxx = DX[k] + currentX;
            
            if (dyy < 0 || dxx < 0 || dyy >= H || dxx >= W) continue;
            if (board[dyy][dxx] === 'X' || visited[dyy][dxx]) continue;
            
            visited[dyy][dxx] = true;
            queue.add([dyy, dxx, time + 1]);
        }
    }
}

let answer = 0;
for (let i = 1 ; i <= N ; i++) {
    [SY, SX, T] = bfs(SY, SX, i);
    answer += T;
}

console.log(answer);
