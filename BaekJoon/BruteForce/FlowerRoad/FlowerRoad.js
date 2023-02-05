const fs = require('fs');
const [size, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +size;
let cost = Infinity;
const $map = arr.map(el => el.split(' ').map(Number));
const visited = Array(N+1).fill(null).map(_ => Array(N+1).fill(false));
const DY = [0, -1, 0, 1, 0];
const DX = [0, 0, -1, 0, 1];

const checkDirections = (y, x) => {
    for (let k = 0; k < 5; k++) {
        const dy = DY[k] + y;
        const dx = DX[k] + x;
        if (visited[dy][dx]) return false;
    }
    return true;
}

const visitSpot = (y, x, sum) => {
    for (let k = 0; k < 5; k++) {
        const dy = DY[k] + y;
        const dx = DX[k] + x;
        visited[dy][dx] = true;
        sum += $map[dy][dx];
    }
    return sum;
}

const unvisitSpot = (y, x) => {
    for (let k = 0; k < 5; k++) {
        const dy = DY[k] + y;
        const dx = DX[k] + x;
        visited[dy][dx] = false;
    }
}

const dfs = (y, count, sum) => {
    if (count === 3) {
        cost = Math.min(cost, sum);
        return;
    }
    
    for (let i = y; i < N-1; i++) {
        for (let j = 1; j < N-1; j++) {
            if (checkDirections(i, j)) {
                const currentSum = visitSpot(i, j, sum);
                dfs(i, count + 1, currentSum);
                unvisitSpot(i, j)
            }
        }
    }
}

dfs(1, 0, 0);

console.log(cost);
