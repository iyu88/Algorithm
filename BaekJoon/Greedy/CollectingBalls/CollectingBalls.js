const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const balls = input.split('');
let answer = Infinity;
let isAppear = false;
let count = 0;

const init = () => {
    isAppear = false;
    answer = Math.min(answer, count);
    count = 0;
}

for (let i = 0 ; i < N ; i++) {
    if (balls[i] === 'B') isAppear = true;
    if (isAppear && balls[i] === 'R') count++; 
}

init();

for (let i = N-1 ; i >= 0 ; i--) {
    if (balls[i] === 'B') isAppear = true;
    if (isAppear && balls[i] === 'R') count++;
}

init();

for (let i = 0 ; i < N ; i++) {
    if (balls[i] === 'R') isAppear = true;
    if (isAppear && balls[i] === 'B') count++;
}

init();

for (let i = N-1; i >= 0 ; i--) {
    if (balls[i] === 'R') isAppear = true;
    if (isAppear && balls[i] === 'B') count++;
}

init();

console.log(answer);
