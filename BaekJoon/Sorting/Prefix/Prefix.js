const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const sorted = arr.sort((a, b) => a.length - b.length || a - b);
let max = 0;

for (let i = 0; i < N; i++) {
    let isPrefix = false;
    for (let j = i+1; j < N; j++) {
        if (sorted[j].startsWith(sorted[i])) {
            isPrefix = true;
            break;
        }
    }
    if (!isPrefix) max++;
}

console.log(max);
