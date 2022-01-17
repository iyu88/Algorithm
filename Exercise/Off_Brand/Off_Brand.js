const fs = require('fs');
let [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [h, s] = nums.split(' ').map(el => +el);
let hArr = arr.splice(0, h);
let sArr = arr.splice(0, s);

let answer = [];
let obj = {};
if (h < s) {
    hArr.forEach(el => {
        obj[el] = 1;
    });
    sArr.forEach(el => {
        obj[el] === 1 ? answer.push(el) : answer= answer; 
    })
} else {
    sArr.forEach(el => {
        obj[el] = 1;
    });
    hArr.forEach(el => {
        obj[el] === 1 ? answer.push(el) : answer= answer; 
    });
}

console.log(answer.length);
console.log(answer.sort().join('\n'));
