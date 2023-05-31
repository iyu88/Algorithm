const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +inputs[0];
const before = {};
inputs.slice(1, 1 + N).forEach((el, idx) => before[el] = idx);
const after = inputs.slice(1 + N);

let answer = 0;
for (let i = 0 ; i < N - 1 ; i++) {
    for (let j = i + 1 ; j < N ; j++) {
        if (before[after[i]] > before[after[j]]) {
            answer++;
            break;
        }
    }
}

console.log(answer);
