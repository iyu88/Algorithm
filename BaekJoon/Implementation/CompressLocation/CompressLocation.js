const fs = require('fs');
let [num, temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let obj = {};
let arr = temp.split(' ').map(el => +el);
let set = [...new Set(arr)];
let answer = [];

for (const i of set) {
	if (obj[i]) {
    	obj[i]++;
    } else {
    	obj[i] = 1;
    }
}

let sorted = Object.keys(obj).sort((a, b) => a - b);
let reduced = sorted.reduce((acc, cur) => {
    acc.push(acc[acc.length-1] + obj[cur]);
    return acc;
}, [0]);
sorted.forEach((el, i) => {
	obj[el] = reduced[i];
});
arr.forEach(el => {
	answer.push(obj[el]);
});

console.log(answer.join(' '));
