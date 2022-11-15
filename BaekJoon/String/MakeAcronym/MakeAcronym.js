const fs = require('fs');
const arr = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

const dict = ['i', 'pa', 'te', 'ni', 'niti', 'a', 'ali', 'nego', 'no', 'ili'];

console.log((arr[0].slice(0,1) + arr.slice(1).filter(el => !dict.includes(el)).map(el => el.slice(0, 1)).join('')).toUpperCase());
