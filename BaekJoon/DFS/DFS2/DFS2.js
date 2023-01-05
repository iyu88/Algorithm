const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const [N, M, R] = nums;
let count = 0;
const visited = Array(N+1).fill(0);
const points = Array(N+1).fill(null).map(_ => []);
arr.forEach(el => {
    const [from, to] = el;
    points[from].push(to);
    points[to].push(from);
});

const sortedPoints = points.map(el => el.sort((a, b) => b - a));

const dfs = (x) => {
    if (!visited[x]) {
        visited[x] = ++count;
        for (const next of points[x]) {
            dfs(next);
        }
    }
}

dfs(R)

console.log(visited.slice(1).join('\n'));
