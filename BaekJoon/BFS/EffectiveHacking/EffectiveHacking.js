const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let total = 0;
let answer = [];
const [N, _] = inputs[0].split(' ').map(Number);
const points = Array.from({length: N+1}, () => []);
inputs.forEach((el, idx) => {
    if (idx === 0) return;
    const [from, to] = el.split(' ');
    points[to].push(from);
});

const bfs = (point) => {
    const visited = Array(N+1).fill(false);
    visited[point] = true;
    const stack = [point];
    
    let count = 0;
    let result = 0;
    
    while (stack.length) {
        const current = stack.pop();
        if (result < count) result = count;
        
        for (const next of points[current]) {
            if (visited[next] === false) {
                count++;
                visited[next] = true;
                stack.push(next);
            }
        }
    }
    
    return result;
}

for (let i = 1 ; i <= N ; i++) {
    const max = bfs(i);
    if (total < max) {
        total = max;
        answer = [i];
    } else if (max === total) {
        answer.push(i);
    }
}

console.log(answer.join(' '));