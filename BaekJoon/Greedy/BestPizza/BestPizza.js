const fs = require('fs');
const [count, nums, dough, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const C = +count;
const [A, B] = nums.split(' ').map(Number);
const D = +dough;
const kcal = D / A;

let max = kcal;
let total_price = A;
let total_kcal = D;

for (let i = 0; i < C; i++) {
    total_price += B;
    total_kcal += Number(arr[i]);
    if (max < (total_kcal / total_price)) max = total_kcal / total_price;
}

console.log(Math.floor(max));
