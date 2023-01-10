const fs = require('fs');
const [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

console.log(arr.map(el => {
    const $case = el.split(' ').map(Number).sort((a, b) => a - b);
    if ($case[3] - $case[1] > 3) return 'KIN';
    return $case.slice(1, 4).reduce((acc, cur) => acc + cur, 0);
}).join('\n'));
