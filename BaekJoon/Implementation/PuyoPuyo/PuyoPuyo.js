const fs = require('fs');
let board = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(line => line.split(''));

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
        if (this.front !== this.rear) this.front++;
        this.length--;
        return value;
    }
}

const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

let visited;
let queue;
let isChained = true;
let answer = 0;

const bfs = (y, x) => {
    let count = 1;
    const target = board[y][x];
    const points = [[y, x]];
    
    visited[y][x] = true;
    queue = new Queue();
    queue.add([y, x]);
    
    while (queue.length) {
        const [currentY, currentX] = queue.remove();
        
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + currentY;
            const dxx = DX[k] + currentX;
            
            if (dyy < 0 || dxx < 0 || dyy >= 12 || dxx >= 6) continue;
            
            if (visited[dyy][dxx]) continue;
            if (board[dyy][dxx] === target) {
                visited[dyy][dxx] = true;
                queue.add([dyy, dxx]);
                points.push([dyy, dxx]);
                count++;
            }
        }
    }
    
    if (count > 3) {
        points.forEach(point => {
            const [popY, popX] = point;
            board[popY][popX] = 'X';
        });
        isChained = true;
    }
}

while (isChained) {
    isChained = false;
    visited = Array.from({length: 12}, () => Array.from({length: 6}, () => false)); 

    for (let y = 0 ; y < 12 ; y++) {
        for (let x = 0 ; x < 6 ; x++) {
            if (visited[y][x]) continue;
            if (board[y][x] !== '.' && board[y][x] !== 'X') bfs(y, x);
        }
    }
    
    if (isChained) {
        for (let x = 0 ; x < 6 ; x++) {
            let count = 0;
            for (let y = 11 ; y > -1 ; y--) {
                if (board[y][x] === '.') continue;
                if (board[y][x] === 'X') count++;
                else {
                    board[y+count][x] = board[y][x];
                    if (count) board[y][x] = '.';
                }
            }
        }
        answer++;
    }
}

console.log(answer);
