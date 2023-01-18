const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = [];
let dp = [];

const startCase = str => str.split(' ').map(Number);

for (let i = 0 ; i < 21 ; i++) {
    dp[i] = [];
    for (let j = 0 ; j < 21 ; j++) {
        dp[i][j] = [];
        for (let k = 0 ; k < 21 ; k++) {
            dp[i][j][k] = 0;
        }
    }
}

function recurrsive (a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    if (a > 20 || b > 20 || c > 20) return recurrsive(20, 20, 20);
    
    if (dp[a][b][c]) return dp[a][b][c];
    
    if (a < b && b < c) return (dp[a][b][c] = recurrsive(a, b, c-1) + recurrsive(a, b-1, c-1) - recurrsive(a, b-1, c));
    else return (dp[a][b][c] = recurrsive(a-1, b, c) + recurrsive(a-1, b-1, c) + recurrsive(a-1, b, c-1) - recurrsive(a-1, b-1, c-1));
}

for (let i = 0 ; i < arr.length -1 ; i++) {
    const [a, b, c] = startCase(arr[i]);
    const result = recurrsive(a, b, c);
    answer.push(`w(${a}, ${b}, ${c}) = ${result}`);
}

console.log(answer.join('\n'));
