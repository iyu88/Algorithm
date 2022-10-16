const fs = require('fs');
let [num, ...arr] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

let row = arr.map(el => el.split('').slice().join('')).join('');
let col = arr.map((el, i) => {
    return el.split('').map((el2, j) => {
        return arr[j][i];
    }).join('');
}).join('');

console.log(row === col ? "YES" : "NO");
