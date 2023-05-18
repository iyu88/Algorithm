const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, R] = inputs[0].split(' ').map(Number);
const times = Array.from({length: N+1}, () => 0);
const visited = Array.from({length: N+1}, () => -1);
const points = Array.from({length: N+1}, () => []);
inputs.slice(1).forEach(el => {
    const [from, to] = el.split(' ').map(Number);
    points[from].push(to);
    points[to].push(from);
});
points.forEach(el => el.sort((a, b) => a - b));

let t = 1;
const dfs = (current, depth, time) => {
    for (const next of points[current]) {
        if (visited[next] === -1) {
            times[next] = t++; 
            visited[next] = depth+1;
            dfs(next, depth+1);
        }
    }
}

visited[R] = 0;
times[0] = t++;
dfs(R, 0, 0);

let answer = 0;

for (let i = 1 ; i <= N ; i++) {
    answer += (visited[i] * times[i]);
}

console.log(answer);
