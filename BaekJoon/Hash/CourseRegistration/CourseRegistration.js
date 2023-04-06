const fs = require('fs');
const [nums, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [K, L] = nums.split(' ').map(Number);
const $map = new Map();

inputs.forEach(input => {
    if (!$map.has(input)) {
        $map.set(input, 1);
    } else {
        $map.delete(input);
        $map.set(input, 1);
    }
});

const answer = [];
$map.forEach((value, key) => {
    if (answer.length === K) return;
    answer.push(key);
});

console.log(answer.join('\n'));
