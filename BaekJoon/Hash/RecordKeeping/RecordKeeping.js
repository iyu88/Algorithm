const fs = require('fs');
const [_, ...input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const dict = {};

input.forEach(el => {
    const arr = el.split(' ').sort();
    const key = JSON.stringify(arr);
    if (dict[key] === undefined) dict[key] = 1;
    else dict[key]++;
});

console.log(Math.max(...Object.values(dict)));
