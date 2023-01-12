const fs = require('fs');
const [_, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const arr = input.split(' ');

console.log(Math.max(...arr.sort((a, b) => b - a).map((el, index) => Number(el) + index + 2)));
