const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, P] = nums.split(' ').map(Number);
const channels = Array.from({length: M+1}, () => []);
inputs.forEach(el => {
    const [f, h] = el.split(' ').map(Number);
    channels[h].push(f);
});
const visited = Array.from({length: M+1}, () => false);
const finished = Array.from({length: M+1}, () => false);
let answer = 0;

const dfs = (current, count) => {
    for (const next of channels[current]) {
        if (visited[next] === false) {
            visited[next] = true;
            answer = Math.max(answer, count + 1);
            dfs(next, count + 1);
        } else if (finished[next] === false) {
            answer = -1;
            return;
        }
        break;
    }
    finished[current] = true;
}

dfs(P, 0);

console.log(answer);
