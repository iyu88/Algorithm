const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.map(el => {
    let value;
    let [q, a] = el.split('=');
    let [f, operator, s] = q.split(' ');
    if (operator === '+') {
        value = BigInt(f) + BigInt(s) === BigInt(a);
    } else if (operator === '-') {
        value = BigInt(f) - BigInt(s) === BigInt(a);
    } else if (operator === '/') {
        value = BigInt(f) / BigInt(s) === BigInt(a);
    } else if (operator === '*') {
        value = BigInt(f) * BigInt(s) === BigInt(a);
    }
    return value ? 'correct' : 'wrong answer';
}).join('\n'));
