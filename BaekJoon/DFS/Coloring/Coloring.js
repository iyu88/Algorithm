const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dfs = (i, colored, circles) => {
    for (const next of circles[i]) {
        if (colored[next] === 0) {
            colored[next] = 3 - colored[i];
            dfs(next, colored, circles);
        }
        if (colored[i] === colored[next]) return false;
    }
    return true;
}

const answer = [];
let index = 0;

while (index < arr.length) {
    const [N, M] = arr[index++].split(' ').map(Number);
    const colored = Array(N+1).fill(0);
    const circles = Array(N+1).fill(null).map(_ => []);
    arr.slice(index, index + M).forEach(el => {
        const [x, y] = el.split(' ').map(Number);
        circles[x].push(y);
        circles[y].push(x);
    });
    index += M;
    let isPossible = true;
    for (let i = 0 ; i < M ; i++) {
        if (colored[i] === 0) {
            colored[i] = 1;
            const result = dfs(i, colored, circles);
            if (!result) {
                isPossible = result;
                break;
            }
        }
    }
    answer.push(isPossible ? "possible" : "impossible");
}

console.log(answer.join('\n'));
