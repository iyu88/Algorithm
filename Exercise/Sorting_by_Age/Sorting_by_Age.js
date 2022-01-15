const fs =require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let splited = arr.map(el => el.split(' '));
let sorted = splited.sort((a,b) => Number(a[0]) - Number(b[0])).map(el => el.join(' '));

console.log(sorted.join('\n'));
