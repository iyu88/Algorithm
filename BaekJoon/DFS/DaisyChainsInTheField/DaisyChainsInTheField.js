const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' ').map(Number));

const [N, M] = nums;
const visited = Array(N+1).fill(false);
const points = Array.from({length: N+1}, () => []);
inputs.forEach(el => {
    const [from, to] = el;
    points[from].push(to);
    points[to].push(from);
});

const dfs = (current) => {
    for (const next of points[current]) {
        if (visited[next] === false) {
            visited[next] = true;
            dfs(next);
        }
    }
}

visited[1] = true;
dfs(1);

const answer = [];
visited.forEach((el, idx) => {
    if (idx && el === false) answer.push(idx);
});

console.log(answer.length ? answer.join('\n') : '0');
