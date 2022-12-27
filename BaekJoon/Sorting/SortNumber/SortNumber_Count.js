const fs = require('fs');
const [N, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number);

const counting = {};

arr.forEach(el => {
    if (counting[el] === undefined) counting[el] = 1;
    else counting[el]++;
});
console.log(Object.keys(counting).sort((a, b) => a - b).map((k) => Array(counting[k]).fill(k).join('\n')).join('\n'));
