const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let dp = [0, 1, 1, 1, 2, 2, 3, 4, 5];
let max = Math.max(...arr.map(el => +el));

for (let i = 9; i <= max; i++) {
    dp[i] = dp[i-1] + dp[i-5];
}

for (const i of arr) {
    console.log(dp[i]);
}
