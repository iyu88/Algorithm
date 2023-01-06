const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const [N, M] = nums;
let max = 0;
const visited = Array(N).fill(null).map(_ => Array(M).fill(false));
const dy = [-1, 0, 1, 0];
const dx = [0, -1, 0, 1];

const dfs = (y, x, count, sum) => {
    if (count === 4) {
        max = Math.max(max, sum);
        return;
    }
    for (let k = 0 ; k < 4 ; k++) {
        const dyy = dy[k] + y;
        const dxx = dx[k] + x;
        if (dyy > -1 && dxx > -1 && dyy < N && dxx < M && !visited[dyy][dxx]) {
            visited[dyy][dxx] = true;
            dfs(dyy, dxx, count + 1, sum + arr[dyy][dxx]);
            visited[dyy][dxx] = false;
        }
    }
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        visited[i][j] = true;
        dfs(i, j, 1, arr[i][j]);
        visited[i][j] = false;
    }
}

for (let i = 0; i < N - 2; i ++) {
    for (let j = 0; j < M; j++) {
        let sum = arr[i][j] + arr[i+1][j] + arr[i+2][j];
        if (j < M - 1) max = Math.max(max, sum + arr[i+1][j+1]);
        if (j > 0) max = Math.max(max, sum + arr[i+1][j-1]);
    }
}

for (let i = 0; i < N; i++) {
    for (let j = 0; j < M - 2; j++) {
        let sum = arr[i][j] + arr[i][j+1] + arr[i][j+2]
        if (i < N - 1) max = Math.max(max, sum + arr[i+1][j+1]);
        if (i > 0) max = Math.max(max, sum + arr[i-1][j+1]);
    }
}

console.log(max);
