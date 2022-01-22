const fs = require('fs');
let [num, temp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let N = +num;
let arr = temp.split(' ').map(el => +el);
let p = arr.indexOf(-1);

console.log(Math.min(...arr.slice(0, p)) + Math.min(...arr.slice(p+1)));
