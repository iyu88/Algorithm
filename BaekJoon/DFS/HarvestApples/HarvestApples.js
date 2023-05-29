const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
const [n, k] = inputs[index++].split(' ').map(Number);
const points = Array.from({length: n}, () => []);
const connect = inputs.slice(index, index + n - 1);
index += n - 1;
connect.forEach(el => {
    const [parent, child] = el.split(' ').map(Number);
    points[parent].push(child);
    points[child].push(parent);
});
const apples = inputs[index].split(' ').map(Number);
const visited = Array(n).fill(false);

let count = 0;
const dfs = (current, dist) => {
    if (dist > k) return;
    if (apples[current]) count++;
    for (const next of points[current]) {
        if (visited[next] === false) {
            visited[next] = true;
            dfs(next, dist + 1);
        }
    }
}

visited[0] = true;
dfs(0, 0);

console.log(count);
