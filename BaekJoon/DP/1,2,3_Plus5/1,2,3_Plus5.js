const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const arr = input.slice(1).map(Number);
    const MAX = Math.max(...arr);
    const MODULO = 1000000009;
    const dp = Array(MAX+1).fill(null).map(_ => Array(4).fill(0));
    
    dp[1][1] = dp[2][2] = dp[3][1] = dp[3][2] = dp[3][3] = 1;
    
    for (let i = 4; i <= MAX; i++) {
        dp[i][1] = (dp[i-1][2] + dp[i-1][3]) % MODULO;
        dp[i][2] = (dp[i-2][1] + dp[i-2][3]) % MODULO;
        dp[i][3] = (dp[i-3][1] + dp[i-3][2]) % MODULO;
    }
    
    console.log(arr.map(el => (dp[el][1] + dp[el][2] + dp[el][3]) % MODULO).join('\n'));
    process.exit();
});
