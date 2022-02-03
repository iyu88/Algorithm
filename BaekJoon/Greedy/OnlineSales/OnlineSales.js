const fs = require('fs');
let [nums, ...temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
  
let [M, N] = nums.split(' ').map(el => +el);
let answer = [];
let arr = temp.map(el => +el).sort((a,b) => a - b).map((el2, i) => {
    answer.push([el2, el2 * (M > (N - i) ? (N - i) : M)]);
});
console.log(answer.sort((a,b) => b[1] - a[1])[0].join(' '));
