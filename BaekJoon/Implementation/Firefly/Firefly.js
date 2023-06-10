const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, H] = nums.split(' ').map(Number);
const S = Array(H + 1).fill(0);
const J = Array(H + 1).fill(0);

inputs.forEach((el, idx) => {
    if (idx % 2 === 0) S[Number(el)]++;
    else J[H + 1 - el]++;
});

for (let i = 1 ; i <= H ; i++) {
    J[i] += J[i-1];
    S[H - i] += S[H + 1 - i];
}

const A = [];

for (let i = 0 ; i < H ; i++) {
    A[i] = S[i] + J[i];
}

const M = Math.min(...A);

console.log(M + " " + A.filter(el => el === M).length);
