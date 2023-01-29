const fs = require('fs');
const [nums, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = -1;
const [N, M] = nums.split(' ').map(Number);
const arr = input.splice(0, M);
const [startPoint] = input;
const visited = Array(N+1).fill(false);
const points = Array.from(Array(N+1), () => []);

arr.forEach(el => {
    const [prev, next] = el.split(' ').map(Number);
    points[next].push(prev);
});

const dfs = (currentPoint) => {
    answer++;
    for (const prev of points[currentPoint]) {
        if (!visited[prev]) {
            visited[prev] = true;
            dfs(prev);
        }
    }
}

visited[startPoint] = true;
dfs(startPoint);

console.log(answer);
