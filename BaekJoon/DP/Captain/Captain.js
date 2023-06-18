const fs = require('fs');
const N = +fs.readFileSync('/dev/stdin').toString();

const triangle = [];
const border = [];
triangle[1] = border[1] = 1;

let i = 1;
while (i++) {
    triangle[i] = triangle[i-1] + i;
    border[i] = border[i-1] + triangle[i];
    if (border[i] >= N) break;
}

const dp = Array(N+1).fill(Infinity);

for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= border.length; j++) {
        if (border[j] === i) {
	        dp[i] = 1;
  	      break;
        }
        if (border[j] > i) break;
        dp[i] = Math.min(dp[i], dp[i - border[j]] + 1);
    }
}

console.log(dp[N]);
