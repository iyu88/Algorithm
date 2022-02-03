const fs = require('fs');
let k = fs.readFileSync('/dev/stdin').toString() * 1;

let arr = [1, 0];

for (let i = 1; i <= k; i++) {
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = arr[0] + temp;
}

console.log(arr.join(' '));
