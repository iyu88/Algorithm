const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M, V] = inputs[0].split(' ').map(Number);
const arr = inputs[1].split(' ').map(Number);
const answer = [];

inputs.slice(2).map(el => {
    if (Number(el) < V-1) {
        answer.push(arr[Number(el)]);
    } else {
        answer.push(arr[(Number(el) -(V-1)) % (N - (V-1)) + (V-1)]);
    }
});

console.log(answer.join('\n'));
