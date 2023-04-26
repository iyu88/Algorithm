const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let order = 1;
let index = 0;

while (index < inputs.length) {
    const N = +inputs[index++];  
    
    if (N === 0) break;
    
    const names = inputs.slice(index, index + N);
    const visited = Array.from({length: N}, () => false);
    const finished = Array.from({length: N}, () => false);
    const relations = {};
    const numToName = {};
    const nameToNum = {};
    
    let count = 0;
    names.forEach(el => {
        const [from, to] = el.split(' ');
        if (relations[from] === undefined) {
            numToName[count] = from;
            nameToNum[from] = count;
            count++;
            relations[from] = [];
        }
        relations[from].push(to);
    });
    
    const dfs = (name) => {
        for (const next of relations[name]) {
            const num = nameToNum[next];
            if (visited[num] === false) {
                visited[num] = true;
                dfs(next);
            } else if (finished[num] === false) {
                result++;
            }
            finished[num] = true;
        }
    }
    
    let result = 0;
    for (let i = 0 ; i < N ; i++) {
        if (visited[i] === false) {
            visited[i] = true;
            dfs(numToName[i]);
        }
    }
    
    answer.push(`${order++} ${result}`);
    index += N;
}

console.log(answer.join('\n'));
