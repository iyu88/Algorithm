const fs = require('fs');
let [nums, temp, ...cases] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = [];
let [N, M] = nums.split(' ').map(el => +el);
let arr = temp.split(' ').map(el => +el).reduce((acc, cur) => {
    acc.push(acc[acc.length-1] + cur);
    return acc;
}, [0]);

for (let i = 0; i < cases.length; i++) {
	let [from, to] = cases[i].split(' ').map(el => +el);
    answer.push(arr[to] - arr[from-1]);
}

console.log(answer.join('\n'));
