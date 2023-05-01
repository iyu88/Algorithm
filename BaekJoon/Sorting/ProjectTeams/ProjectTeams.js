const fs = require('fs');
const [num, inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = inputs.split(' ').map(Number).sort((a, b) => a - b);
let answer = Infinity;

for (let i = 0 ; i < N ; i++) {
    const t = arr[i] + arr[2 * N - i - 1];
    answer = Math.min(answer, t);
}

console.log(answer);
