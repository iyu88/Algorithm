const fs = require('fs');
const [nums, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let [N, M] = nums.split(' ').map(Number);
console.log(arr.map(el => {
    let row = el.split('');
    let len = row.length;
    for (let i = 0 ; i < len; i++) {
        if (row[i] !== '.') row[len-i-1] = row[i];
    }
    return row.join('');
}).join('\n'));
