const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const DY = [0, 1];
const DX = [1, 0];
const board = inputs.map(el => el.split(' ').map(Number));
const dp = Array.from({length: N}, () => Array.from({length: N}, () => BigInt(0)));
dp[0][0] = BigInt(1);

const visitNext = (y, x, w) => {
    for (let k = 0 ; k < 2 ; k++) {
        const dyy = y + DY[k] * w;
        const dxx = x + DX[k] * w;
                
        if (dyy >= N || dxx >= N) continue;
                
        dp[dyy][dxx] += dp[y][x];
    }
}

for (let y = 0 ; y < N ; y++) {
    for (let x = 0 ; x < N ; x++) {
        if (dp[y][x] === BigInt(0)) continue;
        if (board[y][x] === 0) break;
        visitNext(y, x, board[y][x]);
    }
}

console.log((dp[N-1][N-1]).toString());
