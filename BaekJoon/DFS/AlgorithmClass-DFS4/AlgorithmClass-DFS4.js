const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, R] = inputs[0].split(' ').map(Number);
const visited = Array.from({length: N+1}, () => -1);
const points = Array.from({length: N+1}, () => []);
inputs.slice(1).forEach(el => {
    const [from, to] = el.split(' ').map(Number);
    points[from].push(to);
    points[to].push(from);
});
points.forEach(el => el.sort((a, b) => b - a));

const dfs = (current, depth) => {
    for (const next of points[current]) {
        if (visited[next] === -1) {
            visited[next] = depth+1;
            dfs(next, depth+1);
        }
    }
}

visited[R] = 0;
dfs(R, 0);

console.log(visited.slice(1).join('\n'));
