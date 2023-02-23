const fs = require('fs');
const [size, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, M] = size.split(' ').map(Number);
const before = arr.map(line => line.split(''));
const after = Array.from(Array(N), () => Array(M).fill('.'));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
let y_min = Infinity;
let y_max = 0;
let x_min = Infinity;
let x_max = 0;

const countSeaSide = (y, x) => {
    let seaSideCount = 0;
    for (let k = 0 ; k < 4 ; k++) {
        const dyy = DY[k] + y;
        const dxx = DX[k] + x;
        if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= M) {
            seaSideCount++;
            continue;
        } 
        if (before[dyy][dxx] === '.') {
            seaSideCount++;
        }
    }
    return seaSideCount;
}

const isDisappear = (y, x) => countSeaSide(y, x) > 2;

const getStartIndex = (min, current) => Math.min(min, current);

const getEndIndex = (max, current) => Math.max(max, current);

for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
        if (before[y][x] === 'X') {
            if (!isDisappear(y, x)) {
                after[y][x] = 'X';
                y_min = getStartIndex(y_min, y);
                y_max = getEndIndex(y_max, y);
                x_min = getStartIndex(x_min, x);
                x_max = getEndIndex(x_max, x);
            }
        }
    }
}

console.log(after
            .slice(y_min, y_max+1)
            .map(el => el
                      .slice(x_min, x_max+1)
                      .join(''))
            .join('\n'));
