const fs = require('fs');
const [size, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = size.split(' ').map(Number);
const threshold = +input.pop();
const visited = Array.from({length: N}, () => Array.from({length: M}, () => false));
const pixels = Array.from({length: N}, () => Array.from({length: M}, () => 0));
const rgb = input.map(el => el.split(' ').map(Number));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
        for (let k = x*3; k < (x+1)*3; k++) {
            pixels[y][x] += rgb[y][k];
        }
        pixels[y][x] /= 3;
        pixels[y][x] = pixels[y][x] >= threshold ? 255 : 0;
    }
}

const dfs = (y, x) => {
    for (let k = 0; k < 4; k++) {
        const dyy = DY[k] + y;
        const dxx = DX[k] + x;
        
        if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= M) continue;
        if (visited[dyy][dxx]) continue;
        if (pixels[dyy][dxx] === 0) continue;
        
        visited[dyy][dxx] = true;
        dfs(dyy, dxx);
    }
}

let answer = 0;
for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
        if (visited[y][x]) continue;
        if (pixels[y][x] === 0) continue;

        visited[y][x] = true;
        dfs(y, x);
        answer++;
    }
}

console.log(answer);
