const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
inputs.forEach((str, idx) => {
    if (idx === 0) return;
    const result = [];
    const visited = {};
    const sorted = str.split('').sort();
    sorted.forEach(el => {
        if (visited[el] === undefined) visited[el] = 1;
        else visited[el]++;
    });
    
    const backTracking = (count) => {
        if (count === sorted.length) {
            answer.push(result.join(''));
            return;
        }
        for (const k in visited) {
            if (visited[k]) {
                visited[k]--;
                result.push(k);
                backTracking(count + 1);
                visited[k]++;
                result.pop();
            }
        }
    }
    
    backTracking(0);
});

console.log(answer.join('\n'));
