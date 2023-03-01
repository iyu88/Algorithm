const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, H, W] = nums.split(' ').map(Number);
const answer = Array(N).fill('?');

for (let y = 0; y < H; y++) {
    if (answer.every(char => char !== '?')) break;
    for (let x = 0; x < N; x++) {
        if (answer[x] !== '?') continue;
        const start = x * W;
        const end = (x+1) * W;
        const sliced = arr[y].split('').slice(start, end);
        const filtered = sliced.filter(char => char !== '?');
        if (filtered.length) answer[x] = filtered[0];
    }
}

console.log(answer.join(''));
