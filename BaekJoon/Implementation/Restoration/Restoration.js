const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = inputs[0].split(' ').map(Number);
let A = inputs[1].split(' ').map(Number);
const M = inputs[2].split(' ').map(Number);

for (let i = 0; i < K; i++) {
    const arr = Array(N).fill(0);
    for (let j = 0; j < N; j++) {
        arr[M[j] - 1] = A[j];
    }
    A = arr;
}

console.log(A.join(' '));
