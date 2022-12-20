const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const queue = function () {
    this.q = {};
    this.front = this.rear = 0;
    
    this.size = () => {
        if (this.q[this.rear] === undefined) return 0;
        else return this.rear - this.front + 1;
    }
    
    this.add = (value) => {
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

const [N, M] = nums;
const answer = Array(N).fill(null).map(el => Array(M).fill(-1));
let startY;
let startX;
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

for (let i = 0 ; i < N ; i ++) {
    for (let j = 0 ; j < M ; j++) {
        if (arr[i][j] === 2) [startY, startX] = [i, j];
    }
}

const bfs = (y, x) => {
    const q = new queue();
    answer[y][x] = 0;
    q.add([y, x, 0]);
    
    while (q.size()) {
        const [curY, curX, count] = q.remove();
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = curY + dy[k];
            const dxx = curX + dx[k];
            if (dyy < N && dxx < M && dyy > -1 && dxx > -1 && answer[dyy][dxx] === -1) {
                if (arr[dyy][dxx]) {
                    answer[dyy][dxx] = count + 1;
                    q.add([dyy, dxx, count + 1]);
                }
            }
        }
    }
}

bfs(startY, startX);

console.log(answer.map((el, i) => el.map((el2, j) => el2 === -1 ? (arr[i][j] ? -1 : 0) : el2).join(' ')).join('\n'));
