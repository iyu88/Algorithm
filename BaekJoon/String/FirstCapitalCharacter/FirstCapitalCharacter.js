const fs = require('fs')
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let answer = [];
arr.forEach(el => {
    answer.push(el.charAt(0).toUpperCase() + el.slice(1));
});

console.log(answer.join('\n'));