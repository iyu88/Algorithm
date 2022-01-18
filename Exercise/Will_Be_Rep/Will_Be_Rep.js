const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

while (arr.length) {
    let [k, n] = arr.splice(0, 2);
    let b = Array(Number(k));
    b[0] = Array(Number(n)).fill(1).map((el, i) => el + i);
    for (let i = 1; i <= k; i++) {
        let temp = [];
        for (let j = 1; j <= n; j++) {
            let sum = b[i-1].slice(0, j).reduce((acc, cur) => acc + cur, 0);
            temp.push(sum);
        }
        b[i] = temp;
    }
    console.log(b[k][n-1]);
}
