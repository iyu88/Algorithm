const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [H, W, X, Y] = nums.split(' ').map(Number);
const A = Array.from({length: H}, () => Array.from({length: W}, () => null));
const B = inputs.slice().map(el => el.split(' ').map(Number));

for (let i = 0 ; i < H ; i++) {
    for (let j = 0 ; j < W ; j++) {
        if (i - X > -1 && j - Y > -1) {
            A[i][j] = B[i][j] - A[i - X][j - Y];
        } else {
            A[i][j] = B[i][j];
        }
    }
}

console.log(A.map(el => el.join(' ')).join('\n'));
