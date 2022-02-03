const fs = require('fs');
let [nums, ...temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, P] = nums.split(' ').map(el => +el);
let arr = temp.map(el => +el).reverse();
let answer = 0;

for (const c of arr) {
	answer += Math.floor(P / c);
    P %= c;
    if (!P) break;
}

console.log(answer);
