const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
console.log(input[1].split(' ').map(el => +el).sort((a, b) => a - b).reduce((acc, cur) => {
    acc.push(acc[acc.length-1] + cur);
    return acc;
}, [0]).reduce((acc, cur) => acc + cur));
