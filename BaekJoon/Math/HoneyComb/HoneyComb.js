const fs = require('fs');
let num = fs.readFileSync('/dev/stdin').toString() * 1;

let dp = [0, 1];
let index = 2;
let dist = 1;

while (index < num) {
    index += dist * 6;
    dist++;
    dp.push(index);
}

if (num === 1) {
    console.log(1);
} else {
    console.log(num < dp[dp.length - 1] ? dp.length - 1 : dp.length);
}
