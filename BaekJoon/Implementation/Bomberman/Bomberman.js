const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [R, C, N] = nums.split(' ').map(Number);
const timers = Array.from({length: R}, () => Array.from({length: C}, () => 0));
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
        if (arr[y][x] === 'O') {
            timers[y][x] = 2;
        }
    }
}

const decreaseBombs = () => {
    const points = [];
    for (let y = 0; y < R; y++) {
        for (let x = 0; x < C; x++) {
            if (timers[y][x] === 0) timers[y][x] = 3;
            else if (timers[y][x]) timers[y][x]--;
            if (timers[y][x] === 0) {
                for (let k = 0; k < 4; k++) {
                    const dyy = DY[k] + y;
                    const dxx = DX[k] + x;
                    
                    if (dyy < 0 || dxx < 0 || dyy >= R || dxx >= C) continue;
                    if (timers[dyy][dxx]) points.push([dyy, dxx]);
                }
            }
        }
    }
    
    if (points.length) {
        for (const point of points) {
            const [y, x] = point;
            timers[y][x] = 0;
        }
    }
}

let index = N-1;
while (index--) {
    decreaseBombs();
}

for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
        timers[y][x] = timers[y][x] ? 'O' : '.';
    }
}

console.log(timers.map(el => el.join('')).join('\n'));
