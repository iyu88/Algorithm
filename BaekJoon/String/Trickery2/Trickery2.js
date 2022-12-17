const fs = require('fs');
const [str, num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const target = str.split('');
arr.forEach(el => {
    const [A, B] = el.split(' ').map(Number);
    [target[A], target[B]] = [target[B], target[A]];
});
console.log(target.join(''));
