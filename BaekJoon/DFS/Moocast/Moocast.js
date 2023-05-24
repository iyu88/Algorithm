const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const points = inputs.map(el => el.split(' ').map(Number));

const dfs = (x, y, p) => {
    for (let i = 0 ; i < N ; i++) {
        if (visited[i]) continue;
        const [nextX, nextY, nextP] = points[i];
        const dist = Math.sqrt((nextX-x) ** 2 + (nextY-y) ** 2);
        if (dist <= p) {
            visited[i] = true;
            count++;
            dfs(...points[i]);
        }
    }
}

let answer = 0;
let visited;
let count;

for (let i = 0; i < N; i++) {
    visited = Array(N+1).fill(false);
    count = 1;
    visited[i] = true;
    dfs(...points[i]);
    answer = Math.max(answer, count);
}

console.log(answer);
