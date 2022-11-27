const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
let answer = 0;
const visited = Array(N+1).fill(false);
const points = Array(N+1).fill(null).map(el => []);
const len = arr.length;
for (let i = 0 ; i < len ; i++) {
    const [from, to] = arr[i].split(' ');
    const F = +from;
    const T = +to;
    points[F].push(T);
    points[T].push(F);
}

const dfs = (value, count) => {
    let isLeaf = true;
    visited[value] = true;
    for (const el of points[value]) {
        if (visited[el] === false) {
            isLeaf = false;
            dfs(el, count + 1);
        }
    }
    if (isLeaf) answer += count;
}

dfs(1, 0);

console.log(answer % 2 === 0 ? 'No': 'Yes');
