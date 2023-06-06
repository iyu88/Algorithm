const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
const N = +inputs[index++];
const nums = inputs[index++].split(' ').map(Number);
const M = +inputs[index++];
const Q = inputs.slice(index);

const dp = Array(N).fill(null).map(_ => Array(N).fill(false));

for (let i = 0 ; i < N ; i++) {
    dp[i][i] = true;
    if (i + 1 < N && nums[i] === nums[i + 1]) dp[i][i + 1] = true;
}

for (let i = 2 ; i < N ; i++) {
    for (let j = 0 ; j < N - 1 ; j++) {
        if (nums[i] !== nums[j]) continue;
        if (dp[j + 1][i - 1]) dp[j][i] = true;
    }
}

const answer = Q.map(el => {
    const [s, e] = el.split(' ').map(Number);
    return dp[s-1][e-1] ? 1 : 0;
});

console.log(answer.join('\n'));
