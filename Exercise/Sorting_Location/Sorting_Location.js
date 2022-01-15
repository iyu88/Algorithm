const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let splited = arr.map(el => el.split(' ').map(el2 => +el2));
let sorted = splited.sort((a,b) => a[0] - b[0] || a[1] - b[1]).map(el => el.join(' '));
console.log(sorted.join('\n'));
