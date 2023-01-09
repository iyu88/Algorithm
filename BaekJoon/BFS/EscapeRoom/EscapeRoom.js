const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const queue = function () {
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
        const value = this.q[this.front];
        delete this.q[this.front];
        if (this.front === this.rear) this.front = this.rear = 0;
        else this.front++;
        return value; 
    }
}

const [N, M] = nums;
let answer = [-1, 0];
const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

const bfs = (y, x) => {
    const q = new queue();
    const visited = Array(N).fill(null).map(_ => Array(M).fill(false));
    visited[y][x] = true;
    let dist = 0;
    let maxValue = arr[y][x];
    q.add([y, x, dist]);
    while (q.size()) {
        const [nextY, nextX, count] = q.remove();
        if (dist < count) {
            dist = count;
            maxValue = arr[nextY][nextX];
        } else if (dist === count) {
            dist = count;
            maxValue = Math.max(maxValue, arr[nextY][nextX]);
        }
        for (let k = 0; k < 4; k++) {
            const dyy = nextY + dy[k];
            const dxx = nextX + dx[k];
            if (dyy > -1 && dxx > -1 && dyy < N && dxx < M && !visited[dyy][dxx] && arr[dyy][dxx]) {
                visited[dyy][dxx] = true;
                q.add([dyy, dxx, count + 1]);
            }
        }
    }
    return [dist, maxValue];
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (arr[i][j] === 0) continue;
        const [dist, maxValue] = bfs(i, j);
        if (dist > answer[0]) {
            answer[0] = dist;
            answer[1] = maxValue;
        } else if (dist === answer[0]) {
            answer[0] = dist;
            answer[1] = Math.max(answer[1], maxValue + arr[i][j]);
        }
    }
}

console.log(answer[1]);
