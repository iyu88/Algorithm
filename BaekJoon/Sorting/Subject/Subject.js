const fs = require('fs');
const [num, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const arr = input.map(el => el.split(' ').map((el2, i) => i ? Number(el2) : el2));

console.log(arr.sort((a, b) => b[1] - a[1] || a[2] - b[2] || b[3] - a[3] || (a[0] > b[0] ? 1 : -1)).map(el => el[0]).join('\n'));
