const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const points = Array.from({length: N+1}, () => []);
inputs.forEach(el => {
    const [a, b] = el.split(' ').map(Number);
    points[b].push(a);
});
let visited;

const dfs = (current) => {
    for (const next of points[current]) {
        if (visited[next] === false) {
            visited[next] = true;
            dfs(next);
        }
    }
}

let answer = -1;
for (let i = 1 ; i <= N ; i++) {
    visited = Array.from({length: N+1}, () => false);
    visited[i] = true;
    dfs(i);
    if (visited.slice(1).every(el => el === true)) {
        answer = i;
        break;
    }
}

console.log(answer);
