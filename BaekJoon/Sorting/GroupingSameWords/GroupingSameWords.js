const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const answer = {};

arr.map(el => el.split('').sort().join('')).forEach(el2 => answer[el2] === undefined ? answer[el2] = 1 : answer[el2]++);

console.log(Object.keys(answer).length);
