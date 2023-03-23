const fs = require('fs');
const [_, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let sum = 0;
let log = {};

input.forEach(el => {
    if (el === 'ENTER') {
        sum += Object.keys(log).length;
        log = {};
        return;
    }
    if (log[el] === undefined) log[el] = true;
});

if (Object.keys(log).length) {
    sum += Object.keys(log).length;
}

console.log(sum);
