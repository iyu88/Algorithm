const fs = require('fs');
let num = fs.readFileSync('/dev/stdin').toString().trim(); 

let N = +num;
let a = Math.floor(N / 300);
let b = Math.floor((N % 300) / 60);
let c = Math.floor(((N % 300) % 60) / 10);

console.log(N % 10 ? `-1` : `${a} ${b} ${c}`);
