const fs = require('fs');
let [nums, sizes] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [boxes, weight] = nums.split(' ').map(el => +el);
let arr;
if (sizes) {
    arr = sizes.split(' ').map(el => +el).reverse();
}
let total = 0;

if (boxes === 0) {
    console.log(0);
} else {
    while (arr.length) {
        if (arr[arr.length-1] === weight) {
            total++;
            arr.pop();
        } else {
            let sum = arr[arr.length-1];
            arr.pop();
            while (sum < weight) {
                sum += arr[arr.length - 1];
                if (sum === weight) {
                    total++;
                    arr.pop();
                } else if (sum < weight) {
                    arr.pop();
                } else {
                    total++;
                }
            }
        }
    }
    console.log(total);
}
