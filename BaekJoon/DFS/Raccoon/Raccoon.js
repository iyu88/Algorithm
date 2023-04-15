const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const visited = Array.from({length: N+1}, () => false);
const points = Array.from({length: N+1}, () => []);
arr.forEach(el => {
    const [from, to, dist] = el.split(' ').map(Number);
    points[from].push([to, dist]);
    points[to].push([from, dist]);
});
let answer = 0;

const dfs = (from, total) => {
    answer = Math.max(answer, total);
    for (const point of points[from]) {
        const [to, dist] = point;
        if (visited[to] === false) {
            visited[to] = true;
            dfs(to, total + dist);
        }
    }
}

visited[1] = true;
dfs(1, 0);

console.log(answer);
