const fs = require('fs');
let [nums, count, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M] = nums.split(' ').map(el => +el);
let start = 1
let end = start + (M - 1)
let d = 0;

while (arr.length) {
    let target = parseInt(arr.shift());
    if (target < start) {
        d += (start - target);
        start = target;
        end = start + (M - 1);
    } else if (target > end) {
        d += (target - end);
        end = target;
        start = end - (M - 1);
    }
}

console.log(d);
