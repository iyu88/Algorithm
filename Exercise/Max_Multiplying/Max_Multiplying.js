const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let dp = [arr[0]];

for (let i = 1; i < num; i++) {
    dp[i] = Math.max(dp[i-1] * arr[i], arr[i]);
}

console.log((Math.max(...dp)).toFixed(3));
