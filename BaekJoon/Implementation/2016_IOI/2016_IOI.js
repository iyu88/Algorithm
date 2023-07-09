const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = nums.split(' ').map(Number);
const color = ['W', 'B', 'R'];
const flags = inputs.map(el => el.split(''));
const sum = Array.from({length: 3}, () => Array.from({length: N}, () => null));

for (let i = 0; i < N; i++) {
    for (let j = 0; j < 3; j++) {
        sum[j][i] = flags[i].filter(el => el !== color[j]).length + (i ? sum[j][i-1] : 0);
    }
}

let answer = Infinity;

for (let i = 0 ; i < N-2 ; i++) {
    for (let j = i+1 ; j < N-1 ; j++) {
        for (let k = j+1 ; k < N ; k++) {
            answer = Math.min(answer, sum[0][i] + sum[1][j] - sum[1][i] + sum[2][N-1] - sum[2][j]);
        }
    }
}

console.log(answer);
