const fs = require('fs');
const [N, _, ...inputs] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const arr = Array(Number(N)).fill(true);

inputs.forEach(el => {
    const [x, y] = el.split(' ').map(Number);
    for (let i = x; i < y; i++) {
        arr[i] = false;
    }
});

console.log(arr.filter(el => el === true).length);
