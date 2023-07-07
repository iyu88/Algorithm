const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = nums.split(' ').map(Number);
const visited = Array.from({length: N}, () => Array.from({length: M}, () => false));
const board = inputs.map(el => el.split(''));
const DY = [-1, 0, 1, 0, -1, -1, 1, 1];
const DX = [0, 1, 0, -1, -1, 1, -1, 1];

const dfs = (y, x) => {
    for (let k = 0 ; k < 8 ; k++) {
        const dyy = DY[k] + y;
        const dxx = DX[k] + x;
        
        if (dyy >= N || dxx >= M || dyy < 0 || dxx < 0) continue;
        if (visited[dyy][dxx] || board[dyy][dxx] === '.') continue;
        
        visited[dyy][dxx] = true;
        dfs(dyy, dxx);
    }
}

let answer = 0;

for (let i = 0 ; i < N ; i++) {
    for (let j = 0 ; j < M ; j++) {
        if (visited[i][j] === false && board[i][j] === '#') {
            visited[i][j] = true;
            dfs(i, j);
            answer++;
        }
    }
}

console.log(answer);
