const fs = require('fs');
let [num, ...temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let arr = temp.map(el => el.split(' ').map(el2 => +el2));
let answer = [];

for (let [index, el] of arr.entries()) {
    answer.push(arr.filter(el2 => el2[0] > el[0] && el2[1] > el[1]).length + 1);
}

console.log(answer.join(' '));
