const fs = require('fs');
let [N, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(' '));

N = +N;

const pooling = (y, x) => {
    const temp = [];
    for (let i = y; i < y + 2; i++) {
        for (let j = x; j < x + 2; j++) {
            temp.push(arr[i][j]);
        }
    }
    const [_, second_max, ...rest] = temp.sort((a, b) => b - a);
    return second_max;
}

while (N > 1) {
    N /= 2;
    const temp = Array(N).fill(null).map(_ => Array(N).fill(null));
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            temp[i][j] = pooling(i*2, j*2);
        }
    }
    arr = temp;
}

console.log(arr[0][0]);
