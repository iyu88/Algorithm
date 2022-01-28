const fs = require('fs');
let num = fs.readFileSync('/dev/stdin').toString() * 1;

let dp = [0, 1];
for (let i = 2; i <= num; i++) {
    dp[i] = BigInt(dp[i-1]) * BigInt(i);
}

let answer = 0;
let arr = dp[num].toString().split('');
while (arr[arr.length-1] == 0) {
    arr.pop();
    answer++;
}

console.log(num ? answer : num);
