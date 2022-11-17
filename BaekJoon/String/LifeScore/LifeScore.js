const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.map(el => Array.from(el).reduce((acc, cur) => acc + (cur.charCodeAt(0) === 32 ? 0 : cur.charCodeAt(0) - 64), 0)).map(el => el === 100 ? 'PERFECT LIFE' : el).join('\n'));
