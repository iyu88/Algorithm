
const fs = require('fs');
const [nums, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, R, Q] = nums.split(' ').map(Number);
const answer = Array(N+1).fill(1);
const points = Array(N+1).fill(null).map(_ => []);
const visited = Array(N+1).fill(false);
input.splice(0, N-1).map(el => {
    const [from, to] = el.split(' ').map(Number);
    points[from].push(to);
    points[to].push(from);
});

const dfs = (point) => {
    for (const nextPoint of points[point]) {
        if (!visited[nextPoint]) {
            visited[nextPoint] = true;
            answer[point] += dfs(nextPoint);
        }
    }
    return answer[point];
}

visited[R] = true;
dfs(R);

console.log(input.map(point => answer[point]).join('\n'));
