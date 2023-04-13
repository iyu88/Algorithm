const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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
const board = inputs.map(el => el.split(' ').map(Number));
const visited = Array.from({length : N}, () => Array.from({length: N}, () => false));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
const points = {};
let count = 2;
let answer = Infinity;
let bridges;

const setCityArea = (y, x) => { 
    for (let k = 0 ; k < 4 ; k++) {
        const dyy = DY[k] + y;
        const dxx = DX[k] + x;
            
        if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
        
        if (!board[dyy][dxx]) {
            if (points[count] === undefined) {
                points[count] = [[y, x]];
            } else {
                points[count].push([y, x]);
            }
            continue;
        }
        
        if (!visited[dyy][dxx] && board[dyy][dxx] === 1) {
            visited[dyy][dxx] = true;
            board[dyy][dxx] = count;
            setCityArea(dyy, dxx)
        }
    }
}

const findDistance = (key) => {
    const queue = new Queue();
    bridges = Array.from({length : N}, () => Array.from({length: N}, () => false));
    
    for (const [y, x] of Object.values(points[key])) {
        bridges[y][x] = true;
        queue.add([y, x, 0]);
    }
    
    while (queue.length) {
        const [curY, curX, dist] = queue.remove();
        
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + curY;
            const dxx = DX[k] + curX;
            
            if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
            if (board[dyy][dxx] === +key) continue; 
            
            if (board[dyy][dxx]) {
                answer = Math.min(answer, dist);
                break;
            }
            
            if (!bridges[dyy][dxx]) {
                bridges[dyy][dxx] = true;
                queue.add([dyy, dxx, dist + 1]);
            }
        }
    }
}

for (let y = 0 ; y < N ; y++) {
    for (let x = 0 ; x < N ; x++) {
        if (!visited[y][x] && board[y][x]) {
            visited[y][x] = true;
            board[y][x] = count;
            setCityArea(y, x);
            count++;
        }
    }
}

for (const key of Object.keys(points)) {
    findDistance(key);
}

console.log(answer);
