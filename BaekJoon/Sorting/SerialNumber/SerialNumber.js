const fs = require('fs');
const [_, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.map(el => [el, el.split('').reduce((acc, cur) => cur * 1 === +cur ? acc + Number(cur) : acc, 0)]).sort((a, b) => a[0].length - b[0].length || a[1] - b[1] || (a[0] > b[0] ? 1 : -1)).map(el => el[0]).join('\n'));
