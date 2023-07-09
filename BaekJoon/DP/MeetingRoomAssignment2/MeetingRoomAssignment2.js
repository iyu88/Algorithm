const fs = require('fs');
const [num, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.map(el => el.split(' ').map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1] | a[2] - b[2]);
const answer = [];
const last = Math.max(...arr.map(el => el[0]));

const dfs = (x, current) => {
    current += arr[x][2];
    
    if (arr[x][1] > last) {
        answer.push(current);
    }
    
    for (let i = x+1 ; i < N ; i++) {
        if (arr[x][1] > arr[i][0]) continue;
        dfs(i, current);
    }
}

for (let i = 0 ; i < N ; i++) {
    dfs(i, 0);
}

console.log(Math.max(...answer));
