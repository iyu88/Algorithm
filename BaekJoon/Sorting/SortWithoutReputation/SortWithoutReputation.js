const fs = require('fs');
const [num, arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const counting_sort = {};

arr.split(' ').forEach(num => {
    if (counting_sort[num] === undefined) counting_sort[num] = 1;
});

console.log(Object.keys(counting_sort).map(Number).sort((a, b) => a - b).join(' '));
