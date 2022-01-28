const fs = require('fs');
let [nums, ...temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [k, n] = nums.split(' ').map(el => +el);
let arr = temp.map(el => +el);
let answer;
let sum;
let start = 0;
let end = 10e9;
let index;

while (start <= end) {
    index = Math.floor((start + end) / 2);
    sum = arr.map(el => Math.floor(el / index)).reduce((acc, cur) => acc + cur);
    if (sum < n) { // 총 개수가 기준 미달 -> 길이를 줄임 
        end = index - 1;
    } else { // 총 개수가 기준보다 크거나 같을 때 -> 길이를 늘려서 최대 확인
        answer = index;
        start = index + 1;
    }
}

console.log(answer);
