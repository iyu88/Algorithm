const fs = require('fs');
const [_, ...board] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(el => el.split(''));

const N = board.length;
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];
let answer = 0;

const swap = (y1, x1, y2, x2) => {
    [board[y1][x1], board[y2][x2]] = [board[y2][x2], board[y1][x1]];
}

const getVerticalCount = (x) => {
    let char = board[0][x];
    let count = 1;
    let max = 1;
    
    for (let y = 1; y < N; y++) {
        if (char === board[y][x]) count++;
        else {
            char = board[y][x];
            max = Math.max(max, count);
            count = 1;
        }
    }
    
    return Math.max(max, count);
}

const getHorizontalCount = (y) => {
    let char = board[y][0];
    let count = 1;
    let max = 1;
    
    for (let x = 1; x < N; x++) {
        if (char === board[y][x]) count++;
        else {
            char = board[y][x];
            max = Math.max(max, count);
            count = 1;
        }
    }
    
    return Math.max(max, count);
}


const checkAllDirection = (y1, x1, y2, x2) => {
    const yCount = [y1, y2].map(el => getHorizontalCount(el));
    const xCount = [x1, x2].map(el => getVerticalCount(el));
    const newMax = Math.max(...yCount, ...xCount);
    
    if (answer < newMax) answer = newMax;
} 

for (let y = 0 ; y < N ; y++) {
    for (let x = 0 ; x < N; x++) {
        for (let k = 0 ; k < 4 ; k++) {
            const dyy = DY[k] + y;
            const dxx = DX[k] + x;
            
            if (dyy < 0 || dxx < 0 || dyy >= N || dxx >= N) continue;
            
            checkAllDirection(y, x, dyy, dxx);
            swap(y, x, dyy, dxx);
            checkAllDirection(y, x, dyy, dxx);
            swap(dyy, dxx, y, x);
        }
    }
}

console.log(answer);
