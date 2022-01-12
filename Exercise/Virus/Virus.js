const fs = require('fs');
let [m, n, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let M = +m;
let answer = 0;
let visited = Array(M).fill(false);
let points = Array.from(Array(M), () => new Array());
arr.forEach(el => {
    let [from, to] = el.split(' ').map(el2 => +el2);
    points[from - 1].push(to - 1);
    points[to - 1].push(from - 1);
});
visited[0] = true;

const dfs = (from) => {
    for (const to of points[from]) {
        if (visited[to] === false) {
            visited[to] = true;
            answer++;
            dfs(to);
        }
    }
}
dfs(0);
console.log(answer);
