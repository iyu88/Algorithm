const fs = require('fs');
let [a, b, c, d] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let sorted = b.split(' ').map(el => +el).sort((a,b) => a - b);
let answer = [];

const binary_lower = (target, arr) => {
    let start = 0;
    let end = arr.length;
    let index;
    while (start < end) {
        index = Math.floor((start + end) / 2);
        if (target <= arr[index]) {
            end = index;
        } else {
            start = index + 1;
        }
    }
    return end;
}

const binary_upper = (target, arr) => {
    let start = 0;
    let end = arr.length;
    let index;
    while (start < end) {
        index = Math.floor((start + end) / 2);
        if (target < arr[index]) {
            end = index;
        } else {
            start = index + 1;
        }
    }
    return end; 
}

d.split(' ').forEach(el => {
    let LOWER = binary_lower(Number(el), sorted);
    let UPPER = binary_upper(Number(el), sorted);
    answer.push(UPPER-LOWER);
});
console.log(answer.join(' '));
