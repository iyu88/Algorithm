const fs = require('fs');
const [num, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = 0;
const Y = {};
const X = {};

input.forEach(el => {
    const [yPos, xPos] = el.split(' ').map(Number);
    Y[yPos] === undefined ? Y[yPos] = 1 : Y[yPos]++;
    X[xPos] === undefined ? X[xPos] = 1 : X[xPos]++;
});

answer += Object.values(X).filter(el => el > 1).length;
answer += Object.values(Y).filter(el => el > 1).length;

console.log(answer);
