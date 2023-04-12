const fs = require('fs');
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let index = 0;
let num = +inputs[index++];
let min;
let total;
let board;
const Y = 5;
const X = 9;
const DY = [-1, 0, 1, 0];
const DX = [0, -1, 0, 1];

const backTracking = () => {
    for (let y = 0 ; y < Y ; y++) {
        for (let x = 0 ; x < X ; x++) {
            if (board[y][x] !== 'o') continue;
            
            for (let k = 0 ; k < 4 ; k++) {
                const dyy = DY[k] + y;
                const dxx = DX[k] + x; 
                const dyyy = DY[k] + dyy;
                const dxxx = DX[k] + dxx;
                
                if (dyy < 0 || dxx < 0 || dyy >= Y || dxx >= X) continue;
                if (dyyy < 0 || dxxx < 0 || dyyy >= Y || dxxx >= X) continue;
                if (board[dyy][dxx] !== 'o' || board[dyyy][dxxx] !== '.') continue;

                board[y][x] = '.';
                board[dyy][dxx] = '.';
                board[dyyy][dxxx] = 'o';
                backTracking();
                board[y][x] = 'o';
                board[dyy][dxx] = 'o';
                board[dyyy][dxxx] = '.';
            }
        }
    }
    
    let pin = 0;
    for (let y = 0 ; y < Y ; y++) {
        for (let x = 0 ; x < X ; x++) {
            if (board[y][x] === 'o') pin++;
        }
    }
    min = Math.min(min, pin);
}
    
const answer = [];

while (num--) {
    board = inputs.slice(index, index + 5).map(el => el.split(''));
    min = 9;
    total = 0;
    
    for (let y = 0 ; y < Y ; y++) {
        for (let x = 0 ; x < X ; x++) {
            if (board[y][x] === 'o') total++;
        }
    }
    
    backTracking();
    answer.push(`${min} ${total-min}`);
    
    index += 6;
}
    
console.log(answer.join('\n'));
