const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
let answer = Array.from(Array(N), () => Array(N).fill(0));
let points = Array.from(Array(N), () => []);
let $map = arr.map(el => el.split(' ').map(el2 => +el2));
$map.forEach((el,y) => {
    el.forEach((el2,x) => {
        if (el2 === 1) {
            points[y].push(x);
        }
    });
});

const dfs = (i, j, visited) => {
    for (const to of points[i]) {
        if (!visited[to]) {
            visited[to] = true;
            if (j === to) {
                return;
            }
            dfs(to, j, visited);
        }
    }
}

for (let i = 0 ; i < N ; i++) {
    for (let j = 0 ; j < N ; j++) {
        let visited = Array(N).fill(false);
        dfs(i, j, visited);
        if (visited[j]) {
            answer[i][j] = 1;
        }
    }
}

console.log(answer.map(el => el.join(' ')).join('\n'));
