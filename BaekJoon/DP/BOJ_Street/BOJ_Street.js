const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.split('');
const dp = Array(N).fill(Infinity);
dp[0] = 0;

const nextChar = {
    'B' : 'O',
    'O' : 'J',
    'J' : 'B',
}

for (let i = 0 ; i < N-1 ; i++) {
    for (let j = i+1 ; j < N ; j++) {
        if (arr[j] === nextChar[arr[i]]) dp[j] = Math.min(dp[j], dp[i] + (j - i) ** 2);
    }
}

console.log(dp[N-1] === Infinity ? -1 : dp[N-1]);
