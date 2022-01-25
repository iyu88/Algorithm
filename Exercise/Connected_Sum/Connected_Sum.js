const fs = require('fs');
let [num, temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
let arr = temp.split(' ').map(el => +el);
let dp = [arr[0]];

for (let i = 1; i < N; i++) {
    dp[i] = Math.max(dp[i-1] + arr[i], arr[i]);
}

console.log(Math.max(...dp));
