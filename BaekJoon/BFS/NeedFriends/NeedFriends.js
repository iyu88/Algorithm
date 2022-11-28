const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

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

const [Y, X] = nums.split(' ').map(Number);
let answer = 0;
const visited = Array(Y).fill(null).map(el => Array(X).fill(false));
let [startY, startX] = [null, null];
const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0 ,1];
const q = new queue();

for (let i = 0 ; i < Y ; i++) {
    for (let j = 0 ; j < X ; j++) {
        if (arr[i][j] === 'I') {
            [startY, startX] = [i, j];
        }
    }
}

const bfs = (startY, startX) => {
    visited[startY][startX] = true;
    q.add([startY, startX]);
    while (q.size()) {
        const [nextY, nextX] = q.remove();
        for (let k = 0 ; k < 4 ; k++) {
            let dyy = nextY + dy[k];
            let dxx = nextX + dx[k];
            if (dyy > -1 && dyy < Y && dxx > -1 && dxx < X && !visited[dyy][dxx]) {
                if (arr[dyy][dxx] !== 'X') {
                    visited[dyy][dxx] = true;
                    if (arr[dyy][dxx] === 'P') answer++;
                    q.add([dyy, dxx]);
                }
            }
        }
    }
}

bfs(startY, startX);

console.log(answer === 0 ? "TT" : answer);
