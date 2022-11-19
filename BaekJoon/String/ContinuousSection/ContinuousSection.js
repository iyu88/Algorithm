const fs = require('fs');
let arr = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.map(el => {
    let max = 0;
    let count = 1;
    let last = el[0];
    for (let i = 1 ; i < el.length ; i++) {
        if (last === el[i]) {
            count++;
            max = Math.max(max, count);
        }
        else {
            max = Math.max(max, count);
            count = 1;
        }
        last = el[i];
    }
    return max;
}).join('\n'));
