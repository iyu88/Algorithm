const fs = require('fs');
let [num, ...temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let arr = temp.map(el => el.split(' ').map(el2 => +el2));

while (arr.length) {
    let [from, to] = arr.shift();
    let dp = [0, 1];
    
    if ((from === 0 || to === 0) || from === to) {
        console.log(1);
    } else {
        for (let i = 2; i <= to; i++) {
            dp[i] = dp[i-1] * i;
        }
        console.log(Math.round(dp[to] / (dp[from] * dp[to-from])));
    }
}
