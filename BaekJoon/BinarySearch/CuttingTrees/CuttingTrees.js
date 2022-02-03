const fs = require('fs');
let [nums, temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M] = nums.split(' ').map(el => +el);
let arr = temp.split(' ').map(el => +el);

let answer;
let sum;

const getSum = (h) => {
    sum = arr.reduce((acc, cur) => {
        return cur > h ? acc += (cur-h) : acc;
    }, 0);
}

let start = 0;
let end = Math.max(...arr);
let index;

while (start <= end) {
    index = Math.floor((start + end) / 2);
    getSum(index);
    if (sum < M) {
        end = index - 1;
    } else {
        answer = index;
        start = index + 1;
    }
}

console.log(answer);
