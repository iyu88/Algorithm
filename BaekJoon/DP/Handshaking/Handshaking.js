const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString().trim();

const dp = [0, 1, 2, 3];
let nextValue;

const getLastCharFromStr = str => str[str.length-1];

for (let i = 4 ; i <= N ; i++) {
    nextValue = (BigInt(dp[i-1]) + BigInt(dp[i-2])).toString();
    dp[i] = getLastCharFromStr(nextValue);
}

console.log(getLastCharFromStr(dp[N].toString()));
