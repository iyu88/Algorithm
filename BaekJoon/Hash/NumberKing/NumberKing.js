const fs = require('fs');
const [num, input] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +num;
const arr = input.split(' ').map(Number);
const sum = arr.reduce((acc, cur) => acc + cur, 0);
let dict = {};

const useHash = (index, sum) => {
    if (sum) dict[sum] = true;
    for (let i = index; i < N; i++) {
        useHash(i + 1, sum + arr[i]);
    }
}

useHash(0, 0);

console.log(sum - Object.keys(dict).length);
