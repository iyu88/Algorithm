const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n').slice(0, -1);

console.log(arr.map(el => el.split('').reverse().join('')).join('\n'));
