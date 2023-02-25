const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [R, C, K] = nums.split(' ').map(Number);
const $map = arr.map(line => line.split(''));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
let answer = 0;

const backTracking = (y, x, dist) => {
    if (y === 0 && x === C-1 && dist === K) answer++;
    else {
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + y;
            const dxx = DX[k] + x;
            if (dyy < 0 || dxx < 0 || dyy >= R || dxx >= C) continue;
            if ($map[dyy][dxx] === '.') {
                $map[dyy][dxx] = 'T';
                backTracking(dyy, dxx, dist + 1);
                $map[dyy][dxx] = '.';
            }
        }
    }
}

$map[R-1][0] = 'T';
backTracking(R-1, 0, 1);

console.log(answer);
