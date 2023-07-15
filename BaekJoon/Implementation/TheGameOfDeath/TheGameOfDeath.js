const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [N, K] = nums.split(' ').map(Number);
const arr = inputs.map(Number);
let count = 0;
let index = 0;

while (1) {
    ++count;
    const num = arr[index];
    if (num === K) break;
    index = num;
    if (count > N) break;
}

console.log(count > N ? -1 : count);
