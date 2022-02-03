const fs = require('fs');
let [a, b, c, d] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let from = d.split(' ').map(el => +el);
let to = b.split(' ').map(el => +el).sort((a,b) => a-b);
let answer = [];
from.forEach(el => binarySearch(el, to) ? answer.push("1") : answer.push("0"));
console.log(answer.join('\n'));

function binarySearch (target, arr) {
    let start = 0;
    let end = arr.length - 1;
    let index;
    while (start <= end) {
        index = Math.floor((start + end) / 2);
        if (target === arr[index]) {
           return true;
        } else if (target < arr[index]) {
           end = index - 1;
        } else if (target > arr[index]) {
           start = index + 1;
        }
    }
    return false;
}
