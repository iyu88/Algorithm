const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const visited = Array.from({length: N}, () => Array.from({length: N}, () => false));
const board = inputs.map(el => el.split(' ').map(Number));
const DY = [0, 1];
const DX = [1, 0];

const dfs = (y, x) => {
    const value = board[y][x];
    if (value === -1) return;
    for (let k = 0 ; k < 2 ; k++) {    
        const dyy = y + (DY[k] * value);
        const dxx = x + (DX[k] * value);
        
        if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
        if (visited[dyy][dxx]) continue;
        
        visited[dyy][dxx] = true;
        dfs(dyy, dxx);
    }
}

visited[0][0] = true;
dfs(0, 0);

console.log(visited[N-1][N-1] ? 'HaruHaru' : 'Hing');
