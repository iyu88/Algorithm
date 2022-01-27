const fs = require('fs');
let num = fs.readFileSync('/dev/stdin').toString() * 1;

let dp = [0, -1, 1, -1, 2, 1];

for (let i = 6; i <= num; i++) {
	if (dp[i-2] === -1) {
    	dp[i] = dp[i-5] + 1;
    } else if (dp[i-5] === -1) {
    	dp[i] = dp[i-2] + 1;
    } else {
    	dp[i] = Math.min(dp[i-2], dp[i-5]) + 1;
    }
}

console.log(dp[num]);
