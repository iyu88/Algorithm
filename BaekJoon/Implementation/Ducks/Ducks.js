const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, Q] = nums.split(' ').map(Number);
const ducks = arr.map(Number);
const answer = Array(Q).fill(0);
const occupied = Array(N+1).fill(false);

ducks.forEach((duck, idx, arr) => {
    
    while (duck !== 1) {
        if (occupied[duck]) {
            answer[idx] = duck;
        }
        duck = Math.floor(duck / 2);
    }
    
    if (answer[idx] === 0) occupied[arr[idx]] = true;
});

console.log(answer.join('\n'));
