const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
let answer = [];
let visited = Array.from(Array(N), () => Array(N).fill(false));
let $map = arr.map(el => el.split('').map(el2 => +el2));

let dy = [-1, 0, 1, 0];
let dx = [0, 1, 0, -1];

let count = 0;

const dfs = (y, x) => {
    count++;
    if (!visited[y][x]) {
        visited[y][x] = true;
        for (let k = 0 ; k < dy.length ; k++) {
            let dyy = dy[k] + y;
            let dxx = dx[k] + x;
            if (dyy > -1 && dyy < N && dxx > -1 && dxx < N) {
                if (!visited[dyy][dxx] && $map[dyy][dxx]) {
                    dfs(dyy, dxx);
                }
            }
        }
    }
}

for (let i = 0 ; i < N ; i++) {
    for (let j = 0 ; j < N ; j++) {
        if (!visited[i][j] && $map[i][j]) {
            dfs(i, j);
            answer.push(count);
            count = 0;
        }
    }
}

console.log(answer.length);
console.log(answer.sort((a, b) => a - b).join('\n'));
