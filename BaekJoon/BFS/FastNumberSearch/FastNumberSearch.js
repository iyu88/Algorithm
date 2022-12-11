const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

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

const $map = arr.slice(0, 5);
const visited = Array(5).fill(null).map(el => Array(5).fill(false));
const [y, x] = arr[5];
const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

const bfs = (y, x) => {
    const q = new queue();
    q.add([y, x, 0]);
    visited[y][x] = true;
    while (q.size()) {
        const [nextY, nextX, count] = q.remove();
        if ($map[nextY][nextX] === 1) return count;
        for (let k = 0 ; k < 4 ; k++) {
            let dyy = dy[k] + nextY;
            let dxx = dx[k] + nextX;
            if (dyy > -1 && dyy < 5 && dxx > -1 && dxx < 5 && !visited[dyy][dxx]) {
                if ($map[dyy][dxx] > -1) {
                    visited[dyy][dxx] = true;
                    q.add([dyy, dxx, count+1]);
                }
            }
        }
    }
    return undefined;
}

if ($map[y][x] === 1) {
    console.log(0);
} else {
    const result = bfs(y, x);
    console.log(result === undefined ? -1 : result);
}
