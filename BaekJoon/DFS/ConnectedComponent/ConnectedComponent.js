const fs = require('fs');
let [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, E] = nums.split(' ').map(el => +el);
let answer = 0;
let visited = Array(N).fill(false);
let points = Array.from(Array(N), () => []);
let $map = arr.map(el => el.split(' ').map(el2 => +el2));
$map.forEach(el => {
    let [from, to] = el;
    points[from - 1].push(to - 1);
    points[to - 1].push(from - 1);
});

const dfs = (from) => {
    if (!visited[from]) {
        visited[from] = true;
    }
    for (const i of points[from]) {
        if (!visited[i]) {
            dfs(i);
        }
    }
}

for (let i = 0; i < N; i++) {
    if (!visited[i]) {
        dfs(i);
        answer++;
    }
}

console.log(answer);
