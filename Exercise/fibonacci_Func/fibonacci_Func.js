const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

while (arr.length) {
    let N = arr.shift();
    let dp = [[1, 0], [0, 1]];
    
    for (let i = 2; i <= N; i++) {
        dp[i] = [BigInt(dp[i-1][0]) + BigInt(dp[i-2][0]), BigInt(dp[i-1][1]) + BigInt(dp[i-2][1])];
    }
    console.log(dp[N].map(el => el.toString()).join(' '));
}
