const fs = require('fs');
const [num, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const arr = input.map(el => el.split(' '));
const MAX = Math.max(...arr.map(el => el[0]));

const dp = [];
dp[0] = 0;
dp[1] = 1;
dp[2] = 1;

for (let i = 3 ; i <= MAX ; i++) {
    dp[i] = BigInt(dp[i-1]) + BigInt(dp[i-2]);
}

console.log(arr.map((el, index) => {
    const [target, divide] = el;
    return `Case #${index+1}: ${(BigInt(dp[target]) % BigInt(divide)).toString()}`;
}).join('\n'));
