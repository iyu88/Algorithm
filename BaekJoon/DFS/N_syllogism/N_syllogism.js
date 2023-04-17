const fs = require('fs');
const [num, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
const N = +num;
const propositions = inputs.slice(index, index + N);
index += (N+1);
const questions = inputs.slice(index);
const relations = {};
const count = {};
propositions.forEach(p => {
    const [from, _, to] = p.split(' ');
    if (count[from] === undefined) count[from] = true;
    if (count[to] === undefined) count[to] = true;
    if (relations[from] === undefined) {
        relations[from] = [to];
    } else {
        relations[from].push(to);        
    }
});
const C = Object.keys(count).length;
let visited;

const dfs = (from, to) => {
    if (visited[to]) return;
    if (relations[from] === undefined) return;
    for (const next of relations[from]) {
        if (visited[next] === undefined) {
            visited[next] = true;
            dfs(next, to);
        } 
    }
}

const answer = questions.map(q => {
    const [from, _, to] = q.split(' ');
    visited = {};
    visited[from] = true;
    dfs(from, to);
    return visited[to] ? 'T' : 'F';
});

console.log(answer.join('\n'));
